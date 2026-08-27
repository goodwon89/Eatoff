# Handoff: Eatoff — Landing Page & Design System

## Overview

**Eatoff (잇오프)** is a minimalist intermittent-fasting & meal-cycle timer app for Android. This handoff package contains:

1. **A marketing landing page** (`Eatoff Landing.html`) with two selectable hero variants (Living Timer / Split Screen) and a 5-axis Tweaks panel.
2. **A mobile app UI kit** (`ui_kits/eatoff-app/`) — click-through prototype covering Home, Plans, History, Settings screens plus Android widget mockups.
3. **A complete design system** — CSS tokens, typography, iconography guidance, and 23 spec cards.

The product philosophy is **"Minimally Bold · Clear State Distinction · Generous Spacing"**: no calorie logging, no macros, no gamification — just a big tabular timer digit and two states (Fasting Red / Eating Green).

---

## About the Design Files

The files in this bundle are **design references created in HTML/JSX** — prototypes showing intended look and behavior, **not production code to copy directly**.

Your task is to **recreate these designs in your target codebase's existing environment** (React, Vue, SwiftUI, Flutter, Kotlin/Compose, or plain HTML/CSS) using its established patterns, component library, and asset pipeline. If no environment exists yet, choose the most appropriate framework for the project — for the marketing site, a static site generator (Next.js, Astro, plain HTML) is a strong fit; for the mobile app, Kotlin + Jetpack Compose is the natural choice given Android-first targeting.

The HTML mocks use inline React + Babel and load Google Fonts and Lucide icons from CDNs. **Do not ship those runtime choices to production** — they are demo conveniences. Use your codebase's normal font loading, icon library, and component patterns.

---

## Fidelity

**High-fidelity (hifi).** These are pixel-perfect mockups with final colors, typography, spacing, radii, and interactions. Every hex code and pixel value in the CSS tokens and this README is the intended production value. The developer should recreate the UI pixel-perfectly using the codebase's existing libraries and patterns.

Exceptions flagged as substitutions (see **Assets** section below):
- The brand does not yet have a custom icon set — **Lucide** is used as a substitute.
- Fonts are Google Fonts (**Inter** + **JetBrains Mono** + **Noto Sans KR**) — replace if the brand adopts a bespoke typeface.

---

## Screens / Views

### A. Landing Page — `Eatoff Landing.html`

The landing page is a **single scrolling page** with 8 sections. Two hero variants are available (Tweaks-swappable).

---

#### 1. Nav — top fixed bar (`landing/Nav.jsx`)

- **Position**: `position: fixed; top: 0; left: 0; right: 0; z-index: 50`
- **Height**: content-driven (~68px with 18px vertical padding)
- **Padding**: `18px 32px`
- **Layout**: `max-width: 1200px; margin: 0 auto`; flex row space-between
- **Background at rest**: transparent
- **Background when scrolled > 20px**:
  - Light: `rgba(245, 245, 240, 0.85)` with `backdrop-filter: blur(20px)`
  - Dark: `rgba(10, 10, 10, 0.85)` with `backdrop-filter: blur(20px)`
- **Border-bottom when scrolled**: `1px solid var(--eat-border)`; else transparent
- **Transition**: `all 260ms cubic-bezier(0.22, 1, 0.36, 1)`
- **Left**: `LogoMark` (28px SVG split-ring) + wordmark "Eatoff" — 20px, weight 700, letter-spacing −0.02em
- **Center-right nav links** (14px, weight 500, `--eat-text-2`, gap 32px): 기능 · 단식 단계 · 위젯 · 다운로드
  - Hover: color transitions to `--eat-text` in 160ms
- **Dark mode toggle**: 38×38 circle button with `moon` / `sun` Lucide icon
- **Play Store badge** (compact size): black pill with Play triangle + "GET IT ON / Google Play"

---

#### 2. Hero — Variant A: Living Timer (`landing/Hero.jsx`, DEFAULT)

- **Section min-height**: `100vh`; padding `140px 32px 80px`
- **Background**: `--eat-canvas` (`#F5F5F0` light / `#0A0A0A` dark)
- **Massive background timer ring**:
  - 720×720px SVG centered at `left: 50%; top: 52%; transform: translate(-50%,-50%)`
  - Track: `--eat-track`, stroke-width 24, no fill
  - Progress: `stroke = state === 'fasting' ? --eat-fasting : --eat-eating`, stroke-width 24, `strokeLinecap: round`, rotated −90° from center
  - Opacity: 0.85 light / 0.7 dark
  - `pointer-events: none`
