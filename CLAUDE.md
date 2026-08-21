# CLAUDE.md

Guidance for Claude Code when working in this repo. This file is the source of truth for how we build and maintain this portfolio site — keep it up to date as decisions change.

## Project Overview

<!-- PERSONALIZE: 1-2 sentences. Who is this site for, and what's the goal?
     e.g. "Personal portfolio for [name], a software developer, showcasing projects,
     work history, and a way to get in touch. Primary audience is recruiters/clients." -->

- **Owner:** Michael Mocioiu
- **Primary goal of the site:** Land jobs, serves as a portfolio and personality site.
- **Target audience:** recruiters, development managers, potential clients
- **Tone/voice:** confident but understated, playful, minimal and technical

## Status

Migrating from a static HTML/CSS/JS site to a React + Vite single-page app. See [Tech Stack](#tech-stack) and [Migration Plan](#migration-plan).

The old site (`index.html`, `assets/`) contains accurate but outdated content and a dated design — it's the content source of truth until pages are ported over, not a design reference.

## Tech Stack

- **Build tool:** Vite
- **Framework:** React TypeScript
- **Styling:** styled components (shared styles for strong primitives) - should utilize atomic design.
- **Routing:** should have some routing (i.e accessing some widget pages), and also include some SPA features for the main page (some modals etc)
- **Deployment target:** GH pages
- **Package manager:** npm

## Migration Plan (static site → React + Vite)

1. Scaffold a Vite + React app (`npm create vite@latest`) alongside the existing static files.
2. Migrate content section by section from `index.html` into React components (Hero, About, Experience, Projects, Contact, etc. — adjust to actual sections).
3. Port over content from `cv.md` and the old site — verify it's current, cut anything stale.
4. Rebuild styling from scratch rather than porting `assets/css/main.css` as-is (site is being redesigned, not just re-platformed).
5. Move/optimize images from `assets/img/` into the new project (consider re-exporting, compressing, or replacing outdated ones like old screenshots).
6. Remove old static files (`index.html`, `assets/`) once the React version fully replaces them and is deployed.
7. Wire up deployment (see target above).

## Content Ground Rules

- Do not invent or embellish work history, dates, or job titles — pull from `cv.md`/resume and confirm anything ambiguous with the user before publishing.
- Flag outdated content found in the old site (e.g. stale job info, old screenshots) instead of silently carrying it forward.
- Do not show personal information other than email.

## Design Ground Rules

<!-- PERSONALIZE: e.g. "no gradients," "keep it dark-mode-first," "reference [X] portfolio for feel" -->

- Ensure the webpage is responsive and dynamic. visuals must pass vibe check on desktop AND mobile.
- should have multiple colour palette options during development.
- should have multiple options for design styles (i.e sleek techy, smooth pastel vector, more artsy. give me options.)

## Development Conventions

- Component structure: atomic design, one folder per component (e.g. `Button/Button.tsx` + co-located styles), grouped as:

  ```text
  src/
    components/
      atoms/       (Button, Text, Icon, Input)
      molecules/   (NavLink, ProjectCard, SkillBadge)
      organisms/   (Header, ExperienceTimeline, ProjectGrid)
    pages/         (Home, widget pages)
    styles/        (theme, global styles, styled-components ThemeProvider)
  ```

- Commit style: small batched commits. on new branch 'react-port'
- Testing: minimal tests, mostly a presentation site anyway.

## Working Style / Preferences

- Always show me a plan before restructuring files
- Ask before deleting old assets, don't ask before editing copy
- Prefer small, reviewable commits over one big rewrite
