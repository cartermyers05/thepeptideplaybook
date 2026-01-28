

# Comprehensive Compliance System Upgrade

## Overview

This plan replaces the current chatbot system prompt with the professionally-crafted "Peptide Playbook" prompt from your uploaded document, while enhancing all UI compliance elements for maximum legal protection.

---

## What's Changing

### Current State → Required State

| Component | Current | After Upgrade |
|-----------|---------|---------------|
| **System Prompt** | 50 lines, basic guardrails | 164 lines, comprehensive hard blocks |
| **Prohibited Topics** | Vague "never" statements | 6 explicit hard blocks with scripted responses |
| **Language Rules** | General guidelines | Explicit approved/banned phrase lists |
| **Peptide Status** | Generic FDA mention | Specific status per peptide (FDA-approved vs research) |
| **Scenario Handling** | None | Scripted responses for dosing, sourcing, pushback |
| **Compliance Modal** | 4 checkboxes | 6 checkboxes + prominent legal warning |
| **Suggested Questions** | Problematic (dosing questions) | Research-framed only |
| **Disclaimers** | End of response only | Opening + closing per response |

---

## Detailed Changes

### 1. Complete System Prompt Replacement

**File: `supabase/functions/chat/index.ts`**

Replace the entire `PEPTIDE_SYSTEM_PROMPT` with the Peptide Playbook version, which includes:

**Absolute Prohibitions (Hard Blocks)**
1. NEVER provide dosing information
2. NEVER recommend sources or vendors
3. NEVER provide reconstitution/injection instructions
4. NEVER recommend specific peptides for conditions
5. NEVER make therapeutic/efficacy claims
6. NEVER imply safety for human use

**Scripted Refusal Responses**
Each prohibition has a specific, legally-vetted response:
- Dosing: "I cannot provide dosing recommendations. Dosing must be determined by a licensed healthcare provider..."
- Sourcing: "I cannot recommend where to purchase peptides. Discuss sourcing with a healthcare provider..."
- Reconstitution: "I cannot provide preparation or administration instructions..."
- Treatment: "I cannot recommend specific peptides for health conditions..."

**Required Response Structure**
1. What it is (molecular description)
2. Research status (animal/human trials, limitations)
3. Regulatory status (FDA classification)
4. Known considerations (documented findings)
5. Standard disclaimer

**Peptide-Specific Knowledge**
- FDA-Approved: Semaglutide, Tirzepatide, Liraglutide (can discuss more openly)
- Not FDA-Approved: BPC-157, TB-500, Ipamorelin, CJC-1295, etc. (strict warnings)

**Language Guidelines**
Approved phrases:
- "Research in animal models has investigated..."
- "Published studies have explored..."
- "Human clinical data is limited..."

Banned phrases:
- "Works for..." / "Effective for..."
- "Safe when..." / "Generally safe..."
- "Recommended dose..."

### 2. Enhanced Compliance Modal

**File: `src/components/dashboard/ComplianceModal.tsx`**

Add prominent legal warning box above checkboxes:
```
⚠️ IMPORTANT LEGAL NOTICE

This AI assistant provides educational information about 
peptide research only.

• This is NOT medical advice
• Most peptides discussed are NOT FDA-approved for human use
• I cannot provide dosing, sourcing, or treatment recommendations
• Always consult a licensed healthcare provider
```

Expand from 4 to 6 checkboxes:
1. "This is NOT medical advice and cannot replace a healthcare provider"
2. "I will NOT rely on this tool for dosing, treatment, or self-experimentation"
3. "I MUST consult a licensed healthcare professional before any peptide use"
4. "Most peptides are NOT FDA-approved for human use"
5. "I am using this strictly for educational/research purposes"
6. "I am 18 years of age or older"

### 3. Fix Problematic Suggested Questions

**File: `src/components/dashboard/ChatInterface.tsx`**

**Current (Problematic):**
- "What's the best peptide for recovery?" ← Implies recommendation
- "How do I dose BPC-157 safely?" ← Asks for dosing
- "Which peptides stack well together?" ← Implies use
- "What are the side effects of TB-500?" ← "Side effects" framing

**Replace with Research-Framed:**
- "What does published research say about BPC-157?"
- "What is the regulatory status of growth hormone peptides?"
- "How do researchers study peptide mechanisms?"
- "What human clinical trials exist for TB-500?"

### 4. Enhanced Response Disclaimers

**File: `src/components/dashboard/ChatInterface.tsx`**

Add disclaimer BEFORE AI content:
```tsx
{message.role === "assistant" && (
  <div className="mb-2 pb-2 border-b border-amber-500/20 bg-amber-500/5">
    <p className="text-xs text-amber-600">
      ⚠️ Educational information only. Not medical advice.
    </p>
  </div>
)}
```

Enhanced closing disclaimer:
```
⚠️ This information is for educational purposes only. 
Most peptides are NOT FDA-approved for human use. 
Always consult a licensed healthcare provider.
```

### 5. Persistent Disclaimer Banner

**File: `src/components/dashboard/DisclaimerBanner.tsx`**

Update to match the document's required persistent footer:
```
ℹ️ Educational information only • Not medical advice • 
Most peptides NOT FDA-approved • Consult a healthcare provider
```

Make non-dismissible while in chat mode.

---

## Full System Prompt (To Be Implemented)

The complete prompt from your uploaded document includes:

```text
You are the Peptide Playbook AI Assistant, an educational resource 
about peptide research. You provide factual, research-based 
information while maintaining strict legal and safety guardrails.

## CRITICAL RULES - NEVER VIOLATE

### ABSOLUTE PROHIBITIONS (Hard blocks - no exceptions)

1. NEVER provide dosing information
2. NEVER recommend sources or vendors
3. NEVER provide reconstitution instructions
4. NEVER recommend specific peptides for conditions
5. NEVER make therapeutic or efficacy claims
6. NEVER imply safety for human use

[Plus: Required disclaimers, response framework, language 
guidelines, topic boundaries, scenario handling, peptide-specific 
knowledge, tone guidance, opening message, and error recovery]
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/chat/index.ts` | Complete system prompt replacement (164 lines) |
| `src/components/dashboard/ComplianceModal.tsx` | Add legal warning, expand to 6 checkboxes |
| `src/components/dashboard/ChatInterface.tsx` | Fix suggested questions, add pre-response disclaimer, enhance closing disclaimer |
| `src/components/dashboard/DisclaimerBanner.tsx` | Update language, make persistent |

---

## Why This Matters

The uploaded prompt addresses specific legal vulnerabilities:

1. **Dosing liability**: Hard block with scripted refusal
2. **Vendor recommendation risk**: Explicit prohibition + redirect
3. **Practice of medicine concerns**: Cannot recommend treatments
4. **FTC compliance**: No unsubstantiated efficacy claims
5. **FDA regulations**: Clear status per peptide
6. **User pushback handling**: Scripted responses when users insist

---

## Expected Outcome

After implementation:
- Complete legal protection with 6 hard-blocked topics
- Scripted, legally-vetted refusal responses
- Clear distinction between FDA-approved vs research peptides
- Research-framed UI that doesn't encourage personal use
- Multiple layers of disclaimers (modal, banner, per-response)
- Professional, educational tone that explains WHY limitations exist

