import { parse } from '@monaxlabs/phloem/dist/schema';
import { Chain, ChainId } from '@monaxlabs/phloem/dist/types';
import { either as E, function as F } from 'fp-ts';
import * as t from 'io-ts';
import { importJWK, JWTPayload, jwtVerify } from 'jose';
import { GatingAPI } from '..';
import { Signer } from '../..';
import { SupportedNetwork } from './secrets';

const { AuthService, GateService, GateSignInMode, GateType, RolesService } = GatingAPI;

export type GateCreated = GatingAPI.GateResponse & { id: string };

export type GateOptions = {
  onExisting?: 'delete' | 'reuse';
};

const DefaultGateOptions: GateOptions = {};

export async function configureGate(
  network: SupportedNetwork,
  gateName: string,
  roles: Omit<GatingAPI.CreateRoleRequest, 'chainId'>[],
  options?: GateOptions,
): Promise<GateCreated> {
  const { onExisting } = { ...DefaultGateOptions, ...options };
  if (onExisting) {
    const gates = await GateService.getClientGates();
    const existingGates = gates.filter((g) => g.name === gateName);
    if (existingGates.length) {
      if (onExisting === 'delete') {
        console.error(`Deleting existing gates ${existingGates.map((g) => `${g.id} ('${g.name}')`).join(', ')}`);
        await Promise.all(existingGates.map(({ id }) => GateService.deleteGate({ id })));
      } else if (onExisting === 'reuse') {
        return existingGates[0];
      } else if (onExisting === 'fail') {
        throw new Error(`Gate already exists with name '${gateName}'`);
      }
    }
  }
  const gate = await GateService.createGate({
    requestBody: { type: GateType.WEB3, name: gateName, signInMode: GateSignInMode.MULTIPLE },
  });

  const chainId = String(Chain[network]);
  await RolesService.addGateRoles({
    id: gate.id,
    requestBody: roles.map((r) => ({ ...r, chainId })),
  });

  return gate as GateCreated;
}

export async function authenticateForGate(chainId: ChainId, gateId: string, walletClient: Signer): Promise<string> {
  const signerAddress = walletClient.account.address;
  const { signpad } = await AuthService.getSignpad({ gateId, requestBody: { signer: signerAddress } });
  const signature = await walletClient.signMessage({
    message: signpad,
  });
  return AuthService.authenticateForGate({ requestBody: { chainId: String(chainId), signpad, signature } });
}

const StringArray = t.array(t.string);
const MaybeStringArray = t.union([t.string, StringArray]);
const Roles = new t.Type<string[]>(
  'Roles',
  StringArray.is,
  (input, context) =>
    F.pipe(
      MaybeStringArray.validate(input, context),
      E.map((a) => (Array.isArray(a) ? a : [a])),
    ),
  t.identity,
);

export async function parseAndVerifyJWT(
  publicKey: GatingAPI.JWK,
  jwtToken: string,
): Promise<{ payload: JWTPayload; roles: string[] }> {
  const key = await importJWK(publicKey, '', true);
  const { payload } = await jwtVerify(jwtToken, key, { clockTolerance: 100 });
  const roles = parse(Roles, payload.role);
  return { payload, roles };
}