- **Scroll-driven state transition**: As user scrolls past 40% of hero height, ring color crossfades from Fasting Red → Eating Green (via a `transitionT` derived from scroll position; state flip at midpoint). Transition duration 600ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- **3-column content grid** (`gridTemplateColumns: '1fr auto 1fr'`, gap 40px, `align-items: center`):

  **Left column** — headline stack:
  - Live status pill (padding 6/14, radius 999, background `--eat-fasting-soft`, color `--eat-fasting-ink`):
    - 8×8 pulsing dot (2.2s infinite scale+opacity animation)
    - Text: `LIVE · FASTING · 16:8` (11px, weight 600, tracking 0.14em)
  - `<h1>` — 84px, weight 700, tracking −0.045em, line-height 0.95, `text-wrap: balance`
    - Copy variant A: `Just time.` (with "time." in italic weight 400)
    - Copy variant B: `Not a diet. A rhythm.` (with "rhythm." in italic weight 400)
  - Subtitle KR — 20px, weight 500, `--eat-text-2`, line-height 1.4, max-width 420
  - Long-form body — 15px, `--eat-text-3`, line-height 1.6, max-width 420
    - Copy: `칼로리 입력도, 매크로 계산도 없어요. 단식과 식사, 그리고 시간. 그게 전부예요.`
  - Play Store big badge + rating row (star + "4.8" mono tabular + "· 2,400+ 리뷰")

  **Center column** — massive timer readout:
  - Eyebrow: 11px weight 600 tracking 0.18em, `ELAPSED · 경과 시간` (or `REMAINING · 남은 시간` in eating state)
  - Time digits: JetBrains Mono (or user-selected mono), weight 700, tracking −0.055em, line-height 1
  - Font sizes by Tweaks scale: `sm: 140px / md: 200px / lg: 260px`
  - Format: `HH : MM : SS` where `HH` and `MM` are same size, colon opacity 0.35, seconds at 0.5em size with opacity 0.35
  - `font-variant-numeric: tabular-nums` **required**
  - **Live count-up via `setInterval(1000)`** — increments every second
  - Below: PROGRESS % and TARGET h stat pair, separated by 1px vertical border

  **Right column** — three floating info cards stacked with 12px gap:
  - Card: `background: --eat-surface`, `border: 1px solid --eat-border`, `border-radius: 16px`, `padding: 14px 18px`, `min-width: 220px`
  - Shadow: `0 8px 32px rgba(17,17,17,0.06)` light / `0 8px 32px rgba(0,0,0,0.4)` dark
  - Contents:
    1. `flame` icon (in state-tinted 40×40 rounded-12 box) + "CURRENT STAGE · 지방 연소 · Fat burning · 12h+"
    2. `calendar-days` icon + "STREAK · 14일 · Longest · 21일"
    3. `target` icon + "THIS WEEK · 92% · ↑ 목표 달성률"

- **Scroll cue** at bottom center: "SCROLL" label + 1×32px vertical line with scaleY animation loop (2s)

---

#### 2b. Hero — Variant B: Split Screen (`landing/HeroSplit.jsx`)

- **Layout**: full-width CSS grid `1fr 1fr`, `min-height: 100vh`
- **Left half** (Fasting):
  - Background: `mix(#E5342A, #FFFFFF, 92%)` light = `#FDECEC`; `mix(#E5342A, #000, 88%)` dark
  - Padding: `140px 60px 80px 8vw`
  - Watermark digit "16" at `right: -80px`, JetBrains Mono 480px weight 700, `--eat-fasting` at 5% (light) or 6% (dark) opacity
  - Status pill "FASTING · 단식 중" + pulsing dot
  - 84px headline (same tokens as Hero A)
  - **Live stat card** — `--eat-surface` bordered, contains ELAPSED (40px mono tabular timer, live-updating) + PROGRESS ("91%" in Fasting Red)
  - Play Store badge + rating row
- **Right half** (Eating):
  - Background: mix of `--eat-eating` with white/black at same ratios
  - Watermark digit "8" at `left: -60px`, `--eat-eating` tinted
  - **Phone mockup** (`SplitPhone`) — 300×620px with 10px black bezel, radius 40px
    - Compact Eatoff Home screen: status pill, timer ring (220×220px SVG), 46px mono timer "02:14"
    - Fasting CTA button pinned bottom
  - Eating window card — "EATING WINDOW · 식사 시간 · 16:00 → 24:00 · 남은 시간 05:46"
- **Center divider**:
  - 1px vertical rule at `left: 50%; top: 0; bottom: 0`
  - Centered floating logo pill (96×96, radius 999, `--eat-surface`, shadow) containing 52×52 split-ring logo
  - Label "16 : 8" below (10px weight 700 tracking 0.2em)
- **Top labels** at `top: 100px, center`: `16H FASTING` (with Fasting dot) · `8H EATING` (with Eating dot), gap 40px

