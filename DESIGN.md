# DESIGN.md · meluiz.com

> If this file and the code disagree, the code wins until the person decides. Note the conflict under Open questions.

## Product

Personal site of Luiz Felipe, front-end developer. Sections: profile, career, projects, colophon, and **Crafts** — UI experiments, each with a live playground, write-up, specs computed from source, and a status (idea, draft, prototype, built).
Built for two audiences at once, **crafts lead**: the crafts are the showcase that does the hiring work; the profile backs them up. Desk first (people studying details and source), phone second.
Main job: a visitor sees real, working craft within seconds and leaves knowing who made it and how to reach him.

## Audience and voice

Fellow developers and designers who come for the crafts; recruiters and clients who come for the person. Technical readers are expected; nothing is dumbed down.
Voice: **confident showcase** — outcomes and decisions stated plainly, short declarative lines, a manifesto streak (see rauno.me). Claims are backed by something working on the page, not by adjectives.
Language: English (`lang="en-US"`).

## Mood

Words: **precise, warm**.
Never like: a busy showreel (motion for its own sake, scroll-jacking, everything animating), soft rounded SaaS (pills, big radii, pastel cards, drop shadows), glassy and glowy (gradients, blur, glow, neon).

## Brand

Design system source: `src/components/ui` (33 primitives) + `src/components/layout` (10 shell pieces), tokens in `src/assets/styles/tokens`; the Paper guide (file "meluiz.com", page "Guide") mirrors it. Sync record: `design-sync.json`.
- Colour: `silt` neutrals, `clay` accent, `dusk` support (tailugin, oklch), mapped to semantic `surface-*`, `foreground-*`, `stroke-*` roles; light and dark.
- Type: Geist Sans (body, display), Geist Mono (labels, values, numerals, headings), Geist Serif available. Mono for anything measured or labelled.
- Shape: square corners; `rounded-full` only for avatars/marks. Depth from strokes and the `ledge` utility, not shadows. Texture from `hatch`.
- Icons: Central Icons, sharp, radius 0, stroke 2.
- Mascot and scramble-text are signature details.
- Tagline: "Relishing the details. Fostering innovation. Achieving excellence."

## References

- rauno.me — take: restraint, craft as its own space (each experiment on a focused stage), micro-feedback (click-to-copy "Copied"), manifesto voice; avoid: nothing.
- emilkowal.ski — take: write-ups with live demos inline, motion taste (purposeful, fast, interruptible), a "currently…" status line; avoid: promo banners, an index so plain it undersells outcomes to hiring visitors.
- contentarchitecture.dev — take: showcase framing (work presented as proof); avoid: sales-page length, repeated CTAs.
- muratalpay.me — take: short two-paragraph bio, minimal nav, a small live detail (ticking clock), split showcases by kind; avoid: work hidden behind nav — home must show work.
- chanhdai.com — take: copy-paste source per craft, dense indexed sections as tidy lists, tactile components, a considered personal mark; avoid: everything-on-home.
- coss.com/ui — take: docs-grade index (name + one-liner), dogfooding (the site visibly built from its own primitives), accessibility-first rigour; avoid: vanity metrics (star/component counts), reading like a library product instead of a person.
- tailwindcss.com — take: display typography (large, tight, balanced), code as a first-class visual, every feature shown as a live demo; avoid: logo walls, marketing sprawl, blur and gradient effects.

## Constraints

- Desk first, phone must work fully (crafts included or with a clear fallback).
- Light and dark, user-switchable (color-scheme provider + preferences).
- Accessibility: keyboard and focus visible everywhere (Base UI); `prefers-reduced-motion` already zeroes durations globally.
- Icons: Central Icons sharp only.
- Motion in the chrome: **functional plus a few small delights** — motion explains a change (open, swap, feedback); signature moments (mascot, scramble text, status ticks) are allowed, sparingly. Crafts themselves may be expressive.
- Sound: via cuelume sound-effects provider, user-controllable volume and preset.

## Decisions log

- 2026-11-16 — Brief created via craft-setup — first written record of audience, voice, mood and references.
- 2026-11-16 — Crafts lead, profile supports — the crafts do the hiring work.
- 2026-11-16 — Design system imported into Paper via craft-sync: 117 tokens (silt/clay/dusk palettes, semantic + code colours in light values, Geist fonts, type scale), foundations boards, component index, 22 of 33 primitives drawn. Paper's Inter/DM Mono/Georgia font tokens replaced with Geist (code wins). Dark values shown as text, not registered.
- 2026-11-21 — Segmented gets `intent: "neutral"` (surface-muted fill, foreground text, 2px foreground bottom rule) for settings next to a stronger colour moment; first user: Playback controls speed, so the clay stays on the elapsed time only.
- 2026-11-21 — Paper import completed: the remaining 11 primitives drawn (all 33 now on the Guide page) and the boards arranged in a grid below the foundations and index.

## Open questions

- Sound default: interview said sound in chrome is opt-in, but `DEFAULT_PREFERENCES.enabled` is `true` in `src/components/providers/sound-effects/.../context-provider.constants.ts`. Code wins until decided.
- Reference cues were read from page text only (browser screenshots unavailable); visual details of the references (exact type, colour, radii) are unverified.
- Phone behaviour of crafts that need hover or a pointer: degrade, replace, or hide? (assumed: degrade with a hint in the stage status bar)
- Geist Serif: is it used anywhere, or reserved? (assumed reserved for future editorial use)
- Highlight ships no match style; its Paper board shows a proposed one (accent on accent-muted, like `::selection`). Adopt it in code or keep it consumer-defined?
- Gaps found during import (code, not decided): Button `soft` hover uses `bg-surface-contrast/8` but `surface-contrast` is undefined; Breadcrumb separator uses `text-strong-stroke` (not a token, likely `text-stroke-strong`); Menu popup and Number field scrub icon use hard-coded shadows, against "depth from strokes, not shadows"; Dock insets use raw `white`/`silt-*` mixes; Radio and Switch use `rounded-full`, against "rounded-full only for avatars/marks". No loading state exists for Button (drawn as proposed).
