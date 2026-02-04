

# Complete Peptide Playbook Content Implementation

## Overview

This plan implements the complete content from the uploaded `peptide-playbook-complete-content.md` document across all system components. The goal is to ensure users receive a full 56-day course experience with interactive guides, personalized AI coaching, and proper milestones.

---

## Current State

| Component | Current State | Target State |
|-----------|--------------|--------------|
| Fat Loss Course | 57 lessons | 57 lessons (complete) |
| Other Courses (5) | 8 lessons each | Full lessons per goal |
| AI Coach Prompt | Basic version | Full enhanced version from doc |
| Reconstitution Guide | Basic in courseContent.ts | Enhanced interactive version |
| Injection Guide | Basic in courseContent.ts | Enhanced interactive version |
| Dosing Calculator | Working | Already complete |
| Milestones | Basic tracking | Full 12-milestone system |
| Course Templates | Partial data | Complete with phases, supplies, schedules |

---

## Implementation Plan

### Phase 1: Seed Remaining Course Content (Database)

**Priority: Critical**

The Fat Loss course has 57 lessons but the other 5 courses only have 8 each. We need to seed complete lesson content for:

1. **Muscle & Recovery Course** (56 days) - BPC-157 + TB-500
2. **Injury Recovery Course** (42 days) - BPC-157
3. **Anti-Aging Course** (84 days) - Epithalon + GHK-Cu  
4. **Cognitive Course** (56 days) - Semax + Selank (nasal, no injections)
5. **Beginner Course** (42 days) - BPC-157

**Approach:**
- Create database migration to update each course template with full lesson arrays
- Lessons follow same structure: day, phase, title, content (200-400 words), action_item
- Content adapted per peptide and administration method (injection vs nasal)

---

### Phase 2: Enhanced AI Coach System Prompt

**File:** `supabase/functions/coach/index.ts`

Update the `buildSystemPrompt` function with the complete prompt from the document:

**Key Additions:**
- More detailed personality guidelines
- Specific response formatting rules
- Enhanced example responses
- Additional context fields (injections completed, next injection date)
- Stricter "NEVER DO" guidelines
- Emoji usage guidance

**Updated Context Fields:**
```typescript
- Name: {{user.name}}
- Course: {{course.title}}
- Current Day: {{progress.currentDay}} of {{course.duration}}
- Current Phase: {{progress.currentPhase}}
- Peptide: {{course.peptide}}
- Current Dose: {{progress.currentDose}}
- Next Injection: {{progress.nextInjectionDate}}
- Experience Level: {{onboarding.experience}}
- Main Concern: {{onboarding.mainConcern}}
- Injections Completed: {{progress.injectionsCompleted}}
```

---

### Phase 3: Interactive Guides with Checkboxes

**Files to Update:**
- `src/lib/courseContent.ts` - Enhanced guide content
- `src/pages/dashboard/MyPlan.tsx` - Interactive checkbox functionality

**Reconstitution Guide Enhancements:**
```typescript
// Add step-by-step checkbox tracking
const [reconSteps, setReconSteps] = useState<Record<string, boolean>>({
  supplies: false,
  mathUnderstood: false,
  vialsClean: false,
  waterDrawn: false,
  waterAdded: false,
  dissolved: false,
  labeled: false,
});
```

**Features:**
- Checkbox for each step that must be confirmed
- Progress indicator showing X/7 steps complete
- "Can't proceed" logic until previous step confirmed
- LocalStorage persistence for progress
- Completion celebration when all steps done

**Injection Guide Enhancements:**
- Same checkbox pattern (6 steps)
- Site selection with visual indicator
- Tips section for reducing anxiety
- "What to do if something goes wrong" section

---

### Phase 4: Enhanced Milestone System

**Files to Update:**
- `src/lib/milestoneDefinitions.ts` (new file)
- `src/hooks/useMilestones.ts` - Enhanced logic
- `src/components/dashboard/home/MilestonesTimeline.tsx` - Updated UI

**12 Milestones from Document:**
```typescript
const milestones = [
  { id: "first-checkin", title: "First Check-In", targetDay: 0, celebration: "simple" },
  { id: "supplies-ready", title: "Supplies Ready", targetDay: 2, celebration: "simple" },
  { id: "reconstitution-complete", title: "Reconstitution Complete", targetDay: 4, celebration: "medium" },
  { id: "first-injection", title: "First Injection 💉", targetDay: 5, celebration: "major" },
  { id: "week-1-complete", title: "Week 1 Complete", targetDay: 7, celebration: "medium" },
  { id: "week-2-complete", title: "Week 2 Complete", targetDay: 14, celebration: "simple" },
  { id: "first-dose-increase", title: "First Dose Increase", targetDay: 15, celebration: "medium" },
  { id: "one-month", title: "One Month Complete 🎉", targetDay: 28, celebration: "major" },
  { id: "halfway", title: "Halfway There!", targetDay: 28, celebration: "medium" },
  { id: "full-dose", title: "Full Dose Reached", targetDay: 29, celebration: "medium" },
  { id: "week-6-complete", title: "Week 6 Complete", targetDay: 42, celebration: "medium" },
  { id: "course-complete", title: "Course Complete! 🏆", targetDay: 56, celebration: "major" },
];
```

