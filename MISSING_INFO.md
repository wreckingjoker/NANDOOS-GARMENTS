# Missing Information — Client Checklist

The following information is not yet available and is needed to complete the website. All sections are built with graceful fallbacks until this data is provided.

## ⚠️ Required from Client

| # | Field | Where it's Used | Current Fallback |
|---|-------|-----------------|-----------------|
| 1 | **Phone number** | Contact page CTA, Footer | "Call us in-store" placeholder button |
| 2 | **Full weekly hours** (Tue–Sun) | Contact page, Footer | "Full hours not yet confirmed — please check Google Maps" |
| 3 | **Website URL** | Navbar, Footer, SEO meta | Not shown |
| 4 | **Social media handles** (Instagram, Facebook, WhatsApp) | Footer, potential social links | Hidden until provided |
| 5 | **Men's Wear confirmation** | Men's Wear page | Page built, verify product categories are correct |
| 6 | **Closing time on Monday** | Contact page | Currently shows "9:30 AM onwards" (no closing time) |

## 📸 Photos Required

| # | Photo | Used In | Notes |
|---|-------|---------|-------|
| 7 | Store exterior / storefront | Home hero, About hero | Landscape, minimum 1920×1080px |
| 8 | Kids wear category image | Home categories grid, Kids Wear hero | Wide format |
| 9 | Ladies wear category image | Home categories grid, Ladies Wear hero | Wide format |
| 10 | Traditional wear / dhoti image | Home categories grid, Traditional Wear hero | Kerala traditional setting preferred |
| 11 | Men's wear category image | Home categories grid, Men's Wear hero | Wide format |
| 12 | **48 product photos** (12 per category) | All category pages | 4:5 portrait ratio, min 400×500px per product |

## How to Update Once Info is Received

1. **Phone number** → update `src/data/brand.json` → set `"phone": "+91XXXXXXXXXX"` → the Contact page renders it automatically
2. **Hours** → update `src/data/brand.json` → set each day's value in `hours` object
3. **Social links** → update `src/data/brand.json` → set `"social": { "instagram": "...", "facebook": "..." }` → then add social icons to Footer.jsx
4. **Product photos** → place in `public/images/{kids,ladies,traditional,mens}/` → update image URLs in `src/data/brand.json`
5. **Category/hero photos** → place in `public/images/` → update `CATEGORY_META` in `src/pages/Home.jsx` and each category page

All `// TODO:` comments in the codebase mark exact locations to update.
