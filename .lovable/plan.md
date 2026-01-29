

# Fix: Problem Section Headline

## The Issue

The current headline "You're Not Confused Because You're Stupid" is too aggressive and potentially offensive, even though the intent is to reassure visitors.

---

## Better Alternatives

**Option A (Recommended):**
> "It's Not You. It's the Information."

**Option B:**
> "You're Not the Problem. The Information Is."

**Option C:**
> "The Problem Isn't You. It's Where You're Looking."

**Recommendation:** Option A — short, clear, and makes the same point without any negative language.

---

## File to Modify

**File:** `src/components/landing/ProblemSection.tsx`

**Change:** Update the h2 headline from the current aggressive version to the cleaner alternative.

**Current:**
```tsx
<h2>
  You're Not Confused Because You're Stupid.{" "}
  <span>You're Confused Because the Information Is a Mess.</span>
</h2>
```

**New:**
```tsx
<h2>
  It's Not You.{" "}
  <span>It's the Information.</span>
</h2>
```

---

## Additional Consideration

The intro paragraph can also be softened slightly if needed, but the current body copy is fine — it correctly blames TikTok, Reddit, and scattered sources without insulting the reader.

