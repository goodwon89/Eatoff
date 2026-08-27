# Eatoff (잇오프) — Design System

> **Minimally Bold. Clear State Distinction. Generous Spacing.**
> A design system for a minimalist intermittent-fasting & meal-cycle timer.

---

## 1. Product context

**Eatoff** is a health / fitness / lifestyle mobile app focused on **intermittent fasting** (16:8, 18:6, OMAD, and custom ratios). It deliberately does *not* ask users to log calories or macros — the entire product surface is anchored around **one number**: how long you've been fasting or eating.

**Target user**
- People practicing IF (16:8, 18:6, 20:4, 23:1/OMAD, or custom)
- Users who want to track fasting **state** and **time only**, without meal logging
- Users who rely on Android home widgets and push notifications to stay on schedule

**Core surfaces**
1. **Home** — circular timer, one-tap state switch, fasting-stage bottom sheet
2. **Plans** — 14:10 / 16:8 / 18:6 / 20:4 / 23:1 presets + slider-based custom ratio
3. **History** — session list, streak & summary stats
4. **Widgets** — 4×2 standard, 2×2 compact
5. **Settings** — theme, notifications, data management

## 2. Sources

- **GitHub**: [github.com/goodwon89/Eatoff](https://github.com/goodwon89/Eatoff) — repository is currently an AI Studio starter placeholder (no application code). This design system was built from the spec document provided by the product owner, not from source code.
- **Design brief**: Product owner Goodwon89 (HR specialist, 12y). Full spec (features + color palette starter) attached with the design-system creation request.
- **Substitutions** (flagged for review):
  - Fonts: **Inter** (Google Fonts) as the primary UI face — a safe, high-legibility neutral in the same lane as SF Pro / Wix Madefor. Please confirm or upload the brand font.
  - Monospace: **JetBrains Mono** for timer digits — chosen for its excellent tabular-nums and openness at large sizes.
  - Korean: **Noto Sans KR** as the KR companion.
  - Icons: **Lucide** (CDN) — matches the minimalist stroke aesthetic.

---

## 3. Content fundamentals

### Voice
- **Quiet, factual, respectful.** Eatoff never cheerleads or nags.
- **Second person, Korean-first** (한국어 우선). English is a fallback.
- **Numbers over adjectives.** "16시간 08분 경과" beats "정말 잘 하고 계세요!"
- **No exclamation marks. No emoji.** Not "🔥 화이팅!" — just "지방 연소 단계 진입".
- **Verbs are direct.** "단식 시작" / "식사 시작" — not "단식을 시작해볼까요?"
- **Empty states are diagnostic, not motivational.** "아직 기록이 없어요" — not "첫 단식을 시작하고 여정을 시작하세요! 💪"

### Casing
- Korean titles use natural sentence case.
- English labels use **Sentence case** for buttons/actions, **UPPERCASE with wide tracking (0.12em)** for eyebrow labels ("FASTING", "STAGE 3").
- Numeric readouts always show leading zeros (`08:24` not `8:24`) via tabular nums.

### Vibe
Think of a well-designed physical wristwatch: nothing on the dial that isn't earning its space. The interface is a tool, not a coach.

**Sample copy**

| Context | Do | Don't |
|---|---|---|
| Home CTA (fasting) | `단식 시작` | `지금 단식을 시작해볼까요? 🔥` |
| Timer sub-label | `16:8 · 목표까지 07:32` | `조금만 더 힘내세요!` |
| Stage sheet header | `현재 단계 · 지방 연소` | `축하해요! 지방 연소 모드!` |
| Empty history | `기록 없음` | `첫 발걸음을 떼어보세요 ✨` |
| Success toast | `단식 종료 · 16시간 04분` | `대박! 목표 달성! 🎉` |

---

## 4. Visual foundations

### Colors
Two signature states carry the entire brand.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--eat-canvas` | `#F5F5F0` | `#0A0A0A` | App background |
| `--eat-surface` | `#FFFFFF` | `#111111` | Cards, bottom sheets |
| `--eat-surface-alt` | `#FAFAF6` | `#171717` | Inset surfaces (inputs, chips) |
| `--eat-border` | `#EAEAE3` | `#1F1F1F` | Hairline dividers |
| `--eat-text` | `#111111` | `#FFFFFF` | Primary text |
| `--eat-text-3` | `#888888` | `#888888` | Secondary text |
| **`--eat-fasting`** | `#E5342A` | `#FF4A3D` | **Fasting state — energy, focus** |
| **`--eat-eating`** | `#1F9D55` | `#3BD671` | **Eating state — vitality** |

Canvas is warm off-white (`#F5F5F0`), not pure white. Pure white is reserved for **cards** to create a subtle floating effect against the warm background — the shift is intentional and calm.

### Type
- **Inter** (UI): 400 / 500 / 600 / 700
- **Noto Sans KR** (Korean): 400 / 500 / 700 — chained after Inter
- **JetBrains Mono** (numeric): all digits, tabular-nums, `letter-spacing: -0.035em` at large sizes

The timer digit is the single largest visual element in the app — up to **120px, weight 700, tabular-nums**. Nothing else competes.

### Spacing
4/8/12/16/24/32/48/64/96 scale. Screens breathe: mobile screens use 24–32px side padding, 32–48px between major sections. Never crush content — if it feels tight, add another step.

### Backgrounds
- **Flat, no gradients** on primary surfaces. Canvas is a single warm off-white; the "warmth" comes from the color choice, not overlays.
- **No patterns, textures, or noise.** The visual richness comes from the ring animation, not the substrate.
- **No full-bleed hero imagery.** Eatoff is a numeric utility, not a lifestyle magazine.
- **Bottom sheets** use `--eat-surface` with a 20px top radius and a 4px handle indicator.

### Motion & animation
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)` — smooth ease-out, no bounce
- Standard duration: **220ms**
- Timer progress ring: **linear**, updating every second (not animated between values)
- State-color transitions: **360ms crossfade** on the ring stroke only (label swaps instantly)
- **No page slide-ins, no scale bounces, no confetti.** Reduce-motion-first thinking.

### Interaction states
- **Hover (web preview only, since mobile-first):** `opacity: 0.85` — no color shift, no lift
- **Press / active:** `transform: scale(0.98)` + `opacity: 0.9`, 120ms
- **Focus (keyboard):** 2px outline in `--eat-fasting` or `--eat-eating` depending on context, 3px offset
- **Disabled:** `--eat-text-4` for text, `--eat-surface-alt` for fill, no cursor pointer

### Borders, shadows, elevation
- **Hairline first.** Cards get a 1px `--eat-border` and near-zero shadow (`--eat-shadow-1`). No chunky drop shadows.
- **Elevated sheets** get `--eat-shadow-lift` — a soft 12px/40px shadow — but only when they float above scrim.
- **Dark mode has no soft shadows.** Elevation is signaled by lighter fill (`--eat-surface` sits above `--eat-canvas`).

### Corner radii
| Radius | Use |
|---|---|
| `--eat-radius-sm` 8px | Inputs, chips |
| `--eat-radius-md` 12px | Standard cards |
| `--eat-radius-lg` 16px | Prominent cards |
| `--eat-radius-xl` 20px | Bottom sheets, modals |
| `--eat-radius-2xl` 28px | Hero surfaces |
| `--eat-radius-pill` 999px | Buttons, pill filters, timer ring |

### Cards
White (or `#111`) fill · 12–16px radius · 1px `--eat-border` · optional `--eat-shadow-1` when on scrim · 20–24px inner padding.

