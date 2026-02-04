
# Remove "Can I get a refund?" FAQ Item

## Overview
Remove the "Can I get a refund?" question from the FAQ section on the landing page.

## What I Found
The FAQ section is in `src/components/landing/FAQ.tsx`. It contains 5 questions, including "Can I get a refund?" at position 4 in the array.

## Change
Remove this FAQ entry from the `faqs` array:
```tsx
{
  question: "Can I get a refund?",
  answer: "Yes. 30-day money-back guarantee, no questions asked. If you're not satisfied, email us and we'll refund you immediately.",
},
```

## File to Modify
| File | Change |
|------|--------|
| `src/components/landing/FAQ.tsx` | Remove lines 18-21 (the refund FAQ item) |

## Result
The FAQ section will display 4 questions instead of 5, with no mention of refunds.
