# CLAUDE.md — Nandus Garments Website Builder

## Project Overview

You are operating inside the **WAT Framework (Workflows, Agents, Tools)** for a textile/clothing brand website project. Your mission is to build a stunning, mobile-first marketing website for **Nandus Garments** (നന്ദുസ് ഗാർമെൻ്റ്സ്) — a Thodupuzha-based clothing store — using **Framer**-style motion design and **21st.dev** component blocks, assembled into a polished React + Tailwind site.

---

## The WAT Architecture

### Layer 1 — Workflows (`workflows/`)

Markdown SOPs stored in `workflows/`. Each workflow defines the objective, required inputs, which tools to use and in what order, expected outputs, and edge case handling. Read the relevant workflow before taking any action. Never overwrite workflow files unless explicitly instructed.

### Layer 2 — Agent (You)

You are the decision-maker and orchestrator. Read the workflow → sequence the tools → recover from errors → improve the system. Never attempt execution-layer work directly — delegate to tools.

### Layer 3 — Tools (`tools/`)

Scripts and component-fetchers in `tools/` that handle deterministic execution (component installation via `npx shadcn`, image optimization, content injection). API keys (if any, e.g. Anthropic API for AI copy generation) stored exclusively in `.env`. Never hardcode secrets anywhere else.

---

## Tech Stack

| Layer                   | Choice                                                          |
| ----------------------- | --------------------------------------------------------------- |
| Frontend Framework      | React + Vite                                                    |
| Styling                 | Tailwind CSS                                                    |
| UI Components           | 21st.dev registry (shadcn/ui-based, installed via `npx shadcn`) |
| Motion / Polish         | Framer Motion                                                   |
| Icons                   | lucide-react                                                    |
| Maps                    | Google Maps embed                                               |
| Forms (contact/enquiry) | Local state → mailto / WhatsApp link (no backend)               |
| Deploy                  | Vercel or Netlify                                               |

---

## Project File Structure

nandus-garments-site/

├── public/

│ └── images/ # Storefront, product, banner images

├── src/

│ ├── components/

│ │ ├── Hero.jsx # Bilingual hero (EN + ML)

│ │ ├── About.jsx # Brand story section

│ │ ├── Categories.jsx # Kids / Ladies / Traditional / Men's

│ │ ├── Highlights.jsx # Why Choose Us

│ │ ├── Testimonials.jsx # Review cards from Google data

│ │ ├── LocationMap.jsx # Embedded map + address + hours

│ │ ├── Navbar.jsx

│ │ └── Footer.jsx

│ ├── ui/ # 21st.dev installed components live here

│ ├── data/

│ │ └── brand.json # Centralized brand data (see below)

│ ├── App.jsx

│ ├── main.jsx

│ └── index.css

├── CLAUDE.md # This file

├── package.json

├── tailwind.config.js

└── vite.config.js

---

## Core Build Journey

1. Agent reads `brand.json` (centralized source of truth for all brand facts)
2. Agent identifies which 21st.dev components fit each section (hero, cards, testimonial grid, map/footer)
3. Agent installs components via `npx shadcn@latest add <21st.dev-url>`
4. Agent wires real brand data into each component — **never placeholder/lorem ipsum** for shipped sections
5. Agent layers Framer Motion for scroll-reveal, hover, and hero entrance animations
6. Agent verifies mobile responsiveness (primary use case — local searches are mobile-heavy)
7. Agent flags any missing data fields (phone, full week hours, social links, website) instead of inventing them

---

## Workflows

### Workflow: New Section Build

1. Run `read_brand_data` on `src/data/brand.json` to pull relevant fields
2. Identify a matching 21st.dev component category (Hero, Card, Testimonial, Footer, Map block)
3. Fetch component via `npx shadcn@latest add "https://21st.dev/r/<author>/<component>"`
4. Run `inject_brand_content` — replace all placeholder text/images with real brand data
5. Apply Framer Motion wrapper (fade/slide on scroll) per `motion_presets.js`
6. Visually verify on mobile (375px) and desktop (1440px) viewports

### Workflow: Component Sourcing (21st.dev)

1. Search 21st.dev community/registry for the needed block type (e.g. "ecommerce hero", "testimonial grid", "store locator footer")
2. Prefer components with multiple live demos and recent activity
3. Copy the `npx shadcn` install command — never hand-copy raw component code unless install fails
4. After install, review the component file for hardcoded text/icons and strip to brand data
5. Document the source URL of each installed component in `tools/component_log.md` for future re-styling

### Workflow: Missing Data Handling

