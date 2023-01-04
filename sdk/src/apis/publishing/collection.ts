import {
  Chain,
  CollectionActionsService,
  CollectionInfoService,
  CollectionResponse,
  CollectionService,
  CollectionTokenPhasesService,
  CollectionVisibility,
  CreateCollectionRequest,
  CreateTokenRequest,
  Currency,
  FileSource,
  OperationType,
  TokenService,
  UpdatableCollectionFieldsJsonPatchDocument,
} from './index';
import { coerceToBlob } from '../files';
import { waitForCompletion } from '../../waiter';
import { SupportedNetwork } from '../../contracts/providers';

let mutex = false;

export async function deployERC1155(
  network: SupportedNetwork,
  overrides?: Partial<CreateCollectionRequest>,
): Promise<CollectionResponse> {
  const maxTokens = 999999991;
  const collection = await CollectionService.postCollection({
    requestBody: {
      name: 'AccessPass',
      symbol: 'AAA',
      maxTokens: maxTokens,
      chain: networkToChain[network],
      contractName: 'CedarERC1155Drop',
      visibility: CollectionVisibility.REVEALED,
      royaltyPercentage: 2,
      fileSource: FileSource.WEB2,
      ...overrides,
    },
  });

  const collectionGuid = collection.guid;
  if (collectionGuid === undefined) {
    throw new Error(`No collection ID returned`);
  }
  // throw new Error('wait');
  console.error(`Created collection id ${collectionGuid}`);
  const tokenRequests = new Array(4).fill(null).map<CreateTokenRequest>((_, i) => ({
    collectionGuid,
    name: String(i),
    maxSupply: maxTokens,
    description: 'foo',
    externalUrl: `https://foo.bar/${i}`,
  }));

  for (const tokenRequest of tokenRequests) {
    const token = await TokenService.postToken({ requestBody: tokenRequest });
    console.error(`Created token guid: ${token.guid} tokenId: ${token.tokenId}`);
    CollectionTokenPhasesService.postCollectionPhases({
      collectionGuid,
      requestBody: {
        name: 'Public Mint',
        tokenGuid: token.guid,
        currency: Currency.NATIVE_COIN,
        pricePerToken: 0.0001,
        startTimestamp: new Date().toISOString(),
        // FIXME: we ought to be able to omit this value to here to mean 'unbounded' but not yet implemented correctly
        //   on contract or API so we must provide a value
        maxClaimableSupply: maxTokens,
        quantityLimitPerTransaction: 100,
        waitTimeInSecondsBetweenClaims: 0,
      },
    });
  }
  CollectionService.postCollectionRoyaltyrecipients({
    guid: collectionGuid,
    requestBody: [
      { address: '0x92380354B9F2334A9c78C0686645db04D52972bc', share: 50 },
      { address: '0xf8A07e6d45DdDE15252D6e22A0105910e7f1e527', share: 50 },
    ],
  });
  const { web2Url } = await CollectionService.postCollectionTerms({
    guid: collectionGuid,
    formData: { file: coerceToBlob(Buffer.from('Thou shalt mint'), 'terms.txt') },
  });
  console.error(`Collection ${collectionGuid} has terms ${web2Url}`);

  await CollectionService.postCollectionTermsEnable({ guid: collectionGuid, status: true });

  await CollectionInfoService.postCollectionInfo({
    guid: collectionGuid,
    requestBody: {
      collectionLogo: 'https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg',
      banner: 'https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg',
      collectionDescription: 'STUFF',
      externalLink: 'http://example.com',
      collectionCategories: [],
      creatorsInfo: [{ creator_email: 'foo@mailinator.com', creator_name: 'emma' }],
      explicitContent: false,
    },
  });

  // FIXME: currently concurrent deploys will fail with the same client key, use a simple mutex since node is single
  //   threaded
  while (mutex) {
    await wait(1000, 'collection deploy mutex');
  }
  mutex = true;
  await CollectionActionsService.postCollectionDeploy({ guid: collectionGuid });
  await waitForCompletion(CollectionActionsService.getCollectionDeploy, { guid: collectionGuid });
  await CollectionActionsService.postCollectionMint({ guid: collectionGuid });
  await waitForCompletion(CollectionActionsService.getCollectionMint, { guid: collectionGuid });
  mutex = false;
  return CollectionService.getCollectionById({ guid: collectionGuid });
}

const networkToChain: Record<SupportedNetwork, Chain> = {
  Mainnet: Chain.ETHEREUM,
  Goerli: Chain.GOERLI,
  Mumbai: Chain.MUMBAI,
  Polygon: Chain.POLYGON,
};

