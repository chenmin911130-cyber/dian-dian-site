# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved homepage direction

- Homepage merges template visuals with the deployed information structure: full-viewport Wanaka landscape hero (That Wanaka Tree still, navy overlay, warm-white title, lake-blue pill CTA), then the original three editorial rows (栏目介绍｜图片｜精选文章), then a dark contact panel. Do not add agency extras (why-NZ cards, journey timeline, school logo wall, plan snapshot, stats). Guide, article, consult and 404 pages share the same cinematic shell: landscape background, dark header, and a deep-navy reading/form panel. Keep their existing content structure.
- Homepage header is light-on-dark (weight 600) with a lake-blue `填写留学咨询` pill; inner pages use the same dark masthead (not a paper strip). Compact screens use Logo + CTA + menu instead of inline nav.
- Hero includes a one-line service description: 面向计划赴新西兰留学的学生，提供选校、申请材料与落地建议。 CTA copy is unified as `填写留学咨询` (header, hero, and consult entry).
- Mobile header is Logo (horizontal lockup, tagline hidden) + `填写留学咨询` + Menu. Do not squeeze 留学 / 求职 / 生活 / language into one row. Primary controls stay at least 44px tall.
- Default to Chinese; switching to English replaces the page copy rather than showing both languages together.
- Use one consistent sans-serif font stack with restrained weights (Manrope + Noto Sans SC).
- Keep consultation as a homepage entry only; do not show form fields on the homepage. Hero/header CTAs navigate to the in-app consultation page.
- Do not invent agency-scale claims (student headcount, offer rates, phone numbers). Contact remains WeChat / Douyin QR plus email.
- Consultation page keeps four visa-prep sections (passport, study plans, education, work) with only essential fields in each; ends with client-side Word download (`docx`); data is not uploaded. Do not add funds/statements or other-visa sections back onto the form.
- Home rows open in-app guide/article views: study guide covers private/skills school shortlists + application timeline; career guide covers Seek/Trade Me job advice.
- Study school content focuses on AIS, ICL, Yoobee, NZSE/NZSEG (NESEG is usually a misspelling of NZSEG), and Future Skills-style private/skills providers with concrete NZD tuition ranges—not university rankings or “eight universities / high-value master’s” framing. Keep one comparison overview plus a dedicated deep-dive article per school (`school-ais`, `school-icl`, `school-yoobee`, `school-nzse`, `school-future-skills`). Be practical about NZQA level, PTE/IELTS/NZCEL pathways, Auckland rent, and “verify fees on official sites.” Article bodies live in `src/articles.js` as mixed blocks (headings, paragraphs, inline figures); regenerate with `node scripts/write-expanded-articles.mjs`. Life guide is a third homepage row; featured life article is the monthly living-cost budget (`nz-monthly-budget`) with approximate 2025–2026 NZD ranges (Auckland shared low/mid totals, cheaper cities noted, CNY rough note)—label figures as approximate and verify locally.
- Consultation “intended level” options include language/pathway, diploma, bachelor, graduate diploma, master’s (硕士), and other.
- Brand logo is a modern horizontal lockup: koru mark (unfurling NZ fern spiral with two inner dots for 点点) + `点点` + thin divider + `新西兰留学咨询`. English: `DianDian` / `NZ Study Consulting`. Mark is inline SVG (`src/LogoMark.jsx`). Site chrome is lake blue (`#2f6fa3` / `#3d7eac` pills, icy `#9ec9e6` accents) to match Lake Wānaka; files also live at `public/logo-mark.svg` and `public/favicon.svg`.
- Hero typography stays soft editorial sans (Manrope + Noto Sans SC, weight 600). On the homepage, a navy cinematic gradient (not paper mist, not olive) keeps white type readable over the lake without crushing the blue sky.
- Homepage hero uses a high-res still of That Wanaka Tree (`public/images/hero-wanaka.jpg`, Pexels / Inspire Media Works) behind the existing HTML title/CTA. Add a light cinematic loop on the still: slow Ken Burns drift, drifting mist, soft sun-ray sway, and rising light motes. Honor `prefers-reduced-motion` by freezing the still. Do not bake title, CTA, or QR codes into the photograph, and do not play the old coast video over this scene.
- Below the hero (editorial rows, contact, inner pages) use the same Wanaka still with the lonely tree cropped out (`public/images/page-wanaka.jpg`): lake, snow mountains, and sky only. Keep the lone tree in the hero only.
- Contact: homepage author note shows WeChat QR (`点点（好运版）`) and Douyin QR (`@点点儿 Yudita`, ID `21726717`); inner-page footers show the same two codes. Do not put the Auckland + email block back in the footer. Email remains in the author note and consultation page.
- Homepage contact panel uses the same cool navy glass as the cinematic overlay (not a saturated teal or fern-green card). Portrait + bio + email on the left; WeChat/Douyin as a compact QR pair on the right.
