import {
  createObjectLiteral,
  exportConst,
  exportType,
  importIoTs,
  printNodes,
  writeTypescriptFile
} from '@monaxlabs/cambium/dist/ast';
import { ChainId } from '@monaxlabs/phloem/dist/types';
import { Contract, providers } from 'ethers';
import { FunctionFragment, ParamType } from 'ethers/lib/utils';
import * as fs from 'fs';
import * as g from 'io-ts-codegen';
import * as path from 'path';
import * as ts from 'typescript';
import { AdditionalABIs } from './abis';
import { AspenContractManifest, AspenContractsManifest } from './aspen-contracts';
import { ContractManifest, ContractsManifest } from './manifest';

const nonFeatureDirs = new Set(['deploy', 'impl']);

export function isFeature(manifest: ContractManifest): boolean {
  return manifest.abi.length > 0 && !nonFeatureDirs.has(manifest.dir);
}

export async function dumpLatestABIs(abiDir: string, ...manifests: ContractsManifest[]): Promise<void> {
  fs.rmSync(abiDir, { recursive: true, force: true });
  fs.mkdirSync(abiDir, { recursive: true });
  for (const manifest of manifests) {
    for (const m of Object.values(manifest)) {
      writeABI(abiDir, m);
    }
  }
  const additionalDir = path.join(abiDir, 'additional');
  for (const [name, abi] of Object.entries(AdditionalABIs)) {
    writeABI(additionalDir, { name, abi, file: name + '.sol' });
  }
}

function writeABI(abiDir: string, manifest: { name: string; abi: unknown; file: string }) {
  const dir = path.join(abiDir, manifest.file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, manifest.name + '.json'), JSON.stringify(manifest.abi, null, 2));
}

