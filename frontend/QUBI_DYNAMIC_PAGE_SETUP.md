# Qubi Agentic AI Platform - Dynamic Page Setup Guide

## Purpose
This guide explains how to make the Qubi page render dynamic content from WordPress instead of fallback static components.

## What is broken?
- The frontend is expecting ACF flexible content from the `page_sections` field.
- The WordPress page currently has no rows in that field.
- As a result, the app falls back to static content.

## Step-by-step Fix

### 1. Open the WordPress page editor
1. Log in to WordPress admin.
2. Go to **Pages → Qubi (Agentic AI Platform)**.
3. Scroll down to the ACF section and find the field labeled **Page Sections**.

### 2. Add one or more sections
1. Click **Add Row** inside `page_sections`.
2. For each new row, choose one of the supported section layouts.
3. Save the page after adding the rows.

### Supported section layouts
- `qubi_banner_section` — Hero banner with title, subtitle, button, image.
- `problem_section` — Problem statement section.
- `capabilities_section` — Capabilities showcase.
- `outcomes_section` — Outcomes/results section.
- `how_it_works_section` — How it works process.
- `use_cases_section` — Use cases showcase.
- `integrations_section` — Integrations section.
- `human_in_loop_section` — Human-in-loop section.
- `analytics_section` — Analytics section.
- `cta_section` — Call to action section.

### 3. Fill required fields for each section
Example for `qubi_banner_section`:
- **Title**: Main headline.
- **Sub Title**: Supporting line.
- **Description**: Body copy.
- **Button URL**: Destination link.
- **Button Title**: Link label.
- **Image**: Upload or select an image.

For every section type, make sure required fields are populated before saving.

### 4. Save the page
1. Click **Update** or **Publish**.
2. Wait for WordPress to confirm the page is saved.

### 5. Reload the frontend page
1. Open http://localhost:3001/solutions/qubi-agentic-ai-platform.
2. Refresh the browser.
3. If dynamic sections are present, the fix is complete.

## Frontend change checklist
If the page still uses static content, apply these frontend checks:
1. Confirm `page.js` fetches page data from the WordPress API.
2. Confirm the fetched page data includes `acf.page_sections`.
3. Confirm `QubiNext15Client.js` receives the page data and maps `acf_fc_layout` values to section components.
4. Confirm the section components (for example, `components/HeroSection.js`) are rendering their props from ACF data.
5. Confirm the frontend is not hardcoded to a static fallback when `page_sections` is empty.
6. Clear build caches if needed and restart the dev server after code changes.

## Quick verification
Look in the browser console for these logs:
- `✅ ACF page_sections found: X sections`
- `🎯 First section layout: qubi_banner_section`

If you do not see those logs, the page is still missing ACF section rows.

## Troubleshooting

### If no sections appear
- Confirm the field name is exactly `page_sections` in ACF.
- Confirm the page has rows in the `page_sections` field.
- Save the page again.
- Clear browser cache and reload.

### If you see "unknown layout type"
- Confirm the layout names match the supported list above.
- Make sure the flexible content row type is not misspelled.

## Notes for the team
- The frontend depends on WordPress ACF data.
- Static content is only shown when `page_sections` is empty.
- Adding rows in WordPress is the required fix.

## Environment details
- WordPress API: `https://qbadevadmin.unitdtechnologies.com/wp-json`
- Fetch endpoint: `/wp/v2/pages?slug=qubi-agentic-ai-platform`
- Local dev server: `http://localhost:3001`
