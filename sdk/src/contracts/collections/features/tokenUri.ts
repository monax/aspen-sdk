import { BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, ERC1155StandardInterfaces } from './features';

const TokenUriFunctions = {
  nft: 'tokenURI(uint256)[string]',
  sft: 'uri(uint256)[string]',
} as const;

const TokenUriPartitions = {
  // @todo - waiting on manifest update
  nft: [...FeatureFunctionsMap[TokenUriFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[TokenUriFunctions.sft].drop],
  // some SFT contracts don't explicitly state support for metadata interfaces
  catchSft: [...ERC1155StandardInterfaces],
};
type TokenUriPartitions = typeof TokenUriPartitions;

const TokenUriInterfaces = Object.values(TokenUriPartitions).flat();
type TokenUriInterfaces = (typeof TokenUriInterfaces)[number];

export type TokenUriCallArgs = [tokenId: BigNumberish, overrides?: CallOverrides];
export type TokenUriResponse = string;

export class TokenUri extends ContractFunction<
  TokenUriInterfaces,
  TokenUriPartitions,
  TokenUriCallArgs,
  TokenUriResponse
> {
  readonly functionName = 'tokenUri';

  constructor(base: CollectionContract) {
    super(base, TokenUriInterfaces, TokenUriPartitions, TokenUriFunctions);
  }

  call(...args: TokenUriCallArgs): Promise<TokenUriResponse> {
    return this.tokenUri(...args);
  }

  protected async tokenUri(tokenId: BigNumberish, overrides: CallOverrides = {}): Promise<string> {
    try {
      if (this.base.tokenStandard === 'ERC721') {
        const iface = this.base.assumeFeature('metadata/INFTMetadata.sol:IAspenNFTMetadataV1');
        const uri = await iface.connectReadOnly().tokenURI(tokenId, overrides);
        return uri;
      } else if (this.base.tokenStandard === 'ERC1155') {
        const iface = this.base.assumeFeature('metadata/ISFTMetadata.sol:IAspenSFTMetadataV1');
        const uri = await iface.connectReadOnly().uri(tokenId, overrides);
        return uri;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }

    this.notSupported();
  }
}
