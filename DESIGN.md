---
name: Lunch Break Business
description: An editorial cream-and-amber marketing site for a starter kit that respects a tired reader with 30–60 minutes.
colors:
  notebook-cream: "#F4EDE1"
  page-cream: "#FFF8EC"
  deep-ink: "#1C1A17"
  muted-brown: "#8A7860"
  highlighter-amber: "#D89A2B"
  living-sage: "#6B7B5A"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "68px"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  lede:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "14px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "72px"
  hero: "96px"
components:
  button-primary:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.notebook-cream}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.notebook-cream}"
  button-primary-on-ink:
    backgroundColor: "{colors.highlighter-amber}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.sm}"
    padding: "18px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.sm}"
    padding: "14.5px 26.5px"
  button-secondary-hover:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.notebook-cream}"
  card-featured:
    backgroundColor: "{colors.page-cream}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.xl}"
    padding: "40px 44px 44px"
  card-magnet:
    backgroundColor: "{colors.page-cream}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.lg}"
    padding: "40px 44px"
  card-module-on-ink:
    backgroundColor: "rgba(255, 248, 236, 0.04)"
    textColor: "{colors.notebook-cream}"
    rounded: "{rounded.md}"
    padding: "24px 26px"
  input-email:
    backgroundColor: "{colors.notebook-cream}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 18px"
  nav-link:
    textColor: "{colors.muted-brown}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.deep-ink}"
---

# Design System: Lunch Break Business

## Overview

**Creative North Star: "The Lunch Table"**

This is a warm, grounded, everyday visual system built to feel like a diner booth on a real break — cream-topped table, one good serif set down on the paper, a mustard highlight sitting where a marker would rest. It reads as personal and unhurried, never as a productivity dashboard and never as a startup landing page. The reader is tired and has forty minutes; the design earns their attention by looking like a place a real person actually sits, not a stage a brand performs on.

The core dyad is a single warm cream base (Notebook Cream) with a lifted lighter cream (Page Cream) for cards, one deep near-black (Deep Ink) for text and inverse surfaces, and one warm mustard accent (Highlighter Amber) that does almost all of the color work. Instrument Serif carries every headline and every eyebrow-adjacent moment; IBM Plex Sans carries the body. The one signature move — a **trailing period** in the brand's amber, applied to brand words and key CTAs — is the identity's smallest and most enforceable rule.

Density is generous. Sections breathe at 72–96px. Body copy caps around 620–720px so nothing feels like a wall of text on a phone. Motion is small: hover lifts of 1–2px, warm-tinted shadows that only appear on intent. Nothing pulses, nothing floats, nothing greets you with a modal.

**Key Characteristics:**
- Two-cream ground with a single deep-ink text tone.
- One dominant accent (Highlighter Amber) doing dot, highlight, CTA-on-ink, and rule work.
- Serif display + humanist sans body pairing, always in the same relative sizes.
- Flat by default; warm shadows only as a response to hover or focus.
- One inverted "night" surface (the Offer block) that flips the whole palette without changing its logic.

## Colors

A tight warm palette: two creams, one ink, one accent that does the heavy lifting, and one quiet secondary. Nothing cool. No pure white anywhere on the site.

### Primary

