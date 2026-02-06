

# Dashboard Navigation & Protocol UX Updates

## Overview

Make two key changes to improve dashboard UX:
1. **Remove the floating chat button** and rename "Research" → "Chat" in navigation
2. **Show "Start" instead of "None yet"** for the Active Protocol card when user has no protocol

---

## Changes

### 1. Remove Floating Chat Button

**File: `src/components/dashboard/DashboardLayout.tsx`**

Remove the `FloatingChatButton` import and component that was just added.

---

### 2. Rename "Research" → "Chat" in Navigation

**File: `src/components/dashboard/DashboardTopNav.tsx`**

Update the nav items array:
```typescript
// Change from:
{ label: "Research", path: "/dashboard/chat" }

// To:
{ label: "Chat", path: "/dashboard/chat" }
```

**File: `src/components/dashboard/MobileBottomNav.tsx`**

Same change:
```typescript
// Change from:
{ icon: MessageCircle, label: "Research", path: "/dashboard/chat" }

// To:
{ icon: MessageCircle, label: "Chat", path: "/dashboard/chat" }
```

---

### 3. Update Active Protocol Card for New Users

**File: `src/pages/dashboard/Home.tsx`**

Currently shows:
- If protocol exists: Protocol name (e.g., "Fat Loss Protocol")
- If no protocol: "None yet"

Change to:
- If protocol exists: Protocol name
- If no protocol: "Start a Protocol" (more actionable)

Update lines 127-131:
```tsx
{isLoadingProtocol ? (
  <Skeleton className="h-7 w-32 mt-2" />
) : protocol ? (
  <p className="text-xl font-bold text-foreground mt-2 truncate">{protocol.protocol_name}</p>
) : (
  <p className="text-lg font-semibold text-foreground mt-2">Start a Protocol</p>
)}
```

Also update the card header label when there's no protocol:
```tsx
<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
  {protocol ? "Active Protocol" : "Get Started"}
</span>
```

---

## Summary of Files Changed

| File | Change |
|------|--------|
| `src/components/dashboard/DashboardLayout.tsx` | Remove `FloatingChatButton` |
| `src/components/dashboard/DashboardTopNav.tsx` | "Research" → "Chat" |
| `src/components/dashboard/MobileBottomNav.tsx` | "Research" → "Chat" |
| `src/pages/dashboard/Home.tsx` | "None yet" → "Start a Protocol" |

---

## What Users Will See

**Before:**
```
[Home]  [Research]  [Protocols]

Active Protocol: None yet
AI Research: Start exploring
```

**After:**
```
[Home]  [Chat]  [Protocols]

Get Started: Start a Protocol
AI Research: Start exploring
```

The "Chat" nav item takes users directly to the AI chatbot page, making it obvious and one-tap accessible.

