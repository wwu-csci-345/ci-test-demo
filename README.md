# CSCI 345 CI Demo

A small TypeScript project for practicing unit tests, feature branches, pull requests, and continuous integration (CI).

The code is a `ShoppingCart` class (`src/cart.ts`) with Vitest unit tests (`test/`). Every push to `main` and every pull request runs the same checks on GitHub Actions.

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run check
```

## Scripts

| Command | What it does |
|---|---|
| `npm run typecheck` | Type-checks the code with `tsc --noEmit` |
| `npm run lint` | Lints the code with ESLint |
| `npm test` | Runs the unit tests once with Vitest |
| `npm run test:watch` | Re-runs tests whenever a file changes |
| `npm run coverage` | Runs the tests and prints a coverage report |
| `npm run check` | Type check, lint, then test (the same steps CI runs) |

## Continuous integration

The workflow is in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push to `main` and every pull request, GitHub starts a fresh Ubuntu machine and runs:

1. Check out the code
2. Set up Node.js
3. `npm ci` (install exactly what `package-lock.json` lists)
4. `npm run typecheck`
5. `npm run lint`
6. `npm test`

The run stops at the first failing step, and the result appears as a check on the pull request.

## Workflow

1. `git switch main && git pull`
2. `git switch -c feature/<short-name>`
3. Make small commits, and run `npm run check` before you push
4. `git push -u origin feature/<short-name>` and open a pull request
5. Wait for CI to pass and for a review
6. Squash and merge, then delete the branch
