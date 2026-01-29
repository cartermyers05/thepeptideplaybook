
# Fix Streaming Response Bug in ChatbotDemo and ChatWidget

## Problem

Both `ChatbotDemo.tsx` and `ChatWidget.tsx` have the same bug:

```
TypeError: res.data.getReader is not a function
```

## Root Cause

When the Supabase Edge Function returns a streaming response with `Content-Type: text/event-stream`, the `supabase.functions.invoke()` method returns the full `Response` object as `data` (see lines 182-183 in `@supabase/functions-js/src/FunctionsClient.ts`).

The code tries to call `res.data.getReader()`, but `Response` objects don't have a `getReader()` method - the `ReadableStream` is accessed via `Response.body`.

**Current (broken):**
```typescript
const reader = res.data.getReader();
```

**Correct:**
```typescript
const reader = res.data.body.getReader();
```

---

## Files to Fix

### 1. `src/components/landing/ChatbotDemo.tsx`

**Line 57:**
```typescript
// Change from:
const reader = res.data.getReader();

// To:
const reader = res.data.body.getReader();
```

### 2. `src/components/chat/ChatWidget.tsx`

**Line 94:**
```typescript
// Change from:
const reader = response.data.getReader();

// To:
const reader = response.data.body.getReader();
```

---

## Technical Explanation

The supabase-js library (`@supabase/functions-js`) handles streaming responses specially:

```typescript
// From FunctionsClient.ts lines 182-183
} else if (responseType === 'text/event-stream') {
  data = response  // Returns the full Response object
}
```

The `Response` object has:
- `response.ok` - boolean
- `response.status` - HTTP status
- `response.headers` - Headers object
- `response.body` - ReadableStream ← **This is what we need**

So to get the stream reader, we must access `res.data.body.getReader()`.

---

## Summary

| File | Line | Fix |
|------|------|-----|
| ChatbotDemo.tsx | 57 | `res.data.getReader()` → `res.data.body.getReader()` |
| ChatWidget.tsx | 94 | `response.data.getReader()` → `response.data.body.getReader()` |
