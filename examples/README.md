# Aspen SDK examples

In this directory you can find some self-contained packages that make use of the Aspen Javascript SDK ([@monaxlabs/aspen-sdk](https://www.npmjs.com/package/@monaxlabs/aspen-sdk)):

- **[React](./react):** A React app implementing NFT minting via crypto and fiat payments
- **[Flows](./flows):** A set of non-interactive simulated flows exercising both the client-side and server-side SDK
-

## Credentials

The SDK examples expect some secret credential files to be present in order to function they are:

- [./secrets/credentials.json](./secrets/credentials.template.json) - containing our API credentials
- [./secrets/providers.json](./secrets/providers.template.json) - containing web3 provider URLs and secret keys

The links above take you to a template for these files each of which you should copy to the same directory removing `.template` from the filename.

These files are ignored by git. `providers.json` contains secret keys for each network you wish to use and `credentials.json` contains Aspen API credentials.

API credentials can be requested [using this form](https://docs.google.com/forms/d/e/1FAIpQLSd2-JXbcFoS0YNXnFL_WeJmn7tK9zxnc3zoc1KVD1Abi6yXRA/viewform?usp=sharing).
