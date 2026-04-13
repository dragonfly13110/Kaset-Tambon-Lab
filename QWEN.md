# Kaset Tambon Lab - Context for Qwen Code

## Project Overview

A local agricultural laboratory management web application built with React + TypeScript.

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **UI Components:** Framer Motion (animations), Lucide React (icons)
- **AI Integration:** Google Gemini API (@google/genai)
- **Data Fetching:** Axios
- **Utilities:** date-fns, react-markdown, clsx, tailwind-merge

## Project Structure

```
Kaset-Tambon-Lab/
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── index.html           # HTML template
├── index.css            # Global styles
├── types.ts             # TypeScript type definitions
├── constants.tsx        # App constants
├── weatherData.ts       # Weather data utilities
├── components/          # React components
├── pages/               # Page components
└── public/              # Static assets
```

## Essential Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment Variables

- `GEMINI_API_KEY` - Google Gemini API key (required for AI features)

## Key Notes

- Uses path alias `@/*` for absolute imports
- No backend/database yet - currently frontend-only with Gemini API
- Data stored in local files (weatherData.ts) and potentially external APIs
- PostCSS + Tailwind CSS v4 for styling

## Architecture Decisions

- Component-based architecture with React 19
- TypeScript for type safety
- Vite for fast development and builds
- Tailwind CSS v4 for utility-first styling

## Git Workflow

- **Main branch:** `master` (production-ready only)
- **Feature branches:** `feature/name` (e.g., `feature/add-news-page`)
- **Fix branches:** `fix/name` (e.g., `fix/hero-alignment`)
- **PR size:** Keep under ~118 lines (median best practice)
- **Commit frequency:** At least 1 commit per hour of work
- **Commit message:** Use conventional commits (feat:, fix:, docs:, style:, refactor:, test:, chore:)
- **Merge strategy:** Squash merge for linear history

## Code Review Process

1. Create PR with description using `.github/PULL_REQUEST_TEMPLATE.md`
2. Run through `.github/CODE_REVIEW_CHECKLIST.md`
3. Get approval before merge
4. Delete branch after merge

## Best Practices (from claude-code-best-practice)

- Plan before coding (use plan mode)
- Keep PRs small and focused
- Review code systematically
- Verify before marking complete
- Auto-format on commit (Prettier + Husky)

## Git Hooks

- **pre-commit:** Auto-format + lint staged files (fast, runs on every commit)
- **pre-push:** Run full test suite (runs before `git push`)
- **Bypass hooks (emergency only):** `git commit --no-verify` or `git push --no-verify`
