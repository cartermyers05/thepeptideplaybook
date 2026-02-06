

# Enhanced Protocol Creation & Progress Tracking System

## Overview

This plan upgrades the protocol creation flow within the chat to include a structured questionnaire, enhanced output formatting, and improved progress tracking with AI-driven feedback.

---

## Current State Analysis

| Feature | Status | Location |
|---------|--------|----------|
| Structured data collection | Partial | AI asks questions but inconsistently |
| Protocol generation | Done | `supabase/functions/chat/index.ts` |
| Protocol document output | Partial | Shows in chat, no PDF/export |
| Progress tracking | Done | Check-in flow tracks energy/mood/sleep/side effects |
| Dashboard logging | Done | `/dashboard/progress` shows trends |
| Feedback mechanism | Missing | No AI-driven adjustments |

---

## Implementation Plan

### Phase 1: Structured Questionnaire in Chat

**Problem**: The AI sometimes skips questions or doesn't gather complete context.

**Solution**: Update the system prompt to enforce a mandatory questionnaire before protocol creation.

**File**: `supabase/functions/chat/index.ts`

Update the system prompt to include a structured intake process:

```
PROTOCOL CREATION QUESTIONNAIRE
--------------------------------
When a user asks to build/create a protocol, you MUST gather ALL of the following before calling create_protocol:

1. HEALTH GOALS (required)
   - Primary goal in their words
   - Any secondary goals?
   - Specific outcomes they want (e.g., "lose 15 lbs", "heal knee tendon")

2. CURRENT HEALTH STATUS (required)
   - Age range
   - Any existing conditions or medications?
   - Any injuries or areas of concern?

3. EXPERIENCE LEVEL (required)
   - Have they used peptides before?
   - If yes, which ones and for how long?
   - Comfort with injections?

4. PREFERENCES & CONSTRAINTS (required)
   - Preferred administration method (injection, oral, topical, intranasal)?
   - Budget considerations?
   - Time constraints or travel schedule?
   - Any peptides they want to avoid?

ASK THESE AS A NATURAL CONVERSATION, not a clinical form.
Example: "What's your main goal?" → "Any other things you're hoping to improve?" → "Have you used peptides before?" → "How do you feel about injections?"

DO NOT call create_protocol until you have answers to all 4 categories.
```

---

### Phase 2: Enhanced Protocol Output

**Problem**: Protocol is created but the chat confirmation is basic.

**Solution**: After protocol creation, output a formatted protocol document in chat with all details.

**File**: `supabase/functions/chat/index.ts`

Update the response after successful protocol creation to include:

```markdown
---

## Your Protocol: [Protocol Name]

**Goal**: [Primary goal in user's words]
**Duration**: [X] weeks
**Experience Level**: [Level]

### Peptides

#### 1. [Peptide Name]
- **Purpose**: [How it addresses their goal]
- **Dosage**: [Research dosage]
- **Frequency**: [How often]
- **Timing**: [When to take]
- **Administration**: [Method and site]
- **Why for you**: [Personalized rationale]

#### 2. [Next Peptide...]

### Safety Information
- [Common side effects for included peptides]
- [Drug interactions to be aware of]
- [When to consult a healthcare provider]

### Getting Started
1. Obtain your peptides from a reputable source
2. Gather supplies (BAC water, syringes, alcohol swabs)
3. Follow the reconstitution guide
4. Start with week 1 dosing

---

View and manage your protocol: [View Your Protocol →](/dashboard/protocols)
```

---

### Phase 3: Protocol Export (PDF/Print)

**Problem**: Users can't download or print their protocol.

**Solution**: Add functional export buttons to the protocol detail view.

**Files to modify**:
- `src/pages/dashboard/Protocols.tsx` - Make Print/Export buttons functional

**Implementation**:

```tsx
// Print functionality
const handlePrint = (protocol: Protocol) => {
  const printContent = generateProtocolHTML(protocol);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

// Export as text file (simpler than PDF, no library needed)
const handleExport = (protocol: Protocol) => {
  const content = generateProtocolText(protocol);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${protocol.protocol_name.replace(/\s+/g, '-')}-protocol.txt`;
  a.click();
  URL.revokeObjectURL(url);
};
```

---

### Phase 4: Enhanced Check-In Integration

**Problem**: Check-ins aren't linked to specific protocols well.

**Solution**: Show protocol context in check-in and link adherence data.

**Files to modify**:
- `src/components/coach/CheckInFlow.tsx` - Add protocol context to check-in
- `src/hooks/useCheckIn.ts` - Track protocol-specific adherence

**Add to check-in flow**:

```tsx
// Show current protocol's today's peptides
{protocol && (
  <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
    <p className="text-sm font-medium">{protocol.protocol_name}</p>
    <p className="text-xs text-muted-foreground">
      Week {protocol.current_week} • {protocol.peptides.map(p => p.name).join(', ')}
    </p>
  </div>
)}
```

**Add adherence tracking questions**:
- "Did you follow your protocol dosing today?" (yes/partial/no)
- "Any changes to your routine?" (optional note)

---

### Phase 5: AI Feedback & Adjustment Suggestions

**Problem**: No automated suggestions based on progress data.

**Solution**: Add a new tool for the AI to read user's check-in history and provide feedback.

**File**: `supabase/functions/chat/index.ts`

Add a new tool definition:

```typescript
{
  type: "function",
  function: {
    name: "get_user_progress",
    description: "Retrieve the user's recent check-in data and protocol progress to provide personalized feedback and adjustment suggestions.",
    parameters: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of days of history to retrieve (default 14)"
        }
      }
    }
  }
}
```

**Handler fetches**:
- Recent check-ins (energy, mood, sleep, side effects)
- Current protocol status
- Adherence patterns

**System prompt addition**:
```
PROGRESS REVIEW
---------------
When a user asks about their progress, adjustments, or if they should change anything:
1. Use get_user_progress to fetch their recent data
2. Analyze trends (improving/declining energy, mood, sleep)
3. Look for side effect patterns
4. Provide specific, actionable feedback:
   - If side effects are common in week 1-2, reassure them
   - If energy/mood declining after week 3+, suggest review
   - If adherence is low, explore why and suggest solutions
   - If everything looks good, encourage them

