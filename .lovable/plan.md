
# Consolidate to One AI: Peptide Playbook AI

## The Problem

There are currently two separate AI chatbots:

1. **AI Coach** (`/dashboard/coach`) - Uses `AskCoach.tsx` and `coach/index.ts`
   - Limited scope: Only knows course data and check-ins
   - No conversation history
   - No protocol creation capability
   - Called "AI Coach"

2. **Chat/Research** (`/dashboard/chat`) - Uses `ChatInterface.tsx` and `chat/index.ts`
   - Full capability: 500+ study database, protocol creation, streaming
   - Conversation persistence
   - Called "Peptide Playbook AI"

This creates confusion - users don't know which to use, and the "AI Coach" page is actually less capable.

---

## Solution: Merge Everything into Peptide Playbook AI

Replace the AI Coach page with the full ChatInterface (Peptide Playbook AI), and merge the course/check-in context from the coach into the main chat function.

### What This Means

- **One AI** - Peptide Playbook AI everywhere
- **One conversation system** - All chats saved and persistent
- **Full capabilities** - Protocol creation, study database, AND user context
- **Consistent branding** - No more "AI Coach" vs "Peptide Playbook AI" confusion

---

## Technical Changes

### 1. Update Coach Page to Use ChatInterface

Replace the limited `AskCoach` component with the full `ChatInterface`:

**File: `src/pages/dashboard/Coach.tsx`**
```text
- Import and use AskCoach
+ Import and use ChatInterface (same as ChatPage)
+ Keep the same suggested questions UI
+ Update branding to show "Peptide Playbook AI"
```

### 2. Merge User Context into Chat Edge Function

Add the course/check-in context from `coach/index.ts` to `chat/index.ts`:

**File: `supabase/functions/chat/index.ts`**
```text
+ Fetch user's active course (if any)
+ Fetch recent check-ins
+ Fetch lesson progress
+ Include this context in system prompt when available
+ Keep all existing peptide database functionality
```

The chat function already has 1000+ lines of capability - we just need to add the ~100 lines of user context fetching from the coach function.

### 3. Update Navigation Labels

**File: `src/components/dashboard/DashboardNavbar.tsx`**
```text
- { icon: MessageCircle, label: "AI Coach", path: "/dashboard/coach" }
+ { icon: MessageCircle, label: "Chat", path: "/dashboard/coach" }
```

### 4. Clean Up (Optional)

After consolidation works:
- Remove `/dashboard/chat` route (redirect to coach)
- Remove `AskCoach.tsx` component
- Remove `coach/index.ts` edge function (if no longer needed)

---

## Files to Change

| File | Change |
|------|--------|
| `src/pages/dashboard/Coach.tsx` | Replace AskCoach with ChatInterface |
| `supabase/functions/chat/index.ts` | Add user context fetching (course, check-ins, lessons) |
| `src/components/dashboard/DashboardNavbar.tsx` | Update label from "AI Coach" to "Chat" or "Ask AI" |
| `src/components/dashboard/MobileBottomNav.tsx` | Update label to match |

---

## Result

**Before:**
- Two chatbots with different capabilities
- Confusing branding (AI Coach vs Peptide Playbook AI)
- Protocol creation only in one place
- User context only in the other place

**After:**
- One unified Peptide Playbook AI
- Full capabilities: peptide database + user context + protocol creation
- Consistent branding everywhere
- All conversations saved and persistent

---

## User Flow After Change

1. User clicks "Chat" (or "Ask AI") in nav
2. Opens Peptide Playbook AI with full context awareness
3. AI knows their course, check-ins, AND has full peptide database
4. Can create protocols, answer research questions, AND give personalized advice
5. All conversations saved for later reference
