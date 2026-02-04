
# Fix Course Purchase Flow - hasPurchasedCourse Bug

## Problem Summary

The Course Preview page incorrectly shows "Go to Dashboard" instead of "Get Your Course — $67" for unauthenticated users. This happens because:

1. React Query caches `allCourses` data from a previous session
2. When the user logs out, this cache isn't cleared
3. `hasPurchasedCourse()` returns stale cached data even for logged-out users

## Root Cause Analysis

```text
┌─────────────────────────────────────────────────────────────┐
│ User Session A (logged in, purchased course)                │
│   → allCourses cached with purchase data                    │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ User logs out                                               │
│   → signOut() called                                        │
│   → React Query cache NOT cleared ⚠️                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ New user visits /course/muscle (not logged in)              │
│   → hasPurchasedCourse('muscle') called                     │
│   → Returns stale cached data → true ❌                     │
│   → Shows "Go to Dashboard" instead of $67 CTA              │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### 1. Clear React Query Cache on Logout

**File:** `src/hooks/useAuth.tsx`

Update the `signOut` function to clear all React Query caches when user logs out:

```typescript
// Current (lines 146-148):
const signOut = async () => {
  await supabase.auth.signOut();
};

// Updated:
const signOut = async () => {
  // Clear all React Query caches to prevent stale data
  queryClient.clear();
  
  // Clear any localStorage items that might persist purchase state
  localStorage.removeItem('selectedCourseGoal');
  
  await supabase.auth.signOut();
};
```

### 2. Make hasPurchasedCourse Auth-Aware

**File:** `src/hooks/useCourse.ts`

Update the `hasPurchasedCourse` function to explicitly return `false` when no user is authenticated:

```typescript
// Current (lines 109-112):
const hasPurchasedCourse = (goal: string) => {
  return allCourses?.some(course => course.goal === goal);
};

// Updated:
const hasPurchasedCourse = (goal: string) => {
  // No user = no purchase possible
  if (!user) return false;
  
  return allCourses?.some(course => course.goal === goal) ?? false;
};
```

### 3. Add Loading State to CoursePreview CTA

**File:** `src/pages/CoursePreview.tsx`

The current code (line 116-118) shows loading state while `courseLoading` is true, but we should also ensure `isPurchased` is only evaluated after loading completes:

```typescript
// Current (line 116):
const isPurchased = goal && hasPurchasedCourse(goal.replace('-', '_'));

// This is already guarded by the loading check on line 118, but let's
// make the isPurchased check more explicit:

// Show loading while any data is being fetched
if (templateLoading || courseLoading) {
  return <LoadingState />;
}

// Only evaluate purchase status AFTER loading is complete AND user is verified
const isPurchased = user && goal && hasPurchasedCourse(goal.replace('-', '_'));
```

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useAuth.tsx` | Add `queryClient.clear()` and localStorage cleanup to `signOut()` |
| `src/hooks/useCourse.ts` | Add `!user` guard to `hasPurchasedCourse()` |
| `src/pages/CoursePreview.tsx` | Add explicit `user &&` check to `isPurchased` evaluation |

### Key Principle

**Unauthenticated users should ALWAYS see the purchase CTA ($67), never the dashboard CTA.**

The fix ensures:
1. Logout clears all cached data
2. `hasPurchasedCourse` never returns `true` for logged-out users
3. The UI explicitly checks both auth state AND purchase status

### Testing Checklist

After implementation, verify:
- [ ] New incognito visitor sees "$67" CTA on Course Preview
- [ ] Logged out user sees "$67" CTA on Course Preview  
- [ ] User who purchased sees "Go to Dashboard" on Course Preview
- [ ] After logout, visiting Course Preview shows "$67" CTA
- [ ] Checkout page displays $67 with early access messaging
