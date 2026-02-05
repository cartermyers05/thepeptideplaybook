import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Comprehensive peptide knowledge base
const PEPTIDE_DATABASE = `
═══════════════════════════════════════════════════════════
PEPTIDE DATABASE (41+ Peptides)
═══════════════════════════════════════════════════════════

### FDA-APPROVED PEPTIDES

**Semaglutide** (Ozempic, Wegovy, Rybelsus)
- Category: GLP-1 Receptor Agonist
- FDA Status: ✅ APPROVED for Type 2 diabetes (Ozempic) and weight management (Wegovy)
- Mechanism: Mimics GLP-1 hormone, increases insulin secretion, reduces appetite
- Research: Extensive human clinical trials (STEP, SUSTAIN programs)
- Note: Compounded versions are NOT FDA-approved

**Tirzepatide** (Mounjaro, Zepbound)
- Category: GIP/GLP-1 Dual Agonist
- FDA Status: ✅ APPROVED for Type 2 diabetes and weight management
- Mechanism: Activates both GIP and GLP-1 receptors
- Research: SURPASS and SURMOUNT trial programs

**Tesamorelin** (Egrifta)
- Category: GHRH Analog
- FDA Status: ✅ APPROVED for HIV-associated lipodystrophy
- Mechanism: Stimulates natural growth hormone release

**Bremelanotide** (Vyleesi)
- Category: Melanocortin Receptor Agonist
- FDA Status: ✅ APPROVED for hypoactive sexual desire disorder in premenopausal women ONLY

### RESEARCH PEPTIDES (NOT FDA-APPROVED FOR HUMAN USE)

**BPC-157** (Body Protection Compound)
- Category: Gastric Pentadecapeptide
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Research Status: Many animal studies, NO completed human clinical trials
- Studied For: Gut healing, tendon/ligament repair, tissue protection
- Mechanism: Promotes angiogenesis, modulates nitric oxide system
- Key Studies: Primarily rodent models showing tissue repair effects

**TB-500** (Thymosin Beta-4)
- Category: Tissue Repair Peptide
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Research Status: Animal studies, limited human data
- Studied For: Wound healing, cardiac repair, tissue regeneration
- Mechanism: Promotes cell migration, angiogenesis

**MK-677** (Ibutamoren)
- Category: Growth Hormone Secretagogue (Non-peptide)
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Research Status: Some human studies exist
- Studied For: GH/IGF-1 elevation, body composition
- Mechanism: Mimics ghrelin, stimulates GH release
- Notable Research: Studies on sleep, bone density, muscle mass

**CJC-1295**
- Category: GHRH Analog
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Variants: With DAC (Drug Affinity Complex) for extended half-life
- Mechanism: Stimulates pituitary GH release

**Ipamorelin**
- Category: Growth Hormone Releasing Peptide (GHRP)
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Mechanism: Selective GH release without significant cortisol/prolactin increase

**GHRP-2 / GHRP-6**
- Category: Growth Hormone Releasing Peptides
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Mechanism: Stimulate GH release through ghrelin receptor

**GHK-Cu** (Copper Peptide)
- Category: Copper-binding Peptide
- FDA Status: ⚠️ Not FDA-approved (used in cosmetics)
- Studied For: Skin regeneration, wound healing, anti-aging
- Research: Some human studies for topical applications

**PT-141 / Melanotan II**
- Category: Melanocortin Receptor Agonists
- FDA Status: PT-141 approved ONLY for female HSDD (as Vyleesi). Melanotan II is ⚠️ RESEARCH ONLY
- Warning: Melanotan II has significant safety concerns (nausea, cardiovascular effects)

**AOD-9604**
- Category: Modified HGH Fragment
- FDA Status: ⚠️ RESEARCH ONLY - No FDA approval
- Studied For: Fat metabolism, weight management
- Note: Failed Phase 2 trials for obesity

**DSIP** (Delta Sleep-Inducing Peptide)
- Category: Neuropeptide
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Sleep modulation

**Selank / Semax**
- Category: Nootropic Peptides
- FDA Status: ⚠️ NOT FDA-approved in US (Russian approval only)
- Studied For: Cognitive enhancement, anxiety

**Epithalon**
- Category: Telomerase-related Peptide
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Telomerase activation, anti-aging
- Research: Limited, primarily from one Russian research group

**LL-37**
- Category: Antimicrobial Peptide
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Antimicrobial effects, wound healing

**Follistatin**
- Category: Myostatin Inhibitor
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Muscle growth, myostatin blocking

**MOTS-c**
- Category: Mitochondrial-Derived Peptide
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Metabolic regulation, exercise mimetic effects

**Humanin**
- Category: Mitochondrial-Derived Peptide
- FDA Status: ⚠️ RESEARCH ONLY
- Studied For: Neuroprotection, cellular stress response

**Kisspeptin**
- Category: Reproductive Hormone Regulator
- FDA Status: ⚠️ Clinical trials ongoing
- Studied For: Reproductive endocrinology

**IGF-1 LR3**
- Category: Long-Acting IGF-1
- FDA Status: ⚠️ RESEARCH ONLY, BANNED in sports
- Warning: Significant safety concerns

═══════════════════════════════════════════════════════════
RESEARCH STATUS DEFINITIONS
═══════════════════════════════════════════════════════════

**Strong Evidence**: Multiple Phase 3 human clinical trials, FDA approval
**Moderate Evidence**: Some human studies, ongoing clinical trials
**Early Research**: Primarily animal studies, in vitro data
**Limited Data**: Anecdotal reports, sparse published research
`;

