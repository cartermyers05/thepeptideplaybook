

# Easy Chatbot Access on Dashboard Home

## Overview

Make the AI Research chatbot immediately accessible when users first sign in or sign up. Currently, users must navigate to `/dashboard/chat` (Research) to use the chatbot. We'll add a floating chat button that stays visible on all dashboard pages, giving one-tap access.

---

## Current State

| Access Method | Location | Clicks Required |
|---------------|----------|-----------------|
| Top Nav "Research" | Desktop header | 1 click |
| Mobile Bottom Nav "Research" | Mobile footer | 1 click |
| "AI Research" stat card | Dashboard home | 1 click |
| Starter prompt buttons | Dashboard home | 1 click (navigates to chat page) |

**Problem:** All methods navigate to a separate page. Users can't quickly ask a question without leaving where they are.

---

## Solution: Floating Chat Button

Add the existing `FloatingChatButton` component to the dashboard layout. This provides:

- **Always-visible chat icon** in the bottom-right corner
- **One-tap access** to open an overlay chat widget
- **No page navigation required** - chat overlays the current page
- **Works on all dashboard pages**, not just home

---

## Implementation

### File to Modify

**`src/components/dashboard/DashboardLayout.tsx`**

Add the `FloatingChatButton` component:

```tsx
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* ... existing content ... */}
      <DashboardTopNav />
      <main>...</main>
      <MobileBottomNav />
      
      {/* NEW: Floating chat button */}
      <FloatingChatButton />
    </div>
  );
}
```

### Mobile Bottom Nav Adjustment

The floating button sits at `bottom-6 right-6` (24px from bottom-right). On mobile, the bottom nav is 64px tall (`h-16`). The button may overlap. We'll adjust the button position to sit above the mobile nav:

**`src/components/chat/FloatingChatButton.tsx`** - Update position:

```tsx
// Change from:
className="fixed bottom-6 right-6 ..."

// To:
className="fixed bottom-24 md:bottom-6 right-6 ..."
```

This moves the button above the mobile nav (96px from bottom) while keeping it at 24px on desktop.

---

## What Users Will See

```text
┌─────────────────────────────────────────┐
│  [Logo]   Home | Research | Protocols   │
├─────────────────────────────────────────┤
│                                         │
│   Good morning, Alex                    │
│   Your peptide research command center  │
│                                         │
│   ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│   │ Protocol │ │ Research │ │Database │ │
│   └──────────┘ └──────────┘ └─────────┘ │
│                                         │
│   Get Started                           │
│   ┌──────────────────────────────────┐  │
│   │ Ask your first question          │  │
│   │ ┌─────────┐ ┌─────────┐          │  │
│   │ │ Prompt1 │ │ Prompt2 │          │  │
│   │ └─────────┘ └─────────┘          │  │
│   └──────────────────────────────────┘  │
│                                    [💬] │ ← Floating button
├─────────────────────────────────────────┤
│  Home | Research | Protocols | Settings │ (mobile only)
└─────────────────────────────────────────┘
```

Clicking the floating button opens the chat widget as an overlay - no navigation needed.

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/dashboard/DashboardLayout.tsx` | Add `FloatingChatButton` import and render |
| `src/components/chat/FloatingChatButton.tsx` | Adjust position for mobile bottom nav |

---

## Benefits

1. **One-tap access** - Chat is always one tap away, no navigation
2. **Context preserved** - Users stay on their current page while chatting
3. **First-time user friendly** - Obvious chat icon draws attention
4. **Mobile optimized** - Button positioned above bottom nav
5. **Reuses existing component** - No new code to write, just integrating what's already built

---

## What Won't Change

- Existing navigation (Research link still works)
- Dashboard home layout
- Chat page functionality
- Any other pages

