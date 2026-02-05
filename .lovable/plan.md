

# Dashboard Stat Cards Redesign: Remove Icon Clutter

## Current Problem

The three stat cards (Active Protocol, AI Research, Peptide Database) each have:
- A 40x40px colored icon box (bg-purple-100, bg-blue-100, bg-teal-100)
- An icon inside (FlaskConical, MessageCircle, BookOpen)
- A text label next to it

This creates visual noise and feels like a "vibe-coded" template.

---

## Design Alternatives

### Option A: Typography-Only (Recommended)

Remove icons entirely. Let the **gradient top bar** provide the color accent, and use **bold typography hierarchy** to convey meaning — matching the landing page's editorial style.

```text
┌─────────────────────────────┐
│ ████████ (gradient bar)    │
│                             │
│ ACTIVE PROTOCOL             │  ← Small caps label
│ Shoulder Recovery           │  ← Bold value
│                             │
└─────────────────────────────┘
```

**Benefits:**
- Clean, minimal, typography-first
- Matches WhatsInsideSection cards (title + description, no icons)
- Gradient bar already provides color identity

---

### Option B: Large Stat Numbers

Use the stat as the visual hero element with large typography:

```text
┌─────────────────────────────┐
│ ████████ (gradient bar)    │
│                             │
│ 12                          │  ← Large 3xl/4xl number
│ conversations               │  ← Muted label below
│                             │
└─────────────────────────────┘
```

Works well for "AI Research" (12 conversations) and "Peptide Database" (40+ peptides).

---

### Option C: Hybrid — Icon Only on Empty States

Keep icons only when there's nothing to show (e.g., "No active protocol"), remove them when displaying actual data.

---

## Recommended Implementation

Use **Option A (Typography-Only)** for consistency, with a slight enhancement: make the primary value larger and bolder.

### File: `src/pages/dashboard/Home.tsx`

**Before:**
```tsx
<div className="flex items-center gap-3 mb-3">
  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
    <FlaskConical className="w-5 h-5 text-purple-600" />
  </div>
  <span className="text-sm font-medium text-muted-foreground">Active Protocol</span>
</div>
{protocol ? (
  <p className="font-semibold text-foreground truncate">{protocol.protocol_name}</p>
) : (
  <p className="text-sm text-muted-foreground">No active protocol</p>
)}
```

**After:**
```tsx
<div className="p-6">
  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
    Active Protocol
  </span>
  {protocol ? (
    <p className="text-xl font-bold text-foreground mt-2 truncate">
      {protocol.protocol_name}
    </p>
  ) : (
    <p className="text-lg text-muted-foreground mt-2">None yet</p>
  )}
</div>
```

Apply the same pattern to all three cards:

| Card | Label | Value |
|------|-------|-------|
| Active Protocol | `ACTIVE PROTOCOL` | Protocol name or "None yet" |
| AI Research | `AI RESEARCH` | `{count} conversations` or "Start exploring" |
| Peptide Database | `PEPTIDE DATABASE` | `40+ peptides` |

---

## Visual Result

```text
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ ═══ (purple)     │  │ ═══ (blue)       │  │ ═══ (teal)       │
│                  │  │                  │  │                  │
│ ACTIVE PROTOCOL  │  │ AI RESEARCH      │  │ PEPTIDE DATABASE │
│ Shoulder Recovery│  │ 12 conversations │  │ 40+ peptides     │
│                  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## Additional Cleanup

Also remove the icon from the "Get Started" / starter prompts section:

**Before:**
```tsx
<div className="flex items-center gap-3 mb-5">
  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
    <Sparkles className="w-5 h-5 text-orange-600" />
  </div>
  <p className="font-semibold text-foreground">Ask your first question</p>
</div>
```

**After:**
```tsx
<div className="mb-5">
  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
    Get Started
  </span>
  <p className="text-xl font-bold text-foreground mt-2">
    Ask your first question
  </p>
</div>
```

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/dashboard/Home.tsx` | Remove icon boxes from stat cards, switch to typography-only with uppercase labels and bold values. Remove Sparkles icon from starter section. |

---

## Benefits

- **Cleaner visual**: No competing icon boxes
- **Consistent with landing page**: Matches WhatsInsideSection's typography-first cards
- **Gradient bar does the work**: Color identity comes from the top bar, not icons
- **More premium feel**: Editorial typography over generic icon grids

