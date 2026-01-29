

# Remove "AI-Powered Research Assistant" Badge from Hero

## What Will Be Removed

The small badge at the very top of the hero section that says "AI-Powered Research Assistant" with a sparkle icon:

```tsx
<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
  <Sparkles className="w-4 h-4 text-primary" />
  <span className="text-sm font-medium text-primary">AI-Powered Research Assistant</span>
</motion.div>
```

## File to Modify

### `src/components/landing/HeroSection.tsx`

**Change:** Delete lines 51-54 (the AI Badge motion.div block)

## Visual Result

The hero section will start directly with the main headline "Ask Anything About Peptides" without the badge above it.

## What Remains

- Main headline and subheadline
- Stats row (41+ Peptides, 500+ Studies, 24/7)
- CTA buttons
- Trust signals (Money-back guarantee, Instant Access, No Subscription)
- Full ChatbotDemo section below (scrollable)