export function generateAspenContractsFactoriesMapTs(
  manifest: AspenContractsManifest,
  contractsManifest: ContractsManifest,
  experimentalManifest: ContractsManifest,
): ts.Node[] {
  const abis = Object.fromEntries(
    Object.values(contractsManifest)
      .concat(Object.values(experimentalManifest))
      .map((m) => [m.id, m.abi]),
  );

  const experimentalInterfaceIds = Object.values(experimentalManifest).map((m) => m.id);

  const aspenContracts = Object.values(manifest).map((d) => {
    const [file, interfaceName] = d.interfaceId.split(':');
    return { file, interfaceName, ...d };
  });

  // make sure we don't have duplicates
  // we don't care about the individual contracts here
  // which is why we allow 'overlapping'
  const uniqueInterfaces = Object.values(
    aspenContracts.reduce<Record<string, AspenContractManifest & { file: string; interfaceName: string }>>((acc, d) => {
      acc[d.interfaceId] = d;
      return acc;
    }, {}),
  );

  const factoriesNode = exportConst(
    'AspenContractFactories',
    ts.factory.createObjectLiteralExpression(
      uniqueInterfaces.map((d) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(d.interfaceId),
          ts.factory.createIdentifier(JSON.stringify(abis[d.interfaceId], null, 0)),
        ),
      ),
    ),
    { asConst: true },
  );

  const factoriesType = exportType(
    'AspenContractFactories',
    ts.factory.createTypeQueryNode(ts.factory.createIdentifier('AspenContractFactories')),
  );
  const factoriesInterfaces = exportType(
    'AspenContractInterfaceId',
    ts.factory.createTypeOperatorNode(
      ts.SyntaxKind.KeyOfKeyword,
      ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('AspenContractFactories')),
    ),
  );
  const factoryNodes = [factoriesNode, factoriesType, factoriesInterfaces];

  // excludes experimental versions
  const currentVersionByFamily: Record<string, number> = {};
  // includes experimental versions
  const latestVersionByFamily: Record<string, number> = {};
  const chainIds: ChainId[] = [];
  const interfaceByFamilyVersion = aspenContracts.reduce<Record<string, Record<number, string>>>((imap, d) => {
    if (
      !experimentalInterfaceIds.includes(d.interfaceId) &&
      (!currentVersionByFamily[d.interfaceFamily] || d.version.major > currentVersionByFamily[d.interfaceFamily])
    ) {
      currentVersionByFamily[d.interfaceFamily] = d.version.major;
    }
    if (!latestVersionByFamily[d.interfaceFamily] || d.version.major > latestVersionByFamily[d.interfaceFamily]) {
      latestVersionByFamily[d.interfaceFamily] = d.version.major;
    }

    chainIds.push(d.chainId);
    if (!imap[d.interfaceFamily]) imap[d.interfaceFamily] = {};
    imap[d.interfaceFamily][d.version.major] = d.interfaceId;
    return imap;
  }, {});

  const currentVersions = Object.entries(currentVersionByFamily).map(([family, currentVersion]) =>
    exportConst(`Current${family}Version`, ts.factory.createNumericLiteral(currentVersion), {
      asConst: true,
    }),
  );
  const latestVersions = Object.entries(latestVersionByFamily).map(([family, latestVersion]) =>
    exportConst(`Latest${family}Version`, ts.factory.createNumericLiteral(latestVersion), {
      asConst: true,
    }),
  );

  const versionsByFamilyConst = exportConst(
    'AspenContractsFamilyVersions',
    ts.factory.createObjectLiteralExpression(
      Object.entries(interfaceByFamilyVersion).map(([family, versions]) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(family),
          ts.factory.createObjectLiteralExpression(
            Object.entries(versions).map(([major, interfaceId]) =>
              ts.factory.createPropertyAssignment(
                ts.factory.createNumericLiteral(major),
                ts.factory.createStringLiteral(interfaceId),
              ),
            ),
          ),
        ),
      ),
    ),
    { asConst: true },
  );
  const versionsType = exportType(
    'AspenContractsFamilyVersions',
    ts.factory.createTypeQueryNode(ts.factory.createIdentifier('AspenContractsFamilyVersions')),
  );
  const versionsFamily = exportType(
    'AspenContractFamilyId',
    ts.factory.createTypeOperatorNode(
      ts.SyntaxKind.KeyOfKeyword,
      ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('AspenContractsFamilyVersions')),
    ),
  );
  const versionNodes = [versionsByFamilyConst, versionsType, versionsFamily, ...currentVersions, ...latestVersions];

  const initializer = createObjectLiteral(Object.fromEntries(Array.from(new Set(chainIds)).map((n) => [n, 'null'])));
  const networksConst = exportConst('AspenContractNetworks', initializer);

  const chainIdSchema = g.unionCombinator(Array.from(new Set(chainIds)).map((id) => g.literalCombinator(id)));
  const chainIdConst = exportConst('AspenContractChainId', g.printRuntime(chainIdSchema));
  const chainIdType = exportType('AspenContractChainId', g.printStatic(chainIdSchema));

  return [importIoTs, ...factoryNodes, ...versionNodes, networksConst, chainIdConst, chainIdType];
}

export async function writeAspenContractsFactoriesMap(
  manifest: AspenContractsManifest,
  aspenContractsFactoryMapFile: string,
  contractsManifest: ContractsManifest,
  experimentalManifest: ContractsManifest,
): Promise<void> {
  return writeTypescriptFile(
    aspenContractsFactoryMapFile,
    printNodes(...generateAspenContractsFactoriesMapTs(manifest, contractsManifest, experimentalManifest)),
  );
}

export function generateFeatureAbisMapTs(manifest: ContractsManifest): ts.Node[] {
  // Only include features with current Solidity code that Typechain will process and exclude
  // the cedar interfaces that are not features (those under impl, deploy, and standard)
  const currentFeatures = Object.values(manifest).filter(isFeature);

  const constNode = exportConst(
    'FeatureAbis',
    ts.factory.createObjectLiteralExpression(
      currentFeatures.map((m) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(m.id),
          ts.factory.createIdentifier(JSON.stringify(m.abi, null, 0)),
        ),
      ),
    ),
    { asConst: true },
  );
  return [constNode];
}

export async function writeFeaturesAbisMap(manifest: ContractsManifest, featureFactoryMapFile: string): Promise<void> {
  await writeTypescriptFile(featureFactoryMapFile, printNodes(...generateFeatureAbisMapTs(manifest)));
}

