# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: a 9-to-5 worker (often with kids, a full life, limited energy) who feels built for more but has never made a dollar online. They clock out drained, believe building an online offer is for other people, and have 30–60 minutes a day at most — often a lunch break, a commute, a stolen hour after bedtime. They aren't looking to quit their job; they're looking for proof that something they build can run without them being at a desk.

## Product Purpose

Lunch Break Business helps that person get to their first online sale in 30–60 minutes a day, without quitting, clearing their schedule, or waiting to feel ready. Success is a real first paying customer using what the person already knows — not a follower count, not a finished course, not a perfect idea.

The current surface is a marketing site (index + essays) that sells one flagship offer (the Starter Kit) and captures email via a lead magnet.

## Positioning

Built by someone who was in the exact situation — full-time job, kids, no extra hours, no perfect idea — and figured it out anyway. The claim a neighboring "start an online business" product cannot truthfully copy: this one is written from inside the constraint, not above it, and it assumes the job stays. The method sells the offer *before* it is built, so validation happens with real buyers rather than more planning.

## Operating Context

- Visitors arrive mostly from Threads (@realcodytye, ~17k followers) and land on either the home page or an essay.
- Reading happens on phone, often in stolen moments — the same context the product is about.
- The Starter Kit is fulfilled as a Skool community with video modules plus monthly live calls; checkout is hosted on followrs.store, not the site.
- Free lead magnet: "16 viral post templates" — meant to grow the email list and hand off to the ConvertKit newsletter.
- Content pipeline lives in a separate Obsidian vault ("Brain Dump" / Wobbly OS). Essays are drafted there, then published to the site's `essays/` directory via `build.js`.

## Capabilities and Constraints

- Static site: `index.html`, `style.css`, `essays/*.html`, built by `build.js`, previewed by `server.js`. No framework, no client-side app.
- Four Starter Kit modules are the canonical structure and copy: (01) Find Your Overlap, (02) Earn the Room, (03) Sell Before You Build, (04) Build, Launch, Deliver.
- Offer price is "Under $100." Do not restate as a specific number unless the user confirms one.
- Lead-magnet form is a placeholder — it is not wired to ConvertKit yet. Future design work must not present it as functional without wiring.
- Purchase link is an external followrs.store URL (currently `https://followrs.store/realcodytye/lunch-break-business-starter-kit`). Preserve as-is unless the user provides a new one.
- Essays index and individual essay pages are the only secondary surface; nav has two links (Essays, Starter Kit) and that's the whole IA.

## Brand Commitments

- **Name:** Lunch Break Business.
- **Locked visual signature:** the trailing period "." after brand words and section words (e.g. "Lunch Break Business.", "Get the Starter Kit.", "Under $100."). It is a deliberate brand mark — preserve in every future redesign, in copy and in rendered UI.
- **Not locked:** current color palette (warm cream base, amber accent, rare sage secondary), typography choices, and layout. These are treated as a first pass and are open for redesign. See DESIGN.md for the incumbent system.
- **Voice:** first-person, direct, addresses the reader as someone the author has already been. Written from inside the constraint, never from a stage. Short sentences. No hype, no "entrepreneur" register, no jargon. Concrete scenes (phone buzzing mid-movie, clocking out tired) over abstractions.
- **Author identity:** Cody Tye, publicly @realcodytye on Threads. Site footer credits and links this handle.

## Evidence on Hand

- Author's own Threads audience: ~17,000 followers at @realcodytye. This is the only social proof to cite today.
- **Explicit absences — do not fabricate:** no customer count, no dollar-figure sales results, no named testimonials, no case studies, no press. Future design work must not invent quotes, buyer numbers, "5-star review" strips, "trusted by X companies" bars, or star ratings. If proof is needed on a surface, state its absence honestly or leave the section out.
- Content assets: 16 published essays in `essays/` and a growing draft pipeline in the Obsidian vault at `~/storage/shared/Documents/Obsidian (Brain Dump)/Brain Dump/`.
- Free asset in flight: "16 viral post templates" lead magnet (referenced in copy; delivery mechanism still needs to be wired).

## Product Principles

1. **Assume the job stays.** Every surface must respect that the reader has 30–60 minutes a day and is tired. Design decisions that demand a "focus session" to appreciate are wrong for this audience.
2. **Sell before you build — including the site itself.** The site's job is to move a reader toward a validated first purchase, not to display everything the product could become. Prefer one clear next action per surface.
3. **Written from inside the constraint.** Copy, imagery, and examples must feel like they come from someone who is in the same situation, not above it. Aspirational stock-photo energy is off-brand.
4. **Honest about proof.** Until real customer evidence exists, the site earns trust through specificity of the method and the author's voice, not through invented social proof.
5. **The mechanism is the differentiator.** The four-module sequence (Overlap → Earn the Room → Sell Before You Build → Build, Launch, Deliver) is the product's real edge. Keep it visible and named on any surface that describes the offer.

## Accessibility & Inclusion

No formal accessibility standard has been established for this project. Baseline expectation: readable on a phone in one hand, sufficient contrast for outdoor reading, and forms usable with a software keyboard. Update this section when a specific standard (e.g. WCAG 2.2 AA) is chosen.
