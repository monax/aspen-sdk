import { Provider } from '@ethersproject/providers';

import { BigNumber, BigNumberish, ContractReceipt, Overrides } from 'ethers';
import { parse } from '../../utils';
import { Address, Addressish, asAddress } from '../address';
import { extractEventsFromLogs } from '../events';
import { PromiseOrValue } from '../generated/common';
import {
  TokenIssuedEventObject,
  TokensIssuedEventObject,
} from '../generated/issuance/ICedarNFTIssuance.sol/IRestrictedNFTIssuanceV2';
import { ChainId } from '../network';
import { SdkError, SdkErrorCode } from './errors';
import { extractKnownSupportedFeatures, FeatureFunction, FeatureInterface, FeatureInterfaceId } from './features';
import { Agreements } from './features/agreements';
import { Claims } from './features/claims';
import { Conditions } from './features/conditions';
import { Metadata } from './features/metadata';
import { Ownable } from './features/ownable';
import { Royalties } from './features/royalties';
import { Standard } from './features/standard';
import { PendingClaim, Token } from './objects';
import type { ClaimConditionsState, CollectionInfo, DebugHandler, Signerish, TokenId, TokenStandard } from './types';

export const DefaultDebugHandler = (collection: CollectionInfo, action: string, ...data: unknown[]) => {
  console.debug(`Collection Contract ${collection.chainId} # ${collection.address} -> ${action}`, ...data);
};

export type FeatureInterfaces = { -readonly [K in FeatureInterfaceId]: FeatureInterface<K> };

export type NFTTokenIssueArgs = {
  to: Addressish;
  quantity: BigNumberish;
  tokenURI?: string;
};

export type NFTTokenIssuance =
  | ({ withTokenURI: true } & TokenIssuedEventObject)
  | ({ withTokenURI: false } & TokensIssuedEventObject);

export class CollectionContract {
  private static _debugHandler: DebugHandler | undefined;

  private _supportedFeatures: FeatureInterfaceId[] = [];
  private _interfaces: Partial<FeatureInterfaces>;
  private _tokenStandard: TokenStandard;
  private readonly _provider: Provider;

  readonly chainId: ChainId;
  readonly address: Address;

  // FeatureSets
  readonly metadata: Metadata;
  readonly agreements: Agreements;
  readonly royalties: Royalties;
  readonly ownable: Ownable;
  readonly claims: Claims;
  readonly conditions: Conditions;
  readonly standard: Standard;

  readonly issueNFT = FeatureFunction.fromFeaturePartition(
    'issueNFT',
    this,
    [
      'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
      'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
      'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
      'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
      'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
      'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
    ],
    {
      factory: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
      ],
      tokenIssued: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
      ],
    },
    ({ factory, tokenIssued }) =>
      async (
        signer: Signerish,
        { to, quantity, tokenURI }: NFTTokenIssueArgs,
        overrides?: Overrides & { from?: PromiseOrValue<string> },
      ): Promise<NFTTokenIssuance[]> => {
        if (factory) {
          const contract = factory.connectWith(signer);
          const receiver = await asAddress(to);
          const receipts: ContractReceipt[] = [];
          try {
            if (tokenURI === undefined) {
              const tx = await contract.issue(receiver, quantity, overrides);
              receipts.push(await tx.wait());
            } else {
              const sup = BigNumber.from(quantity);
              for (let i = 0; sup.gt(i); i++) {
                const tx = await contract.issueWithTokenURI(receiver, tokenURI, overrides);
                receipts.push(await tx.wait());
              }
            }
          } catch (err) {
            throw err;
          }
          const issueEvents: NFTTokenIssuance[] = [];
          if (!tokenIssued) {
            tokenIssued = this.assumeFeature('issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2');
          }
          if (tokenIssued) {
            const contract = tokenIssued.connectReadOnly();
            issueEvents.push(
              ...extractEventsFromLogs(
                contract.filters.TokensIssued(),
                tokenIssued.interface,
                receipts.flatMap((r) => r.logs),
              ).map((e) => ({ withTokenURI: false as const, ...e })),
            );
            issueEvents.push(
              ...extractEventsFromLogs(
                contract.filters.TokenIssued(),
                tokenIssued.interface,
                receipts.flatMap((r) => r.logs),
              ).map((e) => ({ withTokenURI: true as const, ...e })),
            );
          }
          return issueEvents;
        }
        throw new Error();
      },
  );

  static setDebugHandler(handler: DebugHandler | undefined) {
    CollectionContract._debugHandler = handler;
  }

  static async from(provider: Provider, collectionAddress: Addressish): Promise<CollectionContract> {
    try {
      const { chainId } = await provider.getNetwork();
      const chain = parse(ChainId, chainId);
      const address = await asAddress(collectionAddress);

      const iFeatures = FeatureInterface.fromFeature('IAspenFeatures.sol:IAspenFeaturesV0', address, provider);
      const features = await iFeatures.connectReadOnly().supportedFeatures();

      return new CollectionContract(provider, chain, address, features);
    } catch (err) {
      throw new SdkError(SdkErrorCode.FAILED_TO_LOAD_FEATURES, undefined, err as Error);
    }
  }

  constructor(provider: Provider, chain: ChainId, address: Address, features: string[]) {
    this.chainId = chain;
    this.address = address;
    this._provider = provider;

    this._supportedFeatures = extractKnownSupportedFeatures(features);
    this._interfaces = this.getInterfaces();
    this.debug('Loaded supported features', this._supportedFeatures);

    this.standard = new Standard(this);
    this._tokenStandard = this.standard.getStandard();
    this.debug('Token standard set to', this.tokenStandard);

    this.metadata = new Metadata(this);
    this.agreements = new Agreements(this);
    this.royalties = new Royalties(this);
    this.ownable = new Ownable(this);
    this.claims = new Claims(this);
    this.conditions = new Conditions(this);
  }

  get supportedFeatures(): string[] {
    return this._supportedFeatures;
  }

  /**
   * @returns An object with mapped interface factories
   */
  get interfaces(): Partial<FeatureInterfaces> {
    return this._interfaces;
  }

  get tokenStandard(): TokenStandard {
    return this._tokenStandard;
  }

  get provider(): Provider {
    return this._provider;
  }

  assumeFeature<T extends FeatureInterfaceId>(feature: T): FeatureInterface<T> {
    return FeatureInterface.fromFeature(feature, this.address, this._provider);
  }

  protected getInterfaces(): Partial<FeatureInterfaces> {
    const interfaces = {} as Record<FeatureInterfaceId, FeatureInterface<FeatureInterfaceId>>;
    for (const feature of this._supportedFeatures) {
      interfaces[feature] = this.assumeFeature(feature);
    }

    return interfaces;
  }

  debug(message: string, ...data: unknown[]) {
    if (CollectionContract._debugHandler) {
      const collection: CollectionInfo = {
        chainId: this.chainId,
        address: this.address,
        tokenStandard: this.tokenStandard,
      };
      CollectionContract._debugHandler(collection, message, ...data);
    }
  }

  requireTokenId(tokenId: TokenId): BigNumber {
    if (tokenId === null || tokenId === undefined) {
      // @todo make an SDK error
      throw new Error('Token is required for ERC1155 contracts!');
    }

    return BigNumber.from(tokenId);
  }

  /////
  // High level objects
  /////

  Token(tokenId: TokenId): Token {
    return new Token(this, tokenId);
  }

  Claim(tokenId: TokenId, conditions: ClaimConditionsState): PendingClaim {
    return new PendingClaim(this, tokenId, conditions);
  }
}
