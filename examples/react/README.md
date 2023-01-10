# Aspen SDK's examples

The examples are created in `Next.js`. In `index.tsx` we can find snippets of the code on how to call the contracts, the function associated and the parameters that they need.

## Getting Started

### Step 1: Install dependencies

```
   $ pnpm install
```

### Step 2: Make it run

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

To be able to run the examples first you need to connect to the Wallet:

`ConnectWallet` component provides a button whenever the wallet is not connected, otherwise network informations should be displayed.
You need to connect with Mumbai network where examples contract are deployed.

`index.tsx` component shows how to set up connection with a contract. To be able to use its features you need to pass as an arguments `provider` and  `contract address` to the `CollectionContract`
then `contract` needs to be loaded : 

```js
      const collectionContract = new CollectionContract(
        library,
        parse(Address, contractAddress)
      );
      await collectionContract.load();
```
When contract is loaded you can access features provided :
- Metadata
- Issuance
- Agreements
- Royalties
- Ownable



