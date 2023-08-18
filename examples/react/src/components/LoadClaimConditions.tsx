import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { ClaimConditionsState } from '@monaxlabs/aspen-sdk';
import React from 'react';
import { formatEther } from 'viem';

export const MaxUint256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

const LoadClaimConditions: React.FC<{
  conditions: ClaimConditionsState | null;
}> = ({ conditions }) => {
  if (!conditions) return null;

  return (
    <>
      <Card w="full">
        <CardBody>
          <Heading size="sm" pb={3}>
            Active Claim Conditions
          </Heading>
          <Text>
            Max Claimable Supply :{' '}
            {conditions.maxClaimableSupply === MaxUint256 ? '∞' : String(conditions.maxClaimableSupply)}
          </Text>
          {conditions.pricePerToken ? `Price Per Token: ${formatEther(conditions.pricePerToken)}` : <></>}
        </CardBody>
      </Card>

      <Card w="full">
        <CardBody>
          <Heading size="sm" pb={3}>
            User Claim Conditions
          </Heading>
          <Text>Wallet Claim Count : {conditions.walletClaimCount.toString()}</Text>
          {conditions.walletClaimedCountInPhase ? (
            <Text>Wallet Claimed Count In Phase : {conditions.walletClaimedCountInPhase.toString()}</Text>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>

      <Card w="full">
        <CardBody>
          <Heading size="sm" pb={3}>
            User Claim Restrictions
          </Heading>
          <Text>Available Quantity : {conditions.availableQuantity.toString()}</Text>
          <Text>Can Claim Tokens : {conditions.canClaimTokens ? 'YES' : `NO (${conditions.claimState})`}</Text>
          <Text>Can Mint After : {conditions.canMintAfter.toDateString()}</Text>
          <Text>Wallet Allow List Status : {conditions.allowlist.status}</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default LoadClaimConditions;
