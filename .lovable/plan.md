
# Protocol Page Polish: Tone Down Orange, Fix Typography

## Problems You Called Out

1. **Too much orange** -- Dose strings, stat chips, schedule pills, timeline nodes, question numbers, copy button are ALL orange. It's overwhelming.
2. **"Old timey" monospace font** -- JetBrains Mono is used for long dose strings like "100mcg . 5 days on / 2 days off . Subcutaneous (stomach or thigh)" which looks clunky and dated at that length.

## The Fix

### Typography Change
- **Remove JetBrains Mono from dose strings entirely** -- use the default system sans-serif (DM Sans / Inter) for compound dose/frequency/route lines
- **Keep JetBrains Mono ONLY for short numeric data** -- single numbers in stat chips (e.g. "1/12", "84d", "0%") where monospace actually helps alignment
- Compound names stay in Outfit (already correct)

### Color Rebalance
Instead of everything being orange, distribute the rainbow gradient colors across different elements:

| Element | Current | New |
|---------|---------|-----|
| Dose string (100mcg...) | Orange mono | Dark text (#0A0A0A) regular font, bold |
| Frequency/route | Orange mono | Muted gray (#6B7280) regular font |
| Stat chip "Progress" | Orange tint | Subtle gradient tint (rainbow) |
| Schedule pills (today) | Orange bg + orange text | Category color of each compound |
| Schedule "today" column | Orange border | Subtle gray highlight, no orange border |
| Timeline current node | Orange with orange glow | Use the rainbow gradient fill instead of solid orange |
| Question numbers | Orange circles | Gray circles with dark text |
| Copy button | Orange tint | Gray tint with dark text, matching secondary button style |
| Section icons | Various (good) | Keep as-is |
| Category badges | Category colors (good) | Keep as-is |
| Compound accent bars | Category colors (good) | Keep as-is |

### Dose Line Redesign
Instead of one long orange monospace line, break it into a cleaner layout:
- **Dose** in bold dark text: "100mcg"
- **Frequency** as a separate muted line: "5 days on / 2 days off"
- **Route** as a subtle tag/chip: "Subcutaneous"

This creates better visual hierarchy without relying on the orange monospace crutch.

## Files Changed

| File | Changes |
|------|---------|
| `src/pages/dashboard/Protocol.tsx` | Remove JetBrains Mono from dose strings, recolor dose lines to dark/gray, mute orange in schedule/timeline/questions/copy button, break dose into structured layout |

No changes needed to ReconCalculator or InjectionSiteGuide -- those use monospace sparingly and appropriately.

## No Database Changes

Purely visual adjustments.
