

# Fix: Protocol Builder 404 Error

## The Problem

The sidebar navigation links to `/dashboard/protocols` (plural), but the route defined in `App.tsx` is `/dashboard/protocol` (singular). This causes a 404 when clicking "Protocol Builder" in the sidebar.

## Root Cause

| Component | Path Used |
|-----------|-----------|
| `DashboardSidebar.tsx` | `/dashboard/protocols` ✗ |
| `App.tsx` routes | `/dashboard/protocol` (and points to wrong component) |

## The Fix

Two changes needed:

### 1. Add the `/dashboard/protocols` Route

Add a new route in `App.tsx` that points to `/dashboard/protocols`. Since the Protocol Builder page doesn't exist yet (it's Phase 7 of the rebuild), we'll create a placeholder page.

### 2. Create Protocol Builder Page

Create `src/pages/dashboard/Protocols.tsx` with a placeholder UI that shows the page is coming soon, or implement the full 5-step wizard as defined in the rebuild plan.

## Implementation Options

**Option A: Quick Fix (Placeholder)**
- Add route pointing to a simple "Coming Soon" placeholder
- Unblocks navigation immediately

**Option B: Full Implementation (Phase 7)**
- Create the complete Protocol Builder with 5-step wizard:
  1. Select primary goal
  2. Select secondary goals
  3. Confirm experience level
  4. Select constraints
  5. Generate AI protocol

## Files to Change

| File | Action |
|------|--------|
| `src/App.tsx` | Add route for `/dashboard/protocols` |
| `src/pages/dashboard/Protocols.tsx` | Create new page |

## Recommended Approach

Since you're building the full product, I recommend implementing the complete Protocol Builder (Option B) rather than a placeholder. This includes:

- 5-step wizard UI with progress indicator
- Goal/experience selection matching new onboarding
- AI-powered protocol generation using Lovable AI
- Save/export functionality
- Legal disclaimer modal on first use

