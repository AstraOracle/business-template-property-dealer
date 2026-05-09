# Staging Setup

This project can use a simple Vercel preview deployment as a staging environment.

## Goal

Use staging to test:
- content changes
- admin login
- lead form flow
- lead inbox
- visual changes

before touching production.

## Recommended Setup

### 1. Create a staging branch

Use a branch like:

```text
staging
```

or:

```text
develop
```

### 2. Connect the repo to Vercel

If the repo is already connected, Vercel will automatically create preview deployments for non-production branches and pull requests.

### 3. Add staging environment variables in Vercel

Use values from:

- [.env.staging.example](C:\Users\vipin\OneDrive\Desktop\business-template-dealer\.env.staging.example)

At minimum set:

```text
VITE_GOOGLE_APPS_SCRIPT_URL
VITE_ADMIN_APPS_SCRIPT_URL
```

You can point staging to:
- a separate staging Apps Script deployment
- or the same backend if you are only testing UI

Best practice:
- use a separate staging Google Sheet + Apps Script deployment

### 4. Use a separate staging backend

Recommended:
- duplicate the Google Sheet
- duplicate the Apps Script deployment
- connect staging Vercel env vars to that staging Apps Script URL

This avoids polluting production leads and settings while testing.

## Running Staging Smoke Tests

Set your preview URL in PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL="https://your-staging-url.vercel.app"
```

Then run:

```powershell
npm run test:e2e:staging
```

## Updating Visual Baselines

For local mocked visual snapshots:

```powershell
npm run test:e2e:visual:update
```

Use this only when intentional UI changes are approved.

## Suggested Release Flow

1. Work on feature branch
2. Open PR
3. Let GitHub CI pass
4. Check Vercel preview/staging deployment
5. Run:
   - `npm run test:e2e:staging`
6. Manually test:
   - homepage
   - contact form
   - seller form
   - admin login
   - lead inbox
7. Merge to `main`
8. Let production deploy

## Simple Rule

- `main` = production
- `staging` or PR preview = safe place to test
