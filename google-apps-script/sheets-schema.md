# Google Sheets Schema

Create these tabs in your spreadsheet.

## `settings`

Single-row sheet with headers:

```text
businessName
phone
whatsappNumber
email
address
heroHeadline
heroSubheadline
primaryCTA
secondaryCTA
logoUrl
heroImageUrl
mapEmbedUrl
adminPassword
themePresetId
themePrimaryColorOverride
```

## `properties`

Headers:

```text
id
slug
title
purpose
propertyType
city
locality
price
priceLabel
bedrooms
bathrooms
area
areaUnit
featuredImage
galleryImages
shortDescription
fullDescription
highlights
amenities
featured
verified
ctaMessage
```

Notes:
- `galleryImages`, `highlights`, and `amenities` should be stored as JSON arrays if entered manually
- example:
  - `["img1","img2"]`

## `localities`

Headers:

```text
id
slug
name
city
shortDescription
avgPriceLabel
idealFor
image
highlights
featured
```

Notes:
- `highlights` can be stored as a JSON array

## `testimonials`

Headers:

```text
id
name
location
role
quote
avatarImage
```

## `faqs`

Headers:

```text
id
question
answer
```

## `leads`

Headers:

```text
id
timestamp
sourcePage
leadType
inquiryType
propertyTitle
locality
city
budget
propertyType
expectedPrice
timelineToSell
name
phone
notes
businessName
requirement
status
```

Notes:
- new leads are appended automatically
- `status` defaults to `new`
- admin can update lead status from the Lead Inbox
