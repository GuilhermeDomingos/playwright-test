# Playwright Test Automation Framework

This project is a scalable UI test automation framework built with [Playwright](https://playwright.dev/) and TypeScript.

It uses the Page Object Model, custom fixtures, environment-based configuration, GitHub Actions CI, Playwright HTML reports, and Allure results.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv
- cross-env
- Allure Playwright
- GitHub Actions

## Project Structure

```txt
.
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- config/
|   `-- env/
|       `-- .env.example
|-- src/
|   |-- fixtures/
|   |-- pages/
|   `-- utils/
|-- tests/
|   |-- setup/
|   `-- ui/
|       |-- cart/
|       |-- inventory/
|       `-- login/
|-- playwright.config.ts
|-- package.json
`-- tsconfig.json
```

## Architecture

The framework follows a clean separation of responsibilities:

- `tests/`: test scenarios and assertions.
- `src/pages/`: Page Objects with locators and page actions.
- `src/fixtures/`: custom Playwright fixtures.
- `src/utils/`: shared utilities and environment loader.
- `config/env/`: environment-specific configuration files.

Assertions should stay inside `.spec.ts` files. Page Objects should expose locators, actions, and reusable page behavior.

## Environment Configuration

The active environment is controlled by `ENV_NAME`.

Example:

```bash
ENV_NAME=qa
```

The framework loads environment files from:

```txt
config/env/.env.{ENV_NAME}
```

For example:

```txt
config/env/.env.qa
config/env/.env.dev
```

Required variables:

```txt
BASE_URL=
API_URL=
USERNAME=
PASSWORD=
HEADLESS=
```

Only `.env.example` should be committed. Real environment files should remain local or be created in CI from secrets.

## Installation

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run UI tests against QA:

```bash
npm run test:ui
```

Run tests against DEV:

```bash
npm run test:dev
```

Run tests against QA:

```bash
npm run test:qa
```

Run headed mode:

```bash
npm run test:headed
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

## Reports

Open the Playwright HTML report:

```bash
npm run report
```

Generated artifacts:

```txt
playwright-report/
test-results/
allure-results/
```

These folders are ignored by Git.

## CI

The project includes a GitHub Actions workflow:

```txt
.github/workflows/playwright.yml
```

The CI runs on:

- push to `main`
- pull requests targeting `main`

It executes:

```bash
npm run test:ui
```

Required GitHub Secrets:

```txt
QA_BASE_URL
QA_API_URL
QA_USERNAME
QA_PASSWORD
```

The workflow creates `config/env/.env.qa` during execution and uploads Playwright and Allure artifacts.

## Test Design Guidelines

- Keep tests independent.
- Do not depend on the execution order of other tests.
- Use Page Objects for locators and actions.
- Keep `expect` assertions inside test files.
- Use fixtures to provide reusable page instances.
- Group tests by feature under `tests/ui`.
- Prefer readable behavior-based test names.

Example:

```txt
tests/ui/cart/cart.spec.ts
tests/ui/inventory/inventory.spec.ts
tests/ui/login/authentication.spec.ts
```

## Useful Commands

List tests:

```bash
npx playwright test --list
```

Run a specific test file:

```bash
npx playwright test tests/ui/cart/cart.spec.ts
```

Debug tests:

```bash
npx playwright test --debug
```

Open Playwright UI mode:

```bash
npx playwright test --ui
```
