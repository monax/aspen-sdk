# Aspen Software Development Kit

[//]: # 'TODO: update...'

## Setup

### Credentials

[//]: # 'TODO: change how this works so files are located in examples project'

The SDK expects some secret credential files to be present in order to function (and to build) they are:

- [src/apis/credentials.json](sdk/src/apis/credentials.template.json)
- [src/contracts/providers.json](sdk/src/contracts/providers.template.json)

The links above take you to a template for these files each of which you should copy to the same directory remoing `.template` from the filename.

These files are ignored by git. `providers.json` contains secret keys for each network you wish to use and `credentials.json` contains Aspen API credentials.

#### Identity/Gating

Note that currently the Identity/Gating API accepts the exact same bearer token as the Publishing API. You can just copy the username and password you are given for each Publishing environment you are using into both the `publishing` and `gating` block of `credentials.json`

### Build

From the root of the repository run:

```shell
pnpm install
# Generates necessary code then builds
pnpm build
```

To install dependencies and build all sub-packages.

## Flows

The main entry point for this repo is a demo-come-integration test [pkg/ddc/src/flows.ts](src/ddc/src/flows.ts). It implements deploying a 1155 access NFT contract, A, and a 721 content NFT contract, B, where each token on B is derived from a specific token on A. Some synthetic users claim some A tokens and then are issued some B tokens based on consultation of a subgraph tracking claims. The final flow also demonstrates gating on A tokens.

They can be run with:

```shell
pnpm flows
```

From the root of the repo. The flows to run can be customised by editing:

```typescript
// Change this to perform a different run
const flowToRun: (keyof typeof flows)[] = [1, 2, 3, 4];
```

In the `flows.ts` file.

### State

In order to not repeatedly redeploy collections and to demonstrate the necessary issuance state that needs to be saved to a database there are two files:

- [collection-info.json](examples/flows/collection-info.json) (delete to deploy fresh collections)
- [issuance-info.json](examples/flows/issuance-info.json) (delete to forget any existing issuance)

```shell
pnpm examples:clear-state
```

Removes both of these files, but either can deleted independently.