---

#### 3. Anti-feature — "No calories. No macros. No logging." (`landing/AntiFeature.jsx`)

- **Section padding**: `160px 0`; `border-top: 1px solid --eat-border`
- **2-column grid**, gap 80px, align center:

  **Left**:
  - Eyebrow: `ANTI-FEATURE · 하지 않는 것들`
  - `<h2>` 76px weight 700 tracking −0.045em line-height 0.95:
    - Line 1: `No calories.` (`--eat-text`)
    - Line 2: `No macros.` (`--eat-text-3`)
    - Line 3: `No logging.` (`--eat-text-3`)
  - Body 20px `--eat-text-2` line-height 1.5, max-width 460
  - Small body 15px `--eat-text-3` line-height 1.6

  **Right** — 6 "we don't do this" rows + 1 highlight card:
  - Each row: flex row, 18/22 padding, `--eat-surface`, radius 14, 1px border
    - 32×32 rounded-999 red-tinted circle with `x` icon (Lucide, stroke-width 2.5)
    - Korean label (18px weight 600 `--eat-text-3` with red strikethrough)
    - English mono label (11px tracking 0.1em `--eat-text-4`)
  - Items: 칼로리 입력 / 탄단지 매크로 / 식단 사진 / 바코드 스캔 / 체중 그래프 / 푸시 광고
  - **Final highlight card**: `background: --eat-text` (black), `color: --eat-canvas`
    - 36×36 green circle with `check` icon (stroke-width 3)
    - Small mono label "WHAT WE TRACK" + 22px weight 700 "시간, 그것 하나."

---

#### 4. One Tap · Two States (`landing/OneTap.jsx`)

- **Section**: `padding: 160px 0`, background `--eat-surface-alt` (`#FAFAF6` light / `#171717` dark)
- **Header centered**, max-width 720:
  - Eyebrow: `ONE TAP · 원터치 상태 전환`
  - `<h2>` SplitHeading: `One tap. Two states.` (72px English) / `탭 하나로 단식과 식사를 오갑니다` (28px Korean subtitle)
- **3-column layout** below (`1fr auto 1fr`, gap 48, align center):

  **Left & Right**: `MiniPhoneMockup` (280×~590px, 10px black bezel, radius 32)
  - Left shows Fasting state (red ring, "14:32", 단식 중 pill, 식사 시작 button in green)
  - Right shows Eating state (green ring, "02:14", 식사 중 pill, 단식 시작 button in red)
  - **Active phone**: full opacity, `scale(1)`, shadow with 22% tint of state color
  - **Inactive phone**: 60% opacity, `scale(0.94)`
  - Transition: `all 400ms cubic-bezier(0.22, 1, 0.36, 1)`
  - Ring progress at 91% (fasting) or 28% (eating) — different `strokeDashoffset`
  - Ring 200×200px SVG, stroke-width 8, radius 88

  **Center**: 96×96 circle CTA button
  - Background: current state's accent color (red or green)
  - Icon: `utensils` (when fasting → show eating action) or `timer` (vice versa), 40×40, stroke-width 1.75
  - Shadow: `0 20px 60px ${accentColor}55`
  - **Pressed state**: `scale(0.94)`, released back to `1`
  - Below button:
    - 22px weight 700 label ("식사 시작" or "단식 시작")
    - 13px `--eat-text-3` hint "탭해서 상태 전환"
  - Segmented control (2 pills side by side in pill container) for direct state selection: FASTING / EATING (or 단식 / 식사)

---

#### 5. Fasting Stages Timeline (`landing/StagesTimeline.jsx`)

- **Section**: `padding: 160px 0`, `border-top: 1px solid --eat-border`
- **Header centered**, max-width 760:
  - Eyebrow: `FASTING STAGES · 단식 단계`
  - SplitHeading: `Your body, hour by hour.` / `시간이 흐를수록 몸은 다른 단계로 들어갑니다`
- **Timeline row** — 6 nodes, connected by a track:
  - Track: `left: 4%; right: 4%; top: 24px; height: 2px; background: --eat-border`
  - Progress: same position, width `${progressP * 92}%`, `linear-gradient(90deg, --eat-fasting, --eat-eating)`, 500ms transition
  - **Nodes** at each stage hour (0h, 4h, 8h, 12h, 18h, 24h):
    - Non-active dot: 34×34 circle, background `--eat-canvas`, 3px border in `--eat-border` (or state color if past)
    - Active dot: 50×50 filled circle, background = state color, box-shadow `0 12px 32px ${dotColor}55`
    - Lucide icon inside (14→20px animated on active)
    - Icons per stage: `utensils` / `activity` / `battery-low` / `flame` / `zap` / `recycle`
    - Below icon: hour label (`0h` style mono weight 700 tracking −0.02em, tabular)
    - Below hour: stage name (11px weight 600, no-wrap)
  - Node scale transition: 320ms `cubic-bezier(0.22, 1, 0.36, 1)`
