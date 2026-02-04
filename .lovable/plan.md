

# Hero Visual Cards: Product Demo Showcases

## Overview

Replace the abstract gradient squares in the hero section with sophisticated, animated product mockups that showcase the three core features of Peptide Playbook:

1. **AI Chatbot Demo** - Interactive chat interface preview
2. **Personalized Course** - Goal selection visualization  
3. **Weekly Newsletter/Digest** - Research digest preview

These will be rendered as polished UI mockups with subtle animations, giving visitors an immediate sense of what they're getting—not generic colored shapes.

---

## Visual Design

Each card will be a "device frame" style mockup with:
- Rounded corners (24px radius)
- Subtle shadow and border
- Semi-transparent glass effect background
- Animated content inside (typing indicators, scrolling text, etc.)
- Hover interactions for depth

### Card 1: AI Chatbot (Large, top spanning)

A miniature chat interface showing:
- Chat bubble with a sample question: "What's the best peptide for recovery?"
- AI response typing animation with the "PP" avatar
- Category chips floating (Recovery, Compare, FDA Status)
- Subtle gradient background

```text
+--------------------------------------------------+
|  [PP] Peptide Playbook AI                    [•] |
|--------------------------------------------------|
|                                                  |
|                "What's the best     [user bubble]|
|                 peptide for recovery?"           |
|                                                  |
|  [PP avatar]                                     |
|  Based on the research, BPC-157 shows...        |
|  [typing indicator ••• animating]               |
|                                                  |
|  [Recovery] [Compare] [FDA Status] [chips]      |
+--------------------------------------------------+
```

### Card 2: Personalized Course (Bottom left)

A goal selector mockup showing:
- 3-4 goal pills/cards (Burn Fat, Build Muscle, Heal Faster)
- One highlighted as "selected" with checkmark
- "Building your course..." progress text
- Animated selection state

```text
+------------------------+
| Your Goal              |
|------------------------|
| [✓ Burn Fat      ]     |
| [  Build Muscle  ]     |
| [  Heal Faster   ]     |
|                        |
| Building your course...|
| [=====>        ] 60%   |
+------------------------+
```

### Card 3: Newsletter Digest (Bottom right)

A digest/newsletter preview showing:
- "This Week in Peptides" header
- 2-3 bullet point highlights scrolling
- Sources badge
- Mail icon

```text
+------------------------+
| 📬 Weekly Digest       |
|------------------------|
| This Week's Research   |
|                        |
| • New BPC-157 study... |
| • FDA guidance on...   |
| • Semaglutide update...|
|                        |
| [12 Sources] [Read →]  |
+------------------------+
```

---

## Implementation

### New Component

Create `HeroProductCards.tsx` containing three specialized card components:

**ChatPreviewCard**
- Static/animated chat UI mockup
- Uses framer-motion for typing indicator
- Displays sample conversation

**CoursePreviewCard**
- Goal selection UI mockup
- Animated "selection" and progress bar
- Shows personalization concept

**DigestPreviewCard**
- Newsletter/digest mockup
- Scrolling highlights animation
- Weekly research theme

### HeroSection Updates

Replace the current `VisualCard` components with the new product showcase cards:

```tsx
{/* Right column - Product showcase cards */}
<div className="relative grid grid-cols-2 gap-4 lg:gap-6">
  {/* AI Chat - spans full width */}
  <ChatPreviewCard className="col-span-2 h-64 md:h-80" delay={0.3} />
  
  {/* Course personalization */}
  <CoursePreviewCard className="h-48 md:h-56" delay={0.5} />
  
  {/* Newsletter digest */}
  <DigestPreviewCard className="h-48 md:h-56" delay={0.7} />
</div>
```

---

## Animations

| Element | Animation |
|---------|-----------|
| Typing indicator | 3 dots pulsing in sequence |
| Chat messages | Fade in from bottom |
| Goal selection | Subtle pulse on selected item |
| Progress bar | Animating fill from 0-60% |
| Digest highlights | Slow vertical scroll loop |
| Card hover | Scale 1.02 + shadow lift |

---

## Color Scheme

Cards will use the new Lusion palette:
- **Background**: Semi-transparent white/cream (`rgba(255,255,255,0.9)`)
- **Borders**: Subtle gray (`border-border`)
- **Accents**: Primary teal for interactive elements
- **Text**: Near-black for headlines, muted for body

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/landing/HeroProductCards.tsx` | **Create** - New component with ChatPreviewCard, CoursePreviewCard, DigestPreviewCard |
| `src/components/landing/HeroSection.tsx` | **Modify** - Replace VisualCard usage with new product cards |

---

## Technical Details

### ChatPreviewCard Structure

```tsx
function ChatPreviewCard({ className, delay }: { className?: string; delay?: number }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card/95 backdrop-blur border border-border shadow-xl",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary-foreground">PP</span>
        </div>
        <span className="text-sm font-medium">Peptide Playbook AI</span>
      </div>
      
      {/* Chat content */}
      <div className="p-4 space-y-3">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
            What's the best peptide for recovery?
          </div>
        </div>
        
        {/* AI response with typing */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-md bg-primary flex-shrink-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-primary-foreground">PP</span>
          </div>
          <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 text-xs">
            Based on research, BPC-157 and TB-500 show the most promise for...
            <TypingDots />
          </div>
        </div>
      </div>
      
      {/* Category chips */}
      <div className="absolute bottom-3 left-4 flex gap-1.5">
        {["Recovery", "Compare", "FDA"].map(chip => (
          <span key={chip} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
```

### TypingDots Animation

```tsx
function TypingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}
```

---

## Result

Instead of vague colored squares, visitors will immediately see:
1. An AI chat interface they can use
2. A personalized course builder for their goals
3. A research digest keeping them informed

This creates an instant connection between the product and the value proposition.

