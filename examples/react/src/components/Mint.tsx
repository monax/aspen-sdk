import { Button, ButtonGroup, Card, CardBody, Heading, useToast } from '@chakra-ui/react';
import {
  Address,
  ClaimConditionsState,
  CollectionContract,
  PendingClaim,
  Provider,
  Signer,
  parse,
} from '@monaxlabs/aspen-sdk';
import React, { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { TermsUserAcceptanceState } from '../App';

const Mint: React.FC<{
  contract: CollectionContract;
  tokenId: string;
  conditions: ClaimConditionsState | null;
  termsInfo: TermsUserAcceptanceState | null;
  onUpdate: () => void;
}> = ({ contract, tokenId, conditions, termsInfo, onUpdate }) => {
  const toast = useToast();

  const { address: accountAddress } = useAccount();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [canMint, setCanMint] = useState(false);
  const [loadingMintButton, setLoadingMintButton] = useState(false);

  const onMint = () => {
    if (!walletClient || loadingMintButton || !accountAddress) return;

    const termsAccepted = !termsInfo?.termsActivated || (termsInfo?.termsActivated && termsInfo?.termsAccepted);

    if (!termsAccepted) {
      toast({
        status: 'error',
        description: 'Please accept terms first',
      });
      return;
    }

    if (!conditions) {
      toast({
        status: 'error',
        description: 'No active claim condition',
      });
      return;
    }

    setLoadingMintButton(true);

    const pendingClaim = new PendingClaim(contract, tokenId, conditions);
    const recipient = parse(Address, accountAddress);
    const qty = 1; // quantity

    pendingClaim.processCallback(walletClient as Signer, publicClient as Provider, recipient, qty, (state) => {
      switch (state.status) {
        case 'verifying-claim':
          toast({
            status: 'info',
            description: 'Verifying the claim',
          });
          return;
        case 'verification-failed':
          toast({
            status: 'error',
            description: 'Claim did not verify!',
          });
          setLoadingMintButton(false);
          return;
        case 'signing-transaction':
          toast({
            status: 'info',
            description: 'Waiting for transaction signature',
          });
          return;
        case 'cancelled-transaction':
          toast({
            status: 'error',
            description: 'Claim did not verify!',
          });
          setLoadingMintButton(false);
          return;
        case 'pending-transaction':
          toast({
            status: 'info',
            description: 'Transaction created! Waiting for confirmation.',
          });
          return;
        case 'transaction-failed':
          setLoadingMintButton(false);
          toast({
            status: 'error',
            description: 'Claim transaction failed!',
          });
          return;
        case 'success':
          toast({
            status: 'success',
            description: 'Successfully claimed a token!',
          });
          onUpdate();
          setLoadingMintButton(false);
          return;
        default:
          throw new Error('Unhandled claim state!');
      }
    });
  };

  useEffect(() => {
    setCanMint(conditions?.claimState === 'ok');

    console.log({
      conditions,
    });
  }, [conditions]);

  // const query = new URLSearchParams({
  //   walletAddress: `${accountAddress}`,
  //   collectionGuid: process.env.NEXT_PUBLIC_TEST_CONTRACT_GUID!,
  //   tokenId,
  // });

  return (
    canMint && (
      <Card w="full">
        <CardBody>
          <Heading size="sm" pb={3}>
            Minting
          </Heading>
          <ButtonGroup>
            <Button isLoading={loadingMintButton} onClick={onMint}>
              Mint Now
            </Button>
            {/* <form id="mintToken" action={`/api/mint-with-fiat?${query.toString()}`} method="POST">
        <Button type="submit">Mint with fiat</Button>
      </form> */}
          </ButtonGroup>
        </CardBody>
      </Card>
    )
  );
};

export default Mint;