- **Scroll-driven auto-activation**: As user scrolls the section into view, `activeIdx` progresses from 0 → 5.
  - Formula: `p = clamp01((viewportH - rect.top) / (rect.height + viewportH))`; `idx = clamp(floor(p * 6), 0, 5)`
- **Detail row below** — 2-column grid gap 60:

  **Left** — concentric-rings illustration (400×400 SVG viewBox):
  - 6 rings centered at (200,200), radii 40, 70, 100, 130, 160, 190
  - Ring stroke: state color if `i <= activeIdx`, else `--eat-border`; stroke-width 6 (active) / 3 (past) / 1.5 (future); opacity 1 / 0.6
  - Center: 26px filled circle in `--eat-canvas` with 3px state-colored border, hour label inside (20px mono weight 700)

  **Right** — active-stage text:
  - Pill: `STAGE N / 6` with icon
  - `<h3>` 56px weight 700 tracking −0.03em line-height 1 — stage name (Korean)
  - Mono uppercase 14px tracking 0.08em — English name
  - Body 18px `--eat-text-2` line-height 1.55 max-width 440 — description
  - Metric row: ELAPSED (36px mono) + NEXT (18px + hours-until)

- **Educational disclaimer** at bottom: 12px `--eat-text-3` centered, max-width 720, background `--eat-surface-alt`, radius 12, padding 16/22 — legal/medical caveat

**Stage data (6 entries)**:

| hours | title (KR) | en | description | icon |
|---|---|---|---|---|
| 0 | 식사 종료 | Fed state | 마지막 식사 이후 인슐린과 혈당이 상승합니다. | utensils |
| 4 | 혈당 안정 | Blood sugar dip | 식후 인슐린이 정상 수준으로 안정되고 소화가 마무리됩니다. | activity |
| 8 | 글리코겐 감소 | Glycogen depletion | 간의 글리코겐이 소진되며 지방 대사가 시작됩니다. | battery-low |
| 12 | 지방 연소 | Fat burning | 지방을 주 에너지원으로 사용하기 시작합니다. | flame |
| 18 | 케토시스 | Ketosis | 케톤이 뇌와 근육의 주 연료로 사용됩니다. | zap |
| 24 | 오토파지 | Autophagy | 손상된 세포 성분이 재활용되며 세포 수준의 청소가 일어납니다. | recycle |

---

#### 6. Widget Showcase (`landing/WidgetShowcase.jsx`)

- **Section**: `padding: 160px 0`, background `--eat-surface-alt`
- **2-column layout** gap 80:

  **Left**:
  - Eyebrow: `HOME WIDGETS · 홈 화면 위젯`
  - SplitHeading: `Always on your home screen.` / `앱을 열지 않아도 상태를 확인하세요`
  - Body 17px, max-width 460
  - 2 mini-info rows for `4×2` and `2×2` widgets (mono size label + description)

  **Right** — **Android home-screen mockup** (9:18 aspect, max-width 440):
  - Wallpaper: `linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f1729 100%)`
  - Device bezel: `border: 12px solid #000`, `border-radius: 44px`
  - Shadow: `0 40px 100px rgba(0,0,0,0.4)`
  - **Status bar** (13px weight 600 white): tabular time `9:41` left, wifi + battery icons right
  - **4×2 Widget** (32px top margin):
    - Background `#111`, radius 24, padding `18px 20px`, color white
    - Header: `FASTING · 16:8` (10px 0.14em tracking, `#FF7A70`) + `Eatoff` (10px 0.6 opacity)
    - Timer: JetBrains Mono 48px weight 700 tracking −0.04em `14:32` tabular
    - Progress bar: 5px `#1F1F1F` track with 82% `#FF4A3D` fill, radius 999
    - Footer: `82%` + `목표까지 01:28` (11px opacity 0.6)
  - **Mini row** (14px margin-top, 12px gap):
    - **2×2 Widget** (150px wide, same treatment, 26px timer instead of 48px, 3px progress bar)
    - **App icons column** (2×2 grid): 42×42 rounded-12 icons in hsl(i×90°, 40%, 40%) with lucide icons `message-circle` / `camera` / `music` / `map` + 9px white labels 메시지/카메라/음악/지도
  - **Bottom dock** (absolute, 24px from bottom, 20px sides):
    - Blurred glass `rgba(255,255,255,0.08)` + `backdrop-filter: blur(20px)`, radius 22, padding 10/8
    - 4 icons: `phone` / `message-square` / `globe` / `camera` in colored rounded-12 tiles

