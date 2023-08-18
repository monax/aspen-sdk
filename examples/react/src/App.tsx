import {
  Box,
  Center,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {
  Address,
  ClaimConditionsState,
  Collection,
  CollectionContract,
  Provider,
  SdkError,
  TermsDetails,
  Token,
  TokenMetadata,
  ZERO_ADDRESS,
  parse,
} from '@monaxlabs/aspen-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import AcceptTerms from './components/AcceptTerms';
import LoadClaimConditions from './components/LoadClaimConditions';
import Mint from './components/Mint';
import { Profile } from './components/Profile';
import { useAsyncEffect } from './hooks/useAsyncEffect';

// const DEFAULT_CONTRACT = process.env.NEXT_PUBLIC_TEST_CONTRACT || '0x8AC3e9b7D377526Da1f81f60d03e006ADd5A606b';

const DELAY = 10000;
const DEFAULT_CONTRACT = '0x3006d58cB3f1b94074D3898dF6367BD8cCf5f908';

type Metadata = {
  uri: string | null;
  metadata: TokenMetadata | null;
};

export type TermsUserAcceptanceState = TermsDetails & {
  termsAccepted: boolean;
};

function App() {
  const toast = useToast();
  const publicClient = usePublicClient();

  const { address: accountAddress, isConnected } = useAccount();

  const [contractAddress, setContractAddress] = useState(DEFAULT_CONTRACT);
  const [contract, setContract] = useState<CollectionContract | null>(null);
  const [tokens, setTokens] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | undefined>();
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [conditions, setConditions] = useState<ClaimConditionsState | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<Metadata | null>(null);
  const [termsInfo, setTermsInfo] = useState<TermsUserAcceptanceState | null>(null);

  const loadClaimConditions = useCallback(async () => {
    if (!contract) return;

    try {
      const address = parse(Address, accountAddress ?? ZERO_ADDRESS);
      const token = new Token(contract, selectedToken);
      const conditions = await token.getFullUserClaimConditions(address, async () => ({
        enabled: false,
        status: 'no-allowlist',
        proofs: [],
        proofMaxQuantityPerTransaction: 0,
      }));
      setConditions(conditions.result);

      if (contract.tokenStandard === 'ERC1155' && selectedToken) {
        console.log(`Checking balance for token id: ${selectedToken}`);
        const balance = await contract.balanceOf(address, BigInt(selectedToken));
        setTokenBalance(balance.toString());
      }
    } catch (err) {
      if (SdkError.is(err)) {
        console.log(err.message, err.data, err.error);
      } else {
        console.error(err);
      }

      toast({
        description: (err as Error).message,
        status: 'error',
      });
    }
  }, [toast, accountAddress, contract, selectedToken]);

  const loadTermsAccepted = useCallback(async () => {
    if (!contract || !accountAddress) return;
    const [termDetails, termsAccepted] = await Promise.all([
      contract.getTermsDetails(),
      contract.hasAcceptedTerms(parse(Address, accountAddress)),
    ]);
    setTermsInfo({ ...termDetails, termsAccepted });
  }, [contract, accountAddress]);

  useEffect(() => {
    loadClaimConditions();
    loadTermsAccepted();
    const interval = setInterval(() => {
      loadClaimConditions();
      loadTermsAccepted();
    }, DELAY);
    return () => clearInterval(interval);
  }, [loadTermsAccepted, loadClaimConditions]);

  useAsyncEffect(async () => {
    if (!isConnected) return;

    try {
      console.log('CollectionContract.from', {
        chain: publicClient.chain,
        contractAddress,
      });

      const contract = await CollectionContract.from(publicClient as Provider, contractAddress);
      setContract(contract);

      const tokensCount = await new Collection(contract).tokensCount();
      setTokens(Array.from(Array(Number(tokensCount)).keys()).map((i) => i + 1));

      console.log('contract loaded');
    } catch (err) {
      if (SdkError.is(err)) {
        console.log(err.message, err.data, err.error);
      } else {
        console.log(err);
      }
    }
  }, [isConnected, contractAddress]);

  useAsyncEffect(async () => {
    if (!contract || selectedToken === null) return;
    const token = new Token(contract, selectedToken);
    const metadata = await token.getMetadata();
    setTokenMetadata(metadata.result);
  }, [contract, selectedToken]);

  return (
    <Container maxW="md" pt={6} pb={10}>
      <VStack w="full" spacing={4}>
        <Profile />
        {isConnected && (
          <>
            <FormControl>
              <FormLabel>Contract Address</FormLabel>
              <Input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Select Token</FormLabel>
              <Select value={selectedToken || 'none'} onChange={(e) => setSelectedToken(e.target.value)}>
                <option value="none">none</option>
                {tokens.map((t) => {
                  return (
                    <option key={String(t)} value={String(t)}>
                      {String(t)}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <HStack w="full">
              <Box>Token Balance:</Box>
              <Box>{tokenBalance}</Box>
            </HStack>
            {tokenMetadata?.metadata?.image && (
              <Center>
                {' '}
                <Image src={tokenMetadata.metadata.image} alt={tokenMetadata.metadata.name} width="400" height="400" />
              </Center>
            )}
            <LoadClaimConditions conditions={conditions} />
            {contract && <AcceptTerms contract={contract} termsInfo={termsInfo} />}
            {contract && (
              <Mint
                conditions={conditions}
                contract={contract}
                tokenId={selectedToken || 'none'}
                termsInfo={termsInfo}
                onUpdate={loadClaimConditions}
              />
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}

export default App;
