# Friend / Client Handoff Guide

## Project Purpose

This is a premium Gurgaon-focused property dealer website with:

- buy listings
- rent listings
- locality pages
- property detail pages
- WhatsApp-first lead flow
- Google Sheets lead storage
- hidden admin page

## Main Website

Live website:

- `https://business-template-dealer-5wodzkk90-astraoracle-5510s-projects.vercel.app`

Main public routes:

- `/`
- `/buy`
- `/rent`
- `/localities`
- `/contact`
- `/sell`

## Hidden Admin

Admin route:

```text
/admin-a7f9k2x
```

Live admin link:

```text
https://business-template-dealer-5wodzkk90-astraoracle-5510s-projects.vercel.app/admin-a7f9k2x
```

Current admin password:

```text
ggndealer123
```

If you want to reset it, use the `Admin Security` section inside admin after login.

## How To Use Admin

### 1. Settings

Use this to change:

- business name
- phone
- WhatsApp number
- email
- address
- logo link
- hero image link
- Google Maps embed URL
- homepage hero headline
- homepage hero subheadline
- CTA text

### 2. Appearance

Use this to change:

- site theme preset
- button color

### 3. Admin Security

Use this to change:

- admin password

### 4. Properties

Use this to:

- add property
- edit property
- delete property

Each property supports:

- title
- locality
- price
- purpose
- image link
- gallery image links
- featured / verified

### 5. Localities

Use this to:

- add locality
- edit locality
- delete locality

### 6. Testimonials

Use this to:

- add testimonials
- edit testimonials
- delete testimonials

### 7. FAQ

Use this to:

- add FAQs
- edit FAQs
- delete FAQs

### 8. Lead Inbox

Use this to:

- view incoming leads
- filter leads
- open WhatsApp
- send options
- schedule visit
- mark contacted

## How Lead Flow Works

When a user submits a lead:

1. lead goes to Google Sheets
2. user can continue to WhatsApp
3. lead appears in Lead Inbox

## Image Rules

Use direct image links where possible.

Supported:

- normal image URLs
- Google Drive image links

## Google Maps Embed Rule

For the map field, use a Google Maps embed URL, not a normal share link.

Good:

```text
https://www.google.com/maps?q=DLF%20Cyber%20Hub%20Gurgaon&output=embed
```

## What Not To Touch

- do not change `.env` unless you understand deployment
- do not change Apps Script unless you know the backend-lite flow
- do not delete Google Sheet columns

## Safe Daily Usage

For normal use, only touch:

- admin settings
- properties
- localities
- testimonials
- FAQ
- lead inbox
