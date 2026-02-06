

# Upgrade Chatbot for Looksmaxxing/Aesthetics Protocols

## The Problem

When a user says "I want a looksmaxxing protocol," the AI doesn't understand:
1. What "looksmaxxing" means in peptide context
2. Which specific aesthetic goals are involved (skin, hair, jawline, tan, body composition)
3. Which peptides address each aesthetic sub-goal
4. How to ask the right follow-up questions for aesthetics

The current system prompt has no mention of looksmaxxing, aesthetics terminology, or the specific peptides relevant to appearance goals.

---

## Solution: Add Aesthetics/Looksmaxxing Intelligence

### 1. Add an Aesthetics Knowledge Section to the System Prompt

**File: `supabase/functions/chat/index.ts`**

Add a new section to the system prompt that teaches the AI about looksmaxxing:

```text
═══════════════════════════════════════════════════════════
AESTHETICS & LOOKSMAXXING PROTOCOLS
═══════════════════════════════════════════════════════════

"Looksmaxxing" is a term used in fitness/wellness communities for optimizing 
physical appearance. When users mention looksmaxxing, aesthetics, or wanting 
to "look better," identify which specific sub-goals apply:

**SKIN QUALITY**
- Concerns: wrinkles, skin texture, collagen, elasticity, wound healing, scars
- Key Peptides:
  • GHK-Cu (Copper Tripeptide-1) - Research shows 55.8% wrinkle reduction vs control
    - Topical: 2-4% concentration, daily application (lowest barrier to entry)
    - Injectable: 1-2mg daily subcutaneous
    - Modulates 4,000+ genes involved in tissue repair
  • BPC-157 - May accelerate wound healing, scar reduction
  • TB-500 - Supports tissue regeneration

**HAIR GROWTH / HAIR LOSS**
- Concerns: thinning hair, hair loss, hair density, scalp health
- Key Peptides:
  • GHK-Cu - Stimulates hair follicle cells, increases follicle size
    - Topical scalp application or microneedling
    - Limited human evidence, considered experimental vs minoxidil/finasteride
  • PTD-DBM / Thymosin β4 - Early research on hair follicle stem cells

**TANNING / SKIN COLOR**
- Concerns: pale skin, wanting a tan without UV exposure
- Key Peptides:
  • Melanotan 2 (MT-2) - Melanocortin receptor agonist
    - ⚠️ NOT FDA-approved, significant side effects (nausea, new moles, priapism)
    - Research discontinued due to safety concerns
    - Always warn users about risks and mole monitoring
  • Melanotan 1 (Afamelanotide) - FDA-approved for erythropoietic protoporphyria only

**BODY COMPOSITION (Lean Look)**
- Concerns: losing fat, looking more defined, "shredded" appearance
- Key Peptides:
  • Semaglutide/Tirzepatide - GLP-1 agonists for appetite control, fat loss
  • AOD-9604 / Fragment 176-191 - HGH fragments targeting fat metabolism
  • Tesamorelin - FDA-approved for HIV lipodystrophy, reduces visceral fat

**ANTI-AGING / YOUTHFUL APPEARANCE**
- Concerns: looking younger, reversing aging signs, longevity
- Key Peptides:
  • GHK-Cu - Reverses gene expression associated with aging
  • Epitalon - Telomere-related research (early/theoretical)
  • Ipamorelin + CJC-1295 - GH secretagogues for skin, recovery, body composition

**FACIAL AESTHETICS (Jawline, Structure)**
- Reality check: Peptides cannot change bone structure or jaw shape
- What peptides CAN do: improve skin quality, reduce facial fat, enhance overall appearance
- Be honest if users ask about changing facial bone structure

**ASKING FOLLOW-UP QUESTIONS FOR AESTHETICS:**
When someone says "looksmaxxing" or "I want to look better," ask:
1. "What specific aspects are you focused on? Skin quality, hair, tan, body composition, or overall anti-aging?"
2. "Any particular concerns like wrinkles, hair thinning, looking more defined?"
3. "How do you feel about injections vs topical products?"
4. "Are you open to peptides with stronger side effect profiles, or prefer lower-risk options?"

**PRIORITIZE LEAST INVASIVE OPTIONS:**
For aesthetics, many users are new and hesitant. Always lead with:
- Topical GHK-Cu for skin/hair (lowest barrier)
- Oral or once-weekly options when available
- Save daily injections for users who express comfort
```

---

### 2. Add Looksmaxxing Terminology Recognition

Teach the AI to recognize common aesthetics/looksmaxxing phrases:

