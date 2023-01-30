import * as path from 'path';
import * as url from 'url';
import { parse } from '../../utils';
import { dumpLatestABIs, generateTsFile, writeFeaturesFactoriesMap } from '../generate';
import { ContractsManifest } from '../manifest';

const dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

const sdkDir = path.join(dirname, '..', '..', '..');
const srcDir = path.join(sdkDir, 'src');

const manifestFileTs = path.join(srcDir, 'codegen', 'manifest.gen.ts');
const deployersFileTs = path.join(srcDir, 'contracts', 'deployers.gen.ts');
const contractsAbiDir = path.join(srcDir, 'contracts', 'abis');
const featureFactoriesTs = path.join(srcDir, 'contracts', 'collections', 'features', 'feature-factories.gen.ts');

const specDir = path.join(sdkDir, 'node_modules', '@monaxlabs', 'spec');
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
