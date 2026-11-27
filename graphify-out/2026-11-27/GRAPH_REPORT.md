# Graph Report - Kernel-2026  (2026-11-25)

## Corpus Check
- 110 files · ~39,085 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 8, .example 1, .css 1)

## Summary
- 410 nodes · 712 edges · 71 communities (13 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.89)
- Token cost: 3,550 input · 1,700 output

## Graph Freshness
- Built from commit: `f8534338`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Dependencies & Tooling
- layout.tsx
- Root Layout & Global Styling
- Brand Logos & Error Handling
- Static Routes & Contact Handlers
- Event & Site Data Catalogs
- Dynamic Event Page Slug Routing
- TypeScript Compiler Configuration
- events-timeline.tsx
- accordion-stage.tsx
- Brand Identity & Design System
- Mogoj Dholai Event Page Mockup
- PostCSS Pipeline Setup
- Hero Artwork & Media Specs
- Classical Statue Bust Assets
- Project Specs & Video Guidelines
- Next.js Agent Rules
- Content Checklist Documentation
- club-gallery.tsx
- process-committee.js

## God Nodes (most connected - your core abstractions)
1. `next` - 36 edges
2. `registerGsap()` - 27 edges
3. `react` - 27 edges
4. `cn()` - 25 edges
5. `compilerOptions` - 16 edges
6. `KernelLogo()` - 12 edges
7. `Button()` - 12 edges
8. `HomePage()` - 10 edges
9. `scrollToElement()` - 10 edges
10. `Navbar()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `BladeProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `Blade()` --calls--> `cn()`  [EXTRACTED]
  components/events/accordion-stage.tsx → lib/utils.ts
- `MobileShowcaseProps` --references--> `EventItem`  [EXTRACTED]
  components/events/accordion-stage.tsx → types/index.ts
- `MobileEventShowcase()` --calls--> `cn()`  [EXTRACTED]
  components/events/accordion-stage.tsx → lib/utils.ts
- `AccordionStage()` --calls--> `registerGsap()`  [EXTRACTED]
  components/events/accordion-stage.tsx → lib/gsap.ts

## Import Cycles
- None detected.

## Communities (71 total, 58 thin omitted)

### Community 0 - "Project Dependencies & Tooling"
Cohesion: 0.11
Nodes (30): HomePage(), ContactFormData, ContactSection(), ContactSectionProps, frames, GalleryTeaser(), teaserIds, Details() (+22 more)

### Community 1 - "layout.tsx"
Cohesion: 0.14
Nodes (16): body, condensed, display, metadata, mono, RootLayout(), serif, viewport (+8 more)

### Community 2 - "Root Layout & Global Styling"
Cohesion: 0.06
Nodes (41): dependencies, gsap@^3.15.1, lenis@^1.3.27, next@16.4.6, react@^19.0.0, react-dom@^19.0.0, three@^0.187.0, devDependencies (+33 more)

### Community 3 - "Brand Logos & Error Handling"
Cohesion: 0.06
Nodes (17): CoreCommitteePage(), metadata, alt, contentType, size, alt, contentType, size (+9 more)

### Community 4 - "Static Routes & Contact Handlers"
Cohesion: 0.08
Nodes (26): Page(), SECTIONS, ROLE_ORDER, SponsorCard(), SponsorsPreview(), TIER_CONFIG, TierDivider(), coreCommittee (+18 more)

### Community 5 - "Event & Site Data Catalogs"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Dynamic Event Page Slug Routing"
Cohesion: 0.11
Nodes (20): events, EventSlugPage(), extractCoordinators(), EVENT_BROCHURES, EventFact, EventOrbitalStage(), tick(), EventOrbitalStageProps (+12 more)

### Community 7 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (17): jobs, validate, name, on, pull_request, push, branches, branches (+9 more)

### Community 8 - "events-timeline.tsx"
Cohesion: 0.11
Nodes (32): metadata, NotFound(), JuLogo(), KernelLogo(), CommitteeUnderConstruction(), TERMINAL_LOGS, EventsTimeline(), PathData (+24 more)

### Community 9 - "accordion-stage.tsx"
Cohesion: 0.18
Nodes (15): EventsPage(), metadata, ACCENTS, AccordionStage(), Blade(), BladeProps, computeBladeWidths(), GLITCH_BLOCKS (+7 more)

### Community 10 - "Brand Identity & Design System"
Cohesion: 0.40
Nodes (5): Design Prototype Mockup, Jadavpur University Logo, KERNEL Brand Logo, Brand Color Palette, KERNEL 1.0 Overview

### Community 69 - "club-gallery.tsx"
Cohesion: 0.22
Nodes (11): GalleryPage(), metadata, accentText, accentWash, ClubGallery(), getBrowserSnapshot(), getServerSnapshot(), subscribeToNothing() (+3 more)

### Community 70 - "process-committee.js"
Cohesion: 0.25
Nodes (5): fs, members, path, run(), sharp

## Knowledge Gaps
- **11 isolated node(s):** `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo`, `Event Header Navigation Design Mockup`, `Image Asset Specifications` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 196 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Brand Logos & Error Handling` to `Project Dependencies & Tooling`, `layout.tsx`, `Root Layout & Global Styling`, `Static Routes & Contact Handlers`, `club-gallery.tsx`, `Dynamic Event Page Slug Routing`, `events-timeline.tsx`, `accordion-stage.tsx`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **What connects `Brand Color Palette`, `Jadavpur University Logo`, `KERNEL Brand Logo` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.11008325624421832 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Project Dependencies & Tooling` to `layout.tsx`, `Root Layout & Global Styling`, `Brand Logos & Error Handling`, `Static Routes & Contact Handlers`, `club-gallery.tsx`, `Dynamic Event Page Slug Routing`, `events-timeline.tsx`, `accordion-stage.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `events-timeline.tsx` to `accordion-stage.tsx`, `Brand Logos & Error Handling`, `club-gallery.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `Root Layout & Global Styling` be split into smaller, more focused modules?**
  _Cohesion score 0.0613107822410148 - nodes in this community are weakly interconnected._