export async function deployERC721(
  network: SupportedNetwork,
  overrides?: Partial<CreateCollectionRequest>,
): Promise<{ guid: string; address: string }> {
  const createCollectionRequest: CreateCollectionRequest = {
    name: 'MusicNFT',
    symbol: 'BBB',
    maxTokens: 10,
    chain: networkToChain[network],
    contractName: 'CedarERC721Drop',
    visibility: CollectionVisibility.REVEALED,
    royaltyPercentage: 2,
    fileSource: FileSource.WEB2,
    ...overrides,
  };
  const collection = await CollectionService.postCollection({
    requestBody: createCollectionRequest,
  });

  const collectionGuid = collection.guid;
  if (collectionGuid === undefined) {
    throw new Error(`No collection ID returned`);
  }
  console.error(`Created collection id ${collectionGuid}`);
  const tokenRequests = new Array(createCollectionRequest.maxTokens).fill(null).map<CreateTokenRequest>((_, i) => ({
    collectionGuid,
    name: String(i),
    description: 'foo',
    externalUrl: `https://foo.bar/${i}`,
  }));

  for (const tokenRequest of tokenRequests) {
    const token = await TokenService.postToken({ requestBody: tokenRequest });
    console.error(`Created token: ${token.guid} (tokenId: ${token.tokenId})`);
  }
  CollectionService.postCollectionRoyaltyrecipients({
    guid: collectionGuid,
    requestBody: [
      { address: '0x92380354B9F2334A9c78C0686645db04D52972bc', share: 50 },
      { address: '0xf8A07e6d45DdDE15252D6e22A0105910e7f1e527', share: 50 },
    ],
  });
  const { web2Url } = await CollectionService.postCollectionTerms({
    guid: collectionGuid,
    formData: { file: coerceToBlob(Buffer.from('Thou shalt mint'), 'terms.txt') },
  });
  console.error(`Collection ${collectionGuid} has terms ${web2Url}`);

  await CollectionService.postCollectionTermsEnable({ guid: collectionGuid, status: true });
  CollectionTokenPhasesService.postCollectionPhases({
    collectionGuid,
    requestBody: {
      name: 'Public Mint',
      currency: Currency.NATIVE_COIN,
      pricePerToken: 0.00001,
      startTimestamp: new Date().toISOString(),
      maxClaimableSupply: 0,
      quantityLimitPerTransaction: 100,
      waitTimeInSecondsBetweenClaims: 1,
    },
  });

  await CollectionInfoService.postCollectionInfo({
    guid: collectionGuid,
    requestBody: {
      collectionLogo: 'https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg',
      banner: 'https://cdn.britannica.com/84/206384-050-00698723/Javan-gliding-tree-frog.jpg',
      collectionDescription: 'STUFF',
      externalLink: 'http://example.com',
      collectionCategories: [],
      creatorsInfo: [{ creator_email: 'foo@mailinator.com', creator_name: 'emma' }],
      explicitContent: false,
    },
  });

  // FIXME: currently concurrent deploys will fail with the same client key, use a simple mutex since node is single
  //   threaded
  while (mutex) {
    await wait(1000, 'collection deploy mutex');
  }
  mutex = true;
  await CollectionActionsService.postCollectionDeploy({ guid: collectionGuid });
  await waitForCompletion(CollectionActionsService.getCollectionDeploy, { guid: collectionGuid });
  await CollectionActionsService.postCollectionMint({ guid: collectionGuid });
  await waitForCompletion(CollectionActionsService.getCollectionMint, { guid: collectionGuid });
  mutex = false;
  const collectionResponse = await CollectionService.getCollectionById({ guid: collectionGuid });
  // FIXME: these should not be optional on OAS spec
  const { guid, address } = collectionResponse;
  if (!guid) {
    throw new Error(`Collection guid missing from deployment response`);
  }
  if (!address) {
    throw new Error(`Collection address missing from deployment response`);
  }
  return { guid, address };
}

export async function updateRoyaltyRecipient(collectionGuid: string) {
  CollectionService.postCollectionRoyaltyrecipients({
    guid: collectionGuid,
    requestBody: [
      { address: '0x92380354B9F2334A9c78C0686645db04D52972bc', share: 90 },
      { address: '0xf8A07e6d45DdDE15252D6e22A0105910e7f1e527', share: 10 },
    ],
  });

  await CollectionActionsService.postCollectionResync({ guid: collectionGuid });
  await waitForCompletion(CollectionActionsService.getCollectionResync, { guid: collectionGuid });
}

export async function updateCollection(collectionGuid: string) {
  await CollectionService.patchCollection({
    guid: collectionGuid,
    requestBody: [
      { path: 'FileSource', op: OperationType.REPLACE, value: FileSource.WEB2 },
    ] as UpdatableCollectionFieldsJsonPatchDocument,
  });
}

export function wait(ms: number, reason?: string): Promise<void> {
  if (reason) {
    console.error(`Waiting ${ms}ms for ${reason}...`);
  }
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
