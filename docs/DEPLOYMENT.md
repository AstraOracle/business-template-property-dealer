# Vercel Deployment Guide

## What You Need

- A GitHub account
- A Vercel account
- Your live Google Apps Script web app URL

Current live Apps Script URL:

```text
https://script.google.com/macros/s/AKfycbyJLjNSXy8GHK26zJ5ryIHkmWR4nFwN1LQ2S5t5jaod8Ubf7lvaqJkE-7wZrRvCE9k8TA/exec
```

## Step 1: Push This Project To GitHub

From the project root:

```powershell
git init
git add .
git commit -m "Initial property dealer site"
```

Create a new empty GitHub repo, then:

```powershell
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

## Step 2: Import Into Vercel

1. Open [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel should detect this as a Vite app automatically
4. Keep the root directory as the repo root
5. Click `Deploy`

Official references:
- [Project settings](https://vercel.com/docs/project-configuration/project-settings)
- [Deploy with the CLI](https://vercel.com/docs/cli/deploy)

## Step 3: Add Environment Variables

In Vercel:

1. Open your project
2. Go to `Settings`
3. Open `Environment Variables`
4. Add these variables for Production, Preview, and Development

```text
VITE_GOOGLE_APPS_SCRIPT_URL
VITE_ADMIN_APPS_SCRIPT_URL
VITE_ADMIN_LITE_PASSWORD
```

Use these values:

```text
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyJLjNSXy8GHK26zJ5ryIHkmWR4nFwN1LQ2S5t5jaod8Ubf7lvaqJkE-7wZrRvCE9k8TA/exec
VITE_ADMIN_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyJLjNSXy8GHK26zJ5ryIHkmWR4nFwN1LQ2S5t5jaod8Ubf7lvaqJkE-7wZrRvCE9k8TA/exec
VITE_ADMIN_LITE_PASSWORD=ggndealer123
```

Important:
- When you change environment variables, redeploy the project

Official reference:
- [Environment variables](https://vercel.com/docs/environment-variables)
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)

## Step 4: Redeploy

After adding env vars:

1. Open `Deployments`
2. Redeploy the latest build

## Step 5: Test The Live Site

Check:

- homepage loads
- `/contact` loads
- `/buy` loads
- `/rent` loads
- `/localities` loads
- `/admin-a7f9k2x` opens
- admin login works
- contact lead form submits
- WhatsApp button opens correctly
- map shows on contact page

## Step 6: Add A Custom Domain Later

If you buy a domain:

1. Open Vercel project
2. Go to `Settings`
3. Open `Domains`
4. Add your domain

Example:

```text
urbancrestrealty.in
www.urbancrestrealty.in
```

## Free Hosting Notes

This stack is practical for free hosting because:

- frontend can run on Vercel free plan
- backend-lite uses Google Apps Script
- data lives in Google Sheets

But remember:

- Apps Script has quotas
- Vercel free is fine for demo/small business traffic
- for a real production business, monitor lead volume and uptime
