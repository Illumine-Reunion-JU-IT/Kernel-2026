<div align="center">

<img src="ju-logo.png" alt="Jadavpur University logo" width="90" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="kernel-logo.png" alt="KERNEL logo" width="200" />

# KERNEL 1.0

### [🎨 Open the website design](https://illumine-reunion-ju-it.github.io/Kernel-2026/design.html)

</div>

---

## Colors

| Color | Hex |
|---|---|
| ![](https://placehold.co/60x24/0B241A/0B241A) Forest green | `#0B241A` |
| ![](https://placehold.co/60x24/E9DFC5/E9DFC5) Sand beige | `#E9DFC5` |
| ![](https://placehold.co/60x24/9A4DFF/9A4DFF) Electric purple | `#9A4DFF` |
| ![](https://placehold.co/60x24/FF2D2D/FF2D2D) Logo red | `#FF2D2D` |
| ![](https://placehold.co/60x24/050505/050505) Black | `#050505` |

---

## Website development scaffold

The detailed website backlog lives in the repository's GitHub issues. This repository now includes placeholder files for the planned KERNEL 1.0 public website, so contributors can immediately see the intended structure before the Next.js setup is completed.

The future site includes these public sections:

- Home
- About KERNEL
- Events and event-detail pages
- Speakers
- Sponsors
- Core Committee
- Contact, registration information, and FAQ

Authentication, dashboards, payments, and merchandise are intentionally out of scope.

### Planned structure

```text
app/                    Routes, metadata, and global styles
components/             Reusable UI and page sections
data/                   Organiser-editable JSON content
lib/                    Shared utility and content-loading code
types/                  TypeScript data contracts
public/images/          Event-owned visual assets
public/docs/            Approved public PDFs and rulebooks
docs/                   Contributor and release documentation
```

Pages for About, Events, Speakers, Sponsors, Core Committee and Contact are still scaffold markers; each is replaced by its own GitHub issue.

### What is built so far (issues #1 to #5)

- **#1 Bootstrap**: Next.js App Router, TypeScript, Tailwind, ESLint, GSAP + ScrollTrigger, Lenis smooth scroll, three.js.
- **#2 Design system**: `components/ui/*` (button, section heading, container, tag, empty state) and tokens in `app/globals.css` / `tailwind.config.ts`.
- **#3 Site frame**: navbar, accessible mobile menu, footer, branded 404.
- **#4 Content**: typed, validated JSON in `data/` (see below).
- **#5 Homepage**: poster that assembles from glitch slices, then tears apart while its red column floods the screen into a red "What is KERNEL" slab; a pinned four-ring "kernel" diagram with a 3D core; the aftermovie playing inside the poster's own red column with collage pieces tucked behind; scroll-drawn events timeline; speaker and sponsor slots; mega-menu footer.

### Local commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

### Swapping media

- **Hero artwork**: replace `public/images/hero/kernel-hero.jpg` (keep the same 2:3 proportions, e.g. 1024x1536 or 2048x3072). The hero, video collage, speaker slots and footer all cut pieces from this one file. If you change the composition, update the crop boxes in `lib/poster.ts`.
- **Video poster frame**: `public/images/hero/video-poster.jpg` (any frame from the video).
- **Video section**: put your file at `public/videos/kernel-aftermovie.mp4`. See `public/videos/README.md`.
- **Registration**: set `registrationUrl` in `data/site.json`; buttons switch from "Registration opens soon" to live automatically.

### Adding speakers and sponsors

The homepage shows 4 speaker slots and 6 sponsor slots (1 Title, 2 Platinum, 3 Gold). Every slot says "Coming soon" until you add data; no code changes needed.

**Speaker** (`data/speakers.json`): copy the placeholder entry, set `"isPlaceholder": false`, fill `name`, `role`, `organisation`, `imagePath` (file in `public/images/speakers/`, 4:5 portrait) and `imageAlt`.

**Sponsor** (`data/sponsors.json`): set `"isPlaceholder": false`, `name`, `logoPath` (file in `public/images/sponsors/`, transparent PNG or SVG), `logoAlt`, and `category` as `Title`, `Platinum` or `Gold`. The logo lands in the matching tier.

### Logos

`public/images/brand/kernel-logo.png` (transparent, for dark backgrounds) and `ju-logo.png` are used in the navbar, mobile menu, footer, 404 and the first-visit intro. `app/icon.png` is the favicon.

### Design tokens

Poster red `#E40908` and page black `#050308` (both sampled from the artwork so the poster blends into the page), sand `#E9DFC5`, electric purple `#9A4DFF`, black `#050505`. The earlier forest green was removed. Display type is Archivo (extended black italic), numerals are Anton, labels are Space Mono. All load through `next/font/google`, so the first `npm run dev` needs internet access.

## Environment configuration

The application works locally without private environment variables.

For production deployment, set:

- `NEXT_PUBLIC_SITE_URL`: the canonical public website URL, including `https://`.

Until a deployment domain is assigned, the application uses `http://localhost:3000` as its metadata URL fallback.

## Content management

Event and website content is maintained in the JSON files under `data/`:

- `site.json` — event identity, dates, venue and contact information
- `events.json` — event listings
- `speakers.json` — speaker profiles
- `sponsors.json` — sponsor information
- `core-committee.json` — committee profiles
- `faq.json` — frequently asked questions
- `gallery.json` — gallery entries

The corresponding TypeScript interfaces are in `types/index.ts`. Content loading and validation are handled by `lib/content.ts`.

Replace `TBD` values and placeholder images only with information approved by the organising team. Empty content arrays are supported.

## Continuous integration

GitHub Actions runs the following checks on pushes to the working branch and pull requests to `main`:

1. Install dependencies with `npm ci`
2. Run TypeScript validation
3. Run ESLint
4. Build the production application
