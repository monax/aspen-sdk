import { generateOAS, Spec } from '@monaxlabs/phloem/dist/gen';
import { getIoTsConfig, IoTsTypeVisitor } from '@monaxlabs/phloem/dist/gen/json-schema/io-ts';
import { parse } from '@monaxlabs/phloem/dist/schema';
import * as fs from 'fs';
import * as t from 'io-ts';
import * as path from 'path';
import { AspenContractsManifest } from '../aspen-contracts';
import {
  dumpLatestABIs,
  generateTsFile,
  writeAspenContractsFactoriesMap,
  writeFeaturesCodeMap,
  writeFeaturesFactoriesMap,
  writeFeaturesFunctionsMap,
  writeFeaturesList,
  writeTypescriptFile,
} from '../generate';
import { ContractsManifest } from '../manifest';

// const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

const sdkDir = path.join(__dirname, '..', '..', '..');
const srcDir = path.join(sdkDir, 'src');
const contractsAbiDir = path.join(srcDir, 'contracts', 'abis');
const specDir = path.join(sdkDir, 'node_modules', '@monaxlabs', 'spec');
const pathToDeploymentsJson = path.join(specDir, 'contracts/deployments.json');
const pathToManifestJson = path.join(specDir, 'contracts/manifest.json');
const pathToAspenOASJson = path.join(specDir, 'apis/aspen.json');
const pathToExperimentalManifestJson = path.join(specDir, 'contracts/manifest.experimental.json');

async function generateForManifests(
  manifest: ContractsManifest,
  experimentalManifest: ContractsManifest,
): Promise<void> {
  const combinedManifest = { ...manifest, ...experimentalManifest };

  const featuresDir = path.join(srcDir, 'contracts', 'collections', 'features');
  const featureFactoriesTs = path.join(featuresDir, 'feature-factories.gen.ts');
  const featureFunctionsTs = path.join(featuresDir, 'feature-functions.gen.ts');
  const experimentalFeaturesTs = path.join(featuresDir, 'experimental-features.gen.ts');
  const featureCodesTs = path.join(featuresDir, 'feature-codes.gen.ts');

  await writeFeaturesFactoriesMap(combinedManifest, featureFactoriesTs);
  await writeFeaturesFunctionsMap(combinedManifest, featureFunctionsTs);
  await writeFeaturesCodeMap(combinedManifest, featureCodesTs);
  // Drop list of those interfaces that should be marked as experimental (subject to change at any time)
  await writeFeaturesList(experimentalManifest, experimentalFeaturesTs);
}

function parseFile<A, O, I>(schema: t.Type<A, O, I>, pathToManifest: string): A {
  return parse(schema, JSON.parse(fs.readFileSync(pathToManifest).toString()));
}

async function generateAspenApi(): Promise<void> {
  const visitor = new IoTsTypeVisitor(
    getIoTsConfig({
      typesImportPath: '@monaxlabs/phloem/dist/types',
      parseImportPath: '@monaxlabs/phloem/dist/schema',
    }),
  );
  await writeTypescriptFile(
    path.join(srcDir, 'apis', 'aspen', 'index.ts'),
    await generateOAS(parseFile(Spec, pathToAspenOASJson), visitor),
  );
}

async function generate(): Promise<void> {
  // Pull in manifests from @monaxlabs/spec
  const manifest = parseFile(ContractsManifest, pathToManifestJson);
  const experimentalManifest = parseFile(ContractsManifest, pathToExperimentalManifestJson);
  // Dump joint ABIs for Typechain
  await Promise.all([dumpLatestABIs(contractsAbiDir, manifest, experimentalManifest)]);
  // Generate various contingent typescript artefacts based on manifests
  await generateForManifests(manifest, experimentalManifest);
  await generateAspenApi();
  // Drop deployments consts
  const aspenContractsFileTs = path.join(srcDir, 'contracts', 'core', 'core.gen.ts');
  const deployments = parseFile(AspenContractsManifest, pathToDeploymentsJson);
  await generateTsFile('AspenContracts', deployments, aspenContractsFileTs);
  const deployerFactoriesTs = path.join(srcDir, 'contracts', 'core', 'core-factories.gen.ts');
  // Write map to typechain factory contracts from interfaces
  await writeAspenContractsFactoriesMap(deployments, deployerFactoriesTs, experimentalManifest);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
