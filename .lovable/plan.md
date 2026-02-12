

# Reduce Orange, Mix In Other Homepage Colors

The dashboard currently uses `#F97316` (orange) for almost everything — evidence circles, labels, match badges, section icons, arrows, topic pills, hero card shadows, and the chat CTA card. This makes the UI feel one-note. The fix is to redistribute color roles across the existing homepage palette while keeping orange for one or two signature spots.

## New Color Role Assignments

| Role | Current | New | Why |
|------|---------|-----|-----|
| Evidence circles (filled) | Orange #F97316 | Purple #8B5CF6 | Research/data feels more scholarly in purple |
| "PRIMARY MATCH" label | Orange #F97316 | Keep orange #F97316 | This is the ONE signature orange moment |
| "YOUR MATCH" badge | Orange bg/text | Teal #10B981 bg/text | Teal = positive match, feels earned |
| "How It Works" section icon | Orange #F97316 | Blue #3B82F6 | Science/mechanism = blue |
| "What Research Shows" arrows | Orange #F97316 | Purple #8B5CF6 | Already purple icon, arrows should match |
| Evidence section icon | Purple (already) | Keep purple | No change |
| Hero card shadow tint | Orange rgba | Neutral rgba(0,0,0) | Less orange glow |
| Hero card border divider | Orange/20 | Gray #E5E7EB | Subtle, not orange |
| Chat topic pill active state | Orange border/bg/text | Purple #8B5CF6 | Interactive = purple per design system |
| Chat "AI RESEARCH COACH" label | Orange #F97316 | Purple #8B5CF6 | Consistent with chat = purple theme |
| Quick action card 1 (AI Coach) top bar + icon | Orange #F97316 | Purple #8B5CF6 | Chat is purple-themed |
| Quick action card 2 (Doctor Script) | Purple (already) | Keep purple | No change |
| Quick action card 3 (Legal Guide) | Amber (already) | Keep amber | No change |
| "Matched to your goal" text | Orange #F97316 | Teal #10B981 | Match = teal |
| Chat CTA card on protocols page icon/bg | Orange #F97316 | Purple #8B5CF6 | Chat = purple |
| "Why This Protocol" icon in user protocols | Orange #F97316 | Blue #3B82F6 | Info = blue |
| "Why:" label in protocol rationale | Orange #F97316 | Purple #8B5CF6 | Explanation = purple |

## Summary of What Orange Keeps
- "PRIMARY MATCH" label on hero card (one signature use)
- Legal/amber/warning badges (those are amber #F59E0B, not orange)

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/dashboard/Home.tsx` | Evidence circles to purple, YOUR MATCH badge to teal, hero card shadow to neutral, AI Coach card accent to purple, border divider to gray |
| `src/components/protocol/PeptideDeepDive.tsx` | Evidence circles to purple, YOUR MATCH badge to teal, "How It Works" icon to blue, evidence arrows to purple, match text to teal |
| `src/pages/dashboard/Protocols.tsx` | Chat CTA icon/bg to purple, "Why" labels to purple, protocol notes icon to blue |
| `src/components/dashboard/ChatInterface.tsx` | "AI RESEARCH COACH" label to purple, active topic pill to purple, starter card hover border to purple |

This keeps the dashboard colorful and warm using the full homepage palette (purple for interactive/research, teal for positive states, blue for science, amber for warnings) instead of making everything orange.