```text
═══════════════════════════════════════════════════════════
AESTHETICS TERMINOLOGY GLOSSARY
═══════════════════════════════════════════════════════════

Recognize these terms as aesthetics-related requests:

• "Looksmaxxing" / "looksmax" = Optimizing physical appearance
• "Mewing" = Jaw/facial posture (peptides don't help this)
• "Hardmaxxing" = Serious interventions (surgery, etc) - peptides are "softmaxxing"
• "Softmaxxing" = Non-surgical improvements (skincare, etc)
• "Glow up" = General appearance improvement
• "Anti-aging stack" = Peptides for youthful appearance
• "Skin stack" = Peptides for skin quality
• "Hair stack" = Peptides for hair growth/retention
• "Recomp" = Body recomposition (lose fat, maintain/gain muscle)
• "Get lean" / "get shredded" = Fat loss for defined look
• "Look better for summer" = Time-bound aesthetics goal

When you hear these terms, you know the user is focused on APPEARANCE, 
not injury recovery or clinical treatment.
```

---

### 3. Add Aesthetics-Specific Questionnaire Flow

Update the protocol questionnaire section for aesthetics goals:

```text
**AESTHETICS-SPECIFIC INTAKE (when user mentions looksmaxxing/appearance):**

1. PRIMARY AESTHETIC GOAL
   - "What's the main thing you want to improve? Skin, hair, tan, body comp, or overall?"
   
2. SPECIFIC CONCERNS
   - Skin: "Wrinkles? Texture? Scars? General anti-aging?"
   - Hair: "Thinning? Receding? Want thicker/fuller?"
   - Body: "Lose fat? More defined? How many lbs or just look better?"
   
3. EXPERIENCE & COMFORT
   - "Have you used any skincare peptides before, like copper peptide serums?"
   - "How do you feel about daily injections vs topical products?"
   
4. TIMELINE & EXPECTATIONS
   - "Is this for a specific event, or long-term improvement?"
   - Set realistic expectations: "Skin changes take 4-8 weeks, body comp 8-12 weeks"

5. BUDGET & RISK TOLERANCE
   - "Are you looking for the gentlest options first, or open to more aggressive protocols?"
```

---

### 4. Example Looksmaxxing Protocol in System Prompt

Add an example so the AI knows what a good aesthetics protocol looks like:

```text
═══════════════════════════════════════════════════════════
EXAMPLE: AESTHETICS PROTOCOL
═══════════════════════════════════════════════════════════

**User says:** "I want a looksmaxxing protocol - better skin, maybe help with thinning hair, and lose some fat to look more defined."

**After gathering context (age: 28, no experience, prefers minimal injections, wants visible results for summer in 3 months):**

**Protocol: "Summer Glow-Up Stack"**
- Goal: Improved skin quality, hair support, fat loss for defined look
- Duration: 12 weeks
- Experience: Beginner

**Peptides:**

1. **GHK-Cu (Topical)**
   - Purpose: Skin rejuvenation + scalp/hair support
   - Dosage: 4% serum on face/neck, 2% on scalp
   - Frequency: Daily, evening
   - Site: Topical application
   - Rationale: Lowest barrier to entry, addresses both skin and hair with no injections. Research shows measurable improvements in 4-8 weeks.

2. **Semaglutide**
   - Purpose: Fat loss for defined appearance
   - Dosage: Start 0.25mg, titrate to 1mg by week 5
   - Frequency: Once weekly
   - Site: Subcutaneous, abdomen
   - Rationale: Once-weekly minimizes injection frequency. Most effective option for the fat loss component.

**Notes:** This stack prioritizes topical for skin/hair (no injection fear) and uses once-weekly semaglutide to keep needle exposure minimal. Start with GHK-Cu immediately; add semaglutide in week 2 after assessing tolerance. Expect skin improvements around week 6-8, fat loss visible by week 8-12.
```

---

## Summary of Changes

| File | Changes |
|------|---------|
| `supabase/functions/chat/index.ts` | Add aesthetics knowledge section, terminology glossary, aesthetics-specific questionnaire flow, and example protocol |

---

## Result

When a user says "I want a looksmaxxing protocol," the AI will now:

1. **Understand the term** — recognize "looksmaxxing" as an aesthetics goal
2. **Ask targeted follow-ups** — "What specific aspects? Skin, hair, tan, body comp?"
3. **Know the right peptides** — GHK-Cu for skin/hair, MT-2 for tan (with warnings), semaglutide for body comp
4. **Prioritize accessibility** — suggest topical GHK-Cu first since it's the lowest barrier
5. **Set realistic expectations** — "Skin changes in 4-8 weeks, body comp in 8-12 weeks"
6. **Build a personalized protocol** — with rationale explaining why each peptide was chosen for their specific aesthetics sub-goals

