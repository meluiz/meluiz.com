# meluiz.com

Personal site of Luiz Felipe — front-end developer.

> Relishing the details. Fostering innovation. Achieving excellence.

[meluiz.com](https://meluiz.com) · [GitHub](https://github.com/meluiz) · [X](https://x.com/omeluiz) · [LinkedIn](https://www.linkedin.com/in/meluiz)

## Stack

- [Next.js](https://nextjs.org) (App Router) with the React Compiler
- [React](https://react.dev) and [Base UI](https://base-ui.com) primitives
- [Tailwind CSS](https://tailwindcss.com) v4
- [TypeScript](https://www.typescriptlang.org)
- [Bun](https://bun.sh) as package manager and runtime
- [Biome](https://biomejs.dev) for linting and formatting
- [envin](https://envin.turbostarter.dev) + [Zod](https://zod.dev) for typed environment variables
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requires [Bun](https://bun.sh) `1.4.x`.

```bash
git clone https://github.com/meluiz/meluiz.com.git
cd meluiz.com
bun install
cp .env.example .env
bun dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

Variables are declared and validated in [`env.config.ts`](./env.config.ts). See [`.env.example`](./.env.example) for the full list.

| Variable           | Required | Description                                                      |
| ------------------ | -------- | ---------------------------------------------------------------- |
| `APP_URL`          | Yes      | Public URL of the app, used for metadata and absolute links      |
| `VISITORS_TOKEN`   | Yes      | Bearer token for the self-hosted visitors API                    |
| `CLOUDFLARE_TOKEN` | Yes      | Cloudflare Web Analytics site token                              |
| `BUILD_TIMESTAMP`  | No       | ISO datetime of the build, set automatically by `next.config.ts` |

`VERCEL_ENV`, `VERCEL_GIT_COMMIT_SHA` and `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` are provided by Vercel.

## Scripts

| Command                    | Description                         |
| -------------------------- | ----------------------------------- |
| `bun dev`                  | Start the development server        |
| `bun run build`            | Create a production build           |
| `bun start`                | Serve the production build          |
| `bun run analyze`          | Inspect the bundle                  |
| `bun run lint`             | Lint with Biome                     |
| `bun run format`           | Lint and format with Biome (writes) |
| `bun run craft:new <slug>` | Scaffold a new craft                |

## Creating a craft

Crafts live in `content/crafts/<slug>/`. Run the CLI from the project root to scaffold one with the next free serial and today's date:

```bash
# Asks for the description and tags in a terminal
bun run craft:new scroll-ink

# Or pass everything up front
bun run craft:new scroll-ink \
  --description "A line that inks the sentence you are on." \
  --tags motion,reading \
  --status prototype \
  --hint "Scroll the page" \
  --source src/components/ui/scroll-ink
```

| Option                 | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `--title <text>`       | Title, defaults to the slug in title case                              |
| `--description <text>` | One sentence on what it is. Required, asked for if missing             |
| `--tags <list>`        | Comma-separated `motion`, `interaction`, `layout`, `reading`. Required |
| `--status <status>`    | `draft` (default), `idea`, `prototype` or `built`                      |
| `--hint <text>`        | Text shown in the stage's status bar                                   |
| `--source <path>`      | Source file or folder, used for the specs and the Source link          |
| `--dry-run`            | Print the files without writing them                                   |
| `-h`, `--help`         | Show the usage                                                         |

Without a terminal, such as in a script, `--description` and `--tags` must be passed as flags.

The CLI writes `index.mdx`, plus a `playground.tsx` exporting the `Preview` shown in the stage for every status except `idea`.

`draft` crafts show up in development but stay out of production builds, so change the status to publish one.

With `--source`, the Built with, Anatomy and Size specs are computed from the code. To override one or add others, use `specs` in the frontmatter:

```yaml
specs:
  - label: Size
    value: ~2 kB
```

## Project structure

```
app/                 Routes, layouts and metadata files
bin/                 Project CLIs (craft scaffolding)
content/crafts/      Craft articles and playgrounds
lib/                 Framework integrations (image loader)
src/
  assets/            Global styles
  components/
    layout/          Shell-level components
    providers/       Color scheme and sound effects
    ui/              Design system primitives
  configs/           Fonts and HTTP setup
  constants/         Site metadata and build info
  modules/           Feature modules (analytics, career, colophon, crafts, exception, profile, projects)
  utils/             Helpers, DOM, React and style utilities
```

`app/global-not-found.tsx` and `app/global-error.tsx` build the 404 and 500 pages from the `exception` module. The 500 page is a Client Component, so it imports layout pieces by path instead of through the `@/components/layout` barrel, which also exports server-only components.

Each module exposes its public API through an `index.ts` and keeps components, constants and services side by side. Components follow the same layout: `component.tsx`, `component.styles.ts` and nested `components/` for private parts.

## Analytics

Page views are tracked by three sources:

- A self-hosted visitors service, which also powers the visit counter in the header
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics)
- [Vercel Analytics](https://vercel.com/analytics)

The self-hosted and Cloudflare trackers only load on production deployments. Vercel Analytics handles environments on its own.

To exclude your own browser from the self-hosted tracker, run `localStorage.setItem('visitors:ignore', '1')` in the console.

## License

[MIT](./LICENSE) © Luiz Felipe
