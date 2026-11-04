import { transformerMetaWordHighlight } from '@shikijs/transformers';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { createCssVariablesTheme } from 'shiki';

import { CraftSchema } from '@/modules/crafts/schemas';

/* ///////////////////////////////////////////////// */

const theme = createCssVariablesTheme({
  name: 'meluiz',
  fontStyle: true,
  variablePrefix: '--color-code-',
});

/* ///////////////////////////////////////////////// */

export const crafts = defineCollections({
  type: 'doc',
  dir: 'content/crafts',
  files: ['*/index.mdx'],
  schema: CraftSchema,
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      icon: false,
      defaultColor: 'light',
      inline: 'tailing-curly-colon',
      themes: { light: theme, dark: theme },
      langs: ['tsx', 'ts', 'css', 'bash', 'json', 'mdx'],
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerMetaWordHighlight(),
      ],
    },
  },
});
