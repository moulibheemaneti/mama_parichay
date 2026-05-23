# Project Name

> One-line description of what this project does.

---

## Tech Stack

- **Framework** — [Nuxt 4](https://nuxt.com)
- **Runtime** — [Bun](https://bun.sh)
- **Language** — TypeScript
- **Styling** — SCSS
- **Linting** — ESLint + Stylelint
- **Deployment** — Vercel

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3.14`

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/moulibheemaneti/mama_parichay.git
cd mama_parichay

# Install dependencies (also sets up Husky git hooks automatically)
bun install

# Start development server
bun dev
```

App runs at `http://localhost:3000`

---

## Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build locally |
| `bun lint` | Run ESLint across all files |
| `bun lint:fix` | Run ESLint and auto-fix issues |
| `bun lint:scss` | Run Stylelint across all SCSS files |
| `bun lint:scss:fix` | Run Stylelint and auto-fix issues |
| `bun typecheck` | Run TypeScript type check |

---

## Project Structure

```
.
├── app/
│   ├── assets/          # Static assets, global SCSS
│   ├── components/      # Vue components
│   ├── composables/     # Composition API composables
│   ├── layouts/         # Nuxt layouts
│   ├── pages/           # File-based routing
│   ├── plugins/         # Nuxt plugins
│   └── utils/           # Utility functions
├── public/              # Publicly served static files
├── server/              # Nitro server routes and middleware
├── .github/             # GitHub templates, Actions, CODEOWNERS
├── .husky/              # Git hooks
├── nuxt.config.ts       # Nuxt configuration
└── eslint.config.mjs    # ESLint configuration
```

---

## Git Workflow

See [`.github/BRANCHING.md`](.github/BRANCHING.md) for the full branching strategy.

**Quick summary:**
- Branch off `develop`, never off `main`
- Use `type/short-description` branch names (e.g. `feature/user-auth`)
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- Open a PR to `develop`, not `main`

---

## Code Style

- **ESLint** enforces TypeScript and Vue rules — runs on every commit via Husky
- **Stylelint** enforces SCSS rules — runs on every commit via Husky
- **commitlint** enforces commit message format — validated on every commit

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

> ⚠️ Never commit `.env` — it is gitignored.

---

## Deployment

This project is deployed on **Vercel**. Every push to `main` triggers a production deploy automatically.

---

## License

[MIT](LICENSE)
