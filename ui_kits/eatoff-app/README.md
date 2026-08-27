# Eatoff Mobile UI Kit

A click-through prototype of the Eatoff intermittent fasting app.

## Screens
- **HomeScreen** — circular timer, stage row, big state CTA
- **PlansScreen** — 14:10 / 16:8 / 18:6 / 20:4 / 23:1 presets + custom ratio slider
- **HistoryScreen** — stat cards, weekly bar chart, session list
- **SettingsScreen** — theme selector, notification toggles, data management
- **StagesSheet** — bottom sheet showing metabolic fasting stages (opens from Home)

## Bonus
- **WidgetsShowcase** — Android 4×2 and 2×2 home widgets

## Components
- `EatoffComponents.jsx` — `TimerRing`, `Chip`, `StateButton`, `Card`, `Screen`, `BottomTabBar`, `SectionHeader`, `eatColors()`

## How to run
Open `index.html`. Toggle Dark, swap Fasting/Eating, tap the bottom tabs, open the stages sheet from the Home card.

## Files
```
android_frame.jsx     # (starter) M3 Android device shell — imported utilities only
EatoffComponents.jsx  # shared primitives (colors, ring, chip, tab bar, card)
HomeScreen.jsx        # tab 1
PlansScreen.jsx       # tab 2
HistoryScreen.jsx     # tab 3
SettingsScreen.jsx    # tab 4
StagesSheet.jsx       # bottom sheet overlay
WidgetsShowcase.jsx   # widget mockups
index.html            # entry — mounts App
```