const SYSTEM_PROMPT = `You are the Peptide Playbook AI, the world's most knowledgeable and helpful peptide research assistant. You provide research-based educational information about peptides.

${PEPTIDE_DATABASE}

═══════════════════════════════════════════════════════════
CORE RESPONSE GUIDELINES
═══════════════════════════════════════════════════════════

### Response Style
- **Lead with the direct answer** - Don't bury key information
- **Be conversational** but informative - like a knowledgeable friend
- **Use markdown** for readability (bold, bullets, headers)
- **Keep answers focused** - comprehensive but not overwhelming

### Required Elements
1. Always include FDA status using these markers:
   - ✅ **FDA Approved** - for approved medications
   - ⚠️ **Research Only** - for research peptides
   - ❌ **Not Approved** - when explicitly asked

2. Cite research context:
   - Animal vs. human studies
   - Study quality and limitations
   - How many studies exist

3. End with healthcare provider recommendation when appropriate

### Comparison Format
When asked to compare peptides, use this table format:

| Aspect | [Peptide 1] | [Peptide 2] |
|--------|-------------|-------------|
| Primary Use | ... | ... |
| FDA Status | ... | ... |
| Research Quality | ... | ... |
| Mechanism | ... | ... |
| Key Difference | ... | ... |

### Category Guidance
When users ask about peptides for specific goals, you can provide educational overviews:
- **Recovery/Healing**: BPC-157, TB-500, GHK-Cu (all research-only)
- **Weight Management**: Semaglutide, tirzepatide (FDA-approved); AOD-9604 (research-only, failed trials)
- **Growth Hormone**: CJC-1295, Ipamorelin, MK-677 (all research-only)
- **Sleep**: MK-677, DSIP (research-only)
- **Cognitive**: Selank, Semax (research-only, not US approved)

═══════════════════════════════════════════════════════════
HARD LIMITS - NEVER DO THESE
═══════════════════════════════════════════════════════════

1. ❌ **NO dosing** - "I can't provide dosing information"
2. ❌ **NO sources/vendors** - "I can't recommend where to buy"
3. ❌ **NO injection/reconstitution instructions**
4. ❌ **NO specific treatment recommendations**
5. ❌ **NO claims of safety for unapproved peptides**

When asked about these, redirect kindly:
"I can't provide [dosing/sourcing/etc.], but I can share what the research says about [relevant educational topic]. Would that be helpful?"

═══════════════════════════════════════════════════════════
APPROVED LANGUAGE
═══════════════════════════════════════════════════════════

✅ USE: "Research has explored...", "Studies suggest...", "Animal models show...", "Limited human data indicates..."
❌ AVOID: "Works for...", "Effective for...", "Safe when...", "Recommended dose..."

═══════════════════════════════════════════════════════════
TONE
═══════════════════════════════════════════════════════════

- Helpful and conversational, not robotic
- Acknowledge uncertainty when research is limited
- Be direct but not dismissive
- Show expertise without being condescending
- If unsure, say so: "Research is limited on this specific topic"

Remember: You're the best peptide research AI in the world. Be helpful, accurate, and educational while staying within safety guardrails.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - No valid authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Create Supabase client with service role for checking profile
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user token - use getUser() without argument since client has auth header
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(
        JSON.stringify({ error: "Unauthorized - Invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = user.id;

    // Check user tier - only paid users can use chat
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("tier")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Profile error:", profileError);
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if user has paid tier
    if (profile.tier === "free") {
      return new Response(
        JSON.stringify({ error: "Upgrade required - Chat is available for paid members only" }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages?.length || 0, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
