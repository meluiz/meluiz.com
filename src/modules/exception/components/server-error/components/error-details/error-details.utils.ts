export interface StackFrame {
  name: string;
  file: string;
  line: number | null;
  column: number | null;
  internal: boolean;
}

/* ///////////////////////////////////////////////// */

const MAX_FRAMES = 8;

// `at fn (file:1:2)` / `at file:1:2` (V8) and `fn@file:1:2` (Gecko, WebKit)
const V8_FRAME = /^\s*at (?:(.+?) \()?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;
const GECKO_FRAME = /^\s*(.*?)@(.+?)(?::(\d+))?(?::(\d+))?$/;

const INTERNAL_FILE =
  /node_modules|next\/dist|react-dom|react-server|^node:|<anonymous>|^native$/;

/* ///////////////////////////////////////////////// */

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

// Turbopack server frames carry the original module in the (double-encoded) `id` query param
const toSource = (raw: string) => {
  const id = raw.match(/[?&]id=([^&?]+)/)?.[1];

  return id ? safeDecode(safeDecode(id)).match(/\[project\]\/([^+?]+)/)?.[1] : undefined;
};

const toFile = (raw: string) => {
  const source = toSource(raw);

  if (source) {
    return source.replace(/^src\//, '');
  }

  const file = raw
    .replace(/^(webpack-internal:\/\/\/|webpack:\/\/[^/]*\/|file:\/\/|https?:\/\/[^/]+\/)/, '')
    .replace(/^\(\w+\)\/?/, '')
    .replace(/\?.*$/, '');

  const dependency = file.split('node_modules/').at(-1);
  const project = file.match(/(?:^|\/)((?:src|app)\/.+)$/)?.[1];

  if (file.includes('node_modules/') && dependency) {
    return dependency;
  }

  if (file.includes('.next/') || file.includes('_next/static/')) {
    return safeDecode(file.split('/').at(-1) ?? file);
  }

  return (project ?? file).replace(/^\.\//, '').replace(/^src\//, '');
};

const toNumber = (value: string | undefined) => {
  return value ? Number(value) : null;
};

/* ///////////////////////////////////////////////// */

export const parseStack = (stack: string | undefined): StackFrame[] => {
  if (!stack) {
    return [];
  }

  return stack
    .split('\n')
    .flatMap((line) => {
      const match =
        line.match(V8_FRAME) ?? (line.includes('@') ? line.match(GECKO_FRAME) : null);

      if (!match) {
        return [];
      }

      const [, name, file = '', row, column] = match;

      if (!row) {
        return [];
      }

      return [
        {
          name: name?.trim() || '<anonymous>',
          file: toFile(file),
          line: toNumber(row),
          column: toNumber(column),
          internal: INTERNAL_FILE.test(file),
        },
      ];
    })
    .slice(0, MAX_FRAMES);
};
