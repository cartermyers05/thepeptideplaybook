
# Replace Robot Icons in AskCoach Component

## Issue

The `AskCoach.tsx` component still uses the `Bot` icon from lucide-react in three locations within the chat interface:

| Location | Line | Description |
|----------|------|-------------|
| Empty state | 137 | Large robot icon shown before any messages |
| Message avatar | 156 | Small robot next to each assistant message |
| Loading state | 185 | Small robot shown while AI is typing |

---

## Solution

Replace all `Bot` icons with the `AnimatedLogo` component to maintain brand consistency throughout the AI Coach experience.

---

## Changes

### File: `src/components/coach/AskCoach.tsx`

1. **Remove** `Bot` from lucide-react import (line 5)
2. **Add** import for `AnimatedLogo`
3. **Replace** the three `Bot` usages:

**Empty state (line 136-138):**
```tsx
// Before
<div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
  <Bot className="w-8 h-8 text-purple-600" />
</div>

// After
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-4">
  <AnimatedLogo size={40} />
</div>
```

**Message avatar (line 155-157):**
```tsx
// Before
<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
  <Bot className="w-4 h-4 text-purple-600" />
</div>

// After
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center flex-shrink-0">
  <AnimatedLogo size={20} />
</div>
```

**Loading state (line 184-186):**
```tsx
// Before
<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
  <Bot className="w-4 h-4 text-purple-600" />
</div>

// After
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
  <AnimatedLogo size={20} />
</div>
```

---

## Result

The AI Coach chat interface will now show the animated rainbow hexagon logo:
- Large animated logo in the empty state
- Small animated logo next to each AI response
- Small animated logo during the typing/loading state

This creates a cohesive brand experience where the AI Coach always displays the animated hexagon rather than a generic robot icon.
