/**
 * Computes the specs (Built with · Anatomy · Size) of every craft that declares a `source`,
 * and writes them to `.source/specs.json`, read by `src/modules/crafts/services/source.ts`.
 *
 *   bun run craft:specs
 *
 * Runs before `dev` and `build`, so the server never reads the source tree at runtime and the
 * deployment doesn't have to ship it.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';

/* ///////////////////////////////////////////////// */

export interface Spec {
  label: string;
  value: string;
}

/* ///////////////////////////////////////////////// */

const CONTENT_DIR = join(process.cwd(), 'content/crafts');
const OUTPUT_FILE = join(process.cwd(), '.source/specs.json');

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;
const SOURCE_PATTERN = /^source:\s*(.+?)\s*$/m;

/* ///////////////////////////////////////////////// */

// `source` is a plain YAML scalar, quoted or not (see `toYamlString` in bin/craft.ts)
const toPlainString = (value: string) => {
  if (value.startsWith('"')) {
    return JSON.parse(value) as string;
  }

  if (value.startsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }

  return value;
};

const getSources = () => {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  const sources = readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(CONTENT_DIR, entry.name, 'index.mdx'))
    .filter((file) => existsSync(file))
    .flatMap((file) => {
      const frontmatter = readFileSync(file, 'utf8').match(FRONTMATTER_PATTERN)?.[1] ?? '';
      const source = frontmatter.match(SOURCE_PATTERN)?.[1];

      return source ? [toPlainString(source)] : [];
    });

  return Array.from(new Set(sources)).sort();
};

const getSourceFiles = (source: string) => {
  const path = join(process.cwd(), source);

  if (!existsSync(path)) {
    console.warn(`[specs] source "${source}" does not exist`);
    return [];
  }

  if (statSync(path).isFile()) {
    return [path];
  }

  return readdirSync(path, { encoding: 'utf8', recursive: true })
    .filter((file) => /\.tsx?$/.test(file))
    .sort()
    .map((file) => join(path, file));
};

const getBuiltWith = (code: string) => {
  const imports = code.matchAll(/^import\s+(?!type\b)[^;'"]*?from\s+['"]([^'"]+)['"]/gm);
  const specifiers = Array.from(imports, (match) => match[1]);
  const packages = specifiers
    .filter((specifier) => /^(?!node:|@\/)[@a-z]/.test(specifier))
    .map((specifier) => {
      const size = specifier.startsWith('@') ? 2 : 1;

      return specifier.split('/').slice(0, size).join('/');
    });

  return Array.from(new Set(packages)).sort().join(' · ');
};

const getAnatomy = (files: string[]) => {
  const file = files.find((path) => path.endsWith('.anatomy.ts'));

  if (file == null) {
    return '';
  }

  const definition = readFileSync(file, 'utf8').split('createAnatomy(')[1] ?? '';
  const [, ...names] = Array.from(definition.matchAll(/'([^']+)'/g), (match) => match[1]);

  return names
    .map((name) => name.replace(/_/g, ' ').replace(/^\w/, (char) => char.toUpperCase()))
    .join(' · ');
};

const getSize = (code: string) => {
  return `~${(gzipSync(code).byteLength / 1000).toFixed(1)} kB`;
};

const getSourceSpecs = (source: string): Spec[] => {
  const files = getSourceFiles(source);

  if (files.length === 0) {
    return [];
  }

  const code = files.map((file) => readFileSync(file, 'utf8')).join('\n');
  const specs = [
    { label: 'Built with', value: getBuiltWith(code) },
    { label: 'Anatomy', value: getAnatomy(files) },
    { label: 'Size', value: getSize(code) },
  ];

  return specs.filter((spec) => spec.value !== '');
};

/* ///////////////////////////////////////////////// */

const main = async () => {
  const specs = Object.fromEntries(
    getSources().map((source) => [source, getSourceSpecs(source)]),
  );

  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(specs, null, 2)}\n`);

  console.log(`[specs] ${Object.keys(specs).length} craft source(s) → .source/specs.json`);
};

await main();