function functionParamSignature(p: ParamType) {
  return p.type === 'tuple' ? `(${p.components.map((c) => c.type)})` : p.type;
}
function functionSignature(f: FunctionFragment, hasOverloads: boolean): string {
  const i = f.inputs.map(functionParamSignature).join(',');
  const o = (f.outputs || []).map(functionParamSignature).join(',');
  // with `viem` we don't need to emit different signatures for overloads
  return `${f.name}(${i})${hasOverloads ? '' : ''}[${o}]`;
}

export function generateFeatureFunctionsMapTs(manifest: ContractsManifest): ts.Node {
  const currentFeatures = Object.values(manifest).filter(isFeature);
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const provider = new providers.JsonRpcProvider();

  const map: Record<string, string[]> = {};
  for (const feature of currentFeatures) {
    const contract = new Contract(ZERO_ADDRESS, feature.abi as unknown as string, provider);
    const functions = Object.values(contract.interface.functions);
    const overloads = functions.reduce<Record<string, number>>((o, f) => {
      if (!o[f.name]) o[f.name] = 1;
      else o[f.name]++;
      return o;
    }, {});

    for (let i = 0, l = functions.length; i < l; i++) {
      const func = functions[i];
      const key = functionSignature(func, overloads[func.name] > 1);
      if (!map[key]) map[key] = [];
      map[key].push(feature.id);
    }
  }

  const constNode = exportConst(
    'FeatureFunctionsMap',
    ts.factory.createObjectLiteralExpression(
      Object.entries(map).map(([functionName, implementingInterfaces]) => {
        return ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(functionName),
          ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment(
              ts.factory.createStringLiteral('drop'),
              ts.factory.createArrayLiteralExpression(
                implementingInterfaces.map((i) => ts.factory.createStringLiteral(i)),
              ),
            ),
          ]),
        );
      }),
    ),
    { asConst: true },
  );

  return constNode;
}

export async function writeFeaturesFunctionsMap(manifest: ContractsManifest, functionsMapFile: string): Promise<void> {
  await fs.writeFileSync(functionsMapFile, printNodes(generateFeatureFunctionsMapTs(manifest)));
}

export function generateFeatureCodesMapTs(manifest: ContractsManifest): ts.Node {
  const currentFeatures = Object.values(manifest).filter(isFeature);

  const map: Record<string, string> = {};
  for (const feature of currentFeatures) {
    map[feature.code] = feature.id;
  }

  const constNode = exportConst(
    'FeatureCodesMap',
    ts.factory.createObjectLiteralExpression(
      Object.entries(map)
        .sort((a, b) => (a[1] < b[1] ? -1 : 1)) // sort by featureInterface
        .map(([featureCode, featureInterface]) => {
          return ts.factory.createPropertyAssignment(
            ts.factory.createStringLiteral(`0x${featureCode}`),
            ts.factory.createStringLiteral(featureInterface),
          );
        }),
    ),
    { asConst: true },
  );

  return constNode;
}

export async function writeFeaturesCodeMap(manifest: ContractsManifest, functionsMapFile: string): Promise<void> {
  await writeTypescriptFile(functionsMapFile, printNodes(generateFeatureCodesMapTs(manifest)));
}

export function generateFeaturesListTs(manifest: ContractsManifest): ts.Node {
  // Only include features with current Solidity code that Typechain will process and exclude
  // the cedar interfaces that are not features (those under impl, deploy, and standard)
  const currentFeatures = Object.values(manifest).filter(isFeature);

  const constNode = exportConst(
    'ExperimentalFeatures',
    ts.factory.createArrayLiteralExpression(currentFeatures.map((m) => ts.factory.createStringLiteral(m.id))),
    { asConst: true },
  );
  return constNode;
}

export async function writeFeaturesList(manifest: ContractsManifest, functionsMapFile: string): Promise<void> {
  await writeTypescriptFile(functionsMapFile, printNodes(generateFeaturesListTs(manifest)));
}

