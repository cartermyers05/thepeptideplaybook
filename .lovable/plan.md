

# Peptide Database Enhancement: Add Quick Context

## Current State

The peptide table shows these columns in the collapsed view:
| Peptide Name | Category | Primary Use | Research | FDA Status |
|--------------|----------|-------------|----------|------------|

When you click to expand, you see:
- Mechanism of Action
- What Research Shows
- Safety Considerations
- Related Peptides

## Problem

Users have to click to expand every row to understand what a peptide actually *does*. The "Primary Use" column helps but it's brief (e.g., "Tissue repair, gut healing").

---

## Proposed Enhancement

Add a **one-line summary** visible in the collapsed row — a short "elevator pitch" that helps users quickly understand what the peptide is for without needing to expand.

### Option A: Add a "Quick Summary" Line Below the Row (Recommended)

Show a subtle one-liner beneath the main row content that summarizes the mechanism:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ BPC-157      │ Recovery │ Tissue repair, gut healing │ moderate │ Cat 2│
│ ─────────────────────────────────────────────────────────────────────── │
│ Promotes angiogenesis and supports tissue repair pathways              │
└─────────────────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Truncate the `mechanism` field to ~80 characters
- Display it in a smaller, muted text style below the main row content
- Still keep the full expanded view for detailed information

### Option B: Replace Table with Cards

Switch from a table to a card-based layout that naturally accommodates more content:

```text
┌────────────────────────────────────────┐
│ BPC-157                     [moderate] │
│ Recovery • Category 2                  │
│                                        │
│ Tissue repair, gut healing             │
│ Promotes angiogenesis and supports     │
│ tissue repair pathways.                │
│                                        │
│ [View Details]                         │
└────────────────────────────────────────┘
```

---

## Recommended: Option A (Inline Summary)

Keep the efficient table format but add a preview of the mechanism.

### File: `src/pages/dashboard/Database.tsx`

**Changes to PeptideRow component:**

1. **Add mechanism preview** — Show first ~100 characters of the mechanism in a subtle line
2. **Improve row structure** — Make the name/primary use more prominent
3. **Show "at a glance" info** — Primary use as a tagline under the name

**Before (collapsed row):**
```
│ BPC-157 │ Recovery │ Tissue repair, gut healing │ [moderate] │ [Cat 2] │ ▼ │
```

**After (collapsed row with preview):**
```
│ BPC-157                                                        │
│ Tissue repair, gut healing                                     │
│ Promotes angiogenesis, modulates nitric oxide system...       │
│ Recovery • [moderate] • [Cat 2]                                │ ▼ │
```

### Specific Changes

**Row structure update:**
- Stack content vertically in the first cell
- Move category/badges into a single inline row
- Add truncated mechanism preview

```tsx
<tr className="border-b border-border hover:bg-muted/50 cursor-pointer">
  <td className="p-4" colSpan={5}>
    <div className="space-y-1">
      <h3 className="font-semibold text-foreground">{peptide.name}</h3>
      <p className="text-sm text-muted-foreground">{peptide.primary_use}</p>
      <p className="text-xs text-muted-foreground/70 line-clamp-1">
        {peptide.mechanism}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-muted-foreground">{peptide.category}</span>
        <span className="text-muted-foreground/40">•</span>
        <Badge ...>{peptide.research_status}</Badge>
        <Badge ...>{peptide.fda_status}</Badge>
      </div>
    </div>
  </td>
  <td className="p-4">
    <ChevronDown/Up />
  </td>
</tr>
```

### Mobile Considerations

The stacked layout works better on mobile than the wide table. Add responsive behavior:
- On desktop: Keep table header visible
- On mobile: Hide table header, each row becomes a self-contained card

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/dashboard/Database.tsx` | Restructure `PeptideRow` to show stacked content with mechanism preview. Update table header for new layout. Add responsive styles for mobile. |

---

## Visual Result

**Desktop:**
```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Search...              │ Category ▼ │ Research ▼ │ FDA Status ▼        │
├─────────────────────────────────────────────────────────────────────────┤
│ Semaglutide                                                           ▼ │
│ Weight management, blood sugar control                                  │
│ GLP-1 receptor agonist that slows gastric emptying, increases satiety..│
│ GLP-1 • strong • FDA Approved                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ BPC-157                                                               ▼ │
│ Tissue repair, gut healing                                              │
│ Promotes angiogenesis, modulates nitric oxide system, supports tissue.. │
│ Recovery • moderate • Category 2                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Benefits

- **Scannable**: Users can understand each peptide without clicking
- **Efficient**: Still uses a compact table format
- **Informative**: Mechanism preview gives the "how it works" context
- **Consistent**: Keeps the expand/collapse for full details