---

#### 7. Stats Strip (`landing/Stats.jsx`)

- **Section**: `padding: 120px 0`, `border-top: 1px solid --eat-border`
- **Header centered**:
  - Eyebrow: `BY THE NUMBERS · 사용자 데이터`
  - SplitHeading (size md): `The rhythm is working.` / `Eatoff 사용자들이 만든 리듬`
- **4-column grid** gap 24, each card:
  - Padding 32/24, `--eat-surface`, 1px `--eat-border`, radius 20
  - Big number: JetBrains Mono 64px weight 700 tracking −0.05em tabular
  - Unit suffix: 22px `--eat-text-3` weight 500
  - Mono uppercase label (10px 0.16em tracking) — English
  - 14px `--eat-text-2` — Korean
- **Data** (placeholder — **replace with real telemetry**):
  1. `4.8` ★ — AVG RATING · Play Store 평점
  2. `2.4M` — SESSIONS · 누적 단식 세션
  3. `92`% — GOAL RATE · 평균 목표 달성률
  4. `14`일 — AVG STREAK · 평균 연속 달성
- Below grid: `* 데모 목적의 예시 데이터입니다.` 12px `--eat-text-4`

---

#### 8. Download CTA (`landing/DownloadCTA.jsx`)

- **Section**: `padding: 160px 0 200px`, background `#0A0A0A` (**forced dark regardless of theme**), color `#FFF`, `border-top: 1px solid --eat-border`
- **Ambient rings backdrop** — 900×900 SVG, opacity 0.15, `pointer-events: none`:
  - 5 concentric circles radii 80/160/260/380/520, stroke 1.5, alternating `#FF4A3D` and `#3BD671`
- **Content centered**, max-width 780:
  - Pill "NOW AVAILABLE · 안드로이드 출시" with red tint
  - `<h2>` 96px weight 700 tracking −0.05em line-height 0.95:
    - Line 1: `Start your`
    - Line 2: `next hour.` with `linear-gradient(90deg, #FF4A3D, #3BD671)` text
  - Body 20px `#C8C8C8` line-height 1.5 max-width 500
  - Actions row (40px margin-top, gap 16, wrap):
    - **Play Store big badge**
    - **QR card**: 56×56 white QR placeholder (pseudo-random 8×8 grid of black squares) + "SCAN QR" mono label + "모바일에서 바로 설치" 14px
  - Meta row (60px margin-top, gap 40, wrap): 3 items with 14px green check icons
    - `무료 · 인앱결제 없음` / `로컬 데이터 저장` / `Android 8.0 이상`

---

#### 9. Footer (`landing/DownloadCTA.jsx` — exports `Footer`)

- Background `--eat-canvas`, padding `60px 0 40px`, top 1px border
- Left column: logo + tagline `복잡함은 빼고, 시간만.\n미니멀한 간헐적 단식 타이머.`
- Right: 2 link columns (제품 / 회사), each with mono uppercase eyebrow + 4 links (14px `--eat-text-2`)
- Bottom row (48px margin-top, top border): `© 2026 Eatoff. All rights reserved.` + `v1.0.0` (JetBrains Mono)

---

### B. Mobile App UI Kit — `ui_kits/eatoff-app/`

A click-through prototype covering the app's 4 main tabs plus a stages bottom sheet and Android widgets. **Use as the visual spec for the actual Android app**; do not port the React code.

Screens defined:
- **HomeScreen.jsx** — 280×280 timer ring, "Eatoff" wordmark header, plan pill, stage row card, big state CTA button, session start/end times
- **PlansScreen.jsx** — 5 preset radio cards (14:10 / 16:8 / 18:6 / 20:4 / 23:1) + custom slider card
- **HistoryScreen.jsx** — 2 stat cards (평균 단식 / 연속 달성), weekly bar chart (green success bars / red fail bars), session list with success/fail badges
- **SettingsScreen.jsx** — theme trio (Light/Dark/System) + notifications toggles + data-management rows
- **StagesSheet.jsx** — bottom-sheet overlay with vertical timeline of the 6 fasting stages

See `ui_kits/eatoff-app/README.md` and inspect each JSX file for exact tokens.

---

## Interactions & Behavior

### Landing Page

