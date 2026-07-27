# Contributing

Thanks for taking the time to contribute! This guide covers everything you need
to get set up and land a change.

By participating in this project, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md).

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3.14`

## Local Setup

```bash
# Fork and clone the repo
git clone https://github.com/<your-username>/mama_parichay.git
cd mama_parichay

# Install dependencies (also sets up Husky git hooks automatically)
bun install

# Start the development server
bun dev
```

The app runs at `http://localhost:3000`.

---

## Branching

We follow the strategy documented in [`BRANCHING.md`](BRANCHING.md). In short:

- Branch off `develop`, **never** off `main`
- Name branches `type/short-description` (e.g. `feature/user-auth`, `fix/login-redirect`)
- Open pull requests against `develop`, not `main`

---

## Commit Messages

Commit messages **must** follow [Conventional Commits](https://www.conventionalcommits.org/).
This is enforced by commitlint on every commit via a Husky hook.

```
type(optional-scope): short summary

[optional body]
```

Common types: `feat`, `fix`, `chore`, `refactor`, `docs`, `perf`, `test`.

Examples:

```
feat(auth): add password reset flow
fix: prevent duplicate form submission
docs: update setup instructions
```

---

## Code Style

Linting runs automatically on every commit via Husky. To run it yourself:

```bash
bun lint       # ESLint + Stylelint
bun lint:fix   # auto-fix where possible
```

- **ESLint** enforces TypeScript and Vue rules
- **Stylelint** enforces SCSS rules
- No `console.log` or `debugger` statements in committed code
- No hardcoded secrets or API keys — use environment variables (see `.env.example`)

---

## Opening a Pull Request

1. Make sure `bun lint` passes and the app builds (`bun build`).
2. Push your branch and open a PR against `develop`.
3. Fill out the [pull request template](pull_request_template.md) completely.
4. Link any related issues.
5. A maintainer (see [CODEOWNERS](CODEOWNERS)) will be requested for review automatically.

Keep PRs focused — one logical change per PR is easier to review and merge.

---

## Reporting Bugs & Requesting Features

Use the issue templates:

- 🐛 [Bug report](ISSUE_TEMPLATE/bug_report.md)
- ✨ [Feature request](ISSUE_TEMPLATE/feature_request.md)
- 🧹 [Chore](ISSUE_TEMPLATE/chore.md)

For security issues, please **do not** open a public issue — see our
[Security Policy](SECURITY.md).

---

Thanks again for contributing! 🎉
