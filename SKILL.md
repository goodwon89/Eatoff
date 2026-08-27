---
name: eatoff-design
description: Eatoff design system — minimalist intermittent fasting timer app. Warm off-white/deep black canvas, signature Fasting Red and Eating Green states, oversized tabular timer digits, generous whitespace, hairline borders. Use for any Eatoff app screens, marketing, widgets, or spinoffs.
user-invocable: true
---

# Eatoff Design System — Quick Map

Eatoff (잇오프) is a minimalist intermittent-fasting & meal-cycle timer.
Design philosophy: **Minimally Bold · Clear State Distinction · Generous Spacing**.

## Files

- `colors_and_type.css` — all design tokens (colors, radii, spacing, type scale, motion). `@import` this or copy the `:root` block.
- `README.md` — full brand + visual + iconography documentation. **Read first** for content tone and visual rules.
- `assets/` — logo mark, wordmark, icon references.
- `preview/` — design system spec cards (colors, type, spacing, components).
- `ui_kits/eatoff-app/` — mobile app UI kit with Home / Plans / History / Settings / Widgets screens. `index.html` is a click-through prototype.

## Non-negotiable brand rules

1. **Two states, two colors — never mix.**
   - Fasting = `--eat-fasting` (#E5342A light / #FF4A3D dark). Signals energy, focus, sustained state.
   - Eating = `--eat-eating` (#1F9D55 light / #3BD671 dark). Signals vitality, recovery.
   - Never use both accent colors on one screen except during a state transition.

2. **Timer digits are the hero.** Use `.eat-timer` (96px) or `.eat-timer-lg` (120px) — JetBrains Mono, bold, tabular-nums, tight tracking. Nothing else on-screen competes for size.

3. **Warm off-white, not pure white.** Canvas is `#F5F5F0` in light mode. Pure white is reserved for surfaces (cards).

4. **Hairline over shadow.** Cards use a 1px border (`--eat-border`) with a barely-there shadow (`--eat-shadow-1`). Never chunky drop shadows.

5. **Icons: Lucide, stroke 1.75, rounded joins.** Loaded from CDN — do not draw new SVGs.

6. **Copy tone: quiet, factual, second-person, Korean-first.** No exclamation marks, no emoji, no cheerleading. "16시간 남음" not "16시간이나 남았어요! 화이팅! 🔥"

7. **Radii scale:** cards 12px, prominent cards 16px, bottom sheets 20px, buttons/pills 999px.

## Typography

- `Inter` (400/500/600/700) — UI
- `Noto Sans KR` (400/500/700) — Korean text (chained after Inter in font-stack)
- `JetBrains Mono` (400/500/700) — all numeric readouts (timer, times, percentages, durations)

## When designing

- Start from a token, not a hex code.
- Timer & state buttons take the visual weight; everything else recedes.
- One clear action per screen. If you're stacking three CTAs, you're doing it wrong.
- Light and dark mode are equal citizens — every card in `preview/` shows both.