- **Highlighter Amber** (#D89A2B): the identity color. It carries the "." after brand words, the transparent highlighter swipe under headline fragments, the CTA button on the dark Offer block, the module numerals (01–04), the eyebrow on the featured essay CTA link, and the underline-color on inline links. It is the only warm hue used at saturation — everything else is muted or neutral.

### Secondary

- **Living Sage** (#6B7B5A): a rare editorial secondary. Currently used only on the featured-essay eyebrow to mark the "living / recurring content" context, in contrast to the Offer block's amber-lit permanence. Preserve its rarity — it should never do CTA work and never appear inside the Offer block.

### Neutral

- **Notebook Cream** (#F4EDE1): the base surface — the desk the whole site sits on. Body background, hero background, nav background, footer-inverse text color.
- **Page Cream** (#FFF8EC): the lifted surface — a sheet resting on the desk. Featured card, magnet card, essay CTA card, "who" section background.
- **Deep Ink** (#1C1A17): the single text color for all headlines and body copy on cream. Also the background of the Offer and Footer blocks, where it becomes the inverse ground.
- **Muted Brown** (#8A7860): the secondary text color — eyebrows, meta labels, muted paragraphs, essay-card pulls, dashed borders on the magnet card. Warm, never gray.

### Named Rules

**The One Highlight Rule.** Highlighter Amber is the only saturated color on any surface. If a page needs a second point of emphasis, use weight, scale, or the inverse Offer treatment — not a second hue.

**The No-Pure-White Rule.** White does not exist in this system. Every "light" surface is a cream. If a texture, illustration, or embedded asset ships with #FFFFFF, treat it as a bug and correct it to Notebook Cream or Page Cream.

**The Trailing-Dot Rule.** The brand mark is the word plus a period ("Lunch Break Business."). Wherever the brand or a headline CTA is rendered, the period is a distinct span rendered in Highlighter Amber. It is not decorative — it is the identifier.

## Typography

**Display Font:** Instrument Serif (with Georgia, serif fallback)
**Body Font:** IBM Plex Sans (with -apple-system, BlinkMacSystemFont, sans-serif fallback)

**Character:** Instrument Serif is a low-contrast, quietly literary serif — it feels handwritten in the way a book feels handwritten, not the way calligraphy does. Pairing it with IBM Plex Sans (a humanist, slightly technical sans) grounds the pair: the serif carries feeling, the sans carries fact. Weights stay low: display and headlines all live at 400. Emphasis comes from size and italic, not from bold.

### Hierarchy

- **Display** (400, 68px on desktop / 44px on mobile, line-height 1.02, letter-spacing -0.015em): hero and essay titles only. One per page.
- **Headline** (400, 42px / 32px, line-height 1.1, letter-spacing -0.01em): major section titles ("Who this is for", "The Lunch Break Business Starter Kit").
- **Title** (400, 28px, line-height 1.2): subsection titles, magnet card heading, essay-body h2, essay CTA heading.
- **Lede** (400, 26px, line-height 1.4, Instrument Serif): the one-serif-paragraph opening under a headline. Also used for the Offer's "price-line" and blockquotes inside essays.
- **Body** (400, 17px, line-height 1.65, max ~640–720px): standard reading text.
- **Essay Body** (400, 19px, line-height 1.7): the essay-page reading experience, one step larger than marketing body copy. The first line of the first paragraph is bumped to weight 600 as a small drop-cap-adjacent gesture.
- **Label / Eyebrow** (700, 11–12px, uppercase, letter-spacing 0.14–0.16em, IBM Plex Sans): section eyebrows, essay meta, nav secondary text.

### Named Rules

**The Serif-Owns-Feeling Rule.** Instrument Serif is used for every headline, every lede, every module number, every blockquote, every wordmark. IBM Plex Sans is used for every body sentence, every button label, every eyebrow, every nav link, every form field. Never mix.

**The One-Voice-Per-Section Rule.** No section uses more than two type sizes plus its eyebrow. If a section wants a third, it becomes two sections.

**The Weight-400 Rule.** Serif headlines never go above weight 400. Emphasis inside a serif headline is done with italic (`.lede em { font-style: italic; }`) or with the highlighter swipe span, not with weight.

## Layout

Single column, reading-first. Container width is `--max-w: 720px` for text-first sections; a wider `1080px` variant exists for the nav and can be adopted for future full-bleed sections. Horizontal padding is 32px desktop / 24px mobile. All sections are vertically centered by margin auto.

Vertical rhythm is section-scale, not step-scale: 72px between standard sections, 88px around the Offer block, 96px on the hero and essay-page top. Mobile compresses every section to 48px and the hero to 56px, keeping the same relationships.

The Offer block breaks the column model on desktop only: the "modules" region uses a two-column grid (`repeat(2, 1fr)`) with 24px gap, collapsing to one column under 700px. The "who" section does the same. No other section uses columns.

The `1px solid rgba(0,0,0,0.06)` hairline sits at the boundary of any Page Cream card and around the "who" section on Notebook Cream. It is the whole border language on light surfaces.

## Elevation & Depth

This is a **flat-by-default** system. Nothing carries a resting shadow. Depth at rest comes from tonal layering — Page Cream cards sit on Notebook Cream ground, with a hairline border to define the edge; the Offer block flips the whole palette to Deep Ink to create the deepest depth move on the site without a single shadow.

Shadows only appear as a **response to intent**: hover, focus, or the moment the user is about to click. They are warm-tinted (based on Deep Ink at 8–20% alpha, or Highlighter Amber at 30% alpha on the Offer CTA), never neutral gray. Their role is haptic, not hierarchical.

### Shadow Vocabulary

- **Ink Lift** (`box-shadow: 0 6px 16px rgba(28, 26, 23, 0.2)`): primary button on cream surfaces, on hover. Paired with `transform: translateY(-1px)`.
- **Ink Card Lift** (`box-shadow: 0 8px 24px rgba(28, 26, 23, 0.08)`): featured essay card, on hover. Paired with `transform: translateY(-2px)`.
- **Amber Lift** (`box-shadow: 0 6px 16px rgba(216, 154, 43, 0.3)`): Offer CTA (amber-on-ink), on hover.

### Named Rules

**The Warm-Lift-on-Intent Rule.** Shadows exist to say "this responds to you," not "this is higher than that." They appear only under `:hover` (and equivalent `:focus-visible`), always paired with a 1–2px translate, always tinted warm.

**The No-Cool-Shadow Rule.** Every shadow color is derived from Deep Ink or Highlighter Amber. Never `rgba(0,0,0,X)`, never a blue-cast neutral.

## Shapes

Corners are gently rounded, never sharp and never pillow-soft. The scale is deliberate:

- **8px** — the base radius for interactive elements: buttons, form inputs.
- **10px** — module cards inside the Offer block.
- **12px** — the magnet card.
- **14px** — the featured essay card (the most "lifted" surface, so slightly softer).

Borders are always hairline. `1px solid rgba(0,0,0,0.06)` on cards, `1.5px solid` on secondary buttons and inputs (so touch targets read as clickable at small sizes), and one deliberate `1px dashed var(--muted-brown)` on the magnet card as a "cut-out coupon" gesture — the only dashed border in the whole system. The horizontal rule inside essays is a 100px-wide centered line, not a full-bleed rule.

## Components

Editorial and grounded. Buttons feel weighty, cards feel like torn sheets, inputs feel like ruled-line fields. Every component is calm at rest and only comes alive on intent.

### Buttons

- **Shape:** softly rounded (8px radius). Buttons never have a shadow at rest.
- **Primary (on cream):** solid Deep Ink background, Notebook Cream text, 16px 28px padding, IBM Plex Sans 600 at 16px. On hover: `translateY(-1px)` + Ink Lift shadow. If the label carries the brand-mark dot, the dot renders as an amber span inside the button.
- **Primary (on ink, Offer block only):** solid Highlighter Amber background, Deep Ink text, larger 18px 32px padding at 17px. On hover: `translateY(-1px)` + Amber Lift shadow. This is the site's single strongest CTA.
- **Secondary:** transparent background, 1.5px Deep Ink border, Deep Ink text, 14.5px 26.5px padding (so the visible box matches the primary despite the border). On hover: fill flips to Deep Ink with Notebook Cream text.
- **Transitions:** `transform 0.1s ease, box-shadow 0.15s ease`. Fast enough to feel responsive on a phone.

### Cards / Containers

- **Featured essay card:** Page Cream fill, 1px hairline border at `rgba(0,0,0,0.06)`, 14px corners, 40px 44px 44px asymmetric padding (extra bottom for the CTA line). Hover: `translateY(-2px)` + Ink Card Lift. Contains a sage eyebrow, a serif title (38px / 28px mobile), a muted-brown pull quote, and an amber "Read the essay →" CTA. The whole card is a single anchor.
- **Module card (inside Offer, dark surface):** near-invisible fill (`rgba(255, 248, 236, 0.04)`), thin cream border at 8% alpha, 10px corners, 24px 26px padding. Contains an amber serif numeral (32px), a cream serif title (22px), and a cream body-text description at 70% alpha.
- **Magnet card:** Page Cream fill, dashed 1px muted-brown border (the "coupon" gesture — the only dashed border in the system), 12px corners, 40px 44px padding, center-aligned. Contains a sage-eyebrow "Free" label, a 32px serif title, a muted-brown paragraph, and the inline email form.
- **Essay CTA card (at bottom of every essay):** Page Cream fill, 1px hairline border, 12px corners, 40px 44px padding, center-aligned.

### Inputs / Fields

- **Email input:** Notebook Cream fill, 1.5px muted-brown border, 8px corners, 14px 18px padding, IBM Plex Sans 15px. On focus: border shifts to Deep Ink (no glow, no ring — the color change alone).
- **Layout:** input and submit sit inline in a flex row, gap 10px, wrapping to stacked on narrow widths.

### Navigation

- **Style:** two-column flex, Instrument Serif brand mark on the left (22px, with amber "."), IBM Plex Sans 500 links on the right (14px, muted-brown at rest).
- **Hover / active:** link color transitions to Deep Ink (`0.15s ease`). No underline, no background pill.
- **Wrapper padding:** 24px 32px desktop, 20px 24px mobile. The nav uses the wide container (1080px) rather than the reading container (720px), so it always feels like a page-width top rail.

### Signature Component: The Highlighter Swipe

The `.swipe` span wraps a fragment inside a headline (e.g. "in the margins."). It renders a soft asymmetric linear-gradient in Highlighter Amber (transparent at the edges, 75% alpha at the middle), 62% tall and offset to the lower two-thirds of the line, mimicking a hand-drawn highlighter stroke that undershoots and overshoots the letters. It is the site's most identifiable typographic move and should appear at most once per hero.

### Signature Component: The Trailing Dot

The `.dot` span sits inside brand words and primary CTAs. It renders as a single `.` in Highlighter Amber. It is applied via a real span, not a `::after`, so screen readers announce the period as part of the brand name.

## Do's and Don'ts

### Do:

- **Do** use Instrument Serif for every headline, lede, blockquote, module number, and wordmark; IBM Plex Sans for every body sentence, button label, eyebrow, and nav link.
- **Do** wrap the brand mark and hero CTAs in a `.dot` span so the trailing period renders in Highlighter Amber.
- **Do** use the highlighter swipe at most once per hero, on a short (1–4 word) fragment of the h1.
- **Do** flip to the Deep Ink inverse (Offer / Footer treatment) when a section needs the strongest possible emphasis — never with a second saturated hue.
- **Do** keep secondary buttons at 1.5px border and adjusted padding so their visible box matches the primary.
- **Do** cap body-text sections at ~620–720px reading width, even inside a wider container.
- **Do** tint hover shadows warm (Deep Ink or Highlighter Amber, at low alpha) and always pair them with a 1–2px translate.
- **Do** reserve Living Sage for editorial-context eyebrows only; treat any other use as a bug.
- **Do** use the dashed muted-brown border only on the magnet card (its "coupon" identity).

### Don't:

- **Don't** introduce pure white (#FFFFFF) anywhere — every light surface is a cream.
- **Don't** add a second saturated hue. Highlighter Amber is the only accent.
- **Don't** use bold serif weights for headlines. Serif stays at weight 400; emphasis is italic, size, or the highlighter swipe.
- **Don't** put a resting shadow on any surface. Shadows appear only on hover/focus.
- **Don't** use gray or cool-cast shadows (`rgba(0,0,0,X)`). Shadows are warm.
- **Don't** fabricate social proof — no invented testimonials, star ratings, "trusted by" strips, or buyer counts. See PRODUCT.md's Evidence on Hand section.
- **Don't** use Living Sage on a CTA, inside the Offer block, or as body copy.
- **Don't** mix dashed and solid borders inside the same section. The magnet card is the only dashed surface on the site.
- **Don't** render the brand name without its trailing period, and never render the period in Deep Ink or Muted Brown — it is always Highlighter Amber.
