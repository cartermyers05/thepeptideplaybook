

# Replace Mock Data with Real User Data

## Overview

Transform all dashboard pages from using hardcoded mock data to fetching real data from the database. This will show users their actual usage, real conversation history, genuine saved items, and true referral statistics.

---

## Current Mock Data Locations

| Page | Mock Data | Replace With |
|------|-----------|--------------|
| Stats | Questions asked, streak, time saved | `profiles` table + calculated from `messages` |
| History | 3 fake conversations | Real `conversations` + `messages` tables |
| Saved | 2 fake saved answers | `messages` where `is_saved = true` |
| Referral | Fake referral code "PEPTIDE2024" | Real referral code from `referrals` table |
| Account | Fake subscription "Pro Plan" | Real `profiles.subscription_status` |

---

## Implementation

### 1. Stats Page - Real Usage Metrics

**Data Sources:**
- `questions_asked` from `profiles` table
- `current_streak` from `profiles` table
- Studies cited: count from `messages` (assistant messages)
- Time saved: calculate as `questions_asked * 30 min` (avg research time per question)

**Changes:**
- Add React Query hook to fetch profile data
- Calculate derived metrics (time saved, value saved)
- Show loading skeleton while fetching
- Show empty state for new users (0 questions)

---

### 2. History Page - Real Conversations

**Data Sources:**
- `conversations` table (user's conversations)
- `messages` table (get preview + message count)

**Changes:**
- Fetch conversations with message count using React Query
- Get first assistant message as preview text
- Enable delete functionality (already has UI)
- Show real timestamps
- Empty state prompting to start chatting

---

### 3. Saved Page - Real Bookmarked Answers

**Data Sources:**
- `messages` table where `is_saved = true`
- Join with `conversations` to get question context

**Changes:**
- Query saved messages with conversation context
- Wire up unsave button functionality
- Show real saved dates
- Empty state when nothing saved

---

### 4. Referral Page - Real Referral Data

**Data Sources:**
- `referrals` table for user's referral code
- Count pending vs completed referrals

**Changes:**
- Generate unique referral code on first visit (using `generate_referral_code()` function)
- Store in referrals table
- Count pending (no `referred_id`) vs completed referrals
- Calculate months earned from `reward_applied = true` count

---

### 5. Account Page - Real Subscription Status

**Data Sources:**
- `profiles.subscription_status` 
- `profiles.trial_ends_at`

**Changes:**
- Display real subscription status (trial/active/canceled)
- Show trial days remaining if applicable
- Connect profile updates to database

---

### 6. Chat Interface - Save Conversations

Currently conversations aren't saved. Need to:
- Create conversation on first message
- Save each message to database
- Update `profiles.questions_asked` count
- Track `last_active_at` for streak calculation

---

## Database Changes

Add streak calculation logic:
```sql
-- Add longest_streak column for tracking
ALTER TABLE profiles ADD COLUMN longest_streak integer DEFAULT 0;
```

---

## New Hooks to Create

1. **`useProfile`** - Fetch and update user profile data
2. **`useConversations`** - List user's conversations with previews
3. **`useSavedMessages`** - List bookmarked messages
4. **`useReferrals`** - User's referral code and stats
5. **`useSaveMessage`** - Toggle is_saved on messages

---

## Files to Create

- `src/hooks/useProfile.ts` - Profile data fetching/updating
- `src/hooks/useConversations.ts` - Conversation history
- `src/hooks/useSavedMessages.ts` - Saved messages
- `src/hooks/useReferrals.ts` - Referral data

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Stats.tsx` | Replace mock stats with `useProfile` hook |
| `src/pages/History.tsx` | Replace mock conversations with `useConversations` |
| `src/pages/Saved.tsx` | Replace mock saved with `useSavedMessages` |
| `src/pages/Referral.tsx` | Replace mock referral with `useReferrals` |
| `src/pages/Account.tsx` | Use `useProfile` for subscription status |
| `src/components/dashboard/ChatInterface.tsx` | Save conversations + messages to database |

---

## User Experience

**Empty States**
When users have no data, show encouraging messages:
- Stats: "Start your research journey - ask your first question!"
- History: "No conversations yet. Start chatting!"
- Saved: "Save helpful answers for quick access"

**Loading States**
Add skeleton loaders while data fetches to prevent layout shift.

**Real-Time Updates**
After chatting, stats should reflect the new question count immediately.

---

## Technical Details

### Profile Hook Example

```typescript
// src/hooks/useProfile.ts
export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}
```

### Conversation Saving

When user sends a message:
1. If no active conversation, create one
2. Save user message to `messages` table
3. After AI response, save assistant message
4. Increment `profiles.questions_asked`
5. Update conversation title (first few words of first question)

---

## Summary

This update transforms the dashboard from a demo with fake data into a real, personalized experience where users see their actual:
- Question count and research streak
- Complete conversation history
- Saved/bookmarked answers
- Referral progress
- Subscription status

All data persists between sessions, making the product feel professional and trustworthy.

