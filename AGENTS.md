# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved homepage direction

- Use the selected Chinese editorial mock as the visual source of truth.
- Default to Chinese; switching to English replaces the page copy rather than showing both languages together.
- Use one consistent sans-serif font stack with restrained weights.
- Preserve a wide, warm-white editorial layout with a New Zealand coast hero and fern-green accents.
- Keep consultation as a homepage entry only; do not show form fields on the homepage. Clicking the hero CTA navigates to an in-app consultation page (same pattern as guides/articles; no router yet).
- Consultation page keeps six visa-prep sections (passport, study plans, education, work, funds/statements, other) but only essential fields in each; ends with client-side Word download (`docx`); data is not uploaded.
- Home rows open in-app guide/article views (no router yet): study guide covers private/skills school shortlists + application timeline; career guide covers Seek/Trade Me job advice.
- Study school content focuses on AIS, ICL, Yoobee, NZSE/NZSEG (NESEG is usually a misspelling of NZSEG), and Future Skills-style private/skills providers with concrete NZD tuition ranges—not university rankings or “eight universities / high-value master’s” framing. Keep one comparison overview plus a dedicated deep-dive article per school (`school-ais`, `school-icl`, `school-yoobee`, `school-nzse`, `school-future-skills`). Be practical about NZQA level, PTE/IELTS/NZCEL pathways, Auckland rent, and “verify fees on official sites.” Article bodies live in `src/articles.js` as mixed blocks (headings, paragraphs, inline figures); regenerate with `node scripts/write-expanded-articles.mjs`. Life guide is a third homepage row; featured life article is the monthly living-cost budget (`nz-monthly-budget`) with approximate 2025–2026 NZD ranges (Auckland shared low/mid totals, cheaper cities noted, CNY rough note)—label figures as approximate and verify locally.
- Consultation “intended level” options include language/pathway, diploma, bachelor, graduate diploma, master’s (硕士), and other.
- Brand logo is a modern horizontal lockup: koru mark (unfurling NZ fern spiral with two inner dots for 点点) + `点点` + thin divider + `新西兰留学咨询`. English: `DianDian` / `NZ Study Consulting`. Mark is inline SVG (`src/LogoMark.jsx`), fern green `#315824`; files also live at `public/logo-mark.svg` and `public/favicon.svg`.
- Hero typography stays soft editorial sans (Manrope + Noto Sans SC, weight 600). A light paper mist gradient on the left of the coast photo keeps type readable without hard contrast against the landscape.
- Homepage author/contact block shows email `yuditawang0925@gmail.com` as a mailto link under the bio.
