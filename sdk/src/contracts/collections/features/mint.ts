import { BigNumber, BytesLike, ContractTransaction } from 'ethers';
import { CollectionContract, Signerish, SourcedOverrides } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureSet } from './features';

export const MintFeatures = [
  'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV0',
  'lazymint/ILazyMint.sol:ICedarLazyMintV0',
  'lazymint/ILazyMint.sol:IRestrictedLazyMintV0',
  'lazymint/ILazyMint.sol:IRestrictedLazyMintV1',
  'lazymint/ICedarLazyMint.sol:ICedarLazyMintV0',
  'lazymint/ICedarLazyMint.sol:IRestrictedLazyMintV0',
  'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV1',
  'lazymint/ICedarSFTLazyMint.sol:ICedarSFTLazyMintV0',
] as const;

export type MintFeatures = (typeof MintFeatures)[number];

export type MintAgs = {
  amount: BigNumber;
  baseURI: string;
  encryptedBaseURI?: BytesLike;
};

export class Mint extends FeatureSet<MintFeatures> {
  constructor(base: CollectionContract) {
    super(base, MintFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const mint = partitioner({
      v0: ['lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV0'],
      v1: [
        'lazymint/ILazyMint.sol:ICedarLazyMintV0',
        'lazymint/ILazyMint.sol:IRestrictedLazyMintV0',
        'lazymint/ILazyMint.sol:IRestrictedLazyMintV1',
        'lazymint/ICedarLazyMint.sol:ICedarLazyMintV0',
        'lazymint/ICedarLazyMint.sol:IRestrictedLazyMintV0',
        'lazymint/ICedarNFTLazyMint.sol:ICedarNFTLazyMintV1',
        'lazymint/ICedarSFTLazyMint.sol:ICedarSFTLazyMintV0',
      ],
    });

    return { mint };
  });

  async lazyMint(
    signer: Signerish,
    { amount, baseURI, encryptedBaseURI }: MintAgs,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { v0, v1 } = this.getPartition('mint');

    try {
      if (v1) {
        const tx = await v1.connectWith(signer).lazyMint(amount, baseURI, overrides);
        return tx;
      } else if (v0) {
        if (encryptedBaseURI === undefined) {
          throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('encryptedBaseURI is required'));
        }
        const tx = await v0.connectWith(signer).lazyMint(amount, baseURI, encryptedBaseURI, overrides);
        return tx;
      }
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'royalties', function: 'royaltyInfo' });
  }
}
