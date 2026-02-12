

# Remove Name Drops from Site

## What needs to change

Two files contain inappropriate name references that need to be cleaned up:

### 1. Quiz Results Value Stack (src/pages/QuizResults.tsx)
**Line 108** says: "(Jay charges $299 for generic)"

Replace with: "(clinics charge $299+ for generic plans)" -- this keeps the price anchor comparison without naming anyone specific.

### 2. TikTok Myths Guide (src/pages/guides/PeptideTikTokMyths.tsx)
**Line 190** says: "Joe Rogan has discussed this openly"

Replace with: "Athletes who are caught using banned peptides face suspension. Anecdotes from public figures don't equal clinical evidence." -- removes the name while keeping the point.

## What stays (not name drops)
- Dr. Vladimir Khavinson (Epitalon guide) -- he literally invented the peptide, this is a scientific citation
- Dr. Ritchie Shoemaker (VIP guide) -- he developed the CIRS protocol, also a scientific citation
- Generic references to "influencers" and "celebrities" as categories (About page, Partners page, BPC-157 guide) -- these don't name anyone

## Files modified
| File | Change |
|------|--------|
| `src/pages/QuizResults.tsx` | Replace "Jay charges $299" with "clinics charge $299+" |
| `src/pages/guides/PeptideTikTokMyths.tsx` | Remove "Joe Rogan" reference |
