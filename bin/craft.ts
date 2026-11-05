/**
 * Scaffolds a new craft with the next free serial.
 *
 *   bun run craft:new scroll-ink
 *   bun run craft:new scroll-ink --description "A line that inks." --tags motion,reading
 *   bun run craft:new scroll-ink --status prototype --hint "Scroll" --dry-run
 *
 * Crafts start as drafts, which stay out of the public list until the status changes.
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { parseArgs } from 'node:util';

import { tags as TAGS } from '@/modules/crafts/constants';
import { CraftSchema } from '@/modules/crafts/schemas';

const CONTENT_PATH = 'content/crafts';
const CONTENT_DIR = join(process.cwd(), CONTENT_PATH);
const STATUSES = CraftSchema.shape.status.unwrap().options;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SERIAL_PATTERN = /^serial:\s*(\d+)\s*$/m;

const USAGE = `Usage: bun run craft:new <slug> [options]

Options:
  --title <text>        Defaults to the slug in title case
  --description <text>  One sentence on what it is
  --tags <list>         Comma-separated: ${TAGS.join(', ')}
  --status <status>     ${STATUSES.join(', ')} (default: draft)
  --hint <text>         Shown in the stage's status bar
  --source <path>       Source folder or file, used to compute the specs
  --dry-run             Print the files without writing them
  -h, --help            Show this message

Missing description and tags are asked for when running in a terminal.`;

type Status = (typeof STATUSES)[number];

interface Fields {
  status: Status;
  serial: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  hint?: string;
  source?: string;
}

const fail = (message: string): never => {
  console.error(`✗ ${message}`);
  process.exit(1);
};

const isStatus = (value: string): value is Status => {
  return STATUSES.some((status) => status === value);
};

// "scroll-ink" → "Scroll Ink"
const toTitle = (slug: string) => {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Local date, so a craft made at 23:00 in São Paulo is not dated tomorrow
const today = () => {
  const now = new Date();
  const pad = (value: number) => {
    return String(value).padStart(2, '0');
  };
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const parseTags = (value: string) => {
  const parsed = value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  return Array.from(new Set(parsed));
};

const getInvalidTags = (values: string[]) => {
  return values.filter((tag) => !TAGS.some((known) => known === tag));
};

// Reads only the frontmatter block, so a "serial:" inside the text is ignored
const readSerial = async (folder: string) => {
  const file = join(CONTENT_DIR, folder, 'index.mdx');
  if (!existsSync(file)) {
    return null;
  }
  const source = await readFile(file, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const serial = frontmatter.match(SERIAL_PATTERN)?.[1];
  if (!serial) {
    console.warn(`! ${CONTENT_PATH}/${folder}/index.mdx has no serial, ignoring it.`);
    return null;
  }
  return Number(serial);
};

// Highest serial in use + 1. Gaps stay, but deleting the newest craft frees its number
const nextSerial = async () => {
  if (!existsSync(CONTENT_DIR)) {
    console.warn(`! ${CONTENT_PATH} does not exist, so the serial restarts at 1.`);
    return 1;
  }
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const serials = await Promise.all(folders.map(readSerial));
  const used = serials.filter((serial): serial is number => serial !== null);
  return used.length === 0 ? 1 : Math.max(...used) + 1;
};

const askDescription = async (ask: (question: string) => Promise<string>) => {
  while (true) {
    const answer = (await ask('Description: ')).trim();
    if (answer !== '') {
      return answer;
    }
    console.error('  A description is required.');
  }
};

const askTags = async (ask: (question: string) => Promise<string>) => {
  while (true) {
    const answer = parseTags(await ask(`Tags (${TAGS.join(', ')}): `));
    const invalid = getInvalidTags(answer);
    if (answer.length > 0 && invalid.length === 0) {
      return answer;
    }
    console.error(`  Pick at least one of: ${TAGS.join(', ')}.`);
  }
};

const resolveDetails = async (description?: string, tags?: string[]) => {
  if (description !== undefined && tags !== undefined) {
    return { description, tags };
  }
  if (!process.stdin.isTTY) {
    return fail('Missing --description or --tags, and there is no terminal to ask in.');
  }
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const ask = (question: string) => prompt.question(question);
  try {
    return {
      description: description ?? (await askDescription(ask)),
      tags: tags ?? (await askTags(ask)),
    };
  } catch (error) {
    // Ctrl+C or Ctrl+D: nothing has been written yet
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('\nCancelled.');
      process.exit(130);
    }
    throw error;
  } finally {
    prompt.close();
  }
};

// Plain when YAML reads it back as the same string; JSON strings are valid YAML otherwise
const toYamlString = (value: string) => {
  const isPlain =
    /^[A-Za-z][^:#\n"]*$/.test(value) && !/^(true|false|null|yes|no|on|off)$/i.test(value);
  return isPlain ? value : JSON.stringify(value);
};

const getFrontmatter = (fields: Fields) => {
  return [
    '---',
    `status: ${fields.status}`,
    `serial: ${fields.serial}`,
    `title: ${toYamlString(fields.title)}`,
    `description: ${toYamlString(fields.description)}`,
    `date: ${fields.date}`,
    `tags: [${fields.tags.join(', ')}]`,
    ...(fields.hint ? [`hint: ${toYamlString(fields.hint)}`] : []),
    ...(fields.source ? [`source: ${toYamlString(fields.source)}`] : []),
    '---',
  ].join('\n');
};

const getArticle = (filename: string, hasPreview: boolean) => {
  if (hasPreview) {
    return `export { Preview } from './${filename}.preview';\n\n## What it is\n\nTODO\n`;
  }
  return '## The idea\n\nTODO\n\n## Open questions\n\n- TODO\n';
};

const getPreview = (title: string) => {
  const text = /[{}<>]/.test(title) ? `{${JSON.stringify(title)}}` : title;

  return [
    "'use client';",
    '',
    "import { Fragment } from 'react';",
    '',
    "import { Playground } from '@/modules/crafts';",
    '',
    'export const Preview = () => {',
    '  return (',
    '    <Fragment>',
    '      <Playground.Status>Ready</Playground.Status>',
    `      <div>${text}</div>`,
    '    </Fragment>',
    '  );',
    '};',
    '',
  ].join('\n');
};

const main = async () => {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      title: { type: 'string' },
      description: { type: 'string' },
      tags: { type: 'string' },
      status: { type: 'string', default: 'draft' },
      hint: { type: 'string' },
      source: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  if (values.help) {
    console.log(USAGE);
    return;
  }

  const slug = positionals[0];
  if (!slug) {
    return fail(`Missing slug.\n\n${USAGE}`);
  }
  if (!SLUG_PATTERN.test(slug)) {
    return fail(`"${slug}" is not kebab-case (e.g. scroll-ink).`);
  }

  const status = values.status ?? 'draft';
  if (!isStatus(status)) {
    return fail(`--status must be one of: ${STATUSES.join(', ')}.`);
  }

  const flagTags = values.tags === undefined ? undefined : parseTags(values.tags);
  const invalidTags = getInvalidTags(flagTags ?? []);
  if (invalidTags.length > 0) {
    return fail(`Unknown tags: ${invalidTags.join(', ')}. Use: ${TAGS.join(', ')}.`);
  }

  // An unknown path would silently produce a craft with no computed specs
  if (values.source && !existsSync(join(process.cwd(), values.source))) {
    return fail(`--source ${values.source} does not exist.`);
  }

  const folder = join(CONTENT_DIR, slug);
  if (existsSync(folder)) {
    return fail(`${CONTENT_PATH}/${slug} already exists.`);
  }

  const { description, tags } = await resolveDetails(values.description, flagTags);
  const fields: Fields = {
    status,
    serial: await nextSerial(),
    title: values.title ?? toTitle(slug),
    description,
    date: today(),
    tags,
    hint: values.hint,
    source: values.source,
  };

  // Same schema as the collection, so a scaffolded craft can't fail the build on its frontmatter
  const parsed = CraftSchema.safeParse(fields);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => {
      return `${issue.path.join('.')}: ${issue.message}`;
    });

    return fail(`Invalid craft:\n  ${issues.join('\n  ')}`);
  }

  const hasPreview = status !== 'idea';

  const label = `No. ${String(fields.serial).padStart(3, '0')} · ${fields.title}`;
  const files = [
    {
      name: 'index.mdx',
      content: `${getFrontmatter(fields)}\n\n${getArticle(slug, hasPreview)}`,
    },
    ...(hasPreview ? [{ name: `${slug}.preview.tsx`, content: getPreview(fields.title) }] : []),
  ];

  if (values['dry-run']) {
    console.log(`Would create ${label} → ${CONTENT_PATH}/${slug}`);

    for (const file of files) {
      console.log(`\n--- ${file.name}\n${file.content}`);
    }

    return;
  }

  await mkdir(folder, { recursive: true });
  await Promise.all(files.map((file) => writeFile(join(folder, file.name), file.content)));

  console.log(`✓ ${label} → ${CONTENT_PATH}/${slug}`);
  if (status === 'draft') {
    console.log('  Change the status when it is ready to be listed.');
  }
};

await main();
