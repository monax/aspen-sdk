import fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { ContractManifest, ContractsManifest } from '../src/manifest';
import { parse } from '../src/schema';
import { printJsonObjectAsTypescriptConst } from './typescript';
const dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

export const specDir = path.join(dirname, '..', 'node_modules', '@monaxlabs', 'spec');

export async function generateTsFile(
  constName: string,
  relativePathToJson: string,
  outputFileTs: string,
): Promise<void> {
  const obj = JSON.parse(fs.readFileSync(path.join(specDir, relativePathToJson)).toString());
  const ts = await printJsonObjectAsTypescriptConst(constName, obj);
  fs.writeFileSync(outputFileTs, ts);
}

export async function dumpLatestABIs(abiDir: string): Promise<void> {
  fs.mkdirSync(abiDir, { recursive: true });
  const manifest = parse(
    ContractsManifest,
    JSON.parse(fs.readFileSync(path.join(specDir, 'contracts/manifest.json')).toString()),
  );
  for (const m of Object.values(manifest)) {
    writeABI(abiDir, m);
  }
}

function writeABI(abiDir: string, manifest: ContractManifest) {
  fs.writeFileSync(path.join(abiDir, manifest.name + '.json'), JSON.stringify(manifest.abi, null, 2));
}
