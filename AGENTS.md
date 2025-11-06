# AGENTS.md — Working Agreement for Code Assistant

## Agent Operating Rules (Always)

* **Create a To‑Do plan** before work begins and keep it current.
* **Always use bash** to run codes.
* **Only use context needed from codebase** to avoid too much input tokens.
* **Only change what is neccesary** and don't make unneccessary chnages to reduce input and output tokens.
* **Summarize context when needed** do this efficiently while not loosing any context whatsoever.
* **Run the code after done with changes** and ensure **no lint/type/test errors**. Required checks: `npm run build`, `npm run lint`, `npm run test`. If a script is missing, call it out in the report and help add it.
* **Hunt deprecations & vulnerabilities** on every change set; fix or document:
  * `npm audit --production`, `npm outdated`, review build warnings.
  * Replace deprecated APIs; pin versions and note migrations in `CHANGELOG.md`.
* **Follow industry standards** for naming, folder layout, and patterns. Prefer conventional React/TypeScript practices (see below). Do not invent one‑off structures.

---

## Product Snapshot

PythonQuest is a Vite + React single-page application that delivers a Duolingo-style Python learning experience. Learners explore a dashboard, unlock nodes on an interactive skill map, complete guided lessons with an in-browser editor, and receive AI-generated hints powered by Google Gemini. Gamification features include XP, gems, streaks, daily quests, and a leaderboard.

---

## Tech Stack & Integrations

- React 19 with TypeScript running on Vite 6.
- TailwindCSS is loaded via CDN in `index.html`; the global palette defines PythonQuest’s dark UI.
- `@google/genai` powers AI tutoring via `services/geminiService.ts`. Requires a `GEMINI_API_KEY` (store in `.env.local`, never commit secrets).
- `stitch_design_system_foundations_spacing_elevation/` contains design assets only—treat as read-only reference.

---

## Repository Structure (source of truth)

```
.
├─ App.tsx                              # Root component controlling navigation & player progression
├─ components/                          # UI surfaces: dashboard, learning path, lesson, profile, leaderboard, settings, sidebar
├─ constants.tsx                        # Static UI data: icons, quest graph, lessons, leaderboard mocks
├─ services/                            # External service clients (Gemini hint/error helpers)
├─ types.ts                             # Shared TypeScript models for user, quests, nodes, lessons
├─ index.tsx                            # React/DOM entry point
├─ index.html                           # Vite shell, Tailwind config, import map
├─ metadata.json                        # AI Studio metadata describing the app
├─ stitch_design_system_foundations_spacing_elevation/  # Design mockups (do not modify)
└─ package.json                         # Scripts and dependency manifest
```

---

## Feature Architecture Notes

- **Navigation & State**: `App.tsx` manages active views (`View` union) and lesson lifecycle. Sidebar navigation (`components/Sidebar.tsx`) handles switching and displays user stats.
- **Dashboard**: `components/Dashboard.tsx` presents streaks, daily quests, and quick practice prompts; data comes from `constants.tsx`.
- **Learning Path**: `components/LearningPath.tsx` builds an SVG graph from `LEARNING_NODES` and `LEARNING_EDGES`. Keep node grid alignment (x: 10rem, y: 6rem) when adding content.
- **Lesson Experience**: `components/LessonView.tsx` offers an editor, output pane, fake test runner, and AI hint/error flows. Use caution with `new Function`; sanitize inputs where possible.
- **Profile & Settings**: Presentational components maintaining Tailwind typography hierarchy; toggles manage local UI state only.
- **Leaderboard**: Highlights mock rankings (`LEADERBOARD_DATA`) and the current player.
- **Services**: `services/geminiService.ts` wraps Gemini requests, handles missing keys gracefully, and enforces tutor-style responses. Mock these interactions in tests.
- **Icons & Tokens**: Inline SVG icons live in `constants.tsx`. Reuse existing tokens or centralize new ones to avoid duplication.

---

## Standard Workflows

**Install**
* `npm install` (or `npm ci` when lockfile present)

**Develop**
* `npm run dev`

**Build**
* `npm run build`

**Lint & Types**
* `npm run lint` (add ESLint + TS config if missing)

**Tests**
* `npm run test` (introduce Vitest/Jest for lesson logic and UI states)

---

## Coding Standards

**TypeScript/React**

* 2‑space soft tabs; strict TypeScript types.
* Imports ordered: react → third‑party → local.
* Components/hooks/contexts: **PascalCase**; utilities: **camelCase**; constants: **SCREAMING_SNAKE_CASE**.
* Styling: Tailwind utility classes ordered `layout → spacing → color → state`. Align custom colors with the Tailwind config in `index.html`.
* When expanding features, update shared definitions in `types.ts` and mock data in `constants.tsx` to keep UI in sync.

---

## Testing Guidance

* Co-locate tests beside components (`ComponentName.test.tsx`). Stub Gemini service calls for deterministic results.
* Prefer deterministic fixtures for quests, user data, and leaderboard entries. Avoid brittle snapshots.
* Cover lesson evaluation flows, navigation state transitions, and edge cases (locked nodes, completed quests). Add coverage (`npm run test -- --coverage`) for critical logic.
* Manual QA checklist: switch sidebar views, start a lesson, run code, submit tests, trigger AI hint/error explanations, and verify XP/gem updates.

---

## Security & Maintenance

* Never commit `.env`; maintain `.env.example` documenting required vars (`GEMINI_API_KEY`).
* Run `npm audit --production` regularly; file issues for any high/critical findings.
* Watch for build/test warnings (especially around dynamic code execution) and migrate off deprecated APIs promptly.
* Treat the design assets folder as read-only reference material.
* Document notable UX, data model, or AI prompt changes in `CHANGELOG.md`, providing migration tips when constants or lesson schemas evolve.
