
# Rebuild the My Plan Page for Real Value

## The Problem

The current "My Plan" page is essentially useless:

1. **Wrong CTA** - It sends users to `/quiz` instead of the AI Coach where protocols are actually built
2. **Generic templates** - The `useProtocol` hook has hardcoded template protocols (from quiz) instead of showing AI-built personalized ones
3. **No daily guidance** - Just shows a progress bar, doesn't tell users what to do TODAY
4. **No personalization visible** - Doesn't display the AI's reasoning, rationale, or user context
5. **Multiple confusing pages** - There's `Protocol.tsx`, `Protocols.tsx`, AND `MyPlan.tsx` doing similar things
6. **Broken links** - CTAs point to `/dashboard/chat` instead of `/dashboard/coach`

---

## Solution: Rebuild My Plan as Your Command Center

Transform the Protocol/My Plan page into a **daily action hub** that shows:

1. **What to do TODAY** - Today's scheduled peptides with exact dosing
2. **Quick check-in** - Log that you did your dose
3. **The "Why"** - AI's personalized reasoning for your protocol
4. **Peptide details** - Expandable cards with rationale
5. **Progress at a glance** - Week/day progress
6. **CTA to build** - When no protocol exists, direct to AI Coach

---

## Technical Changes

### 1. Consolidate to Single Protocol Page

**Keep**: `src/pages/dashboard/MyPlan.tsx` as the main page
**Remove references to**: `Protocol.tsx` (legacy from quiz-based approach)
**Update routing** if needed

### 2. Rebuild MyPlan.tsx with Daily Focus

```text
┌─────────────────────────────────────────────────────────┐
│  Today's Protocol                         Week 2, Day 4 │
│  ─────────────────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ☀️ MORNING                                      │   │
│  │  BPC-157 • 250mcg • Subcutaneous                 │   │
│  │  [ ✓ Mark Complete ]                             │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  🌙 EVENING                                      │   │
│  │  BPC-157 • 250mcg • Subcutaneous                 │   │
│  │  [ ✓ Mark Complete ]                             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  💬 Why This Protocol                            │   │
│  │  "You mentioned recovering from a torn ACL and   │   │
│  │  preferring minimal injections. BPC-157 twice    │   │
│  │  daily for 6 weeks targets your injury..."       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ▼ View Full Protocol Details                          │
└─────────────────────────────────────────────────────────┘
```

### 3. Update Empty State to Point to AI Coach

When no protocol exists:
- Remove quiz CTA
- Add prominent "Build with AI Coach" button
- Show 3-step flow: Chat → AI builds → You execute

### 4. Add Today's Schedule Logic

Parse peptides and show what's due based on:
- Frequency (once daily, twice daily, weekly)
- Timing (morning, evening, post-workout)
- Current protocol day

### 5. Add Quick Check-In

Simple toggle buttons to mark doses as complete:
- Links to existing `check_ins` table
- Updates protocol progress (current_day)
- Shows streak/adherence

### 6. Show Personalization Prominently

Display these fields from the protocol:
- `notes` - AI's overall reasoning
- `user_context` - What the AI knows about you
- `peptide.rationale` - Why each peptide was chosen
- `secondary_goals` - Other things being addressed
- `constraints` - What the AI worked around

---

## Files to Change

| File | Changes |
|------|---------|
| `src/pages/dashboard/MyPlan.tsx` | Complete rebuild with daily schedule, check-ins, AI reasoning display |
| `src/hooks/useProtocol.ts` | Remove hardcoded templates (only used for quiz fallback), keep DB fetching |
| `src/hooks/useCheckIn.ts` | Add mutation to log today's dose completion |
| `src/pages/dashboard/Protocol.tsx` | Remove or redirect to MyPlan (legacy file) |
| `src/pages/dashboard/Protocols.tsx` | Update CTA links from `/dashboard/chat` to `/dashboard/coach` |

---

## New User Flow

```text
1. User visits My Plan with no protocol
   → Sees "Build Your Protocol" with AI Coach CTA
   
2. User goes to AI Coach
   → AI asks personalized questions (goal, context, constraints)
   → AI calls create_protocol tool
   → Protocol saved to database
   
3. User returns to My Plan
   → Sees TODAY'S schedule front and center
   → Marks morning dose complete
   → Sees AI reasoning ("Here's why I chose this for you...")
   
4. User returns next day
   → Day counter advanced
   → New schedule for today
   → Can expand to see full protocol details
```

---

## Key Value Adds

| Before | After |
|--------|-------|
| Static "take quiz" CTA | Dynamic AI Coach CTA |
| Generic template protocols | Personalized AI-built protocols |
| Progress bar only | Today's action items |
| No logging | Quick dose check-in |
| Hidden personalization | AI reasoning front and center |
| Confusing multiple pages | One unified "My Plan" page |

---

## Database Considerations

The `protocols` table already has all the right fields:
- `goal`, `secondary_goals`, `user_context`, `constraints` - User info
- `notes` - AI reasoning
- `peptides` JSONB with `rationale` per peptide
- `current_day`, `current_week`, `status` - Progress tracking

The `check_ins` table can log dose completion:
- `date`, `injection_done`, `adherence`
- Can add a `doses_completed` JSONB field for multi-dose tracking

---

## Result

The My Plan page becomes your **daily command center**:
- Open it each morning → See exactly what to do
- Mark complete → Track adherence
- Understand why → See AI's personalized reasoning
- Feel guided → Not just a static info page
