

# Peptide Database: Enhanced Card Layout with More Data

## Current Problem

The collapsed view shows:
- Name
- Primary use
- Mechanism (1 line, truncated)
- Category + badges

Users want to see **more data upfront** without expanding. The `studies` and `safety` fields have valuable content that's hidden.

---

## Solution: Rich Card Layout

Transform each peptide row into a more substantial card that displays **4 key pieces of information** at a glance:

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Semaglutide                                              GLP-1 │ strong │ │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ Weight management, blood sugar control                                     │
│                                                                            │
│ How it works                                                               │
│ GLP-1 receptor agonist that slows gastric emptying, increases satiety...  │
│                                                                            │
│ What research shows                                                        │
│ Extensive clinical trials including STEP trials showing 15-20% body...    │
│                                                                            │
│ ⚠ Key safety note                                                         │
│ Common side effects include nausea, vomiting, diarrhea...                 │
│                                                                            │
│ FDA Approved • Related: Tirzepatide, Liraglutide           [View full ▼]  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Displayed in Collapsed View

| Field | Display | Treatment |
|-------|---------|-----------|
| **Name** | Header row | Bold, larger text |
| **Primary Use** | Subtitle | Featured prominently below name |
| **Category + Research Status** | Header badges | Top right corner |
| **Mechanism** | "How it works" section | 2 lines max (`line-clamp-2`) |
| **Studies** | "What research shows" section | 2 lines max (`line-clamp-2`) |
| **Safety** | "Key safety note" section | 2 lines max, with ⚠ icon for emphasis |
| **FDA Status** | Footer badge | Bottom with related peptides |
| **Related Peptides** | Footer inline | Comma-separated list |

---

## Visual Design

Use a card-based layout instead of table rows:

```tsx
<div className="space-y-4">
  {peptides?.map((peptide) => (
    <PeptideCard key={peptide.id} peptide={peptide} />
  ))}
</div>
```

Each card has:
- **Header**: Name + category badge + research status badge
- **Body**: 3 labeled sections (mechanism, studies, safety) each with `line-clamp-2`
- **Footer**: FDA status + related peptides + expand chevron
- **Expanded state**: Shows full text for all fields

---

## Implementation Details

### File: `src/pages/dashboard/Database.tsx`

Replace `PeptideRow` with `PeptideCard`:

```tsx
function PeptideCard({ peptide }: { peptide: Peptide }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="dashboard-card"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Gradient top bar */}
      <div className="h-1 dashboard-gradient-teal" />
      
      <div className="p-5">
        {/* Header: Name + Badges */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {peptide.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {peptide.primary_use}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge>{peptide.category}</Badge>
            <Badge>{peptide.research_status}</Badge>
          </div>
        </div>

        {/* 3 Info Sections */}
        <div className="space-y-3 text-sm">
          {/* Mechanism */}
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              How it works
            </span>
            <p className={cn(
              "text-foreground mt-1",
              !expanded && "line-clamp-2"
            )}>
              {peptide.mechanism}
            </p>
          </div>

          {/* Studies */}
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              What research shows
            </span>
            <p className={cn(
              "text-foreground mt-1",
              !expanded && "line-clamp-2"
            )}>
              {peptide.studies}
            </p>
          </div>

          {/* Safety */}
          <div>
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Key safety note
            </span>
            <p className={cn(
              "text-foreground mt-1",
              !expanded && "line-clamp-2"
            )}>
              {peptide.safety}
            </p>
          </div>
        </div>

        {/* Footer: FDA + Related + Expand */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <Badge>{peptide.fda_status}</Badge>
            {peptide.related_peptides?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Related: {peptide.related_peptides.join(", ")}
              </span>
            )}
          </div>
          <button className="text-xs text-muted-foreground flex items-center gap-1">
            {expanded ? "Show less" : "View full"}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

### Layout Change

Switch from `<table>` to card list:

```tsx
{/* Cards */}
<div className="space-y-4">
  {isLoading ? (
    <div className="text-center py-8">Loading...</div>
  ) : peptides?.length === 0 ? (
    <div className="text-center py-8">No peptides found</div>
  ) : (
    peptides?.map((peptide) => (
      <PeptideCard key={peptide.id} peptide={peptide} />
    ))
  )}
</div>
```

---

## Key Benefits

1. **6x more data visible**: Mechanism, studies, AND safety all shown upfront
2. **Scannable sections**: Labeled headers make it easy to find specific info
3. **Safety highlighted**: Amber-colored label draws attention to important warnings
4. **Context preserved**: Related peptides visible without expanding
5. **Still expandable**: Users can click to see full text when needed

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/dashboard/Database.tsx` | Replace table-based `PeptideRow` with card-based `PeptideCard`. Add `AlertTriangle` icon import. Switch from `<table>` layout to `<div>` card list. Add Framer Motion for hover states. |

