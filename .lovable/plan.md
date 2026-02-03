
# Replace Placeholder Logos with Research Source Trust Bar

## Overview
Transform the "FeaturedBy" section from placeholder logos into a compelling trust signal that showcases the authoritative research sources powering Peptide Playbook. This will help convert cold traffic by immediately establishing credibility.

## Current State
- Shows "Research trusted by health-conscious individuals" with gray placeholder boxes
- Displays "Press features coming soon" text
- Provides no actual credibility signals

## Proposed Changes

### 1. Update Header Copy
Change from:
> "Research trusted by health-conscious individuals"

To:
> "Research sourced from"

This makes it clear we're showing WHERE the research comes from, not who trusts it.

### 2. Replace Placeholders with Authoritative Source Logos/Names
Display recognizable research institution names that the platform actually cites:

| Source | Why It Builds Trust |
|--------|---------------------|
| **PubMed / NIH** | Gold standard for medical research |
| **FDA.gov** | Official regulatory authority |
| **ClinicalTrials.gov** | Registry of human trials |
| **WADA** | Sports/anti-doping authority |

These are already cited throughout the guides (visible in `PrimarySources.tsx`), so this is accurate representation.

### 3. Visual Treatment
- Display source names as clean, professional text (not images that could look fake)
- Use subtle styling: muted text with slight opacity
- Add hover states that link to the actual source websites
- Include a small external link icon on hover to signal clickability

### 4. Remove "Press features coming soon"
This undermines trust. Remove it entirely.

---

## Technical Implementation

### File to Modify
`src/components/landing/FeaturedBy.tsx`

### Changes
1. Create a `sources` array with name, URL, and optional description
2. Map over sources to render clickable text links
3. Update header text
4. Remove the "coming soon" paragraph
5. Add subtle hover animations for polish

### Code Structure
```text
┌─────────────────────────────────────────────────────────┐
│            "Research sourced from"                       │
│                                                         │
│   PubMed   •   FDA.gov   •   ClinicalTrials.gov   •   WADA   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Each source name will be a clickable external link with:
- Muted foreground color
- Hover: primary color + underline
- Opens in new tab with proper `rel="noopener noreferrer"`

---

## Expected Outcome
- Immediate credibility for cold traffic visitors
- Accurate representation of actual sources used
- Clean, professional appearance that matches the minimal design system
- Clickable links that let skeptical users verify the sources exist
