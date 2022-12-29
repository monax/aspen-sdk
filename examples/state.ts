import { promises as fs } from 'fs';
import * as t from 'io-ts';
import { AspenEnvironment } from '../src/apis/auth';
import { SupportedNetwork } from '../src/contracts/providers';
import { Json, parse, parseFromString } from '../src/schema';

export const Collection = t.type({ address: t.string, guid: t.string });
export type Collection = t.TypeOf<typeof Collection>;

const CollectionPair = t.type({ a: Collection, b: Collection });
export type CollectionPair = t.TypeOf<typeof CollectionPair>;

const CollectionInfo = t.type({
  network: SupportedNetwork,
  environment: AspenEnvironment,
  collections: t.array(CollectionPair),
});

export type CollectionInfo = t.TypeOf<typeof CollectionInfo>;

export const IssuanceInfo = t.record(t.string, t.number);

type IssuanceInfo = t.TypeOf<typeof IssuanceInfo>;

export const collectionInfoFile = 'collection-info.json';
export const issuanceInfoFile = 'issuance-info.json';

let collectionInfo: CollectionInfo | undefined = undefined;

export async function writeIssuanceInfo(uncheckedInfo: IssuanceInfo): Promise<void> {
  await writeInfo(IssuanceInfo, issuanceInfoFile, uncheckedInfo);
}
export async function readIssuanceInfo(): Promise<IssuanceInfo> {
  return readInfo(IssuanceInfo, issuanceInfoFile, {});
}

export async function writeCollectionInfo(uncheckedInfo: CollectionInfo): Promise<void> {
  await writeInfo(CollectionInfo, collectionInfoFile, uncheckedInfo);
}

export async function readCollectionInfo(): Promise<CollectionInfo> {
  if (!collectionInfo) {
    collectionInfo = await readInfo(CollectionInfo, collectionInfoFile);
  }
  return collectionInfo;
}

async function writeInfo<T, O>(schema: t.Type<T, O>, file: string, uncheckedInfo: unknown | T): Promise<void> {
  // Ensure all fields are present
  const info = parse(schema, uncheckedInfo);
  await fs.writeFile(file, JSON.stringify(info, null, 2));
}

async function readInfo<T, O>(schema: t.Type<T, Json, unknown>, file: string, valueIfMissing?: T): Promise<T> {
  if (valueIfMissing) {
    const exists = await fs.stat(file).then(
      () => true,
      () => false,
    );
    if (!exists) {
      await writeInfo(schema, file, valueIfMissing);
      return valueIfMissing;
    }
  }
  const buf = await fs.readFile(file);
  return parseFromString(schema, buf.toString());
}
