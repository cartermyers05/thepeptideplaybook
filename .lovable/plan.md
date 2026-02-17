

# Fix: Rebuild Dashboard to Match Light Homepage Design

The dashboard was incorrectly built with a dark theme (#08080A backgrounds, #111114 cards, light text). Your homepage is **white** — clean `#FAFAFA`/`#FFFFFF` background, white cards with light gray borders, black text, black pill buttons. The dashboard should match that exactly.

This is a complete color/style correction across all 12 dashboard home files. The **layout stays** (hero card, week calendar, compound cards, journey timeline, streak row, quick access) — only the colors and styling flip from dark to light to match your homepage.

---

## What Changes

### Color System (dark to light)

| Element | Current (wrong) | Fixed (matches homepage) |
|---------|-----------------|-------------------------|
| Page background | `#08080A` + nebula gradients | `#FAFAFA` (clean, like homepage) |
| Card backgrounds | `#111114` | `#FFFFFF` with `border-border` |
| Primary text | `#EBEBF0` (light) | `#0A0A0A` / `foreground` (dark) |
| Secondary text | `#8A8A9A` | `text-muted-foreground` |
| Muted text | `#4A4A5A` | `text-muted-foreground` lighter |
| Card borders | `rgba(255,255,255,0.05)` | `1px solid hsl(0 0% 92%)` |
| Stat pill bg | `#19191E` | `#F4F4F5` (light gray) |
| Nav background | `#08080A` | white with blur |
| Progress bar track | `#19191E` | `hsl(var(--muted))` light gray |
| Checkbox unchecked | `rgba(255,255,255,0.12)` border | `border-border` light gray |
| CTA button | Orange gradient | **Black pill** (matches homepage `PillButton dark`) |

### Typography Fix

The memory says dashboard headings should use **Outfit** (not Plus Jakarta Sans), and mono is **JetBrains Mono** for short numeric data only (not IBM Plex Mono for everything). This gets corrected to match the established pattern.

### Specific Fixes Per Section

**Hero Status Card**: White card with the logo gradient (orange/rose/violet) as a subtle 3px top border accent. White background, dark text, light gray stat pills. Progress ring keeps the gradient stroke but with a light gray track instead of dark.

**Week Calendar Strip**: White card, light gray background for today's highlight instead of dark. Text colors flip to dark. Gradient border on today stays (it's the logo accent).

**Compound Cards**: White cards with light gray borders. Category accent bars stay. Text becomes dark. Checkbox border becomes light gray. Checked state keeps green but card doesn't need to fade as dramatically against white.

**Journey Timeline**: White card, connecting line stays gradient. Node backgrounds flip to white/light gray. Text colors flip to dark.

**Streak + Check-in Row**: White cards, dark text, icon containers get light muted backgrounds.

**Quick Access Cards**: White cards matching the homepage "WhatsInsideSection" pattern — gradient top bar, icon in muted bg square, dark text, hover lift.

**NoProtocolState**: White hero card (not dark gradient). CTA becomes black pill button (like homepage). Text becomes dark. Feature preview cards become white with light borders.

**Navigation (Top + Bottom)**: Remove conditional dark styling. Use the existing light nav pattern — white bg, blur backdrop, light border, dark text.

**FloatingChatButton**: Black background (matching PillButton dark variant) instead of orange gradient. Cleaner, matches homepage.

---

## Files Modified (12 files)

| File | Change |
|------|--------|
| `index.html` | Keep Plus Jakarta Sans + IBM Plex Mono imports (useful for data display) |
| `DashboardLayout.tsx` | Remove dark background + nebula gradients, use clean `#FAFAFA` |
| `DashboardTopNav.tsx` | Remove conditional dark logic, use consistent light nav |
| `MobileBottomNav.tsx` | Remove conditional dark logic, use consistent light nav |
| `Home.tsx` | Light loading skeletons instead of dark |
| `ProgressRing.tsx` | Light gray track, keep gradient stroke |
| `ActiveProtocolState.tsx` | All colors flip to light. White cards, dark text, gradient accents |
| `NoProtocolState.tsx` | White hero card, black CTA button, dark text |
| `CompoundCard.tsx` | White bg, dark text, light gray borders |
| `CompletionBanner.tsx` | Light green tint bg, dark text |
| `RestDayCard.tsx` | Light dashed border, dark text |
| `FloatingChatButton.tsx` | Black bg matching PillButton dark variant |
| `WeekCalendarStrip.tsx` | Light colors, dark text |
| `MilestonesTimeline.tsx` | Light node backgrounds, dark text |

## What Does NOT Change

- Layout structure (hero card, calendar, compounds, timeline, streak, quick access)
- Data flow and hooks
- Animation patterns (blur-to-sharp entrance stays)
- The logo gradient as accent color on borders/progress rings
- Routing, database, or any backend logic

