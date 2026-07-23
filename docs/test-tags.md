# Test Tags

This project uses Playwright tags in test titles to support selective execution with `--grep`.

## Available Tags

- `@smoke`: critical and fast validation tests.
- `@regression`: broader functional coverage.
- `@ui`: page-level UI validation tests.
- `@e2e`: end-to-end user journeys.
- `@login`: login scenarios.
- `@inventory`: inventory scenarios.
- `@cart`: cart scenarios.
- `@checkout`: checkout scenarios.

## Usage

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Run checkout tests:

```bash
npm run test:checkout
```

Run by tag directly:

```bash
npx playwright test --grep "@ui"
npx playwright test --grep "@e2e"
```

