import * as path from 'path';
import * as url from 'url';
import { parse } from '../../utils';
import { DeployersManifest } from '../deployers';
import {
  dumpLatestABIs,
  generateTsFile,
  writeDeployerFactoriesMap,
  writeFeaturesFactoriesMap,
  writeFeaturesFunctionsMap,
} from '../generate';
import { ContractsManifest } from '../manifest';

// const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

const sdkDir = path.join(__dirname, '..', '..', '..');
const srcDir = path.join(sdkDir, 'src');

const manifestFileTs = path.join(srcDir, 'codegen', 'manifest.gen.ts');
const deployersFileTs = path.join(srcDir, 'contracts', 'deployer', 'deployers.gen.ts');
const deployerFactoriesTs = path.join(srcDir, 'contracts', 'deployer', 'deployer-factories.gen.ts');
const contractsAbiDir = path.join(srcDir, 'contracts', 'abis');
const featureFactoriesTs = path.join(srcDir, 'contracts', 'collections', 'features', 'feature-factories.gen.ts');
const featureFunctionsTs = path.join(srcDir, 'contracts', 'collections', 'features', 'feature-functions.gen.ts');

const specDir = path.join(sdkDir, 'node_modules', '@monaxlabs', 'spec');
const pathToDeploymentsJson = path.join(specDir, 'contracts/deployments.json');
const pathToManifestJson = path.join(specDir, 'contracts/manifest.json');
const prettierConfigFile = path.join(sdkDir, '.prettierrc');

async function generate(): Promise<void> {
  await Promise.all([dumpLatestABIs(contractsAbiDir, pathToManifestJson)]);

  const manifestJson = await generateTsFile('manifest', pathToManifestJson, prettierConfigFile, manifestFileTs);
  const manifest = parse(ContractsManifest, manifestJson);
  await writeFeaturesFactoriesMap(manifest, prettierConfigFile, featureFactoriesTs);
  await writeFeaturesFunctionsMap(manifest, prettierConfigFile, featureFunctionsTs);

  const deploymentsJson = await generateTsFile('deployers', pathToDeploymentsJson, prettierConfigFile, deployersFileTs);
  const deployments = parse(DeployersManifest, deploymentsJson);
  await writeDeployerFactoriesMap(deployments, prettierConfigFile, deployerFactoriesTs);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
