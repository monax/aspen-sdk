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

`index.tsx` component shows how to set up connection with a contract. To be able to use its features you need to pass as an arguments `provider` and `contract address` to the `CollectionContract`
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

In `Mint.tsx` two ways of minting were implemeted:

- Mint via crypto payment
- Mint via Fiat

Pay attention that user can mint only if claim status is "ok" :

```js
    const activeConditions = await contract.issuance.getActiveClaimConditions(
      selectedToken
    );
    const userConditions = await contract.issuance.getUserClaimConditions(
        account as Address,
        selectedToken
      );
    const restrictions = await contract.issuance.getUserClaimRestrictions(
        userConditions,
        activeConditions,
        [],
        0
      );
    const canMint = restrictions?.claimState === "ok";
```

and if terms were accepted if required:

```js
const termsAccepted = useMemo(
  () =>
    !termsInfo?.termsActivated ||
    (termsInfo?.termsActivated && termsInfo?.termsAccepted),
  [termsInfo]
);
```

If these two conditions are not fulfilled, the buttons are invisible.

Mint via crypto payment :

When the `Mint` button is pressed, function `onMint` is called.

```js
     const tx = await contract.issuance.claim(
          library.getSigner(), // The signer for the user entitled to claim
          parse(Address, account), // Claiming account
          tokenId, // TokenId if ERC1155, null if ERC721
          BigNumber.from(1), // Quantity to claim (multiple tokens can be claimed in a single call for both ERC721 and ERC1155)
          activeClaimConditions.activeClaimCondition.currency, // Currency
          activeClaimConditions.activeClaimCondition.pricePerToken, // Price per token
          [],
          BigNumber.from(0)
        );
```

When the transaction succeeds, function `onUpdate` is called:
```js
    if (tx) {
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        onUpdate(); // Update Wallet Claim Count and Wallet Claimed Count In Phase
      }
    }
```

