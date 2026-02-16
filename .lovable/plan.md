
# Dashboard Home Redesign: Modern Premium Tech Aesthetic

## Overview

Complete visual overhaul of the dashboard home page (`/dashboard`) from warm cream medical-portal styling to a dark-accented modern tech aesthetic inspired by Linear, Oura, and Arc. Only the dashboard home components change. All data connections, hooks, routing, and other pages remain untouched.

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `src/pages/dashboard/Home.tsx` | Edit | Update max-width to 720px, remove noise texture, update background |
| `src/components/dashboard/home/NoProtocolState.tsx` | Rewrite | Dark hero card, square icon containers, no-icon trust strip |
| `src/components/dashboard/home/ActiveProtocolState.tsx` | Rewrite | Modern stat row with dividers, thin progress bar, square icon quick-access cards, no emojis |
| `src/components/dashboard/home/CompoundCard.tsx` | Edit | Update colors (indigo for skin, green to #22C55E), 3px strip, 28px checkbox, opacity fade instead of strikethrough, border styling |
| `src/components/dashboard/home/CompletionBanner.tsx` | Rewrite | Minimal green banner with checkmark circle, no particles, no emoji |
| `src/components/dashboard/home/RestDayCard.tsx` | Edit | Remove emoji, clean text only |
| `src/components/dashboard/home/FloatingChatButton.tsx` | Edit | Dark (#111111) background, 52px size, ring pulse animation instead of shadow pulse |

## No-Protocol State Design

**Greeting**: 32px, font-weight 700, letter-spacing -0.02em, color #0A0A0A. Wave emoji kept per spec. Subtext in #4B5563.

**Hero CTA Card**: #111111 background, 20px radius, 36px padding. Single-column layout (no side-by-side even on desktop). Content:
- "AI-POWERED PROTOCOL ENGINE" label in #F97316, 11px uppercase monospace, 0.08em tracking
- "Get your exact peptide protocol" heading in white, 28px mobile / 36px desktop, -0.02em tracking
- Body text in #9CA3AF, 15px
- White pill button (#FFFFFF bg, #111111 text), hover transitions to #F97316 bg with white text
- "Takes about 3 minutes" in #6B7280
- Desktop only: subtle 6x6 dot grid in top-right corner (#333333, opacity 0.4, 4px dots, 16px spacing)

**Feature Preview Cards**: White bg with 1px #E8EAED border (not shadow-only). 36x36px square icon containers with 10px radius, #F3F4F6 bg, #4B5563 icon. Lock icon 12px #D1D5DB in top-right. Thin separator line at bottom + "Unlocks with your protocol" in #D1D5DB 11px. Hover: border-color to #9CA3AF, translateY(-1px).

**Trust Strip**: Text only, no icons. Single centered line in #9CA3AF 13px with dot separators.

## Active Protocol State Design

**Header**: Small "Hey Carter" in #9CA3AF 14px (not the focus). Protocol name in #0A0A0A 28px bold -0.02em tracking. Small 8px orange dot before the name instead of emoji.

**Stats Row**: Inline text separated by thin vertical lines (1px #E8EAED, 20px height). "Week 3 of 8" in #0A0A0A 14px bold. "Day 18" in #4B5563 14px. Compliance in #22C55E 14px bold. Numbers in monospace font. No colored pill backgrounds. No ProgressRing (removed for cleaner look).

**Progress Bar**: 4px height, #E8EAED track, solid #F97316 fill (no gradient). No label below (stats above already communicate).

**Today Section**: "Today" 20px bold #0A0A0A left, "Mon, Feb 16" #9CA3AF 14px right.

**Compound Cards**: White bg, 1px #E8EAED border, 14px radius. 3px left color strip. Updated category colors: skin = #6366F1 (indigo), fat_loss = #22C55E. 28px circular checkbox. Checked state: #22C55E fill, scale 1 to 1.08 to 1 (200ms), compound name fades to opacity 0.5 (no strikethrough). Card spacing: 8px. Hover: border-color #9CA3AF.

**Completion Banner**: #F0FDF4 bg, 1px #BBF7D0 border, 14px radius. Green checkmark circle (24px) + "Day X complete" #0A0A0A 16px bold + "Nice work. Back tomorrow." #4B5563 13px. No particles, no confetti, no emoji. Horizontal layout with flex-row.

**Rest Day Card**: Dashed border #E8EAED, 14px radius. "Rest Day" #0A0A0A 18px bold. "No injections scheduled today." #4B5563 14px. No emoji.

**Quick Access Cards**: White bg, 1px #E8EAED border, 14px radius, 72px height, flex-row layout. 36x36px square icon containers (#F3F4F6 bg, 10px radius), small arrow in #D1D5DB right side. Hover: border-color #9CA3AF, icon bg darkens to #E8EAED, arrow to #4B5563.

**Disclaimer**: Kept as-is, subtle bottom text.

**FAB**: 52px circle, #111111 bg, white chat icon 20px. Shadow: rgba(0,0,0,0.15). Hover: bg transitions to #F97316. Pulse animation: expanding ring of #F97316 from 52px to 64px, fading, every 3 seconds (when no logs in 7 days).

## Technical Notes

- All existing hooks preserved: `useUserProtocol`, `useTodayLog`, `useUpsertDailyLog`, `useProfile`, `useAllLogs`, `useRecentLogs`, `useProgressStats`
- All existing routing preserved
- No database changes
- No changes to DashboardLayout, DashboardTopNav, or MobileBottomNav
- `ProgressRing` component stays in codebase but is no longer imported in ActiveProtocolState
- Monospace numbers use `fontFamily: "JetBrains Mono, ui-monospace, monospace"` (per project memory on dashboard typography standards)
- Max-width reduced from 800px to 720px
- Page background remains #FAFAFA from DashboardLayout (not worth changing the shared layout for one page)
