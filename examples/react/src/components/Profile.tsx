import { Box, Button, Card, CardBody, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAccount, useChainId, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export const Profile: React.FC = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  if (isConnected) {
    return (
      <Card>
        <CardBody>
          <Heading size="sm" pb={3}>
            Connected
          </Heading>
          {ensAvatar && <Image src={ensAvatar ?? undefined} alt="ENS Avatar" />}
          <Box>{ensName ? `${ensName} (${address})` : address}</Box>
          <Box>Connected to {connector?.name}</Box>
          <Box>ChainId {chainId}</Box>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <Heading size="sm" pb={3}>
          Connect to
        </Heading>
        <VStack w="full">
          {connectors.map((connector) => (
            <Button isDisabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
              {`Connect ${connector.name}`}
              {!connector.ready && ' (unsupported)'}
              {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
            </Button>
          ))}
          {error && <Box color="red.500">{error.message}</Box>}
        </VStack>
      </CardBody>
    </Card>
  );
};
