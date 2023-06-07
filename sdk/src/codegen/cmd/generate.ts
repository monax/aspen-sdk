import * as fs from 'fs';
import * as t from 'io-ts';
import * as path from 'path';
import { parse } from '../../utils';
import { AspenContractsManifest } from '../aspen-contracts';
import {
  dumpLatestABIs,
  generateTsFile,
  writeAspenContractsFactoriesMap,
  writeFeaturesCodeMap,
  writeFeaturesFactoriesMap,
  writeFeaturesFunctionsMap,
  writeFeaturesList,
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

async function generateForManifests(manifest: ContractsManifest, experimentalManifest: ContractsManifest) {
  const combinedManifest = { ...manifest, ...experimentalManifest };
  const manifestTs = path.join(srcDir, 'codegen', 'manifest.gen.ts');
  await generateTsFile('manifest', combinedManifest, prettierConfigFile, manifestTs);

  const featuresDir = path.join(srcDir, 'contracts', 'collections', 'features');
  const featureFactoriesTs = path.join(featuresDir, 'feature-factories.gen.ts');
  const featureFunctionsTs = path.join(featuresDir, 'feature-functions.gen.ts');
  const experimentalFeaturesTs = path.join(featuresDir, 'experimental-features.gen.ts');
  const featureCodesTs = path.join(featuresDir, 'feature-codes.gen.ts');

  await writeFeaturesFactoriesMap(combinedManifest, prettierConfigFile, featureFactoriesTs);
  await writeFeaturesFunctionsMap(combinedManifest, prettierConfigFile, featureFunctionsTs);
  await writeFeaturesCodeMap(combinedManifest, prettierConfigFile, featureCodesTs);
  // Drop list of those interfaces that should be marked as experimental (subject to change at any time)
  await writeFeaturesList(experimentalManifest, prettierConfigFile, experimentalFeaturesTs);
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
  await generateForManifests(manifest, experimentalManifest);

  // Drop deployments consts
  const aspenContractsFileTs = path.join(srcDir, 'contracts', 'core', 'core.gen.ts');
  const deployments = parseFile(AspenContractsManifest, pathToDeploymentsJson);
  await generateTsFile('AspenContracts', deployments, prettierConfigFile, aspenContractsFileTs);
  const deployerFactoriesTs = path.join(srcDir, 'contracts', 'core', 'core-factories.gen.ts');
  // Write map to typechain factory contracts from interfaces
  await writeAspenContractsFactoriesMap(deployments, prettierConfigFile, deployerFactoriesTs, experimentalManifest);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
