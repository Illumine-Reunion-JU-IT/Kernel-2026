# Graph Report - Kernel-2026  (2026-11-14)

## Corpus Check
- 106 files · ~33,150 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 8, .example 1, .css 1)

## Summary
- 382 nodes · 685 edges · 70 communities (12 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9639620c`
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
- events-timeline.tsx
- Brand Identity & Design System
- Mogoj Dholai Event Page Mockup
- PostCSS Pipeline Setup
- Hero Artwork & Media Specs
- Classical Statue Bust Assets
- Project Specs & Video Guidelines
- Next.js Agent Rules
- Content Checklist Documentation
- club-gallery.tsx
- committee-under-construction.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 34 edges
2. `registerGsap()` - 31 edges
3. `react` - 26 edges
4. `cn()` - 24 edges
5. `compilerOptions` - 16 edges
6. `KernelLogo()` - 12 edges
7. `Button()` - 12 edges
8. `Footer()` - 10 edges
9. `scrollToElement()` - 10 edges
10. `HomePage()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `BladeProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `MobilePanelProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `HomePage()` --calls--> `EventsTimeline()`  [EXTRACTED]
  app/page.tsx → components/home/events-timeline.tsx
- `RootLayout()` --calls--> `ScrollRail()`  [EXTRACTED]
  app/layout.tsx → components/effects/scroll-rail.tsx
- `Details()` --calls--> `isConfirmed()`  [EXTRACTED]
  components/home/hero-section.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (70 total, 58 thin omitted)

### Community 0 - "Project Dependencies & Tooling"
Cohesion: 0.11
Nodes (31): HomePage(), ContactFormData, ContactSectionProps, ScrollRail(), frames, GalleryTeaser(), teaserIds, Details() (+23 more)

### Community 1 - "Home Page & Core Visuals"
Cohesion: 0.09
Nodes (38): body, condensed, display, metadata, mono, RootLayout(), serif, viewport (+30 more)

### Community 2 - "Root Layout & Global Styling"
Cohesion: 0.06
Nodes (41): dependencies, gsap@^3.15.1, lenis@^1.3.27, next@16.4.6, react@^19.0.0, react-dom@^19.0.0, three@^0.187.0, devDependencies (+33 more)

### Community 3 - "Brand Logos & Error Handling"
Cohesion: 0.07
Nodes (8): alt, contentType, size, alt, contentType, size, nextConfig, next

### Community 4 - "Static Routes & Contact Handlers"
Cohesion: 0.07
Nodes (34): EventsPage(), metadata, ACCENTS, AccordionStage(), Blade(), BladeGlitchOverlay(), BladeProps, GLITCH_BLOCKS (+26 more)

### Community 5 - "Event & Site Data Catalogs"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Dynamic Event Page Slug Routing"
Cohesion: 0.11
Nodes (19): events, EventSlugPage(), extractCoordinators(), EventFact, EventOrbitalStage(), tick(), EventOrbitalStageProps, getOrbitPoint() (+11 more)

### Community 7 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (17): jobs, validate, name, on, pull_request, push, branches, branches (+9 more)

### Community 8 - "events-timeline.tsx"
Cohesion: 0.31
Nodes (7): EventsTimeline(), PathData, EmptyState(), Tag(), Tone, tones, pad()

### Community 10 - "Brand Identity & Design System"
Cohesion: 0.40
Nodes (5): Design Prototype Mockup, Jadavpur University Logo, KERNEL Brand Logo, Brand Color Palette, KERNEL 1.0 Overview

### Community 69 - "club-gallery.tsx"
Cohesion: 0.20
Nodes (12): GalleryPage(), metadata, accentText, accentWash, ClubGallery(), getBrowserSnapshot(), getServerSnapshot(), subscribeToNothing() (+4 more)

### Community 70 - "committee-under-construction.tsx"
Cohesion: 0.47
Nodes (4): CoreCommitteePage(), metadata, CommitteeUnderConstruction(), TERMINAL_LOGS

## Knowledge Gaps
- **11 isolated node(s):** `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo`, `Event Header Navigation Design Mockup`, `Image Asset Specifications` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Brand Logos & Error Handling` to `Project Dependencies & Tooling`, `Home Page & Core Visuals`, `Root Layout & Global Styling`, `Static Routes & Contact Handlers`, `club-gallery.tsx`, `committee-under-construction.tsx`, `Dynamic Event Page Slug Routing`, `events-timeline.tsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **What connects `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.11224489795918367 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Project Dependencies & Tooling` to `Home Page & Core Visuals`, `Root Layout & Global Styling`, `Static Routes & Contact Handlers`, `club-gallery.tsx`, `committee-under-construction.tsx`, `Dynamic Event Page Slug Routing`, `events-timeline.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Should `Home Page & Core Visuals` be split into smaller, more focused modules?**
  _Cohesion score 0.09361393323657474 - nodes in this community are weakly interconnected._
- **Why does `registerGsap()` connect `Project Dependencies & Tooling` to `events-timeline.tsx`, `Home Page & Core Visuals`, `Static Routes & Contact Handlers`, `club-gallery.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `Root Layout & Global Styling` be split into smaller, more focused modules?**
  _Cohesion score 0.0613107822410148 - nodes in this community are weakly interconnected._