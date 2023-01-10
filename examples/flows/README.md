# Flows
test [flows.ts](./flows.ts). It implements deploying a 721 access NFT contract, A, and a 721 content NFT contract, B, where each token on B is derived from a specific token on A. Some synthetic users claim some A tokens and then are issued some B tokens based on consultation of a subgraph tracking claims. The final flow also demonstrates gating on A tokens.

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

### [Stripe](./examples/stripe)