1. If a required field (phone, full weekly hours, website, social handles, men's wear confirmation) is `null` in `brand.json`
2. Render the section with a graceful fallback (e.g. "Call us in-store" instead of a phone link, or hide the field entirely)
3. Add a `// TODO: client to provide` comment at the exact line
4. Never invent phone numbers, links, or business hours
5. Compile a single "Missing Info" checklist at the end of the build for the client

### Workflow: Error Recovery (Self-Improvement Loop)

1. Read the full error and traceback carefully
2. Fix the script and retest before proceeding
3. If a fix requires a new paid tool/service — stop and confirm with the user first
4. Document the fix in the relevant workflow file
5. Continue with a more robust approach

---

## Brand Data (`src/data/brand.json`)

```json
{
  "name_en": "Nandus Garments",
  "name_ml": "നന്ദുസ് ഗാർമെൻ്റ്സ്",
  "category": "Clothing Store",
  "rating": 4.0,
  "review_count": 6,
  "address": "Ground Floor, Karottumadam Building, Temple Bypass Road, near Municipal Park, Thodupuzha, Kerala 685584",
  "plus_code": "VPX6+GW Thodupuzha, Kerala",
  "hours": {
    "monday": "9:30 AM - (closing time unknown)",
    "tuesday": null,
    "wednesday": null,
    "thursday": null,
    "friday": null,
    "saturday": null,
    "sunday": null
  },
  "phone": null,
  "website": null,
  "social": null,
  "specialties": [
    "Economical pricing",
    "Wide variety for kids and ladies",
    "Dhotis from Kuthampully",
    "Collections for all age groups"
  ],
  "categories": [
    "Kids Wear",
    "Ladies Wear",
    "Traditional Wear (Dhotis)",
    "Men's Wear"
  ],
  "testimonials": [
    {
      "text": "A economical shop with variety of collections for kids and ladies. They have good collection of doothies from Kuthampulli",
      "author": "Hariharakumar Ramanathan",
      "role": "Local Guide",
      "rating": 5
    },
    {
      "text": "Good collections of all varieties of clothes for all age groups",
      "author": "Sreedharan Nampoothiri S",
      "role": "Local Guide",
      "rating": 5
    }
  ]
}
```

---

## Site Sections & 21st.dev Component Mapping

| Section      | Suggested 21st.dev Category                | Notes                                                  |
| ------------ | ------------------------------------------ | ------------------------------------------------------ |
| Navbar       | Navigation / Navbar block                  | Logo (EN+ML), sticky on scroll                         |
| Hero         | Hero / Landing block with image background | Bilingual headline, "Get Directions" CTA               |
| About        | Text + image split block                   | Brand story, economical/family positioning             |
| Categories   | Card grid / feature grid                   | Kids, Ladies, Traditional, Men's (flag if unconfirmed) |
| Highlights   | Icon-feature grid ("Why Choose Us")        | Economical, variety, traditional + modern              |
| Testimonials | Testimonial / review card grid             | Populate from `brand.json.testimonials` only           |
| Location     | Map embed + info card / footer block       | Address, plus code, hours, "Directions" button         |
| Footer       | Footer block                               | Address, hours, social (hide if null)                  |

---

## Key Constraints — Never Violate

- Never invent phone numbers, social handles, websites, or business hours not present in `brand.json`
- Never use placeholder/lorem ipsum text in final shipped sections — pull from `brand.json` or flag as TODO
- Always render both English and Malayalam brand names in Navbar and Hero
- Testimonials must come word-for-word (paraphrase lightly only for length, attribution preserved) from real reviews in `brand.json`
- Mobile-first: build and test at 375px viewport before desktop
- All 21st.dev components must be installed via `npx shadcn`, not hand-typed, and logged in `tools/component_log.md`
- Tone: warm, local, approachable — "economical" and "family store" positioning, not luxury/high-fashion
- Never overwrite workflow files without explicit instruction

---

## Build Order

| Step | Task                                                    | Done when...                                                   |
| ---- | ------------------------------------------------------- | -------------------------------------------------------------- |
| 1    | Scaffold Vite + React + Tailwind                        | `npm run dev` shows blank app                                  |
| 2    | Create `src/data/brand.json` with all data above        | File present, validated JSON                                   |
| 3    | Install Navbar + Hero components from 21st.dev          | Hero renders with bilingual branding                           |
| 4    | Build About + Categories + Highlights                   | All sections render with real data                             |
| 5    | Build Testimonials from real reviews                    | 2 review cards rendered, ratings shown                         |
| 6    | Build Location section + Google Maps embed              | Map shows correct address                                      |
| 7    | Build Footer with hours/address (social hidden if null) | Footer renders, no broken links                                |
| 8    | Add Framer Motion scroll/hover animations               | Smooth reveal on all sections                                  |
| 9    | Mobile responsiveness pass (375px)                      | No overflow, all sections stack cleanly                        |
| 10   | Compile "Missing Info" checklist for client             | Checklist lists phone, hours, socials, men's wear confirmation |
| 11   | Deploy to Vercel                                        | Live URL accessible                                            |

---

## Commands

```bash
npm create vite@latest nandus-garments-site -- --template react
cd nandus-garments-site
npm install
npm install framer-motion lucide-react
npx shadcn@latest init
# then per component:
npx shadcn@latest add "https://21st.dev/r/<author>/<component-name>"
npm run dev        # Local dev server
npm run build      # Production build
vercel --prod      # Deploy
```

---

## Skills

Project-specific skills live in `.claude/skills/[skill-name]/SKILL.md`. Invoke with `/skill-name` or describe what you need.

| Skill | Invoke | Description |
|-------|--------|-------------|
| ui-ux-pro-max | `/ui-ux-pro-max` | Full UI/UX design intelligence — 50+ styles, 161 color palettes, 57 font pairings, React/Tailwind/shadcn/ui. Use for any design, layout, or component work. |
| ui-styling | `/ui-styling` | shadcn/ui + Tailwind styling, accessible components, dark mode, theme customization. |
| design | `/design` | Brand identity, logos, banners, icons, social images, CIP mockups, HTML presentations. |
| design-system | `/design-system` | Design tokens (primitive→semantic→component), CSS variables, spacing/typography scales. |
| brand | `/brand` | Brand voice, visual identity, messaging frameworks, style guides, brand compliance. |
| banner-design | `/banner-design` | Social media, ads, website hero, and print banners — 22 styles across all platforms. |
| slides | `/slides` | Strategic HTML presentations with Chart.js, design tokens, and responsive layouts. |

---

## How to Use This File with Claude Code

- **Start a session**: "Follow CLAUDE.md and begin with Step 1"
- **Jump to a section**: "Now build the Hero section per CLAUDE.md, sourcing a component from 21st.dev"
- **If Claude drifts**: "Re-read CLAUDE.md" to snap it back on track
- Claude Code reads this file automatically — drop it in the project root
