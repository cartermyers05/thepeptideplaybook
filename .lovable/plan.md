
# Alternative Logo Animation Options

## Current Issue
The letter-by-letter staggered reveal animation isn't appealing. Let's try something different.

## Option A: Smooth Hover Lift Effect (Recommended)
A simple, elegant hover animation where the entire logo smoothly lifts up with a subtle shadow, creating a "floating" effect.

- On hover: Logo slides up slightly (-4px) with a soft drop shadow
- Smooth scale increase (1.02x) for emphasis
- Clean transition without letter-by-letter complexity

## Option B: Underline Reveal
An animated underline that draws itself under each word on hover:
- "Peptide" gets a thin animated underline on hover
- Clean, editorial aesthetic matching the design system

## Option C: Fade & Scale Pulse
A subtle breathing animation on hover:
- Slight scale up (1.03x)
- Brief opacity pulse to draw attention
- Feels alive without being distracting

---

## Technical Implementation (Option A - Recommended)

### Changes to Navbar.tsx

Remove the letter-by-letter animation and replace with a clean hover lift:

```tsx
// Remove: letterVariants and AnimatedWord components

// Replace logo section with:
<Link to="/" className="flex flex-col group">
  <motion.div
    className="flex flex-col"
    whileHover={{ 
      y: -2, 
      transition: { duration: 0.2, ease: "easeOut" } 
    }}
  >
    <span className="text-lg md:text-xl font-bold tracking-tight uppercase">
      Peptide
    </span>
    <span className="text-lg md:text-xl font-bold tracking-tight uppercase -mt-1">
      Playbook
    </span>
  </motion.div>
</Link>
```

### Benefits
- Cleaner, more subtle animation
- Maintains the editorial aesthetic
- No jarring letter animations on page load
- Professional and modern feel

---

## Summary
- Remove complex letter-by-letter animation
- Add simple hover lift effect (moves up 2px on hover)
- Keep framer-motion for smooth transitions
- Matches the minimal, typography-first design system
