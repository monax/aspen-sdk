import { AspenEnvironment, authenticateAllFromFile, SupportedNetwork } from '@monaxlabs/aspen-sdk/dist/apis';
import { Currency } from '@monaxlabs/aspen-sdk/dist/apis/publishing';
import { addHours, addMinutes } from 'date-fns';
import { deployERC1155 } from './utils/collection';

const network: SupportedNetwork = 'Mumbai';
const environment: AspenEnvironment = 'production';
const providersFile = new URL('secrets/providers.json', import.meta.url).pathname;
const credentialsFile = new URL('secrets/credentials.json', import.meta.url).pathname;

async function main(): Promise<void> {
  // Read in provider which is then cached as a singleton
  await authenticateAllFromFile(environment, credentialsFile);
  const now = new Date();
  const collection = await deployERC1155(
    network,
    [
      {
        name: 'Cheap Mint',
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.00001,
        startTimestamp: now.toISOString(),
        maxClaimableSupply: 0,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 1,
      },
      {
        name: 'Medium Mint',
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.00002,
        startTimestamp: addMinutes(now, 10).toISOString(),
        maxClaimableSupply: 0,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 1,
      },
      {
        name: 'Expensive Mint',
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.00003,
        startTimestamp: addHours(now, 1).toISOString(),
        maxClaimableSupply: 0,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 1,
      },
    ],
    {
      name: 'React Test',
      maxTokens: 2000,
    },
  );
  console.log(`NEXT_PUBLIC_TEST_CONTRACT=${collection.address}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
