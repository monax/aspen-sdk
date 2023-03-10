import { Contract, providers } from 'ethers';
import { FunctionFragment, ParamType } from 'ethers/lib/utils';
import * as fs from 'fs';
import * as path from 'path';
import prettier from 'prettier';
import ts from 'typescript';
import { parse } from '../utils';
import { AdditionalABIs } from './abis';
import { DeployerManifest, DeployersManifest } from './deployers';
import { ContractManifest, ContractsManifest } from './manifest';

const nonFeatureDirs = new Set(['deploy', 'impl']);

export function isFeature(manifest: ContractManifest): boolean {
  return manifest.abi.length > 0 && !nonFeatureDirs.has(manifest.dir);
}

export async function printJsonObjectAsTypescriptConst(
  constName: string,
  prettierConfigFile: string,
  obj: unknown,
): Promise<string> {
  const gen = `// GENERATED FILE - edits will be lost\n\nexport const ${constName} = ${JSON.stringify(
    obj,
    null,
    2,
  )} as const;`;
  const options = await prettier.resolveConfig(prettierConfigFile);
  return prettier.format(gen, {
    parser: 'typescript',
    ...options,
  });
}

export function printNodes(...nodes: ts.Node[]): string {
  return ts
    .createPrinter()
    .printList(
      ts.ListFormat.AllowTrailingComma | ts.ListFormat.MultiLine | ts.ListFormat.PreferNewLine,
      ts.factory.createNodeArray(nodes),
      ts.createSourceFile('nothing.ts', '', ts.ScriptTarget.Latest),
    );
}

export function exportConst(
  name: string,
  initializer: ts.Expression,
  opts?: { comment?: string; asConst?: boolean; type?: ts.TypeNode },
): ts.VariableStatement {
  if (opts?.asConst) {
    initializer = ts.factory.createAsExpression(
      initializer,
      ts.factory.createTypeReferenceNode(ts.factory.createIdentifier('const')),
    );
  }
  const variableStatement = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [ts.factory.createVariableDeclaration(name, undefined, opts?.type, initializer)],
      ts.NodeFlags.Const,
    ),
  );
  if (opts?.comment) {
    ts.addSyntheticLeadingComment(variableStatement, ts.SyntaxKind.MultiLineCommentTrivia, opts.comment, true);
  }
  return variableStatement;
}

export function exportType(name: string, type: ts.TypeNode, opts?: { comment?: string }): ts.TypeAliasDeclaration {
  const typeStatement = ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    name,
    undefined,
    type,
  );

  if (opts?.comment) {
    ts.addSyntheticLeadingComment(typeStatement, ts.SyntaxKind.MultiLineCommentTrivia, opts.comment, true);
  }

  return typeStatement;
}

export async function generateTsFile(
  constName: string,
  pathToJson: string,
  prettierConfigFile: string,
  outputFileTs: string,
): Promise<unknown> {
  const obj = JSON.parse(fs.readFileSync(pathToJson).toString());
  const ts = await printJsonObjectAsTypescriptConst(constName, prettierConfigFile, obj);
  fs.writeFileSync(outputFileTs, ts);
  return obj;
}

export async function dumpLatestABIs(abiDir: string, pathToManifestJson: string): Promise<void> {
  fs.rmSync(abiDir, { recursive: true, force: true });
  fs.mkdirSync(abiDir, { recursive: true });
  const manifest = parse(ContractsManifest, JSON.parse(fs.readFileSync(pathToManifestJson).toString()));
  for (const m of Object.values(manifest)) {
    writeABI(abiDir, m);
  }
  const additionalDir = path.join(abiDir, 'additional');
  for (const [name, abi] of Object.entries(AdditionalABIs)) {
    writeABI(additionalDir, { name, abi, file: name + '.sol' });
  }
}

function writeABI(abiDir: string, manifest: { name: string; abi: unknown; file: string }) {
  const dir = path.join(abiDir, manifest.file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, manifest.name + '.json'), JSON.stringify(manifest.abi, null, 2));
}

