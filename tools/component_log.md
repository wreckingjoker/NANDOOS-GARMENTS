# Component Log

Tracks all UI components used in the project. Per CLAUDE.md: all 21st.dev components must be installed via `npx shadcn` and logged here.

## Current Build — Custom Components (no 21st.dev install required)

All components in this build were written from scratch using Tailwind CSS + Framer Motion.

| Component | File | Description |
|-----------|------|-------------|
| Navbar | `src/components/Navbar.jsx` | Sticky nav with bilingual logo, mobile hamburger, animated drawer |
| Footer | `src/components/Footer.jsx` | Dark footer with address, hours, quick links |
| SectionReveal | `src/components/SectionReveal.jsx` | Framer Motion `whileInView` scroll-reveal wrapper |
| StarRating | `src/components/StarRating.jsx` | Amber star rating display (lucide-react icons) |
| ProductCard | `src/components/ProductCard.jsx` | Product image card with hover lift animation |
| CategoryCard | `src/components/CategoryCard.jsx` | Full-bleed category card with image overlay and arrow link |
| ScrollToTop | `src/components/ScrollToTop.jsx` | React Router scroll-to-top on route change |

## 21st.dev Components — Future Additions

When installing additional 21st.dev components, log them here:

| Component | 21st.dev URL | Install Command | Date Added |
|-----------|-------------|-----------------|------------|
| _(none yet)_ | — | — | — |

### Install Format
```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component-name>"
```
