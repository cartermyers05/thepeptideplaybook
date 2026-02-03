
# Remove Yellow/Amber Highlights from UI

## The Problem
The current design uses a warm amber/yellow color (`#F59E0B`) for hover states and selections throughout the UI. This clashes with the teal primary brand color and feels inconsistent.

## The Solution
Replace the amber accent with a soft teal-based accent that harmonizes with the primary color scheme. This will create a cohesive, professional feel across all interactions.

## What Will Change

### Current Accent Color
- Light mode: `38 92% 50%` (amber/gold - approximately #F59E0B)
- Dark mode: `38 92% 45%`

### New Accent Color
- Light mode: `173 30% 94%` (very light teal gray)
- Dark mode: `173 25% 18%` (dark teal gray)

This creates a subtle, neutral highlight that's tinted toward the primary teal but isn't overpowering.

## Where You'll See the Change

| Component | What Changes |
|-----------|--------------|
| **Buttons** | Ghost and outline button hover backgrounds |
| **Dropdown menus** | Item highlight when hovering/selecting |
| **Select dropdowns** | Option focus/selection color |
| **Navigation links** | Hover background color |
| **Toggle buttons** | Active/pressed state background |
| **Dialog close button** | Hover state |
| **Sidebar items** | Hover and active states |

---

## Technical Details

### File to Modify
`src/index.css`

### Changes
1. Update `--accent` CSS variable in `:root` (light mode)
2. Update `--accent` CSS variable in `.dark` (dark mode)
3. Update `--accent-foreground` to ensure proper text contrast

### New Values

**Light Mode:**
```css
--accent: 173 30% 94%;        /* Very light teal-gray */
--accent-foreground: 222 47% 11%;  /* Keep dark text for contrast */
```

**Dark Mode:**
```css
--accent: 173 25% 18%;        /* Dark teal-gray */
--accent-foreground: 0 0% 98%;     /* Keep light text for contrast */
```

Also update sidebar accent to match:
```css
--sidebar-accent: 173 30% 92%;  /* Slightly more visible on sidebar */
```

---

## Expected Outcome
- All hover states will use a cohesive teal-gray instead of jarring yellow
- The UI will feel more professional and unified
- Text remains readable with proper contrast ratios
