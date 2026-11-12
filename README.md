<div align="center">

<img src="assets/ju-logo.png" alt="Jadavpur University logo" width="90" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="assets/kernel-logo.png" alt="KERNEL logo" width="200" />

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

Each placeholder file contains only a short marker. Replace it as part of its linked GitHub issue; do not treat the scaffold as a runnable application yet.

### Planned local commands

After the bootstrap issue is completed, the standard workflow will be:

```bash
npm install
npm run dev
npm run lint
npm run build
```
