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

`VERCEL_ENV` and `VERCEL_GIT_COMMIT_SHA` are provided by Vercel.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `bun dev`         | Start the development server        |
| `bun run build`   | Create a production build           |
| `bun start`       | Serve the production build          |
| `bun run analyze` | Inspect the bundle                  |
| `bun run lint`    | Lint with Biome                     |
| `bun run format`  | Lint and format with Biome (writes) |

## Project structure

```
app/                 Routes, layouts and metadata files
lib/                 Framework integrations (image loader)
src/
  assets/            Global styles
  components/
    layout/          Shell-level components
    providers/       Color scheme and sound effects
    ui/              Design system primitives
  configs/           Fonts and HTTP setup
  constants/         Site metadata and build info
  modules/           Feature modules (analytics, career, colophon, profile, projects)
  utils/             Helpers, DOM, React and style utilities
```

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
