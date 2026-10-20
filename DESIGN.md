---
name: Lunch Break Business
description: A hi-vis yellow, time-card-inspired site for a working dad who builds in the margins. Bold, condensed, loud with personality.
colors:
  vest: "#F3CF2B"
  stock: "#FBF8EF"
  ink: "#161615"
  muted: "#3A3524"
  accent: "#B0201B"
  print: "#2B6A4C"
  on-ink: "#F3EFE4"
  mute-ink: "#B9B3A3"
  rule: "rgba(18,18,18,.18)"
  hover-black: "#000"
  shadow-warm-sm: "rgba(60,45,0,.12)"
  shadow-warm-md: "rgba(60,45,0,.35)"
  shadow-warm-lg: "rgba(60,45,0,.4)"
  shadow-warm-rack-near: "rgba(60,45,0,.15)"
  shadow-warm-rack-far: "rgba(60,45,0,.45)"
  punch-hole: "rgba(0,0,0,.6)"
typography:
  display:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "clamp(3.1rem, 9vw, 6rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  headline:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "clamp(2.4rem, 6.4vw, 4.6rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  title:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 70'
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 850
    lineHeight: 1.02
    textTransform: "uppercase"
  body:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 100'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 100'
    fontSize: "clamp(19px, 2vw, 22px)"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "IBM Plex Mono"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  mono:
    fontFamily: "IBM Plex Mono"
    fontSize: "14px"
    fontWeight: 500
  fine:
    fontFamily: "IBM Plex Mono"
    fontSize: "13px"
    fontWeight: 500
  card-label:
    fontFamily: "IBM Plex Mono"
    fontSize: "15px"
    fontWeight: 700
  small-body:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 100'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  subhead:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 70'
    fontSize: "24px"
    fontWeight: 850
    lineHeight: 1.1
    textTransform: "uppercase"
  essay-title:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "56px"
    fontWeight: 850
    lineHeight: 0.92
    textTransform: "uppercase"
  stat:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "clamp(2.6rem, 6vw, 3.6rem)"
    fontWeight: 900
    lineHeight: 0.9
  turn:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 70'
    fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)"
    fontWeight: 850
    lineHeight: 1.02
    textTransform: "uppercase"
  stub-item:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 72'
    fontSize: "21px"
    fontWeight: 850
    textTransform: "uppercase"
  stub-total:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "clamp(2.2rem, 5vw, 3rem)"
    fontWeight: 900
    lineHeight: 1
  faq-question:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 80'
    fontSize: "clamp(21px, 2.4vw, 27px)"
    fontWeight: 800
    lineHeight: 1.15
  card-head:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 62'
    fontSize: "40px"
    fontWeight: 900
    lineHeight: 0.9
    textTransform: "uppercase"
  button:
    fontFamily: "Archivo"
    fontVariationSettings: '"wdth" 85'
    fontSize: "20px"
    fontWeight: 800
    textTransform: "uppercase"
    letterSpacing: "0.02em"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "144px"
  edge: "clamp(16px, 5vw, 72px)"
rounded:
  sm: "4px"
  card: "3px"
  notch: "22px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.vest}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "18px 28px"
  button-primary-hover:
    backgroundColor: "#000"
    transform: "translateY(-2px)"
  button-cta-on-ink:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.sm}"
    padding: "18px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.sm}"
    padding: "16px 26px"
  nav-link:
    fontFamily: "{typography.label.fontFamily}"
    fontSize: "13px"
    textColor: "{colors.muted}"
  nav-brand:
    fontFamily: "{typography.display.fontFamily}"
    fontVariationSettings: '"wdth" 70'
    fontWeight: 800
    fontSize: "20px"
    textTransform: "uppercase"
---

# Design System: Lunch Break Business

## Overview

**Creative North Star: "The Time Card"**

This is a bold, hi-vis system built around one central fact about Cody: he's the guy who wears the vest. The page ground is hi-vis yellow (#F3CF2B). Everything sits on it like a time card sitting on a break room table. Headings are huge, condensed, uppercase — they punch you in the face the moment you land. The CTA color is time-clock red (#B0201B), the same red ink a factory punch clock leaves on a card.