Example response:
"Looking at your last 2 weeks, I can see your energy has been trending up (from 2.5 avg to 3.8 avg), which is great! You mentioned headaches on 3 days - this is common in the first few weeks with semaglutide as your body adjusts. If they persist past week 4, consider reducing your dose slightly. Overall, you're on track!"
```

---

### Phase 6: Database Updates

**New columns for enhanced tracking**:

```sql
-- Add adherence tracking to check_ins
ALTER TABLE check_ins 
ADD COLUMN IF NOT EXISTS adherence text DEFAULT 'yes',
ADD COLUMN IF NOT EXISTS routine_changes text;

-- Add weight tracking (optional, for fat loss protocols)
ALTER TABLE check_ins
ADD COLUMN IF NOT EXISTS weight_kg numeric;
```

---

## Summary of Files Changed

| File | Changes |
|------|---------|
| `supabase/functions/chat/index.ts` | Enhanced system prompt with mandatory questionnaire, formatted output, new get_user_progress tool |
| `src/pages/dashboard/Protocols.tsx` | Functional Print/Export buttons, improved layout |
| `src/components/coach/CheckInFlow.tsx` | Protocol context display, adherence tracking |
| `src/hooks/useCheckIn.ts` | Add adherence and weight fields to types |
| Database migration | Add adherence, routine_changes, weight_kg columns |

---

## User Experience Flow

```text
1. User: "Build me a protocol for fat loss"

2. AI: "I'd love to help! Let me learn about you first.
        What's your main goal with fat loss - specific weight target, 
        looking more defined, or something else?"

3. User: "I want to lose about 20 lbs and look better for summer"

4. AI: "Got it! Any other goals you're hoping to achieve alongside that? 
        Better energy, sleep, skin...?"

5. User: "Yeah, better energy would be nice"

6. AI: "How old are you, and any health conditions or medications I 
        should know about?"

7. User: "38, no conditions, just take a multivitamin"

8. AI: "Have you used peptides before? And how do you feel about 
        injections?"

9. User: "Never used them, a bit nervous about needles but I'll do it"

10. AI: "Totally understand. Last question - any budget constraints or 
         travel coming up that might affect your routine?"

11. User: "No, should be fine"

12. AI: [Calls create_protocol with all gathered context]

13. AI: "I've created your protocol!
         ---
         ## Your Protocol: Summer Shred Protocol
         
         **Goal**: Lose 20 lbs, look better for summer, improve energy
         **Duration**: 12 weeks
         **Experience Level**: Beginner
         
         ### Peptides
         
         #### 1. Semaglutide
         - **Purpose**: Appetite regulation for weight loss
         - **Dosage**: Start 0.25mg, titrate to 1mg by week 5
         - **Frequency**: Once weekly
         - **Why for you**: Most effective for your 20 lb goal, once-weekly keeps needle exposure minimal
         
         [Full formatted output...]
         
         View your protocol: [View Protocol →](/dashboard/protocols)
         "

14. [User completes daily check-ins]

15. User: "How am I doing? Should I change anything?"

16. AI: [Calls get_user_progress]

17. AI: "Looking at your last 2 weeks, your energy is up from 2.5 to 3.8 average - great sign! 
         You mentioned nausea on 4 days - that's normal in the first few weeks with semaglutide. 
         It should ease up by week 4. Your adherence is solid at 92%. 
         Keep doing what you're doing - you're on track!"
```

---

## Benefits

1. **Consistent Data Collection** - Every protocol gets complete user context
2. **Professional Output** - Formatted protocol document in chat + exportable
3. **Protocol-Linked Tracking** - Check-ins tied to specific protocols
4. **AI-Driven Insights** - Personalized feedback based on actual progress data
5. **Actionable Adjustments** - Suggestions for protocol modifications when needed

