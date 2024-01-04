import { ethers } from 'ethers';

export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
// FIXME[Silas]: decide what to do with this (config/state/drop)
export const IPFS_GATEWAY_PREFIX = 'https://ipfs.aspenft.io/ipfs/';

export const OperatorFilterers = {
  noOperator: ethers.utils.solidityKeccak256(['string'], ['NO_OPERATOR']),
  openSea: ethers.utils.solidityKeccak256(['string'], ['OPEN_SEA']),
  blur: ethers.utils.solidityKeccak256(['string'], ['BLUR']),
};
