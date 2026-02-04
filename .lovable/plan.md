

# Add Red Theme to ChatPreviewCard

## Overview

Update the ChatPreviewCard (the large AI chatbot demo card at the top) to use a red/rose color theme, completing the color-coded trio:

| Card | Theme |
|------|-------|
| **ChatPreviewCard** | Red/Rose (NEW) |
| CoursePreviewCard | Purple |
| DigestPreviewCard | Blue |

## Visual Changes

### ChatPreviewCard (Red Theme)
- **Background**: Red gradient overlay (`from-red-500/10 via-rose-500/5 to-card/95`)
- **Border**: Red tint (`border-red-200/50`)
- **Header border**: Red accent (`border-red-200/30`)
- **PP Avatar**: Red background (`bg-red-500`)
- **User message bubble**: Red (`bg-red-500 text-white`)
- **Status dot**: Red (`bg-red-500`)
- **Category chips**: Red (`bg-red-500/10 text-red-500`)

## File Changes

| File | Changes |
|------|---------|
| `src/components/landing/HeroProductCards.tsx` | Update `ChatPreviewCard` with red theme |

## Technical Details

```tsx
// Card container - add red gradient
className={cn(
  "relative overflow-hidden rounded-3xl backdrop-blur border border-red-200/50 shadow-xl cursor-default",
  "bg-gradient-to-br from-red-500/10 via-rose-500/5 to-card/95",
  className
)}

// Header bar
<div className="flex items-center justify-between px-4 py-3 border-b border-red-200/30 bg-white/50">

// PP Avatar
<div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center">

// Status dot
<span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

// User message
<div className="bg-red-500 text-white text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">

// AI avatar
<div className="w-5 h-5 rounded-md bg-red-500 flex-shrink-0 flex items-center justify-center">

// Category chips
<span className="text-[10px] px-2 py-1 rounded-full bg-red-500/10 text-red-500 font-medium">
```

## Result

All three hero cards will now have distinct, vibrant color identities:
- **AI Chat (Top)**: Red - bold, attention-grabbing, action-oriented
- **Your Goal (Bottom Left)**: Purple - aspirational, premium feel
- **Weekly Digest (Bottom Right)**: Blue - informational, trustworthy

