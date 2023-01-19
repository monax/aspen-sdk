import { BigNumber, BigNumberish } from 'ethers';
import { Addressish, asAddress } from '../../address';
import { CollectionContract } from '../collections';
import { Features } from '../features';

const handledFeatures = [
  'standard/IERC1155.sol:IERC1155SupplyV0',
  'standard/IERC1155.sol:IERC1155SupplyV1',
  'standard/IERC1155.sol:IERC1155SupplyV2',
  'standard/IERC1155.sol:IERC1155V0',
  'standard/IERC1155.sol:IERC1155V1',
  'issuance/ISFTSupply.sol:ISFTSupplyV0',
  'issuance/ISFTSupply.sol:ISFTSupplyV1',
] as const;

type HandledFeature = (typeof handledFeatures)[number];

export class Erc1155 extends Features<HandledFeature> {
  constructor(base: CollectionContract) {
    super(base, handledFeatures);
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
    const { standard, supply } = this.getPartition('erc1155');
    // Use supply as a marker interface then assume standard 1155
    const factory = standard ? standard : supply ? this.base.assumeFeature('standard/IERC1155.sol:IERC1155V0') : null;
    if (factory) {
      return factory.connectReadOnly().balanceOf(asAddress(address), tokenId);
    }
    throw new Error(`Contract does not appear to be an ERC1155`);
  }
}
