# Finance & Power Market Learning

A quiet study site with a consistent semantic color palette built around MIT 15.450 Analytics of Finance (Fall 2010), taught by Leonid Kogan. Independent from Power Market Game.

## Published site

https://nikhilvinod23.github.io/finance-power-market-learning/

GitHub Pages publishes the `main` branch from the repository root. The `.nojekyll` marker serves these static files without Jekyll processing. Push changes to `main` to update the site; no dependency installation or framework build is required for this publishing method. Browser progress remains device-local; use export/import to transfer it.

Colors have consistent meanings: blue for actions and navigation, green for completion and positive results, amber for review and caution, and red for losses, errors, or reset actions. Labels preserve the meaning without relying on color alone.

## Included

- 45 plain-language lessons spanning prerequisites, all ten lecture decks, both reviews, programming, and introductory energy applications.
- 90 quick questions with explanations and a review queue for missed questions.
- Seven interactive examples: discounting, diversification, binomial pricing, Brownian scaling, Monte Carlo, GARCH, and battery dispatch.
- Searchable lessons, field filters, glossary definitions linked to teaching passages, and prerequisite navigation.
- Separate reading and understanding flags; passage-level review; notes; JSON progress export/import.
- Original course resources linked in Sources. No private textbooks, accounts, credentials, tracking, or external fonts.

Content is a concise adaptation of the major ideas, not a replacement for every original derivation. The full CFA Level I curriculum and comprehensive power-market coverage are future extensions, explicitly identified in the site.

## Run

Requires Node.js, with no installed packages:

```sh
npm start
```

Open http://127.0.0.1:8766/. The app also works by opening index.html directly in browsers permitting local scripts; storage behavior for file URLs varies, so a static server is recommended.

```sh
npm test
npm run build
```

Build output is `dist/`. Any static host can serve it without a backend. `index.html` also serves directly from the repository root. Hash routing supports direct lesson links on subdirectory deployments.

## Progress

Progress is stored in localStorage under `finance-power-learning:v1`. A new browser begins with algebra and probability understood; the rest are unstarted. These initial flags are a convenience, not personal information stored in this repository. A hosted URL and localhost have separate storage. Export/import moves progress between them. Imported lesson records replace matching records; untouched lessons are preserved. Notes never leave the browser unless exported or copied by the user.

## Extend

See `AGENTS.md` and `docs/AUTHORING.md`. Preserve lesson IDs, passage indices, and question indices to avoid breaking saved progress. Content lives in `content/`; rendering in `app.js`; pure numerical examples in `models.js`. Add sources and tests alongside lessons. Keep future topics visibly distinct from completed content.

## Attribution

See [SOURCES.md](SOURCES.md). Educational adaptations are CC BY-NC-SA 4.0; original application code is MIT licensed. MIT OCW and separately credited third-party materials retain their terms. This project is not endorsed by MIT or CFA Institute.