The design was built by Paul Scrivens and reflects Cody's actual personality: loud, warm, working-class, real. Not a startup. Not a coach. A guy who figured it out on his lunch break and wants to show you how.

Two fonts. Archivo (a variable condensed sans) handles everything from ultra-compressed display headlines to readable body copy — just by adjusting the `wdth` axis. IBM Plex Mono handles labels, prices, timestamps, and anything that reads like a printed form field.

## Colors

- **Vest** (#F3CF2B): the whole page ground. Hi-vis yellow. Cody's vest. The most important color.
- **Stock** (#FBF8EF): time card off-white. Secondary surfaces, cards, secondary sections.
- **Ink** (#161615): near-black. All text on yellow. Also the dark section background.
- **Muted** (#3A3524): secondary text on yellow. Slightly warm, tinted from the vest.
- **Accent** (#B0201B): punch red. Every CTA button. Every emphasis point. The time clock's ink.
- **Print** (#2B6A4C): dark green. Structural labels, eyebrows in card contexts. Used sparingly.
- **On-ink** (#F3EFE4): warm white text on dark (ink) backgrounds.
- **Mute-ink** (#B9B3A3): muted text on dark backgrounds.
- **Rule** (rgba(18,18,18,.18)): borders and dividers on light surfaces.

### Named Rules

**The Vest Rule.** Yellow is the page. Not an accent. Not a highlight. The entire ground.

**The One Red Rule.** Accent (#B0201B) is the only CTA color. Never use yellow as a button color on yellow backgrounds.

**The No-White Rule.** Pure white (#FFFFFF) does not exist in this system. Light surfaces are vest or stock only.

## Typography

**Display/Body font:** Archivo (variable — wdth axis 62–125, wght axis 400–900)
**Label/Mono font:** IBM Plex Mono (weights 500, 700)

Archivo is a variable font with a width axis. wdth 62 = ultra-condensed headlines. wdth 100 = readable body. wdth 85 = buttons. One font, three voices.

IBM Plex Mono is the "printed form" voice — prices, timestamps, eyebrows, nav links.

### Type Scale

- **Display** (wdth 62, 850, clamp 3.1rem–6rem, uppercase, lh .92)
- **Headline** (wdth 62, 850, clamp 2.4rem–4.6rem, uppercase, lh .92)
- **Title** (wdth 70, 850, clamp 2rem–2.8rem, uppercase, lh 1.02)
- **Body** (wdth 100, 400, 18px, lh 1.55)
- **Lede** (wdth 100, 400, clamp 19px–22px, lh 1.4)
- **Label** (IBM Plex Mono, 700, 12px, uppercase, ls 0.14em)
- **Button** (wdth 85, 800, 20px, uppercase, ls 0.02em)

## Buttons

- **Primary (on yellow):** ink background, vest text, 18px 28px, radius 4px. Hover: #000, translateY(-2px).
- **CTA (on dark):** accent (#B0201B) background, on-ink text. Hover: #8B1815, translateY(-2px).
- **Secondary:** transparent, 2px ink border. Hover: fills ink with vest text.

## Spacing

4, 8, 12, 16, 24, 32, 48, 64, 96, 144px (s1–s10). Edge/gutter: clamp(16px, 5vw, 72px).

## Do's and Don'ts

### Do:
- **Do** let the yellow breathe — the bg IS the brand.
- **Do** use Archivo condensed (wdth 62, weight 850, uppercase) for every headline.
- **Do** use IBM Plex Mono for every label, price, timestamp, and eyebrow.
- **Do** use accent red for every CTA button, especially on dark sections.
- **Do** use ink bg for emphasis sections (offer block, footer).

### Don't:
- **Don't** put white on the page. Everything light is vest or stock.
- **Don't** use a second accent color.
- **Don't** use Archivo for label/price/timestamp contexts.
- **Don't** make headlines mixed case. Uppercase always.
- **Don't** put a resting shadow on surfaces. Shadows only on hover.
