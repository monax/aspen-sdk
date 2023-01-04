import * as path from 'path';
import * as url from 'url';
import { ContractsManifest } from '../../src/manifest';
import { parse } from '../../src/schema';
import { dumpLatestABIs, generateTsFile, writeFeaturesFactoriesMap } from '../generate';
const dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

export const sdkDir = path.join(dirname, '..', '..');
const srcDir = path.join(sdkDir, 'src');
const deployersFileTs = path.join(srcDir, 'deployers.gen.ts');
const manifestFileTs = path.join(srcDir, 'manifest.gen.ts');
const featureFactoriesTs = path.join(srcDir, 'feature-factories.gen.ts');
export const contractsAbiDir = path.join(sdkDir, 'abis');
export const specDir = path.join(dirname, '..', '..', 'node_modules', '@monaxlabs', 'spec');
const pathToManifestJson = path.join(specDir, 'contracts/manifest.json');
const prettierConfigFile = path.join(sdkDir, '.prettierrc');

async function generate(): Promise<void> {
  await generateTsFile(
    'deployers',
    path.join(specDir, 'contracts/deployments.json'),
    prettierConfigFile,
    deployersFileTs,
  );
  const manifestJson = await generateTsFile('manifest', pathToManifestJson, prettierConfigFile, manifestFileTs);
  await Promise.all([dumpLatestABIs(contractsAbiDir, pathToManifestJson)]);
  await writeFeaturesFactoriesMap(parse(ContractsManifest, manifestJson), prettierConfigFile, featureFactoriesTs);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