### Transparency & blur
- **Sheet scrim:** `rgba(10, 10, 10, 0.45)`, no blur.
- Native OS blur (safe-area inset) is respected but not styled.
- No glass/frosted UI — Eatoff is bold and opaque.

### Imagery
Eatoff intentionally has almost **no imagery**. When needed (empty states, onboarding), use flat single-color line icons at 48–64px — never illustrations, never photography.

---

## 5. Iconography

### System
**Lucide** ([lucide.dev](https://lucide.dev)) — loaded via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

- **Stroke width: 1.75** (default 2 feels heavy at small sizes)
- **Rounded line caps + joins**
- **Currentcolor**, so icons inherit the surrounding text color
- **Sizes**: 16, 20, 24 (default), 32, 48 — no odd sizes

### Common icons used in-product
| Icon | Purpose |
|---|---|
| `timer` / `hourglass` | Fasting state |
| `utensils` / `apple` | Eating state |
| `bar-chart-3` | History / stats |
| `calendar-days` | Plans |
| `sliders-horizontal` | Custom plan / settings |
| `bell` | Notifications |
| `moon` / `sun` | Theme toggle |
| `chevron-right` / `chevron-down` | Navigation |
| `check` / `x` | Success / failure state |

### Emoji
**Not used anywhere.** Not in UI copy, not in notifications, not in empty states.

### Unicode
- `·` (middle dot) as a separator: `16:8 · 목표까지 07:32`
- `→` for progression, `↑` `↓` for trend deltas in stats

### Substitution flag
🚩 The app has no icon assets attached to the brief. **Lucide is a substitution** — it's the closest match to the minimal, rounded, hairline aesthetic. If the product owner has a custom icon set, please share and this will be swapped in.

---

## 6. Index

### Root
- `README.md` — this file
- `SKILL.md` — attachable skill manifest
- `colors_and_type.css` — all design tokens
- `thumbnail.png` — cover image
- `assets/` — logos & static SVG assets

### Design system cards
- `preview/*.html` — one card per token cluster, registered to the Design System tab

### UI kits
- `ui_kits/eatoff-app/index.html` — mobile app click-through prototype
- `ui_kits/eatoff-app/*.jsx` — modular components (Timer, ActionButton, ScreenFrame, etc.)

---

## 7. For further work

The GitHub repo at [github.com/goodwon89/Eatoff](https://github.com/goodwon89/Eatoff) is currently a placeholder. Once actual app code lands there, this design system should be re-visited to:

1. Pin the real brand font (if different from Inter)
2. Import any bespoke icons instead of Lucide
3. Reconcile any component API differences (e.g. Timer prop names) between this kit and production
