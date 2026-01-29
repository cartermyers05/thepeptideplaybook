

# Remove Guide and Doctor Scripts Features

## Summary

Remove "The Guide" and "Doctor Scripts" features from the dashboard and all related references across the codebase.

---

## Files to Delete

| File | Reason |
|------|--------|
| `src/pages/dashboard/Guide.tsx` | Guide page component |
| `src/pages/dashboard/Scripts.tsx` | Doctor Scripts page component |

---

## Files to Modify

### 1. `src/App.tsx`
**Remove imports and routes:**
- Line 30: Remove `DashboardGuide` import
- Line 31: Remove `DashboardScripts` import
- Line 68: Remove `/dashboard/guide` route
- Line 69: Remove `/dashboard/scripts` route

### 2. `src/components/dashboard/DashboardSidebar.tsx`
**Remove navigation items:**
- Line 3: Remove `BookOpen` and `MessageSquare` from imports
- Lines 28-29: Remove "The Guide" and "Doctor Scripts" from `navItems` array

### 3. `src/pages/dashboard/Home.tsx`
**Remove from feature grid and suggestions:**
- Remove `BookOpen` and `FileText` from imports (line 3)
- Remove "The Guide" feature object (lines 14-21)
- Remove "Doctor Scripts" feature object (lines 37-42)
- Line 60: Update "Guide updated" in updates array (rename or remove)
- Line 109: Remove "Guide Progress" from quick stats
- Line 194: Remove "Continue reading: Chapter 3" suggested action

### 4. `src/pages/dashboard/Settings.tsx`
**Remove from feature list:**
- Line 14: Remove "Complete PDF Guide (80+ pages)"
- Line 15: Change "Doctor Scripts & Checklist" to just "Source Checklist"

### 5. `src/components/landing/ProductPreview.tsx`
**Remove from product grid:**
- Remove "The Complete Guide" product object (lines 5-11)
- Remove "Doctor Conversation Scripts" product object (lines 24-29)
- Remove `BookOpen` and `FileText` from imports

### 6. `src/components/landing/PricingCTA.tsx`
**Remove from features list:**
- Line 7: Remove "80+ page research guide"
- Line 10: Remove "Doctor conversation scripts"

### 7. `src/components/landing/HowItWorks.tsx`
**Update step descriptions:**
- Line 11: Change "Start With the Guide" to something else (e.g., "Explore the Database")
- Line 17: Remove reference to "scripts"

### 8. `src/components/landing/WhyIMadeThis.tsx`
**Update copy:**
- Line 22: Change "Guide" to "resource" or similar
- Line 50: Change "guide" to "resource"

### 9. `src/components/landing/SocialProof.tsx`
**Update copy:**
- Line 64: Change "This guide" to "This resource" or "Peptide Playbook"

---

## Updated Feature Set (After Removal)

The remaining features will be:
1. **Peptide Database** - 41 peptides searchable
2. **AI Research Assistant** - Unlimited questions
3. **Source Evaluation Checklist** - Vendor evaluation
4. **Monthly Research Digest** - Monthly updates

---

## Navigation Changes

**Current sidebar:**
```text
Dashboard
The Guide          ← REMOVE
Doctor Scripts     ← REMOVE
Source Checklist
Peptide Database
AI Assistant
Research Digest
Settings
```

**Updated sidebar:**
```text
Dashboard
Source Checklist
Peptide Database
AI Assistant
Research Digest
Settings
```

