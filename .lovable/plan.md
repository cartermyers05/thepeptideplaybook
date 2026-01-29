

# Transform Dashboard Home into AI + News Hub

## Overview

Redesign the `/dashboard` home page to combine the AI assistant and live news feed into a single, powerful interface. This creates a "command center" experience where users can immediately engage with the AI and stay updated on industry news - all without navigating away.

## New Dashboard Layout

```text
┌────────────────────────────────────────────────────────────────────────────┐
│  Sidebar (existing)                                                         │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────────┐
│  │                                     │ │                                 │
│  │         AI ASSISTANT                │ │        LATEST NEWS              │
│  │         (Main Panel)                │ │        (Side Panel)             │
│  │                                     │ │                                 │
│  │  ┌─────────────────────────────┐    │ │  ┌───────────────────────────┐  │
│  │  │ Chat Messages Area          │    │ │  │ Featured Story            │  │
│  │  │                             │    │ │  │ (Hero card)               │  │
│  │  │                             │    │ │  └───────────────────────────┘  │
│  │  │                             │    │ │                                 │
│  │  └─────────────────────────────┘    │ │  ┌───────────────────────────┐  │
│  │                                     │ │  │ Story 2                   │  │
│  │  ┌─────────────────────────────┐    │ │  └───────────────────────────┘  │
│  │  │ Category Suggestions        │    │ │  ┌───────────────────────────┐  │
│  │  └─────────────────────────────┘    │ │  │ Story 3                   │  │
│  │                                     │ │  └───────────────────────────┘  │
│  │  ┌─────────────────────────────┐    │ │                                 │
│  │  │ Input + Send                │    │ │  [View All News →]              │
│  │  └─────────────────────────────┘    │ │                                 │
│  │                                     │ │                                 │
│  └─────────────────────────────────────┘ └─────────────────────────────────┘
│                                                                             │
│  On mobile: Tabs switch between AI and News (like current Chat.tsx)         │
└────────────────────────────────────────────────────────────────────────────┘
```

## Key Features

### 1. Integrated AI Chat Panel (Left/Main - 60% width on desktop)
- Full `ChatInterface` component embedded directly
- Category-based suggestion chips (Compare, FDA Status, Recovery, etc.)
- Streaming responses with markdown rendering
- Save/feedback functionality intact

### 2. Live News Feed Panel (Right Side - 40% width on desktop)
- Top 4-5 latest news articles from the database
- Featured story with larger card at top
- Compact news cards below
- "View All News" link to full news page
- Category badges and read time

### 3. Mobile Experience
- Tab-based interface (like existing Chat.tsx)
- Smooth animations between AI and News views
- Full-height experience

### 4. Welcome Banner (Optional - for first visit)
- Personalized greeting
- Quick stats (questions asked, peptides explored)
- Collapses after interaction or can be dismissed

---

## Files to Create

### `src/pages/dashboard/Home.tsx` (Complete Rewrite)

**Current**: Feature card grid with links to other pages

**New**: Split-panel layout with:
- Embedded ChatInterface on the left (desktop) or as tab (mobile)
- News feed panel on the right (desktop) or as tab (mobile)
- Welcome section at top (collapsible)

---

## Files to Modify

### 1. `src/components/dashboard/NewsFeed.tsx`

**Changes:**
- Add `compact` prop to render condensed version
- When `compact={true}`: Show only 4 articles, smaller cards, no header
- Add `limit` prop to control number of articles
- Keep full version for `/dashboard/digest` or standalone news page

### 2. `src/components/dashboard/NewsCard.tsx`

**Changes:**
- Add `compact` prop for smaller card variant
- Reduce padding and text size in compact mode
- Hide some elements (full summary) in compact mode

### 3. `src/App.tsx`

**Changes:**
- Keep routes as-is (dashboard home becomes the hub)
- Consider adding `/dashboard/news` for full news page if needed

---

## New Components to Create

### `src/components/dashboard/QuickNewsPanel.tsx`

A condensed news panel specifically for the dashboard:
- Fetches latest 4 articles
- Featured story at top (larger)
- 3 compact cards below
- "View All News" CTA
- Scrollable if needed

### `src/components/dashboard/WelcomeBanner.tsx`

Optional collapsible banner:
- Personalized greeting
- Quick stats
- "Start asking" CTA
- Dismissible

---

## Technical Approach

### Desktop Layout (md+)
```tsx
<div className="flex gap-6 h-[calc(100vh-theme(spacing.16))]">
  {/* AI Panel - 60% */}
  <div className="flex-1 min-w-0">
    <ChatInterface />
  </div>
  
  {/* News Panel - 40% */}
  <div className="w-[400px] flex-shrink-0">
    <QuickNewsPanel />
  </div>
</div>
```

### Mobile Layout
```tsx
{/* Tab switcher */}
<TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

{/* Content */}
<AnimatePresence mode="wait">
  {activeTab === "chat" ? (
    <ChatInterface />
  ) : (
    <QuickNewsPanel />
  )}
</AnimatePresence>
```

### Responsive Breakpoints
- **Desktop (md+)**: Side-by-side panels
- **Mobile**: Tab-based switching

---

## User Experience Flow

1. User logs in → lands on `/dashboard`
2. Sees AI chat ready with suggestion chips + news feed alongside
3. Can immediately ask a question OR browse latest news
4. Clicking a news article opens full story
5. All features accessible without leaving the page
6. Mobile users can swipe/tap between AI and News tabs

---

## Implementation Steps

1. **Create `QuickNewsPanel` component**
   - Compact news display
   - Uses existing `useNewsArticles` hook
   - Featured story + compact cards

2. **Create `WelcomeBanner` component**
   - Personalized greeting
   - Quick stats from profile

3. **Rewrite `Home.tsx`**
   - Import ChatInterface and QuickNewsPanel
   - Desktop: flex layout with both panels
   - Mobile: tabs with animation

4. **Update `NewsCard.tsx`**
   - Add compact mode variant

5. **Update sidebar nav item**
   - Dashboard → "Home" or keep as "Dashboard"

---

## What Gets Removed from Home.tsx

- Feature card grid (users access features via sidebar)
- "What's New" section (replaced by live news)
- "Suggested Actions" (replaced by AI suggestions)
- Upgrade banner (move to sidebar or modal)

---

## What Stays

- `DashboardLayout` wrapper with sidebar
- Member badge and greeting (in welcome banner)
- Upgrade prompt for free users (in modal or banner)

---

## Benefits

1. **Immediate Value**: Users see AI and news instantly
2. **Engagement**: No dead-end "hub" page - everything is interactive
3. **Differentiation**: Unique combo of AI + news in one view
4. **Retention**: Fresh news keeps users coming back
5. **Efficiency**: Fewer clicks to core functionality

