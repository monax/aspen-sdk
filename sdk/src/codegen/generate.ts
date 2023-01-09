import * as fs from 'fs';
import * as path from 'path';
import prettier from 'prettier';
import ts from 'typescript';
import { parse } from '../utils';
import { ContractManifest, ContractsManifest } from './manifest';

const nonFeatureDirs = new Set(['deploy', 'impl']);

export function isFeatureId(manifest: ContractsManifest, id: string): boolean {
  return !!Object.values(manifest).find((c) => !nonFeatureDirs.has(c.dir) && c.id === id);
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
}

function writeABI(abiDir: string, manifest: ContractManifest) {
  const dir = path.join(abiDir, manifest.file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, manifest.name + '.json'), JSON.stringify(manifest.abi, null, 2));
}

export function generateFeatureFactoriesMapTs(manifest: ContractsManifest): ts.Node[] {
  // Only include features with current Solidity code that Typechain will process and exclude
  // the cedar interfaces that are not features (those under impl, deploy, and standard)
  const currentFeatures = Object.values(manifest).filter((m) => m.abi.length && isFeatureId(manifest, m.id));

  const featuresByFile = currentFeatures.reduce(
    (g, m) => ({ ...g, [m.file]: [...(g[m.file] || []), m] }),
    {} as Record<string, ContractManifest[]>,
  );

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
      ts.factory.createStringLiteral(path.join('..', '..', 'contracts', 'generated', 'factories', file)),
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
