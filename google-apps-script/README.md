# Google Apps Script Backend-Lite

This folder contains the deployable Google Apps Script code for the property dealer website.

## What It Handles

- public lead submission from the website
- admin data fetch for settings, properties, localities, testimonials, and FAQs
- admin save actions for editable sections
- lead inbox fetch
- lead status updates

## Deployment Flow

1. Create a Google Sheet with these tabs:
- `settings`
- `properties`
- `localities`
- `testimonials`
- `faqs`
- `leads`

2. Open [Google Apps Script](https://script.google.com/).

3. Create a new project and replace the default files with:
- [Code.gs](C:\Users\vipin\OneDrive\Desktop\business-template-dealer\google-apps-script\Code.gs)
- [appsscript.json](C:\Users\vipin\OneDrive\Desktop\business-template-dealer\google-apps-script\appsscript.json)

4. In Apps Script:
- go to `Project Settings`
- add a script property:
  - `SPREADSHEET_ID` = your Google Sheet ID

5. Deploy as Web App:
- `Execute as`: Me
- `Who has access`: Anyone

6. Copy the deployed URL.

## Frontend Environment Variables

Set these in your site deployment:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_ADMIN_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_ADMIN_LITE_PASSWORD=ggndealer123
```

You can use the same deployed Apps Script URL for both:
- public lead submission
- admin fetch/save

## Important Contract Notes

- frontend POSTs use `text/plain;charset=utf-8` with a JSON string body
- this avoids common browser preflight issues with Apps Script web apps
- public lead submission sends no `action`; Apps Script treats it as a lead save
- admin actions send an `action` field in the JSON body

## Available Actions

### GET

- `?action=fetch-admin-data`
- `?action=fetch-leads`

### POST

- lead submit:
  - no `action`
- admin save:
  - `action: "save-admin-section"`
- password update:
  - `action: "update-admin-password"`
- lead status update:
  - `action: "update-lead-status"`

## Sheets Schema

See:
- [sheets-schema.md](C:\Users\vipin\OneDrive\Desktop\business-template-dealer\google-apps-script\sheets-schema.md)

## Current Product Notes

- image management is link-based now, not file-upload based
- Google Drive image links can be pasted directly into admin
- the public site normalizes standard Drive share links into usable image URLs