- **Nav scroll behavior**: adds backdrop-blur + border-bottom when `window.scrollY > 20`
- **Hero A ring animation**: `stroke-dashoffset` interpolated linearly every 1s, so the ring appears to fill in real time (never animated between per-second updates — that's intentional for a clock feel)
- **Hero A scroll transition**: `state` variable derived from scroll position; ring stroke color transitions with `stroke 600ms cubic-bezier(0.22, 1, 0.36, 1)` when crossing 50% of the scroll-progress-in-hero threshold
- **Hero live timer**: `setInterval(() => setNow(Date.now()), 1000)` — increments every second. Initial "elapsed" set to 14h 32m for demo purposes; in production, driven by the user's real fasting session state or a fake session for signed-out visitors.
- **Anti-feature**: static section, no interactions
- **OneTap section**: `setState('fasting'|'eating')` on click of CTA button OR segmented control. Non-active phone dims + shrinks; ring progress + digits + button color all crossfade in 400ms
- **StagesTimeline**: `activeIdx` driven by scroll position. Clicking a stage node also sets `activeIdx` directly. Detail panel + concentric rings + progress track all update together with 320–500ms transitions.
- **Download CTA**: static, no interactions (Play Store badge is a real `<a>` link → replace `href="#"` with production Play Store URL)

### Universal transitions

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` for all UI transitions (smooth ease-out, no overshoot)
- **Standard duration**: 220ms
- **Long-form (state transitions)**: 400–600ms
- **Ring progress**: linear 400ms
- **Hover state**: opacity → 0.7–0.85 (web only, since app is mobile-first)
- **Press state**: `transform: scale(0.94)` + opacity 0.9, ~120ms
- **Focus (keyboard)**: 2px outline in accent color, 3px offset

### Reduced motion

Respect `prefers-reduced-motion: reduce` — disable the pulsing dot, ring fill animation, and scroll-cue line animation. Static state changes only.

---

## State Management

Landing page keeps state entirely in the client via React `useState`. If migrating to a component framework, replicate:

- `dark: boolean` — theme toggle (also written to localStorage/cookie for return-visit persistence in production)
- `heroVariant: 'A' | 'B'` — which hero mode
- `timerScale: 'sm' | 'md' | 'lg'` — timer digit size
- `timerFont: 'jetbrains' | 'plex' | 'space'` — monospace family
- `eatingGreen: hex string` — user-selectable eating accent (4 options)
- `headlineVariant: 'A' | 'B'` — headline copy A/B
- `state: 'fasting' | 'eating'` — hero live-demo state (scroll-driven)
- `activeIdx: number` — Fasting Stages Timeline active stage (scroll-driven, clamped 0–5)
- `tick: number` (elapsed seconds) — updated every 1s via `setInterval`, cleared on unmount

For the **production app**, most of this collapses into two concerns:
1. **Current session** — `{state, startedAt, targetSec, planId}` — persist locally + broadcast to widgets
2. **User settings** — theme, notification prefs, active plan

---

## Design Tokens

Copy `colors_and_type.css` from the project root into your codebase as-is (or transcribe into your token system — Tailwind config, Style Dictionary, SwiftUI Color extensions, etc.). Key values:

### Colors — Light

| Token | Hex | Role |
|---|---|---|
| `--eat-canvas` | `#F5F5F0` | Warm off-white app background |
| `--eat-surface` | `#FFFFFF` | Cards, sheets, dialogs |
| `--eat-surface-alt` | `#FAFAF6` | Inset surfaces (inputs, chips) |
| `--eat-border` | `#EAEAE3` | Hairline dividers |
| `--eat-border-strong` | `#D8D8D0` | Focused borders |
| `--eat-text` | `#111111` | Primary text, timer digits |
| `--eat-text-2` | `#4A4A4A` | Body |
| `--eat-text-3` | `#888888` | Secondary, hint, caption |
| `--eat-text-4` | `#B8B8B0` | Disabled |
| `--eat-fasting` | **`#E5342A`** | **Fasting state — energy, focus** |
| `--eat-fasting-ink` | `#B1231B` | Ink on fasting-tinted surfaces |
| `--eat-fasting-soft` | `#FDECEA` | Fasting-tinted card bg |
| `--eat-eating` | **`#1F9D55`** | **Eating state — vitality** |
| `--eat-eating-ink` | `#157341` | Ink on eating-tinted surfaces |
| `--eat-eating-soft` | `#E6F5EC` | Eating-tinted card bg |
| `--eat-success` | `#1F9D55` | Semantic success |
| `--eat-warning` | `#E6A100` | Semantic warning |
| `--eat-danger` | `#E5342A` | Semantic danger |
| `--eat-info` | `#2A6FDB` | Semantic info |
| `--eat-track` | `#EDEDE6` | Ring/progress track |

### Colors — Dark

| Token | Hex |
|---|---|
| `--eat-canvas` | `#0A0A0A` |
| `--eat-surface` | `#111111` |
| `--eat-surface-alt` | `#171717` |
| `--eat-border` | `#1F1F1F` |
| `--eat-border-strong` | `#2A2A2A` |
| `--eat-text` | `#FFFFFF` |
| `--eat-text-2` | `#C8C8C8` |
| `--eat-text-3` | `#888888` |
| `--eat-text-4` | `#555555` |
| `--eat-fasting` | `#FF4A3D` |
| `--eat-fasting-ink` | `#FF7A70` |
| `--eat-fasting-soft` | `#2A100E` |
| `--eat-eating` | `#3BD671` |
| `--eat-eating-ink` | `#6EE29B` |
| `--eat-eating-soft` | `#0E2A1A` |
| `--eat-track` | `#1F1F1F` |

### Radius

| Token | Value | Use |
|---|---|---|
| `--eat-radius-xs` | 6px | Small chips |
| `--eat-radius-sm` | 8px | Inputs, chips |
| `--eat-radius-md` | 12px | Standard cards |
| `--eat-radius-lg` | 16px | Prominent cards |
| `--eat-radius-xl` | 20px | Bottom sheets, modals |
| `--eat-radius-2xl` | 28px | Hero surfaces |
| `--eat-radius-pill` | 999px | Buttons, pills, timer ring |

### Spacing (4px base)

`0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` — tokens `--eat-space-0` through `--eat-space-9`. Mobile side padding 24–32px; landing section vertical padding 120–160px.

### Shadow (light — near-none)

- `--eat-shadow-1`: `0 1px 2px rgba(17,17,17,0.04), 0 0 0 1px rgba(17,17,17,0.04)`
- `--eat-shadow-2`: `0 4px 16px rgba(17,17,17,0.06), 0 0 0 1px rgba(17,17,17,0.04)`
- `--eat-shadow-lift`: `0 12px 40px rgba(17,17,17,0.10)`

Dark mode uses lighter fills for elevation, not soft shadows.

### Typography

- **Sans stack**: `'Inter', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Mono stack (default)**: `'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace`
- **Alt monos** (Tweaks-selectable): IBM Plex Mono, Space Mono

Type scale (px): `11 · 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48 · 72 · 96 · 120`. See `colors_and_type.css` for `--eat-text-*` variables.

Semantic classes provided (import `colors_and_type.css`):
- `.eat-display` (48/700/1.05/-0.02em)
- `.eat-h1` (36/700/1.05/-0.02em)
- `.eat-h2` (28/600/1.2/-0.02em)
- `.eat-h3` (22/600/1.2)
- `.eat-h4` (18/600/1.2)
- `.eat-body` (16/400/1.45)
- `.eat-body-sm` (14/400/1.45)
- `.eat-caption` (12/500/1.45)
- `.eat-label` (12/600 uppercase, tracking 0.12em)
- `.eat-timer` (96/700/1, tracking −0.035em, tabular-nums, mono)
- `.eat-timer-lg` (120/700/1, tracking −0.035em, tabular-nums, mono)

### Motion

- `--eat-ease`: `cubic-bezier(0.22, 1, 0.36, 1)`
- `--eat-dur-fast`: 120ms
- `--eat-dur`: 220ms
- `--eat-dur-slow`: 360ms

---

## Iconography

**Lucide** icons via CDN or `lucide-react` / `lucide-android`. Stroke width **1.75** (not the default 2). Rounded caps and joins. `currentColor` throughout — inherit from surrounding text.

Icons used across screens:
- `timer`, `hourglass`, `flame`, `zap`, `activity`, `battery-low`, `recycle`, `utensils`, `apple`
- `bar-chart-3`, `calendar-days`, `sliders-horizontal`, `settings`, `target`
- `bell`, `moon`, `sun`, `smartphone`
- `chevron-right`, `chevron-down`, `check`, `x`
- `wifi`, `battery-medium`, `star`
- `download`, `upload`, `trash-2`
- `phone`, `message-circle`, `message-square`, `music`, `map`, `globe`, `camera`
- `check-circle`, `shield`

**No emoji anywhere.** Middle-dot `·` used as textual separator.

**Substitution flag**: Lucide is a fill-in until the brand commissions a custom icon set. Match stroke weight and rounded-join style in any replacement.

---

## Assets

### In `assets/`
- `logo-mark.svg` — 64×64 split-ring mark (red + green halves + gray track)
- `logo-wordmark.svg` — mark + "Eatoff" wordmark in Inter 700

### Fonts (Google Fonts)
- **Inter** — 400/500/600/700 (UI)
- **JetBrains Mono** — 400/500/700 (numeric readouts)
- **Noto Sans KR** — 400/500/700 (Korean text; chained after Inter)
- **IBM Plex Mono** — 400/500/700 (Tweaks-selectable mono)
- **Space Mono** — 400/700 (Tweaks-selectable mono)

**Production loading**: self-host or use your framework's font-optimization (Next.js `next/font`, Vite plugin, etc.). Do NOT ship the `@import url()` CDN call from the mock CSS to production.

### Placeholder / demo-only content
- All statistics on the landing page (`4.8★`, `2.4M sessions`, `92%`, `14일`, `2,400+ 리뷰`) are **demo data**. Replace with real telemetry or remove the section.
- QR code on Download CTA is a pseudo-random 8×8 grid, **not a real scannable code**. Generate a real QR from the Play Store URL.
- Play Store `href="#"` placeholder — replace with real Play Store listing URL.
- Widget Showcase's "16:00 → 24:00" and other clock times are illustrative; production widgets should read the user's actual session.
- Demo timer starts at `14h 32m elapsed` — for signed-out visitors, either loop a fake session or hard-code a marketing-friendly value.

### Missing / to-source
- **Real Play Store screenshots** for a "screenshots carousel" section (not built here — consider adding once app ships)
- **Real user reviews / testimonials** (not built here)
- **Legal pages** (개인정보 / 이용약관) — footer links go to `href="#"`

---

## Files

### Landing page (primary handoff target)
```
Eatoff Landing.html             # Entry point — inline React + Babel
landing/
  EatoffBase.jsx                # Shared tokens, primitives (Section, Container, Eyebrow, SplitHeading, PlayStoreBadge, LogoMark, tokens())
  tweaks_panel.jsx              # Tweaks UI runtime (not needed in prod)
  Nav.jsx                       # Sticky nav
  Hero.jsx                      # Living Timer variant A
  HeroSplit.jsx                 # Split-screen variant B
  AntiFeature.jsx               # "No calories. No macros. No logging."
  OneTap.jsx                    # One-tap state transition + MiniPhoneMockup
  StagesTimeline.jsx            # 0h → 24h scroll-driven timeline + STAGE_DATA
  WidgetShowcase.jsx            # Android home screen mockup
  Stats.jsx                     # 4-cell stats grid
  DownloadCTA.jsx               # Big dark CTA + Footer
```

### Design system (shared foundation)
```
colors_and_type.css             # ALL CSS custom properties + semantic classes
SKILL.md                        # Attachable skill manifest
README.md                       # Full design system doc (brand voice, visual foundations, iconography)
assets/
  logo-mark.svg                 # 64×64 brand mark
  logo-wordmark.svg             # Mark + wordmark
preview/                        # 23 design-system spec cards (visual reference only)
```

### Mobile app UI kit (for the Android build)
```
ui_kits/eatoff-app/
  README.md                     # Kit-specific notes
  index.html                    # Click-through prototype entry
  EatoffComponents.jsx          # Shared: TimerRing, Chip, StateButton, Card, Screen, BottomTabBar, SectionHeader, eatColors()
  HomeScreen.jsx                # Home tab
  PlansScreen.jsx               # Plans tab + PLANS array
  HistoryScreen.jsx             # History tab + MOCK_HISTORY
  SettingsScreen.jsx            # Settings tab + Toggle, SettingsRow
  StagesSheet.jsx               # Bottom sheet with STAGES array
  WidgetsShowcase.jsx           # 4×2 and 2×2 widget mockups
  android_frame.jsx             # Generic M3 Android device frame (imported utilities)
```

### Documentation
```
README.md                       # Design system full docs (voice, visual foundations, iconography, index)
SKILL.md                        # For attaching this system to other design projects
```

---

## Recommended migration path

1. **Set up your codebase's design tokens** — copy `colors_and_type.css` values into your token system (Tailwind config / Style Dictionary / native theme).
2. **Landing page** → Next.js or Astro static site. Component-per-section, mirror the JSX structure. Self-host fonts. Use `lucide-react`.
3. **Android app** → Kotlin + Jetpack Compose. Recreate `Color`, `Typography`, `Shape` themes from the tokens. Use `AnimatedContent` for state transitions. Widgets via Glance API.
4. **Iconography** — pull `lucide-android` or convert used icons to Compose ImageVector.
5. **Replace all demo data** flagged in the "Assets" section above.

---

## Questions? Open items

- 🚩 **Custom brand typeface**: currently substituting Inter. Confirm if brand has one.
- 🚩 **Custom icon set**: currently substituting Lucide. Confirm if brand commissions one.
- 🚩 **GitHub source repo** (`github.com/goodwon89/Eatoff`) currently contains only an AI Studio placeholder. Real app source should live there.
- **Legal**: 개인정보 / 이용약관 pages needed before Play Store submission
- **Stats section data**: needs real numbers or removal
- **QR code**: needs real Play Store URL encoded