export function generateDeployerFactoriesMapTs(manifest: DeployersManifest): ts.Node[] {
  const deployers = Object.values(manifest).map((d) => {
    const [file, interfaceName] = d.interfaceId.split(':');
    return { file, interfaceName, ...d };
  });

  // make sure we don't have duplicates
  // we don't care about the individual deployers here
  // which is why we allow 'overlapping'
  const uniqueIterfaces = Object.values(
    deployers.reduce<Record<string, DeployerManifest & { file: string; interfaceName: string }>>((acc, d) => {
      acc[d.interfaceId] = d;
      return acc;
    }, {}),
  );

  const interfaceFiles = Array.from(new Set(uniqueIterfaces.map((d) => d.file)));

  // For numbered namespace imports
  const importIdentifiers = Object.fromEntries(
    interfaceFiles.map((f, i) => [f, ts.factory.createIdentifier(`factory_${i}`)]),
  );

  const importNodes = Object.entries(importIdentifiers).flatMap(([file, ident]) =>
    ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamespaceImport(ident)),
      ts.factory.createStringLiteral(path.join('..', '..', 'contracts', 'generated', 'factories', file)),
      undefined,
    ),
  );

  const constNode = exportConst(
    'DeployerFactories',
    ts.factory.createObjectLiteralExpression(
      uniqueIterfaces.map((d) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(d.interfaceId),
          ts.factory.createPropertyAccessExpression(
            importIdentifiers[d.file],
            ts.factory.createIdentifier(d.interfaceName + '__factory'),
          ),
        ),
      ),
    ),
    { asConst: true },
  );

  const currentFamily = 'AspenDeployer';
  let currentMajorVersion = 0;
  const networks: string[] = [];
  const interfaceByFamilyVersion = deployers.reduce<Record<string, Record<number, string>>>((imap, d) => {
    if (d.interfaceFamily === currentFamily && d.version.major > currentMajorVersion) {
      currentMajorVersion = d.version.major;
    }

    networks.push(d.network);
    if (!imap[d.interfaceFamily]) imap[d.interfaceFamily] = {};
    imap[d.interfaceFamily][d.version.major] = d.interfaceId;
    return imap;
  }, {});

  const currentFamilyConst = exportConst('CurrentInterfaceFamily', ts.factory.createStringLiteral(currentFamily), {
    asConst: true,
  });
  const currentVersionConst = exportConst(
    'CurrentInterfaceVersion',
    ts.factory.createNumericLiteral(currentMajorVersion),
    {
      asConst: true,
    },
  );

  const versionsByFamilyConst = exportConst(
    'DeployerFamilyVersions',
    ts.factory.createObjectLiteralExpression(
      Object.entries(interfaceByFamilyVersion).map(([family, versions]) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(family),
          ts.factory.createObjectLiteralExpression(
            Object.entries(versions).map(([major, interfaceId]) =>
              ts.factory.createPropertyAssignment(
                ts.factory.createNumericLiteral(major),
                ts.factory.createStringLiteral(interfaceId),
              ),
            ),
          ),
        ),
      ),
    ),
    { asConst: true },
  );

  const networksType = exportType(
    'DeployerNetworks',
    ts.factory.createUnionTypeNode(
      Array.from(new Set(networks)).map((network) =>
        ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(network)),
      ),
    ),
    {
      comment:
        "It's not that it can't be calculated but don't want the time spent on looking up how to codegen the type to be wasted ;)",
    },
  );

  return [...importNodes, constNode, currentFamilyConst, currentVersionConst, versionsByFamilyConst, networksType];
}

export async function writeDeployerFactoriesMap(
  manifest: DeployersManifest,
  prettierConfigFile: string,
  deployersFactoryMapFile: string,
): Promise<void> {
  const options = await prettier.resolveConfig(prettierConfigFile);

  fs.writeFileSync(
    deployersFactoryMapFile,
    prettier.format(printNodes(...generateDeployerFactoriesMapTs(manifest)), {
      parser: 'typescript',
      ...options,
    }),
  );
}

