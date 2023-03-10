import { authenticateAllFromFile } from '@monaxlabs/aspen-sdk/dist/api-utils';
import { AspenEnvironment, SupportedNetwork } from '@monaxlabs/aspen-sdk/dist/apis';
import { Currency } from '@monaxlabs/aspen-sdk/dist/apis/publishing';
import { addHours, addMinutes } from 'date-fns';
import { credentialsFile } from './secrets';
import { deployERC721 } from './utils/collection';

const network: SupportedNetwork = 'Mumbai';
const environment: AspenEnvironment = 'production';

async function main(): Promise<void> {
  // Read in provider which is then cached as a singleton
  await authenticateAllFromFile(environment, credentialsFile);
  // Add your address to allowlist here
  const allowlist = {
    '0x9C23C5DF854318037D10eD0B4e5A214b162D3F26': 100,
    '0x92380354B9F2334A9c78C0686645db04D52972bc': 101,
    '0xDF7159A4576dEc89b681E4F3404F9FE3133f05F4': 1000,
    '0xcDddF2E7B8AC90Bc03c56BfB4e859a23820040c1': 1001,
    '0xF98CAabDC2aAD7A01b53459730FF969134aCF490': 1002,
  };
  const now = new Date();
  const collection = await deployERC721(
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
        allowlist,
      },
      {
        name: 'Medium Mint',
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.00002,
        startTimestamp: addMinutes(now, 10).toISOString(),
        maxClaimableSupply: 0,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 1,
        allowlist,
      },
      {
        name: 'Expensive Mint',
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.00003,
        startTimestamp: addHours(now, 1).toISOString(),
        maxClaimableSupply: 0,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 1,
        allowlist,
      },
    ],
    {
      name: 'React Test',
      maxTokens: 200,
    },
  );
  console.log(`NEXT_PUBLIC_TEST_CONTRACT=${collection.address}`);
  console.log(`NEXT_PUBLIC_TEST_CONTRACT_GUID=${collection.guid}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