**Celebration Types:**
- `simple`: Subtle checkmark animation
- `medium`: Toast notification with celebration message
- `major`: Confetti animation + modal

---

### Phase 5: Course Template Data Enhancement

**Database Migration Updates:**

Update `course_templates` table entries with complete data:

```sql
UPDATE course_templates 
SET 
  peptides = '[
    {
      "name": "Semaglutide",
      "purpose": "GLP-1 receptor agonist for appetite control",
      "dosing_research": "0.25mg → 0.5mg → 1.0mg weekly",
      "frequency": "Once weekly",
      "timing": "Same day each week",
      "site": "Subcutaneous - abdomen, thigh, or arm"
    }
  ]'::jsonb
WHERE goal = 'fat_loss';
```

**Data to Add Per Course:**
- `schedule` array with weeks, dose, units, frequency
- `supplies` array with required items and notes
- `phases` array with name, days range, description
- Complete `lessons` array (56+ items)

---

### Phase 6: Update courseContent.ts

**File:** `src/lib/courseContent.ts`

**Enhancements:**
1. Add complete semaglutide information from document Section 5
2. Add interactive step definitions with checkbox requirements
3. Add troubleshooting sections for guides
4. Add common mistakes section
5. Ensure all peptide details match document specifications

**Key Data Structures:**
```typescript
export const semaglutideInfo = {
  name: "Semaglutide",
  category: "GLP-1 Receptor Agonist",
  brandNames: ["Ozempic", "Wegovy", "Rybelsus"],
  howItWorks: {
    summary: "Mimics the GLP-1 hormone that signals fullness to your brain",
    mechanisms: [
      "Reduces appetite by acting on hunger centers in the brain",
      "Slows gastric emptying (food stays in stomach longer)",
      "Regulates blood sugar to prevent cravings",
      "Reduces 'food noise' - constant thoughts about eating"
    ]
  },
  research: {
    trials: [
      "STEP 1: 14.9% average body weight loss",
      "STEP 2: 9.6% weight loss in diabetic patients",
      "STEP 3: Maintained weight loss over 68 weeks"
    ],
    approval: "FDA approved for weight loss (Wegovy) and diabetes (Ozempic)"
  },
  // ... rest of detailed info
};
```

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| Database Migration | Create | Seed all 5 remaining courses with full lessons |
| `supabase/functions/coach/index.ts` | Update | Enhanced AI system prompt |
| `src/lib/courseContent.ts` | Update | Complete peptide info + interactive guide data |
| `src/lib/milestoneDefinitions.ts` | Create | 12-milestone definitions |
| `src/hooks/useMilestones.ts` | Update | Enhanced milestone tracking logic |
| `src/pages/dashboard/MyPlan.tsx` | Update | Interactive checkboxes for guides |
| `src/components/dashboard/home/MilestonesTimeline.tsx` | Update | Celebration animations |

---

## Expected Outcome

After implementation:

1. **Users get full 56-day course content** regardless of goal selected
2. **AI Coach responses are personalized** with deep context awareness
3. **Interactive guides** track completion step-by-step with checkboxes
4. **12 milestones** trigger appropriate celebrations at key moments
5. **Dosing calculator** already working (no changes needed)
6. **Complete peptide information** displayed in My Plan

---

## Technical Notes

### Database Lesson Structure

Each lesson in the JSONB array follows this format:
```json
{
  "day": 0,
  "phase": "Preparation",
  "title": "Welcome to Your Fat Loss Journey",
  "content": "Congratulations. You just made a decision...",
  "action_item": "Check out the My Plan tab. Familiarize yourself with your peptide, your schedule, and what supplies you'll need.",
  "read_time": "4 min"
}
```

### LocalStorage Keys for Guide Progress

- `peptide_playbook_recon_progress` - Reconstitution steps completed
- `peptide_playbook_injection_progress` - Injection steps completed
- `peptide_playbook_supplies_checklist` - Supplies checked off

### Milestone Trigger Logic

Milestones trigger based on:
- Day-based: When `currentDay` reaches `targetDay`
- Action-based: When specific actions complete (reconstitution, first injection)
- Hybrid: Some milestones may need both conditions