export function generateFeatureFactoriesMapTs(manifest: ContractsManifest): ts.Node[] {
  // Only include features with current Solidity code that Typechain will process and exclude
  // the cedar interfaces that are not features (those under impl, deploy, and standard)
  const currentFeatures = Object.values(manifest).filter(isFeature);

  // const featuresByFile = currentFeatures.reduce(
  //   (g, m) => ({ ...g, [m.file]: [...(g[m.file] || []), m] }),
  //   {} as Record<string, ContractManifest[]>,
  // );

  // For numbered namespace imports
  const importIdentifiers = Object.fromEntries(
    Array.from(new Set(currentFeatures.map((m) => m.file)).values()).map((f, i) => [
      f,
      ts.factory.createIdentifier(`factory_${i}`),
    ]),
  );
  const importNodes = Object.entries(importIdentifiers).flatMap(([file, ident]) =>
    ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamespaceImport(ident)),
      ts.factory.createStringLiteral(path.join('..', '..', '..', 'contracts', 'generated', 'factories', file)),
      undefined,
    ),
  );

  const constNode = exportConst(
    'FeatureFactories',
    ts.factory.createObjectLiteralExpression(
      currentFeatures.map((m) =>
        ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(m.id),
          ts.factory.createPropertyAccessExpression(
            importIdentifiers[m.file],
            ts.factory.createIdentifier(m.name + '__factory'),
          ),
        ),
      ),
    ),
    { asConst: true },
  );
  return [...importNodes, constNode];
}

export async function writeFeaturesFactoriesMap(
  manifest: ContractsManifest,
  prettierConfigFile: string,
  featureFactoryMapFile: string,
): Promise<void> {
  const options = await prettier.resolveConfig(prettierConfigFile);

  fs.writeFileSync(
    featureFactoryMapFile,
    prettier.format(printNodes(...generateFeatureFactoriesMapTs(manifest)), {
      parser: 'typescript',
      ...options,
    }),
  );
}

function functionParamSignature(p: ParamType) {
  return p.type === 'tuple' ? `(${p.components.map((c) => c.type)})` : p.type;
}
function functionSignature(f: FunctionFragment, hasOverloads: boolean): string {
  const i = f.inputs.map(functionParamSignature).join(',');
  const o = (f.outputs || []).map(functionParamSignature).join(',');
  return `${f.name}(${i})${hasOverloads ? '+' : ''}[${o}]`;
}

export function generateFeatureFunctionsMapTs(manifest: ContractsManifest): ts.Node {
  const currentFeatures = Object.values(manifest).filter(isFeature);
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
  const provider = new providers.JsonRpcProvider();

  const map: Record<string, string[]> = {};
  for (const feature of currentFeatures) {
    const contract = new Contract(ZERO_ADDRESS, feature.abi as unknown as string, provider);
    const functions = Object.values(contract.interface.functions);
    const overloads = functions.reduce<Record<string, number>>((o, f) => {
      if (!o[f.name]) o[f.name] = 1;
      else o[f.name]++;
      return o;
    }, {});

    for (let i = 0, l = functions.length; i < l; i++) {
      const func = functions[i];
      const key = functionSignature(func, overloads[func.name] > 1);
      if (!map[key]) map[key] = [];
      map[key].push(feature.id);
    }
  }

  const constNode = exportConst(
    'FeatureFunctionsMap',
    ts.factory.createObjectLiteralExpression(
      Object.entries(map).map(([functionName, implementingInterfaces]) => {
        return ts.factory.createPropertyAssignment(
          ts.factory.createStringLiteral(functionName),
          ts.factory.createObjectLiteralExpression([
            ts.factory.createPropertyAssignment(
              ts.factory.createStringLiteral('drop'),
              ts.factory.createArrayLiteralExpression(
                implementingInterfaces.map((i) => ts.factory.createStringLiteral(i)),
              ),
            ),
          ]),
        );
      }),
    ),
    { asConst: true },
  );

  return constNode;
}

export async function writeFeaturesFunctionsMap(
  manifest: ContractsManifest,
  prettierConfigFile: string,
  functionsMapFile: string,
): Promise<void> {
  const options = await prettier.resolveConfig(prettierConfigFile);

  fs.writeFileSync(
    functionsMapFile,
    prettier.format(printNodes(generateFeatureFunctionsMapTs(manifest)), {
      parser: 'typescript',
      ...options,
    }),
  );
}
