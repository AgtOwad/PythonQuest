<div align="center">
  <img
    width="1200"
    height="475"
    alt="PythonQuest Banner"
    src="./assets/images/PythonQuest Banner.png"
  />
</div>

# PythonQuest

PythonQuest is a Duolingo-style Python learning experience that combines interactive lessons, gamified progression, and AI-powered coaching. Learners explore a skill tree, complete unit-tested coding challenges in an in-browser editor, and earn XP, gems, and streak bonuses as they progress.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [AI Tutor Integration](#ai-tutor-integration)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Interactive dashboard** with streak tracking, daily quests, and quick practice prompts.
- **Skill map learning path** that visualizes lesson dependencies and progress across core Python topics.
- **In-browser lesson workspace** with a code editor, runtime output, unit tests, and AI hint/error explanations.
- **Gamification hooks** including XP, gems, leaderboard rankings, and quest rewards.
- **Google Gemini integration** delivering contextual hints and error breakdowns tailored to the learner’s code.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6
- **Styling:** TailwindCSS (via CDN configuration in `index.html`)
- **AI Services:** `@google/genai` (Gemini 2.5 models)
- **Package Management:** npm

---

## Getting Started

### Prerequisites

- Node.js 18+ (includes npm)
- A Google Gemini API key with access to the `gemini-2.5-flash` model

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root with your credentials:

```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
```

Never commit secrets—keep `.env.local` out of version control.

### Running Locally

```bash
npm run dev
```

The application will be available at the URL provided by Vite (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
```

The optimized output is emitted to the `dist/` directory. Use `npm run preview` to serve the production build locally.

---

## Available Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start the Vite development server with HMR       |
| `npm run build`    | Generate a production build in `dist/`           |
| `npm run preview`  | Preview the production build locally             |

Linting and unit test scripts are not yet configured—add ESLint/Vitest (or preferred tooling) to extend this table.

---

## Project Structure

```
.
├─ App.tsx                              # Root component managing view state and progression
├─ components/                          # Feature surfaces (dashboard, learning path, lesson, profile, etc.)
├─ constants.tsx                        # Static data: icons, lesson metadata, quest graph, leaderboard entries
├─ services/                            # External integrations (Gemini tutoring helpers)
├─ types.ts                             # Shared TypeScript models for user, lessons, quests, and nodes
├─ index.tsx                            # React entry point
├─ index.html                           # Vite HTML shell and Tailwind configuration
├─ assets/images/                       # Marketing and UI imagery (e.g., repository banner)
├─ metadata.json                        # Deployment metadata for AI Studio
└─ stitch_design_system_foundations_spacing_elevation/  # Design mockups (read-only reference)
```

---

## AI Tutor Integration

AI prompts and responses flow through `services/geminiService.ts`, which:

- Wraps the `@google/genai` client for hint and error explanation generation.
- Guards against missing API keys, returning informative fallback messages.
- Enforces tutor-style guidance (encouraging tone, no full solutions).

When extending lessons or AI behaviors, keep prompts short, instructional, and resistant to prompt injection.

---

## Development Guidelines

- Keep UI consistent with the Tailwind palette defined in `index.html`.
- Add new lesson metadata and quest nodes through `types.ts` + `constants.tsx` to centralize content.
- Treat the design assets folder as read-only inspiration—do not version binary mockups in source control without review.

---

## Troubleshooting

- **Missing `index.css` warning:** The build currently references `/index.css`. Either add the stylesheet or remove the reference if unused to avoid Vite warnings.
- **AI features disabled:** Ensure `GEMINI_API_KEY` is set in `.env.local`. Without a key, AI hint and explanation buttons fall back to informative messages.
- **Large banner image not loading:** Confirm the README path `./assets/images/PythonQuest Banner.png` matches the actual filename (case-sensitive on most systems).

---

## License

License information has not yet been specified. All rights reserved until a license is chosen.
