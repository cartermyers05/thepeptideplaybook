

# Sales Page Conversion Upgrades -- 5 New Sections

All changes are to `src/pages/Sales.tsx` only. No other files modified.

## Final Page Order After Changes

1. HERO -- with new trust bar above headline + expanded guarantee below CTA (Prompt 1)
2. PROBLEM CARDS -- "Sound familiar?" (existing, untouched)
3. CHAT MOCKUP DEMO (existing, untouched)
4. **HOW IT WORKS** -- 3 vertical steps with connectors (Prompt 2, NEW)
5. **WHAT YOU'LL SEE INSIDE** -- 3 preview cards with horizontal scroll on mobile (Prompt 4, NEW)
6. **COMPARISON TABLE + URGENCY** -- 2-column table + "Launch price" line (Prompt 5, NEW)
7. VALUE STACK -- $435 to $67 (existing, untouched)
8. **WHO THIS IS FOR / NOT FOR** -- 2 cards with check/X lists (Prompt 3, NEW)
9. GUARANTEE (existing, untouched)
10. FAQ (existing, untouched)
11. FINAL CTA (existing, untouched)

---

## Prompt 1: Hero Trust Signals

**Modify the hero section (lines 120-143):**

- Add a trust bar ABOVE the "PEPTIDE PLAYBOOK" badge: a centered flex row with three items separated by dots:
  - BookOpen icon + "500+ Studies Analyzed"
  - Database icon + "41+ Peptides"
  - ShieldCheck icon + "Evidence-Rated"
  - Icons in primary color, text in muted-foreground, 13px

- Replace the single sub-CTA line (line 140-142) with an expanded guarantee block:
  - Row 1: ShieldCheck icon + "30-day money-back guarantee" (bold, muted-foreground)
  - Row 2: "One-time payment . Instant access . No subscription" (dim text)
  - Row 3: Italic reassurance line: "Try it for 30 days. If it doesn't give you clarity, get every penny back."

## Prompt 2: "How It Works" Section

**Insert new section between the chat mockup (section 3) and value stack (section 4).**

- Headline: "How it works" + subheadline "From confused to confident in three steps."
- 3 steps in vertical stack, each with a numbered circle badge on the left and title+description on the right
- Steps 1-2 have outline circles (primary border, transparent bg); Step 3 has a filled circle (primary bg, dark text)
- Vertical connector lines (1px border) between steps
- Closing line: "No learning curve. No confusing interface. Just answers."

## Prompt 3: "Who This Is For" Section

**Insert between value stack and guarantee sections.**

- Headline: "Is this for you?"
- Two cards side-by-side on desktop, stacked on mobile:
  - Left card: primary border, 5 items with Check icons -- "You've been researching peptides...", "You're overwhelmed...", etc.
  - Right card: gray border, 4 items with X icons -- "You're looking for someone to sell you peptides...", etc.
- Disclaimer line below

## Prompt 4: "What You'll See Inside" Preview Cards

**Insert between "How it works" and the comparison table.**

- Headline: "What you'll see inside" + subheadline
- 3 cards in a grid on desktop, horizontal scroll on mobile (280px wide, snap):
  - Card 1 -- AI Research Coach: mini chat preview with user/AI bubbles and "STRONG" evidence tag
  - Card 2 -- Peptide Database: 3 mini rows (BPC-157/MODERATE amber, Semaglutide/STRONG teal, Selank/PRELIMINARY gray) + "...and 38 more"
  - Card 3 -- Doctor Scripts: mini script preview with Step 1 quote and "4-step framework included"
- Mobile scroll indicator dots below cards (decorative only)

## Prompt 5: Comparison Table + Urgency

**Insert between preview cards and value stack.**

- Headline: "The old way vs. the Playbook"
- 2-column table in a card container, 5 rows + header
  - Left column: pain points (Reddit, no trust, $300-500/month clinics, awkward doctor convos, hours of research)
  - Right column: solutions (AI coach, evidence ratings, $67 for life, doctor scripts, cited answers in seconds)
  - Right column cells have subtle primary-tinted background
- Below table: bordered container with Clock icon + "Launch price: $67. This increases as we add more peptides and features."

---

## Technical Details

### New imports needed
- `Database`, `Check`, `X`, `Clock` from lucide-react
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from ui/table (optional -- can use plain HTML table/divs for more control over styling)

### Approach
All 5 changes will be implemented in a single edit to `src/pages/Sales.tsx`. The new sections are inserted as JSX blocks between existing sections. No new files needed. No existing section content is modified.

### Mobile considerations
- Trust bar: wraps naturally with flex-wrap
- How it works: single column, left-aligned
- Preview cards: horizontal scroll with snap, 280px card width
- Comparison table: stays 2-column but with smaller padding/font (12px)
- Who this is for: cards stack vertically

