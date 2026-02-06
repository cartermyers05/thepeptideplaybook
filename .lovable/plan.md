
# Protocols Page Redesign: Chat-First Approach

## Overview

Two changes:
1. **Remove the protocol quiz** from the Protocols page — instead show a message directing users to the Chat to build custom protocols
2. **Show ALL protocols** (including `not_started` ones created via chat) in a list view

---

## Current Issues

| Problem | Cause |
|---------|-------|
| Chat-created protocols don't appear | Page only shows protocols where `status !== "not_started"` |
| Quiz duplicates chat functionality | The 5-step quiz can be replaced by chat-based protocol creation |

---

## Solution

### New Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Your Protocols                                              │
│  Personalized peptide protocols built for you               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  💬 Build Your Custom Protocol                      │    │
│  │                                                     │    │
│  │  Go to the Chat and talk to our AI to build a      │    │
│  │  personalized protocol made just for you.          │    │
│  │                                                     │    │
│  │               [Go to Chat →]                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ── Your Protocols ─────────────────────────────────────    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Muscle & Recovery Protocol         [not_started]  │    │
│  │  Week 1 of 8                                        │    │
│  │  BPC-157, TB-500                                    │    │
│  │  Created: Feb 4, 2026                               │    │
│  │                               [Start] [View]        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Fat Loss Protocol                       [active]   │    │
│  │  Week 2 of 8 • Day 12                               │    │
│  │  Semaglutide                                        │    │
│  │                                  [Pause] [View]     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Details

### 1. Update `useProtocol` hook to fetch ALL protocols

**File: `src/hooks/useProtocol.ts`**

Add a new query to fetch all user protocols (not just the most recent):

```typescript
const { data: protocols, isLoading: isLoadingProtocols } = useQuery({
  queryKey: ["protocols", user?.id],
  queryFn: async (): Promise<Protocol[]> => {
    if (!user?.id) return [];

    const { data, error } = await supabase
      .from("protocols")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    return (data || []).map(item => ({
      ...item,
      peptides: (item.peptides as unknown as Peptide[]) || [],
      status: (item.status as Protocol["status"]) || "not_started",
      current_day: item.current_day || 0,
      current_week: item.current_week || 1,
    }));
  },
  enabled: !!user?.id,
});
```

Return both `protocol` (single most recent) and `protocols` (all) from the hook.

---

### 2. Rewrite Protocols page

**File: `src/pages/dashboard/Protocols.tsx`**

Replace the entire 5-step quiz with a simpler layout:

**Header section**:
- Title: "Your Protocols"
- Subtitle: "Personalized peptide protocols built for you"

**CTA card** (always visible):
- Icon: MessageCircle or Sparkles
- Heading: "Build Your Custom Protocol"
- Text: "Go to the Chat and talk to our AI to build a personalized protocol made just for you."
- Button: "Go to Chat" → links to `/dashboard/chat`

**Protocols list**:
- Show ALL protocols from the user, regardless of status
- Each protocol card shows:
  - Protocol name
  - Status badge (not_started, active, paused, completed)
  - Week/Day progress (if started)
  - Peptide names as tags
  - Created date
  - Action buttons: Start (if not_started), Pause/Resume (if active/paused), View details

**Empty state** (if no protocols):
- "No protocols yet. Use the Chat to build your first one!"

---

### 3. Add protocol detail view

When user clicks "View" on a protocol, expand it or navigate to show:
- Full peptide details (dosage, timing, frequency, site)
- Disclaimer
- Print/Export buttons (existing functionality)

---

## Files Changed

| File | Change |
|------|--------|
| `src/hooks/useProtocol.ts` | Add `protocols` (all) query alongside existing `protocol` (single) |
| `src/pages/dashboard/Protocols.tsx` | Complete rewrite: remove quiz, show CTA + protocols list |

---

## Benefits

1. **Chat-first approach** — Protocol creation is handled by the AI, which is more personalized
2. **All protocols visible** — Users can see and manage every protocol they've created
3. **Simpler UX** — No multi-step quiz to navigate
4. **Status visibility** — Clear indication of which protocols are started vs waiting

---

## What Gets Removed

- The 5-step protocol quiz (steps 1-4 + generate)
- The `GOALS`, `EXPERIENCE_LEVELS`, `CONSTRAINTS` constants
- All the step navigation logic
- The `createProtocol` mutation from the page (still available via chat)
