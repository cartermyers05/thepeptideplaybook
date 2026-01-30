

# Fix: Chat Authentication Using Wrong Token

## Problem Identified

The AI chat is failing with `401 Unauthorized - Invalid token` because the frontend is sending the **wrong authorization token**.

**Current (broken):**
```typescript
Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
```

The `VITE_SUPABASE_PUBLISHABLE_KEY` is the anon key (a service-level API key), NOT the user's JWT session token. This causes the `missing sub claim` error because the anon key has no user identity attached.

**Should be:**
```typescript
Authorization: `Bearer ${session.access_token}`,
```

## Good News

The promo code tier fix worked! All users who redeemed codes now have:
- `tier: insider`
- `subscription_status: active`

The chat will work immediately once we fix this token issue.

## Solution

Update `ChatInterface.tsx` to get the user's session token from Supabase auth and pass that instead of the anon key.

## Implementation

### Update `src/components/dashboard/ChatInterface.tsx`

| Line | Change |
|------|--------|
| Import | Add `supabase` import from integrations |
| Line ~194-209 | Get user session and use `access_token` for Authorization header |

**Before:**
```typescript
const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    ...
  }
);
```

**After:**
```typescript
// Get user's auth token
const { data: { session } } = await supabase.auth.getSession();
if (!session?.access_token) {
  throw new Error("Not authenticated");
}

const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    ...
  }
);
```

## Why This Happened

This is a common pattern issue where the anon key and user session token get confused:

| Key | Purpose | Has User Identity |
|-----|---------|-------------------|
| `VITE_SUPABASE_PUBLISHABLE_KEY` | API access key (anon) | No |
| `session.access_token` | User's JWT token | Yes (includes user_id, email, etc.) |

## Testing

After this fix, promo code users should be able to:
1. Log in to their account
2. Navigate to the AI chat
3. Ask questions and get responses

