

# Update Hero Section Messaging

## Overview

Update the Hero section to better communicate the core value proposition: staying up-to-date on peptides + AI chatbot access — not just a static guide about 15 peptides.

---

## Changes

### 1. Center Visual Card (lines 77-82)

**Current:**
```
15
Peptides covered
```

**New Options:**

| Option | Text |
|--------|------|
| A | "Research-backed peptide education" |
| B | "Your peptide research companion" |
| C | "Stay informed. Stay safe." |
| D | "AI-powered • Research-backed" |

**Recommendation:** Option D — concise, communicates both key differentiators (AI + research)

---

### 2. Subheadline (lines 21-24)

**Current:**
```
A research-backed guide to understanding peptides — what they do, 
what's legal, and what to ask your doctor.
```

**New (one sentence that captures everything):**

| Option | Copy |
|--------|------|
| A | "Stay up-to-date on peptide research and get instant answers from our AI assistant — grounded in science, not social media." |
| B | "The research-backed platform that keeps you informed on peptides and lets you ask anything through our AI assistant." |
| C | "Get the latest peptide research, news, and an AI assistant that actually knows what it's talking about." |
| D | "Stay current on peptide research and ask our AI assistant anything — backed by real science, not TikTok trends." |

**Recommendation:** Option D — punchy, ties back to the H1 about TikTok, captures both "stay up-to-date" and "AI chatbot"

---

## Files to Update

| File | Changes |
|------|---------|
| `src/components/landing/Hero.tsx` | Lines 21-24: Update subheadline; Lines 77-82: Update center card content |

---

## Visual Card Layout

The center card will change from:
```text
+----------------+
|      15        |
| Peptides       |
| covered        |
+----------------+
```

To:
```text
+-------------------+
| AI-powered        |
| Research-backed   |
+-------------------+
```

Or a single impactful line if preferred.

---

## Final Copy Preview

**H1 (unchanged):**
"Stop Taking Peptide Advice From 19-Year-Olds on TikTok"

**Subheadline (new):**
"Stay current on peptide research and ask our AI assistant anything — backed by real science, not TikTok trends."

**Center card (new):**
"AI-powered • Research-backed"

