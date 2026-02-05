

# Fix: AI Disclaimer Modal Keeps Reappearing

## The Problem

The AI disclaimer modal is appearing repeatedly (every minute or on window focus) instead of only showing once. After clicking "I understand" and "Continue," the modal should never appear again.

## Root Cause

1. **React Query refetches profile data** on window focus (default behavior), component remount, and stale data
2. **Local state (`disclaimerAccepted`) is not persistent** - it resets on remount
3. **Database update may be failing silently** - the catch block still calls `onAccepted()` even on failure
4. **No optimistic cache update** - the query cache isn't updated immediately after the mutation

Looking at the database, `ai_disclaimer_accepted_at` is still `null`, confirming the update isn't persisting.

## The Fix

### 1. Use Optimistic Updates

Update the React Query cache immediately when the mutation runs, so the modal doesn't reappear during refetches.

### 2. Remove Silent Failure Behavior

If the database update fails, show an error and keep the modal open instead of dismissing it.

### 3. Simplify the Conditional Logic

The modal is currently checking the same condition in both the parent and inside itself. Clean this up.

### 4. Add `staleTime` to Profile Query

Prevent constant refetching by adding a reasonable `staleTime` (e.g., 30 seconds).

## Code Changes

### File 1: `src/components/chat/AIDisclaimerModal.tsx`

```tsx
// Changes:
// 1. Add optimistic update to mutation
// 2. Remove silent failure - show error toast if update fails
// 3. Only dismiss modal on actual success
```

**Before:**
```tsx
const handleContinue = async () => {
  if (!isChecked) return;

  try {
    await updateProfile.mutateAsync({
      ai_disclaimer_accepted_at: new Date().toISOString(),
    } as any);
    onAccepted();
  } catch (error) {
    console.error("Failed to save disclaimer acceptance:", error);
    // Still allow proceeding even if save fails  <-- THIS IS THE BUG
    onAccepted();
  }
};
```

**After:**
```tsx
const handleContinue = async () => {
  if (!isChecked) return;

  try {
    await updateProfile.mutateAsync({
      ai_disclaimer_accepted_at: new Date().toISOString(),
    });
    onAccepted();
  } catch (error) {
    console.error("Failed to save disclaimer acceptance:", error);
    toast({
      title: "Error",
      description: "Failed to save. Please try again.",
      variant: "destructive",
    });
    // DON'T call onAccepted() - keep modal open
  }
};
```

### File 2: `src/hooks/useProfile.ts`

Add optimistic update to `useUpdateProfile` and add staleTime to `useProfile`:

```tsx
export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => { /* ... */ },
    enabled: !!user?.id,
    staleTime: 30 * 1000, // 30 seconds - prevents excessive refetching
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => { /* ... */ },
    // Add optimistic update
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["profile", user?.id] });
      const previousProfile = queryClient.getQueryData(["profile", user?.id]);
      queryClient.setQueryData(["profile", user?.id], (old: Profile | null) => ({
        ...old,
        ...updates,
      }));
      return { previousProfile };
    },
    onError: (err, updates, context) => {
      // Rollback on error
      queryClient.setQueryData(["profile", user?.id], context?.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
```

### File 3: `src/pages/dashboard/Protocols.tsx` and `src/components/dashboard/ChatInterface.tsx`

Remove redundant local state tracking. Let the modal handle everything internally:

```tsx
// Remove: const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
// Remove: const hasAcceptedDisclaimer = !!profile?.ai_disclaimer_accepted_at || disclaimerAccepted;

// Change rendering to:
{!profileLoading && !profile?.ai_disclaimer_accepted_at && (
  <AIDisclaimerModal onAccepted={() => {
    // The modal will only call this on successful DB update
    // React Query will have already updated the cache optimistically
  }} />
)}
```

## Summary of Changes

| File | Change |
|------|--------|
| `src/components/chat/AIDisclaimerModal.tsx` | Remove silent failure, add toast import, only call onAccepted on success |
| `src/hooks/useProfile.ts` | Add staleTime, add optimistic update to mutation |
| `src/pages/dashboard/Protocols.tsx` | Remove redundant local state, simplify conditional |
| `src/components/dashboard/ChatInterface.tsx` | Remove redundant local state, simplify conditional |

## Expected Behavior After Fix

1. User opens AI Chat or Protocol Builder for the first time
2. Disclaimer modal appears (blocking)
3. User checks "I understand" and clicks "Continue"
4. Database is updated with timestamp
5. Cache is optimistically updated immediately
6. Modal dismisses and never appears again
7. Even on window focus or page refresh, modal stays dismissed because the database value is persisted

