# Graph Report - Kernel-2026  (2026-11-14)

## Corpus Check
- 106 files · ~33,835 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 8, .example 1, .css 1)

## Summary
- 383 nodes · 691 edges · 70 communities (12 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bcd25eab`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Dependencies & Tooling
- Home Page & Core Visuals
- Root Layout & Global Styling
- Brand Logos & Error Handling
- Static Routes & Contact Handlers
- Event & Site Data Catalogs
- Dynamic Event Page Slug Routing
- TypeScript Compiler Configuration
- GitHub Actions CI Validation
- layout.tsx
- Brand Identity & Design System
- Mogoj Dholai Event Page Mockup
- PostCSS Pipeline Setup
- Hero Artwork & Media Specs
- Classical Statue Bust Assets
- Project Specs & Video Guidelines
- Next.js Agent Rules
- Content Checklist Documentation
- club-gallery.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 35 edges
2. `registerGsap()` - 33 edges
3. `react` - 26 edges
4. `cn()` - 24 edges
5. `compilerOptions` - 16 edges
6. `KernelLogo()` - 12 edges
7. `Button()` - 12 edges
8. `Footer()` - 10 edges
9. `scrollToElement()` - 10 edges
10. `HomePage()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `CoreCommitteePage()` --calls--> `CommitteeUnderConstruction()`  [EXTRACTED]
  app/core-committee/page.tsx → components/core-committee/committee-under-construction.tsx
- `CommitteeUnderConstruction()` --calls--> `registerGsap()`  [EXTRACTED]
  components/core-committee/committee-under-construction.tsx → lib/gsap.ts
- `BladeProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `MobilePanelProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `HomePage()` --calls--> `EventsTimeline()`  [EXTRACTED]
  app/page.tsx → components/home/events-timeline.tsx

## Import Cycles
- None detected.

## Communities (70 total, 58 thin omitted)

### Community 0 - "Project Dependencies & Tooling"
Cohesion: 0.10
Nodes (33): HomePage(), ContactFormData, ContactSectionProps, LINES, Window, frames, GalleryTeaser(), teaserIds (+25 more)

### Community 1 - "Home Page & Core Visuals"
Cohesion: 0.12
Nodes (30): metadata, NotFound(), JuLogo(), KernelLogo(), ContactSection(), EventsTimeline(), PathData, Footer() (+22 more)

### Community 2 - "Root Layout & Global Styling"
Cohesion: 0.06
Nodes (41): dependencies, gsap@^3.15.1, lenis@^1.3.27, next@16.4.6, react@^19.0.0, react-dom@^19.0.0, three@^0.187.0, devDependencies (+33 more)

### Community 3 - "Brand Logos & Error Handling"
Cohesion: 0.06
Nodes (13): CoreCommitteePage(), metadata, alt, contentType, size, alt, contentType, size (+5 more)

### Community 4 - "Static Routes & Contact Handlers"
Cohesion: 0.11
Nodes (19): coreCommittee, fail(), faqs, speakers, sponsors, validateCollection(), validateOptionalUrls(), validateRequiredStrings() (+11 more)

### Community 5 - "Event & Site Data Catalogs"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Dynamic Event Page Slug Routing"
Cohesion: 0.11
Nodes (19): events, EventSlugPage(), extractCoordinators(), EventFact, EventOrbitalStage(), tick(), EventOrbitalStageProps, getOrbitPoint() (+11 more)

### Community 7 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (17): jobs, validate, name, on, pull_request, push, branches, branches (+9 more)

### Community 8 - "GitHub Actions CI Validation"
Cohesion: 0.20
Nodes (15): EventsPage(), metadata, ACCENTS, AccordionStage(), Blade(), BladeGlitchOverlay(), BladeProps, GLITCH_BLOCKS (+7 more)

### Community 9 - "layout.tsx"
Cohesion: 0.16
Nodes (14): body, condensed, display, metadata, mono, RootLayout(), serif, viewport (+6 more)

### Community 10 - "Brand Identity & Design System"
Cohesion: 0.40
Nodes (5): Design Prototype Mockup, Jadavpur University Logo, KERNEL Brand Logo, Brand Color Palette, KERNEL 1.0 Overview

### Community 69 - "club-gallery.tsx"
Cohesion: 0.22
Nodes (11): GalleryPage(), metadata, accentText, accentWash, ClubGallery(), getBrowserSnapshot(), getServerSnapshot(), subscribeToNothing() (+3 more)

## Knowledge Gaps
- **11 isolated node(s):** `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo`, `Event Header Navigation Design Mockup`, `Image Asset Specifications` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Brand Logos & Error Handling` to `Project Dependencies & Tooling`, `Home Page & Core Visuals`, `Root Layout & Global Styling`, `club-gallery.tsx`, `Dynamic Event Page Slug Routing`, `GitHub Actions CI Validation`, `layout.tsx`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **What connects `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.10256410256410256 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Project Dependencies & Tooling` to `Home Page & Core Visuals`, `Root Layout & Global Styling`, `Brand Logos & Error Handling`, `club-gallery.tsx`, `Dynamic Event Page Slug Routing`, `GitHub Actions CI Validation`, `layout.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Should `Home Page & Core Visuals` be split into smaller, more focused modules?**
  _Cohesion score 0.12156448202959831 - nodes in this community are weakly interconnected._
- **Why does `registerGsap()` connect `Project Dependencies & Tooling` to `Home Page & Core Visuals`, `Brand Logos & Error Handling`, `club-gallery.tsx`, `GitHub Actions CI Validation`, `layout.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Should `Root Layout & Global Styling` be split into smaller, more focused modules?**
  _Cohesion score 0.0613107822410148 - nodes in this community are weakly interconnected._