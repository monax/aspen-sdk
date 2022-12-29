import * as path from 'path';
import { dumpLatestABIs, generateTsFile } from '../spec';
import * as url from 'url';
const dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

export const rootDir = path.join(dirname, '..', '..');
const srcDir = path.join(rootDir, 'src');
const deployersFileTs = path.join(srcDir, 'deployers.gen.ts');
const manifestFileTs = path.join(srcDir, 'manifest.gen.ts');
export const contractsAbiDir = path.join(rootDir, 'abis');

generateTsFile('deployers', 'contracts/deployments.json', deployersFileTs)
  .then(() => generateTsFile('manifest', 'contracts/manifest.json', manifestFileTs))
  .then(() => Promise.all([dumpLatestABIs(contractsAbiDir)]))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
