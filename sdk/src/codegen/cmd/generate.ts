import * as fs from 'fs';
import * as t from 'io-ts';
import * as path from 'path';
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
const contractsAbiDir = path.join(srcDir, 'contracts', 'abis');
const specDir = path.join(sdkDir, 'node_modules', '@monaxlabs', 'spec');
const pathToDeploymentsJson = path.join(specDir, 'contracts/deployments.json');
const prettierConfigFile = path.join(sdkDir, '.prettierrc');
const pathToManifestJson = path.join(specDir, 'contracts/manifest.json');
const pathToExperimentalManifestJson = path.join(specDir, 'contracts/manifest.experimental.json');

async function generateForManifest(manifest: ContractsManifest, prefix = '') {
  const featureFactoriesTs = path.join(
    srcDir,
    'contracts',
    'collections',
    'features',
    prefix,
    'feature-factories.gen.ts',
  );
  const featureFunctionsTs = path.join(
    srcDir,
    'contracts',
    'collections',
    'features',
    prefix,
    'feature-functions.gen.ts',
  );
  await generateTsFile(
    'manifest',
    manifest,
    prettierConfigFile,
    path.join(srcDir, 'codegen', prefix, 'manifest.gen.ts'),
  );

  await writeFeaturesFactoriesMap(manifest, prettierConfigFile, featureFactoriesTs);
  await writeFeaturesFunctionsMap(manifest, prettierConfigFile, featureFunctionsTs);
}

function parseFile<A, O, I>(schema: t.Type<A, O, I>, pathToManifest: string): A {
  return parse(schema, JSON.parse(fs.readFileSync(pathToManifest).toString()));
}

async function generate(): Promise<void> {
  // Pull in manifests from @monaxlabs/spec
  const manifest = parseFile(ContractsManifest, pathToManifestJson);
  const experimentalManifest = parseFile(ContractsManifest, pathToExperimentalManifestJson);
  // Dump joint ABIs for Typechain
  await Promise.all([dumpLatestABIs(contractsAbiDir, manifest, experimentalManifest)]);
  // Generate various contingent typescript artefacts based on manifests
  await generateForManifest({ ...manifest, ...experimentalManifest });
  // Drop list of those interfaces that should be marked as experimental (subject to change at any time)
  await generateTsFile(
    'experimentalManifest',
    experimentalManifest,
    prettierConfigFile,
    path.join(srcDir, 'codegen', 'experimental.gen.ts'),
  );
  // Drop deployments consts
  const deployersFileTs = path.join(srcDir, 'contracts', 'deployer', 'deployers.gen.ts');
  const deployments = parseFile(DeployersManifest, pathToDeploymentsJson);
  await generateTsFile('deployers', deployments, prettierConfigFile, deployersFileTs);
  const deployerFactoriesTs = path.join(srcDir, 'contracts', 'deployer', 'deployer-factories.gen.ts');
  // Write map to typechain factory contracts from interfaces
  await writeDeployerFactoriesMap(deployments, prettierConfigFile, deployerFactoriesTs);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
