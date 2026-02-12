

# Dashboard Overhaul: Match Homepage Design + Deliver Real Value

This is a complete visual and content overhaul of the three dashboard pages (/dashboard, /dashboard/chat, /dashboard/protocols) to match the homepage's warm, modern aesthetic and deliver premium $67-worth-of-value content.

## What Changes

### 1. Dashboard Home (/dashboard) -- Complete Redesign
**File:** `src/pages/dashboard/Home.tsx` (rewrite)

Current state: Generic stat cards with vague metrics.
New state: A warm, personalized blueprint hub with:

- **Welcome header** reading quiz data to show "Your [Goal] Blueprint" with personalization badge (goal, age, experience, date)
- **Hero match card** on warm cream background (#FFF7ED) showing primary + secondary peptide match with evidence circles (filled orange #F97316), legal status badges (green/amber/red), and "View Full Protocol" CTA
- **3 quick-action cards** (AI Research Coach, Doctor Script, Legal Guide) with colored accents, personalized starter prompts, and mini-previews based on quiz goal
- **Popular guides** section restyled to match new card design
- Uses existing `useQuizResponse()` hook and `quizPersonalization.ts` for all matching logic

### 2. Chat Page (/dashboard/chat) -- Visual Restyle
**File:** `src/components/dashboard/ChatInterface.tsx` (restyle)

Current state: Large centered logo, generic category chips, dark-themed message bubbles.
New state:

- **Minimal header**: Small "AI RESEARCH COACH" label in orange mono, one-line subtitle, no large logo
- **Topic pills** restyled: white bg, gray border, orange active state (#FFF7ED bg, #F97316 border)
- **Starter prompts** personalized by quiz goal (2x2 grid), warm card styling
- **Message bubbles**: User = #111827 bg white text, AI = #F9FAFB bg with #E5E7EB border. Citation blocks in #FFF7ED
- **Input bar**: #F9FAFB bg, rounded-2xl, orange send icon, 16px min font size
- All existing backend logic (streaming, conversations, save/feedback) untouched

### 3. Protocols Page (/dashboard/protocols) -- Complete Content Overhaul
**File:** `src/pages/dashboard/Protocols.tsx` (rewrite)

Current state: Expandable protocol cards showing basic peptide info + existing PeptideDeepDive component.
New state: The core $67 deliverable, showing matched peptides FIRST with "YOUR MATCH" badges, then "Browse Other Peptides" below. Each protocol is an expandable card with warm styling.

The existing `PeptideDeepDive` component and `peptideDeepDiveLibrary` data already contain ALL the required content (mechanism, evidence with citations, dosing tables, safety profiles, legal status, doctor scripts). The overhaul will:

- Restyle `PeptideDeepDive.tsx` to match the new design system (warm backgrounds, orange evidence circles instead of stars, colored legal badges, purple-bordered doctor script section with copy-to-clipboard)
- Add "YOUR MATCH" badge logic using quiz response data
- Show matched peptides first, then remaining peptides under "Explore Other Peptides" divider
- Add copy-to-clipboard on doctor script blocks (navigator.clipboard.writeText)
- Add smooth expand/collapse animation (already has framer-motion)

### 4. Navigation Restyle
**File:** `src/components/dashboard/DashboardTopNav.tsx` (restyle)

- White background with subtle bottom border (#E5E7EB)
- Active nav item: pill highlight instead of inverted colors
- Same logo rendering, same user dropdown -- just warmer styling

**File:** `src/components/dashboard/DashboardLayout.tsx` (minor)

- Background: #FAFAFA instead of pure white

### 5. Mobile Bottom Nav Update
**File:** `src/components/dashboard/MobileBottomNav.tsx`

- Update nav items to match top nav (Home, Chat, Protocols)
- Restyle to match warm aesthetic

## What Does NOT Change

- No backend functions, edge functions, or database queries modified
- No auth, payment, or route protection logic changed
- No pages outside the dashboard touched (homepage, quiz, checkout, guides)
- No new routes added
- No sidebar navigation -- top nav only
- Chat streaming logic, conversation management, message save/feedback all preserved
- Protocol start/pause/resume/print/export functionality preserved

## Technical Details

### Data Flow (no changes needed)
- `useQuizResponse()` provides goal, age, experience data
- `quizPersonalization.ts` maps goals to peptide matches
- `peptideDeepDive.ts` contains ALL research content for 7 peptides
- `PeptideDeepDive.tsx` renders the expandable sections
- `useProtocol()` provides user's active protocols
- `useConversations()` provides chat history

### Design Tokens Used Throughout

| Token | Value | Usage |
|-------|-------|-------|
| Page bg | #FAFAFA | All dashboard pages |
| Card bg | #FFFFFF | All cards |
| Featured bg | #FFF7ED | Hero match card, citation blocks |
| Interactive bg | #F3E8FF | Doctor script highlight |
| Orange accent | #F97316 | Evidence circles, labels, active pills |
| Purple accent | #8B5CF6 | Doctor script border, interactive elements |
| Green badge | #10B981 | FDA Approved |
| Amber badge | #F59E0B | Compounding, caution |
| Red badge | #EF4444 | Not FDA Approved |
| Primary text | #111827 | Headings, user messages |
| Secondary text | #6B7280 | Descriptions |
| Buttons | #111827 bg, white text, rounded-full | Primary actions |

### Files Modified

| File | Scope |
|------|-------|
| `src/pages/dashboard/Home.tsx` | Full rewrite -- personalized blueprint hub |
| `src/components/dashboard/ChatInterface.tsx` | Visual restyle only -- no logic changes |
| `src/pages/dashboard/Protocols.tsx` | Full rewrite -- research-rich protocol viewer |
| `src/components/protocol/PeptideDeepDive.tsx` | Restyle + add copy-to-clipboard on doctor scripts |
| `src/components/dashboard/DashboardTopNav.tsx` | Warm restyle |
| `src/components/dashboard/DashboardLayout.tsx` | Background color change |
| `src/components/dashboard/MobileBottomNav.tsx` | Update items + warm restyle |
| `src/pages/dashboard/ChatPage.tsx` | Minor height adjustment if needed |

### Implementation Sequence
1. DashboardLayout + TopNav + MobileBottomNav (global shell)
2. Dashboard Home (personalized hub)
3. ChatInterface (visual restyle)
4. Protocols + PeptideDeepDive (core deliverable)

This is a large change spanning 8 files. It should be broken into 2-3 implementation messages to keep changes manageable and testable.

