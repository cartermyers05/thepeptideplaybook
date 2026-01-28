

# Fix Compliance Modal Not Proceeding

## Problem Identified

The "Before You Begin" compliance modal doesn't allow users to proceed even after checking all acknowledgment boxes. After analyzing the code, there are two issues:

1. **Silent database failures** - The `handleAccept` function updates the profile but doesn't handle or display errors
2. **Missing error handling on query** - The initial compliance check uses `.single()` which can throw errors that are ignored

---

## The Fix

### 1. Add Error Handling to handleAccept

The update to `terms_accepted_at` might be failing silently. We need to:
- Check for errors from the Supabase update call
- Show a toast notification if something goes wrong
- Add console logging for debugging

### 2. Improve the Checkbox State Logic

Ensure the checkbox `onCheckedChange` properly handles the `CheckedState` type from Radix UI (which can be `true`, `false`, or `'indeterminate'`).

### 3. Use `.maybeSingle()` Instead of `.single()`

The `.single()` method throws an error if no row is found, while `.maybeSingle()` returns null gracefully.

---

## Code Changes

**File: `src/components/dashboard/ComplianceModal.tsx`**

```typescript
// Add toast for error feedback
import { toast } from "sonner";

// Fix the query to use maybeSingle
const { data, error } = await supabase
  .from("profiles")
  .select("terms_accepted_at")
  .eq("user_id", user.id)
  .maybeSingle();

if (error) {
  console.error("Error checking compliance:", error);
}

// Fix handleAccept with error handling
const handleAccept = async () => {
  if (!user || !allChecked) return;

  const { error } = await supabase
    .from("profiles")
    .update({ terms_accepted_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error saving acceptance:", error);
    toast.error("Failed to save. Please try again.");
    return;
  }

  setOpen(false);
  onAccept();
};
```

---

## Additional Debugging

If the issue persists after these changes, we should also add:
- Console log to verify checkbox states when button is clicked
- Visual indicator showing which checkboxes are checked/unchecked

---

## Summary

This fix adds proper error handling to the compliance modal so that:
1. Database errors are logged and shown to the user
2. The query uses the appropriate method for optional results
3. Users get feedback if something goes wrong instead of the button appearing broken

