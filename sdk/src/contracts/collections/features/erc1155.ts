import { BigNumber, BigNumberish } from 'ethers';
import { Addressish, asAddress } from '../../address';
import { CollectionContract } from '../collections';
import { FeatureSet } from '../features';

export const Erc1155Features = [
  'standard/IERC1155.sol:IERC1155SupplyV0',
  'standard/IERC1155.sol:IERC1155SupplyV1',
  'standard/IERC1155.sol:IERC1155SupplyV2',
  'standard/IERC1155.sol:IERC1155V0',
  'standard/IERC1155.sol:IERC1155V1',
  'issuance/ISFTSupply.sol:ISFTSupplyV0',
  'issuance/ISFTSupply.sol:ISFTSupplyV1',
] as const;

export type Erc1155Feature = (typeof Erc1155Features)[number];

export class Erc1155 extends FeatureSet<Erc1155Feature> {
  constructor(base: CollectionContract) {
    super(base, Erc1155Features);
  }

  getPartition = this.makeGetPartition((partitioner) => {
    // Split the handled features into groups that can be handled on the same path for each function
    // It is a compile-time error to omit a feature from handledFeatures in each partition
    const erc1155 = partitioner({
      standard: [
        'standard/IERC1155.sol:IERC1155SupplyV0',
        'standard/IERC1155.sol:IERC1155SupplyV1',
        'standard/IERC1155.sol:IERC1155SupplyV2',
        'standard/IERC1155.sol:IERC1155V0',
        'standard/IERC1155.sol:IERC1155V1',
      ],
      supply: ['issuance/ISFTSupply.sol:ISFTSupplyV0', 'issuance/ISFTSupply.sol:ISFTSupplyV1'],
    });
    return { erc1155 };
  });

  async balanceOf(address: Addressish, tokenId: BigNumberish): Promise<BigNumber> {
    const { standard, supply } = this.getPartition('erc1155')(this.base.interfaces);
    // Use supply as a marker interface then assume standard 1155
    const factory = standard ? standard : supply ? this.base.assumeFeature('standard/IERC1155.sol:IERC1155V0') : null;
    if (factory) {
      return factory.connectReadOnly().balanceOf(await asAddress(address), tokenId);
    }
    throw new Error(`Contract does not appear to be an ERC1155`);
  }
}
