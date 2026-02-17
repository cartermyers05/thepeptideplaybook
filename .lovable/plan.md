

# Dashboard Polish: Clean Layout, Animations, and More User Value

## What's Wrong Now

The dashboard has the right data structure but looks cluttered — inconsistent spacing between rows, stat cards feel disconnected, sections lack visual hierarchy, and there are no entrance animations on individual elements (just a single container fade). It needs tightening, polished staggered animations, and more contextual value injected into each section.

## Changes

### 1. Staggered Entrance Animations (Every Section)

Each row gets its own `motion.div` with the blur-to-sharp `itemVariants`, but currently they all share the same variant with no stagger per card. Fix:

- **Stat cards**: Each of the 4 cards animates individually with 80ms stagger using `custom` index prop on framer-motion. Cards slide up from 20px with blur clearing.
- **Compound cards**: Each compound card staggers in with 60ms delay, creating a "loading in" feel.
- **Quick Access cards**: Stagger in from left to right.
- **Milestone nodes**: Each node fades in sequentially.
- **Progress Ring**: Animated stroke already exists — add a scale-in entrance (0.8 to 1.0) with spring physics.

### 2. Layout Cleanup (Spacing and Hierarchy)

- Reduce `mb-6` gaps between rows to `mb-5` for tighter feel
- Add a thin full-width gradient separator line between major sections (4px, subtle, the brand gradient at 10% opacity)
- Stat card padding tightened: `p-4` becomes `p-3.5` on mobile, stays `p-4` on desktop
- "This Week" and "Protocol Overview" right-column cards get minimum height so they align evenly with their left neighbors
- Quick Access section header alignment fix — the check-in badge aligns center vertically with the "Quick Access" label

### 3. More User Value: Smart Insights Row (NEW)

Add a new "Insights" section between the stat cards and Today's Stack. This is a single card spanning full width with 1-2 contextual, dynamic messages based on the user's actual data:

- **If compliance > 90%**: "Your consistency is in the top tier. Keep this pace through Week {X} for optimal results."
- **If compliance < 50%**: "Missed a few days? That's okay. Consistency matters more than perfection — get back on track today."
- **If streak > 7**: "7-day streak! You're building a solid habit. Research shows 21 consecutive days locks in behavior change."
- **If it's the first week**: "Welcome to Week 1. Focus on getting comfortable with your routine. Side effects are typically mildest now."
- **If weekly_expectations exists for current week**: Show the expectation text here prominently instead of buried in the "This Week" card.

This replaces generic filler with personalized, motivational, research-backed context. The insight card has a subtle left border using the brand gradient and an info icon.

### 4. Decorative Hexagon Watermark

Add a subtle SVG hexagon (from the brand logo) as a watermark in the top-right of the page, rotated 15 degrees, at 8% opacity. This ties the dashboard visually to the brand identity without being distracting. Uses the same hexagon path from `AnimatedLogo.tsx`.

### 5. Today's Stack: Completion Progress Bar

Add a thin progress bar at the top of the "Today's Stack" card header showing X/Y compounds completed. Uses the brand gradient fill. When all done, the entire bar pulses once with a glow effect.

### 6. Quick Access Cards: Hover Micro-Interactions

- On hover, the icon container scales to 1.1 with a spring animation
- The arrow rotates 45 degrees on hover (pointing up-right)
- Card lifts with a subtle shadow transition (already partially there, make it more pronounced)

---

## Technical Details

### Files Modified

| File | Changes |
|------|---------|
| `ActiveProtocolState.tsx` | Complete rewrite: add per-card stagger animations, smart insights row, hexagon watermark, completion progress bar in Today's Stack header, tighten spacing, add gradient separators, hover animations on quick access |
| `CompoundCard.tsx` | Wrap in `motion.div` for stagger support (accept `index` prop for delay) |
| `MilestonesTimeline.tsx` | Add per-node stagger animation with `motion.div` |

### No New Dependencies
All animations use existing framer-motion. Hexagon SVG is inline (copied from AnimatedLogo path). Insights are computed from existing props (compliancePercent, currentStreak, currentWeek, weeklyExpectations).

### Animation Specs
- Container stagger: `staggerChildren: 0.12`
- Stat card entrance: `y: 24 -> 0`, `opacity: 0 -> 1`, `filter: blur(6px) -> blur(0)`, duration 0.5s, spring
- Compound card stagger: 60ms between each
- Quick access hover: `scale: 1.02`, `y: -2`, shadow `0 8px 24px rgba(0,0,0,0.08)`, duration 200ms
- Progress bar fill: animated width transition with `transition: width 0.6s ease`

### Smart Insights Logic (pseudo)
```
if (currentWeek === 1) -> week 1 welcome message
else if (compliancePercent >= 90) -> consistency praise
else if (compliancePercent < 50) -> encouragement
else if (currentStreak >= 7) -> streak milestone
else if (weeklyExpectation) -> show this week's expectation
else -> generic "Stay consistent" message
```

### Layout Order (final)
1. Greeting (protocol name + status line)
2. Stat cards (4-col, staggered)
3. Smart Insight card (full-width, dynamic)
4. Today's Stack + This Week (2-col 60/40)
5. Journey + Protocol Overview (2-col 60/40)
6. Quick Access (3-col with hover effects)
7. Footer disclaimer

