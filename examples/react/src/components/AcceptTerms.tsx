import { Box, Button, ButtonGroup, Card, CardBody, Heading, Link, Text, useBoolean } from '@chakra-ui/react';
import { CollectionContract, Signer } from '@monaxlabs/aspen-sdk';
import React from 'react';
import { useWalletClient } from 'wagmi';
import { TermsUserAcceptanceState } from '../App';

const AcceptTerms: React.FC<{
  contract: CollectionContract;
  termsInfo: TermsUserAcceptanceState | null;
}> = ({ contract, termsInfo }) => {
  const { data: walletClient } = useWalletClient();

  const [isLoading, setIsLoading] = useBoolean();

  const handleAcceptTerms = async () => {
    if (!walletClient) return;

    try {
      setIsLoading.on();

      await contract.acceptTerms(walletClient as Signer);
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Box w="full">
      {termsInfo?.termsActivated && (
        <Card w="full">
          <CardBody>
            <Heading size="sm" pb={3}>
              Terms of Service Agreement Required
            </Heading>
            {termsInfo.termsAccepted && <Text pb={2}>Terms have been accepted</Text>}
            <ButtonGroup>
              {!termsInfo.termsAccepted && (
                <Button isLoading={isLoading} onClick={handleAcceptTerms}>
                  Agree to Terms
                </Button>
              )}
              <Link as={Button} href={termsInfo.termsLink} target="_blank" rel="noreferrer">
                View Terms
              </Link>
            </ButtonGroup>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default AcceptTerms;
