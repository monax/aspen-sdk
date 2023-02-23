# Aspen Javascript SDK

This is the Aspen Javascript SDK the Aspen publishing and trading platform (https://aspenft.io/).

Use this library to publish NFT collections and mint directly from your projects site or airdrop from backend services. Crypto and Fiat supported.

The SDK allows you to interact with our APIs and our Aspen-published smart contracts. Allowing you to integrate server-side definition and publishing of NFT contracts and configure NFT drops as well as client-side integration with the Aspen smart contracts to mint/claim NFTs for ERC721 and ERC1155 contracts. Features include:

- Metadata distribution backed by a centralised IPFS gateway backing on to decentralised IPFS
- Token metadata definition
- Time-based claim phases and conditions including:
  - Phase start date
  - Merkle-tree based allow lists (managed server-side)
  - Token pricing (in native token, e.g. Ethereum)
- Server-side issuance including with dynamic content
- Contract features include:
  - Legal terms definition and acceptance (blocking transfer when terms are not accepted by transferee)
  - Client-side claiming with merkle proof of allowlist inclusion
  - Native token and ERC20 token payment (as defined by claim phase)
  - First-come-first-served sequential `tokenId` allocation for ERC721
  - Claim phase limits and global or per token (ERC1155) supply limits
  - Wallet cooldown period and maximum claim count

The SDK is packaged ECMAScript modules consumable by browsers and recent versions of NodeJS (versions >= 16).

## Supported networks

Aspen and the Aspen SDK currently support the Ethereum based networks:

- Ethereum (mainnet)
- Polygon (matic)

And their respective test networks

- Goerli
- Mumbai

## Installation

From your Javascript project root:

```shell
  # pnpm
  pnpm add @monaxlabs/aspen-sdk
  # yarn
  yarn add @monaxlabs/aspen-sdk
  # npm
  npm install @monaxlabs/aspen-sdk
```

## Core packages

The Aspen SDK is split into a client-side smart contract library and API clients requiring secrets that should only be run from secure backend services.

- **Client-side contracts library:** `@monaxlabs/aspen-sdk/dist/contracts`
- **Server-side API library:** `@monaxlabs/aspen-sdk/dist/apis`

We also package a [TheGraph subgraph](https://thegraph.com/) at `@monaxlabs/aspen-sdk/dist/claimgraph` to provide tracking of claims during a live drop.

### Authentication for APIs

Our publishing and gating APIs can be authenticated using a basic auth username and password.

To do so you must obtain credentials (please [use this request form](https://docs.google.com/forms/d/e/1FAIpQLSd2-JXbcFoS0YNXnFL_WeJmn7tK9zxnc3zoc1KVD1Abi6yXRA/viewform?usp=sharing)) and include them in an JSON object with this schema:

```json
{
  "production": {
    "publishing": {
      "baseUrl": "https://publishing.aspenft.io",
      "name": "username",
      "password": "password"
    },
    "gating": {
      "baseUrl": "https://identity.aspenft.io",
      "name": "username",
      "password": "password"
    }
  }
}
```

Then you can authenticate (once, globally): with:

```typescript
import { authenticateAll, authenticateAllFromFile } from '@monaxlabs/aspen-sdk/dist/apis';

const creds = {
  production: {
    publishing: {
      baseUrl: 'https://publishing.aspenft.io',
      name: 'username',
      password: 'password',
    },
    gating: {
      baseUrl: 'https://identity.aspenft.io',
      name: 'username',
      password: 'password',
    },
  },
};

const environment = 'production';

async function authenticate(): Promise<void> {
  await authenticateAll(environment, creds);
  // Or via environment variables with fallback to file storage:
  await authenticateAllFromFile(environment, 'credentials.json', 'CREDENTIALS_ENV_VAR_NAME');
}
```

### Interacting with smart contracts

Interacting with the Aspen suite of smart contracts is handled via the [`CollectionContract`](./src/contracts/collections/collections.ts) class. In order to use it pass an ethers.js compatible `Provider`.

The `CollectionContract` is able to dynamically introspect contracts on live networks and determine their feature suite. It abstracts over both ERC721 and ERC1155 contracts.

You can obtain one via a variety of browser wallet plugins, most commonly [MetaMask](https://docs.metamask.io/guide/ethereum-provider.html) or using some test helpers and a local private key.

For testing and integration purposes you can provide Ethereum web3 JSON-RPC URLs, and local private keys to our `getProvider` function. The provider config is defined by:

```json
{
  "providerUrls": {
    "Mumbai": "",
    "Mainnet": "",
    "Goerli": "",
    "Polygon": ""
  },
  "privateKeys": {
    "Mumbai": "",
    "Mainnet": "",
    "Goerli": "",
    "Polygon": ""
  }
}
```

#### Instantiating a `CollectionContract`

You can establish a connection with a contract by passing a provider and the contract address to the `CollectionContract` constructor. When `contract.load()` as called the contract is queried using some introspection interfaces to discover which Aspen features are supported. Features are individual units of functionality that are semantically versioned.

```typescript
import { CollectionContract } from '@monaxlabs/aspen-sdk/dist/apis';

async function getCollectionContract(): Promise<CollectionContract> {
  // Use a local testing account to obtain an ethers.js Provider
  const network = 'Mumbai';
  const providerConfig = await getProviderConfig('providers.json');
  const provider = await getProvider(network, providerConfig);
  // Generate local signers
  const userSigners = generateAccounts(numAccounts, { mnemonic: demoMnemonic, provider });
  // Obtain a CollectionContract - introspects contract and loads available smart contract features
  const contract = await CollectionContract.from(provider, collectionAddress);
}
```

As well as discovering the specific features implemented the token standard implemented by the contract is also established which is one of:

- [ERC721](https://eips.ethereum.org/EIPS/eip-721)
- [ERC1155](https://eips.ethereum.org/EIPS/eip-1155)

#### Interacting with features

There are five Aspen NFT contract feature families supported by the Aspen SDK:

- **Metadata**: for dealing with contract-level and token-level metadata and assets.
- **Issuance**: for issuing/minting tokens according to phase conditions or the issuing privileges of an account.
- **Agreements**: for viewing and accepting legal terms associated with the ownership of an NFT.
- **Royalties**: for calculating and paying royalties on NFT sales and transfers.
- **Ownable:**: for associating a collection owner/creator for the purposes of marketplace listings.

Each of these features comprises a set of utility methods that interact with contracts. Where possible we maintain backward-compatibility of certain feature functions across previous versions of our smart contracts. As we develop and improve our contracts newer collections may have additional functionality.

You can interact with features by accessing the corresponding feature property on the `CollectionContract`. Some examples:

```typescript
import { NATIVE_TOKEN } from '@monaxlabs/aspen-sdk/dist/contract';

async function main(): Promise<void> {
  // Assume that a CollectionContract has be instantiated and loaded
  const contract = await CollectionContract.from(provider, collectionAddress);
  // Access the conditions feature and determine if it is supported
  const isSupported: boolean = contract.conditions.supported;
  // If the collection is an ERC721 then tokenId should be null (the tokenId will be dynamically allocated on calim),
  // otherwise for ERC1155 it must be specified
  const tokenId = 0;
  if (isSupported) {
    // Get the current claim conditions (needed in order to claim).
    const conditions = await contract.conditions.getState(receiver, tokenId);
    if (conditions.claimState !== 'ok') {
      throw new Error(`Not okay to mint based on user restrictions and claim phase`);
    }

    // Use the metadata feature to access the tokenURI
    const tokenUri = await contract.metadata.getTokenUri(tokenId);
    // Accept agreement terms (if/when enabled on the contract) by passing a signer for the acceptee
    await contract.agreements.acceptTerms(signer);

    // Claim (mint) a token be calling the NFT contract (
    contract.claims.claim(
      // An ether.js signer
      signer,
      {
        // The receipient of the token
        receiver,
        // The tokenId if the contract is an ERC1155 null/ignored otherwise
        tokenId,
        // The quantity of tokens to claim if ERC721 then a run of tokenIds will be issued, if ERC1155 then the recipients
        // balance will increase by quantity
        quantity,
        // The remaining fields must match those specified by the conditions in the active claim phase
        // An ERC20 token contract address if payment is in ERC20 or the constant NATIVE_TOKEN
        // (0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) to indicate payment in native eth/matic
        currency: conditions.currency,
        // The price of the token
        pricePerToken: conditions.pricePerToken,
        // allowlist proofs
        proofs: conditions.allowlist.proofs,
        proofMaxQuantityPerTransaction: conditions.allowlist.proofMaxQuantityPerTransaction,
      },
    );
  }
}
```

#### Core `CollectionContract` functions

#### Metadata

- **[CollectionContract.metadata.getTokenMetadata](./src/contracts/collections/features/metadata.ts)**: gets images, attributes and other metadata associated with a token

#### Issuance

- **[CollectionContract.issuance.getActiveClaimConditions](./src/contracts/collections/features/issuance.ts)**: gets the claim conditions (price, limits, etc) for the currently active phase. There is only ever a single phase active a moment in time.
- **[CollectionContract.issuance.getUserClaimConditions](./src/contracts/collections/features/issuance.ts)**: returns a user-specific augmented view of the claim phase.
- **[CollectionContract.issuance.getUserClaimRestrictions](./src/contracts/collections/features/issuance.ts)**: combines the `activeClaimConditions` and `userClaimConditions` and computes whether the current user-account is able to claim.
- **[CollectionContract.issuance.claim](./src/contracts/collections/features/issuance.ts)**: calls the claim function minting and NFT and delivering it to the desired recipient on-chain.

#### Phases

Our NFT contracts support a linear (one-at-a-time) sequence of claim phases. Each phase can have its own set of rules for how the contract will mint tokens. Each phase has a defined start time and will last until the next consecutive phase begins if a next phase is defined. The phase is defined by a `ClaimCondition` which contains (amongst other things):

- The phase start time
- The token price and currency, if any
- The allowlist, if any
- The maximum claimable supply for that phase

You can see an example phases definition [here](https://github.com/monax/aspen-sdk/blob/main/examples/flows/react-test-contract.ts).

In order to know whether it is possible for a particular (Ethereum) account to claim you must know the active claim condition. In particular, you must know:

- The price of the token (to send as native token or approve in for transfer by the NFT contract in the case of ERC20)
- The currency (etiher `NATIVE_TOKEN` or an ERC20 contract address)
- Whether there is any claimable supply left (strictly you do not need to know this, since if the supply is exhausted the transaction will revert, but this results in wasting the cost of the gas for the transaction)
- Whether the phase has an allowlist (in which case you must provide a proof of the claimant account's inclusion on that list)

## Integration guide

Here we describe integrating the headline features of the SDK. Namely defining and publishing an NFT drop collection and allowing users to mint from a client-side browser application.

You can see working code examples for the flows listed below in the [SDK monorepo examples directory](https://github.com/monax/aspen-sdk/tree/main/examples).

### Define and publish a collection

Collections can be defined and deployed by our publishing API. The steps are as follows:

- Define the type of collection
- Define claim phases and conditions
- Define tokens and metadata
- Deploy the collection

Each of these steps is achieved by calling various endpoints on our publishing API. The OpenAPI specs for these APIs are available [on NPM at @monaxlabs/spec](https://www.npmjs.com/package/@monaxlabs/spec). Our Typescript APIs are generated from these specs with some additional helpers

Once authenticated [as above](#authentication-for-apis) you can access each of the publishing APIs service objects and call the endpoints statically. The process is:

```typescript
import {
  Chain,
  CollectionActionsService,
  CollectionInfoService,
  CollectionResponse,
  CollectionService,
  CollectionTokenPhasesService,
} from '@monaxlabs/aspen-sdk/dist/apis/publishing';
import { waitForCompletion } from './waiter';

// For brevity most arguments for each method are elided in the code below, but they are all easily discovered
// by looking at the included types for each method
export async function deployCollection(): Promise<CollectionResponse> {
  // We specify the type of NFT contract we want be specifying either 'CedarERC721Drop' or 'CedarERC1155Drop' for
  // contracName
  const contractName: 'CedarERC721Drop' | 'CedarERC1155Drop' = 'CedarERC721Drop';
  // Begin defining the collection, choosing the type of contract desired and other basic metadata and limits
  const collection = await CollectionService.postCollection({
    requestBody: {
      //
      contractName,
    },
  });
  // Additional calls are made using the collections pre-deployment GUID identifier
  const collectionGuid = collection.guid;
  // This call defines a single token, call once for each token (or token class in the case of ERC1155) you wish to define
  await TokenService.postToken({});
  // Optionally configure royalties
  CollectionService.postCollectionRoyaltyrecipients({});
  // Optionally define and enable legal terms
  const { web2Url } = await CollectionService.postCollectionTerms({ guid: collectionGuid });
  await CollectionService.postCollectionTermsEnable({ guid: collectionGuid, status: true });
  // Provide collection metadata that will be displayed on marketplaces
  await CollectionInfoService.postCollectionInfo({});
  // Now the collection is fully staged we can deploy it to chain
  // Deploy the collection
  await CollectionActionsService.postCollectionDeploy({ guid: collectionGuid });
  // This is an async process and we can poll it for the transaction to be confirmed on chain using this helper
  await waitForCompletion(CollectionActionsService.getCollectionDeploy, { guid: collectionGuid });
  // The collection is now deployed, but no tokens will yet be defined. To do this we call the mint that will upload
  // metadata to our CDN and IPFS and then define each tokenId
  await CollectionActionsService.postCollectionMint({ guid: collectionGuid });
  // Once again we wait for the transactions to be confirmed
  await waitForCompletion(CollectionActionsService.getCollectionMint, { guid: collectionGuid });
  // Finally we return the collection data stored by the publishing API
  return CollectionService.getCollectionById({ guid: collectionGuid });
}
```

### Mint via crypto payment

The aim of this integration is to place a 'mint' button on our drop page. The necessary steps for claiming a token using the SDK is given below, but a fully worked up example in React can be found in our SDK examples directory [here](https://github.com/monax/aspen-sdk/tree/main/examples/react). Our SDK is agnostic of any Javascript framework you choose to use and should work in the same way within a browser or NodeJS environment.

```typescript
import { CollectionContract, parse, Address, NATIVE_TOKEN } from '@monaxlabs/aspen-sdk/dist/contracts/address';
import { BigNumberish } from 'ethers';

async function main(contract: CollectionContract): Promise<void> {
  const claimingAccount: Address = parse(Address, '0x92380354b9f2334a9c78c0686645db04d52972bc');
  // Depending on whether ERC721 or ERC1155
  const tokenId: null | BigNumberish = 2;
  // Get the active claim phase from the contract
  const conditions = await contract.conditions.getState(claimingAccount, tokenId);
  if (conditions.claimState !== 'ok') {
    throw new Error(`Not okay to mint based on user restrictions and claim phase`);
  }
  // Finally claim
  await contract.claims.claim(
    // The signer for the user entitled to claim
    signer,
    {
      conditionId: conditions.activeClaimConditionId
      // Usually this is the address of the signer above unless the claimant would like the NFT to be deposited elsewhere
      receiver: claimingAccount,
      // tokenId if ERC1155, null if ERC721
      tokenId,
      // Quantity to claim (multiple tokens can be claimed in a single call for both ERC721 and ERC1155)
      quantity: BigNumber.from(1),
      // price details
      currency: conditions.currency,
      pricePerToken: conditions.pricePerToken,
      // allowlist proofs
      proofs: conditions.allowlist.proofs,
      proofMaxQuantityPerTransaction: conditions.allowlist.proofMaxQuantityPerTransaction,
    }
  );
}
```

### Issue a token (server-side)

Tokens can be issued using the publishing API directly. This skips claim conditions and allows issuing a token based on a fiat payment provider or for dynamics use cases.

```typescript
import { authenticate, issueToken, PublishingAPI } from '@monaxlabs/aspen-sdk/dist/apis';

async function main(): Promise<void> {
  await authenticate(PublishingAPI.OpenAPI, {
    baseUrl: PUBLISHING_API_BASEURI,
    name: PUBLISHING_API_USERNAME,
    password: PUBLISHING_API_PASSWORD,
  });
  await issueToken(collectionGuid, {
    to: wallet,
    tokenId: Number.parseInt(tokenId),
  });
}
```

See a complete webhook example [here](https://github.com/monax/aspen-sdk/blob/main/examples/react/src/pages/api/webhooks.ts)

## Examples

Please see [https://github.com/monax/aspen-sdk](https://github.com/monax/aspen-sdk) for working code [examples](https://github.com/monax/aspen-sdk/tree/main/examples) and their documentation.
