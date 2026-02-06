
# Replace PP Text with Hexagon Logo in Chat

## Overview

Replace all instances of "PP" text avatars in the chat interface with the brand's rainbow hexagon logo for consistent branding.

---

## Locations to Update

| Location | Current | New |
|----------|---------|-----|
| Empty state (PulsingAvatar) | Large "PP" text with pulse animation | AnimatedLogo with pulse effect |
| AI message header | Small "PP" badge | Logo component (icon only, small size) |
| Quiz messages | "PP" in avatar fallback | Logo component (icon only) |

---

## Implementation Details

### 1. Update `PulsingAvatar` component

**File: `src/components/dashboard/ChatInterface.tsx`**

Replace the text-based pulsing avatar with AnimatedLogo:

```tsx
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

function PulsingAvatar() {
  return (
    <motion.div 
      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mx-auto mb-6 relative"
      animate={{ 
        boxShadow: [
          "0 0 0 0 rgba(0, 0, 0, 0.1)",
          "0 0 0 8px rgba(0, 0, 0, 0.05)",
          "0 0 0 0 rgba(0, 0, 0, 0.1)"
        ]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <AnimatedLogo size={40} animate={true} />
    </motion.div>
  );
}
```

---

### 2. Update AI message header

**File: `src/components/dashboard/ChatInterface.tsx`** (lines 538-542)

Replace the small "PP" badge with the Logo component:

```tsx
import { Logo } from "@/components/brand/Logo";

// In the message rendering (around line 538)
<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
  <Logo showText={false} size="sm" />
  <span className="text-xs font-medium text-muted-foreground">Peptide Playbook AI</span>
</div>
```

The Logo component with `size="sm"` renders at 24px which is close to the current 20px (w-5 h-5) badge.

---

### 3. Update QuizMessage avatar

**File: `src/components/quiz/QuizMessage.tsx`**

Replace the "PP" text fallback with the Logo:

```tsx
import { Logo } from "@/components/brand/Logo";

// Around line 27-32
{isAssistant && (
  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
    <Logo showText={false} size="md" />
  </div>
)}
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/dashboard/ChatInterface.tsx` | Import Logo and AnimatedLogo, update PulsingAvatar and message header |
| `src/components/quiz/QuizMessage.tsx` | Import Logo, replace Avatar with Logo icon |

---

## Visual Result

- **Empty state**: Rainbow hexagon with subtle pulse animation (matches brand identity)
- **Message headers**: Small rainbow hexagon icon next to "Peptide Playbook AI" label
- **Quiz messages**: Rainbow hexagon instead of plain "PP" text circle

This creates consistent branding across all AI-related touchpoints in the app.
