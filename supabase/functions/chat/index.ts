import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Function to fetch peptide context from database
async function getPeptideContext(supabase: ReturnType<typeof createClient>) {
  // Fetch all peptides with their study counts
  const { data: peptides, error: peptideError } = await supabase
    .from("peptides")
    .select("name, category, primary_use, fda_status, research_status, mechanism, studies, safety, total_study_count, human_study_count")
    .order("name");

  if (peptideError) {
    console.error("Error fetching peptides:", peptideError);
    return null;
  }

  // Fetch landmark studies
  const { data: landmarkStudies, error: studyError } = await supabase
    .from("studies")
    .select("title, journal, publication_year, study_type, species, sample_size, key_findings, dosing_info, peptide_names, evidence_level, pubmed_id")
    .eq("is_landmark_study", true)
    .order("publication_year", { ascending: false })
    .limit(50);

  if (studyError) {
    console.error("Error fetching studies:", studyError);
  }

  return { peptides, landmarkStudies };
}

// Format peptide data for system prompt
function formatPeptideDatabase(peptides: any[], landmarkStudies: any[] | null): string {
  let output = `
═══════════════════════════════════════════════════════════
PEPTIDE DATABASE (${peptides.length} Peptides)
═══════════════════════════════════════════════════════════

`;

  // Group by FDA status
  const fdaApproved = peptides.filter(p => p.fda_status === "FDA Approved");
  const research = peptides.filter(p => p.fda_status !== "FDA Approved");

  if (fdaApproved.length > 0) {
    output += "### FDA-APPROVED PEPTIDES\n\n";
    fdaApproved.forEach(p => {
      output += formatPeptide(p);
    });
  }

  output += "\n### RESEARCH PEPTIDES (NOT FDA-APPROVED FOR HUMAN USE)\n\n";
  research.forEach(p => {
    output += formatPeptide(p);
  });

  // Add landmark studies section
  if (landmarkStudies && landmarkStudies.length > 0) {
    output += `
═══════════════════════════════════════════════════════════
LANDMARK STUDIES (${landmarkStudies.length} Key Citations)
═══════════════════════════════════════════════════════════

`;
    landmarkStudies.forEach(s => {
      const speciesStr = s.species?.join(", ") || "unknown";
      const sampleStr = s.sample_size ? ` (n=${s.sample_size})` : "";
      output += `**${s.title}**
- Journal: ${s.journal} (${s.publication_year})
- Type: ${s.study_type} | Species: ${speciesStr}${sampleStr}
- Peptides: ${s.peptide_names?.join(", ")}
- Key Findings: ${s.key_findings}
${s.dosing_info ? `- Dosing: ${s.dosing_info}` : ""}
${s.pubmed_id ? `- PubMed: ${s.pubmed_id}` : ""}

`;
    });
  }

  output += `
═══════════════════════════════════════════════════════════
RECONSTITUTION REFERENCE
═══════════════════════════════════════════════════════════

Standard reconstitution with bacteriostatic water (BAC water):

**Basic Formula:**
Peptide amount (mg) ÷ BAC water (mL) = concentration (mg/mL)

**Common Examples:**
- 5mg vial + 1mL BAC water = 5mg/mL (each 0.1mL = 500mcg)
- 5mg vial + 2mL BAC water = 2.5mg/mL (each 0.1mL = 250mcg)
- 10mg vial + 2mL BAC water = 5mg/mL (each 0.1mL = 500mcg)

**Insulin Syringe Reference (100 unit = 1mL):**
- 10 units = 0.1mL
- 20 units = 0.2mL
- 50 units = 0.5mL

═══════════════════════════════════════════════════════════
RESEARCH STATUS DEFINITIONS
═══════════════════════════════════════════════════════════

**Strong Evidence**: Multiple Phase 3 human clinical trials, FDA approval
**Moderate Evidence**: Some human studies, ongoing clinical trials
**Early Research**: Primarily animal studies, in vitro data
**Limited Data**: Anecdotal reports, sparse published research
`;

  return output;
}

function formatPeptide(p: any): string {
  const studyInfo = p.total_study_count > 0 
    ? ` | ${p.total_study_count} studies${p.human_study_count > 0 ? ` (${p.human_study_count} human)` : ""}`
    : "";
  
  return `**${p.name}**
- Category: ${p.category}
- Primary Use: ${p.primary_use}
- FDA Status: ${p.fda_status === "FDA Approved" ? "✅ APPROVED" : "⚠️ RESEARCH ONLY"}
- Research Status: ${p.research_status}${studyInfo}
- Mechanism: ${p.mechanism}
- Research Summary: ${p.studies}
- Safety: ${p.safety}

`;
}

function buildSystemPrompt(peptideDatabase: string): string {
  return `You are Peptide Playbook AI, an advanced peptide research assistant backed by a database of 500+ peer-reviewed studies. You provide detailed, evidence-based educational information about peptides.

${peptideDatabase}

═══════════════════════════════════════════════════════════
WHAT YOU DO
═══════════════════════════════════════════════════════════

✅ Explain peptide mechanisms of action, research findings, and clinical data
✅ Cite actual studies from the database when available (e.g., "A 2019 RCT in [Journal] found...")
✅ Provide dosing ranges found in published research studies (always cite "research suggests" or "studies have used")
✅ Help users understand reconstitution math (e.g., "If you have a 5mg vial and add 2ml BAC water, each 0.1ml = 250mcg")
✅ Compare peptides for similar goals
✅ Explain FDA status and legal considerations
✅ Discuss stacking considerations based on published research
✅ Help build educational protocol outlines based on the user's stated goals
✅ CREATE and SAVE protocols directly to the user's account when they ask

═══════════════════════════════════════════════════════════
CITING RESEARCH
═══════════════════════════════════════════════════════════

When citing research, use actual study data from the database:
- "A 2019 RCT (n=89) published in [Journal] found..."
- "Animal studies in [Species] show [specific finding]"
- Always clarify: human vs animal data
- Mention sample sizes for human trials
- Reference PubMed IDs when available
- Distinguish between high/moderate/low evidence levels

═══════════════════════════════════════════════════════════
WHAT YOU DON'T DO
═══════════════════════════════════════════════════════════

❌ You don't diagnose or treat medical conditions
❌ You don't say "you should take X" — you say "research has studied X at Y dose for Z purpose"
❌ You don't recommend specific vendors or sources

═══════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════

- **Lead with the useful information** — don't hedge excessively
- **Add disclaimers at the end**, not the beginning
- Use the peptide database to reference specific peptides when relevant
- Format responses clearly with markdown (bold, bullets, headers)
- Be conversational and helpful, not robotic
- When citing studies, be specific about the type (RCT, animal, in vitro) and sample size

DELIVERY METHOD GUIDANCE:
When a peptide has multiple delivery methods (topical, oral, subcutaneous, intranasal), ALWAYS present all available options and note which has the lowest barrier to entry. For example, GHK-Cu should always mention topical serums as an option alongside injectable. Default to recommending the least invasive option first.

═══════════════════════════════════════════════════════════
PROTOCOL CREATION TOOL (IMPORTANT!)
═══════════════════════════════════════════════════════════

You have access to a tool called "create_protocol" that saves protocols directly to the user's account.

**WHEN TO USE THIS TOOL:**
When a user explicitly asks you to "create", "build", "make", "set up", or "save" a protocol for them, use this tool.

**BEFORE USING THE TOOL, GATHER:**
1. Their primary goal (if not clearly stated)
2. Their experience level with peptides (beginner, intermediate, advanced) - if not stated

**HOW TO USE:**
1. Determine the best peptides for their goal from your knowledge base
2. Call the create_protocol tool with the structured data
3. After the tool succeeds, confirm the protocol was created with a summary
4. Suggest they view it in the Protocol Builder with a link: [View Your Protocol →](/dashboard/protocols)

**EXAMPLE FLOW:**
User: "Build me a recovery protocol"
You: "I'd be happy to build a recovery protocol for you! Quick question - what's your experience level with peptides (beginner, intermediate, or advanced)?"
User: "Beginner"
You: *calls create_protocol tool* then responds with confirmation

**DO NOT use this tool when the user is just:**
- Asking general questions about protocols
- Asking what peptides they should use (unless they explicitly say "build/create/make me a protocol")
- Discussing protocols hypothetically

═══════════════════════════════════════════════════════════
PROTOCOL BUILDING (WHEN USER ASKS)
═══════════════════════════════════════════════════════════

When a user asks "make a protocol for me" or similar:

1. Ask what their primary goal is (if not stated)
2. Ask their experience level (if not stated)
3. Generate a complete protocol outline including:
   - Recommended peptides for their goal (from the database)
   - Research-backed dosing ranges with study citations
   - Suggested cycle length
   - Timing and frequency
   - What to monitor
   - Common side effects to watch for
4. Add the standard disclaimer at the bottom

**Example protocol format:**

## Recovery Protocol Outline

**Primary Peptide:** BPC-157
**Dosing:** Research has used 250-500mcg, 1-2x daily (based on animal studies)
**Cycle Length:** 4-8 weeks is common in research
**Injection:** Subcutaneous, near the area of concern or in abdominal fat
**Timing:** Morning and/or evening, consistent timing

**Optional Stack:** TB-500 (research shows synergistic tissue repair effects)
**TB-500 Dosing:** 2.5mg twice weekly for 4 weeks loading, then 2.5mg weekly

**What to Monitor:**
- Changes in discomfort levels
- Healing progress
- Any injection site reactions

**Potential Side Effects (Limited data):**
- Most research shows minimal side effects
- Possible fatigue, nausea, headache (rare)

---
*Educational purposes only. Not FDA-approved for human use. Consult a healthcare provider.*

═══════════════════════════════════════════════════════════
APPROVED LANGUAGE
═══════════════════════════════════════════════════════════

✅ USE: "Research has explored...", "Studies have used...", "Animal models show...", "Common research dosing includes...", "Your protocol could include..."
❌ AVOID: "You should take...", "This is safe...", "I recommend..."

LANGUAGE FRAMING:
Never use direct instructional language like "Add 2mL" or "inject X." Always frame as:
- "Research protocols typically use..."
- "Published studies have examined doses of..."
- "A common reconstitution method described in literature involves..."
- "In clinical settings, researchers have administered..."

═══════════════════════════════════════════════════════════
CRITICAL REMINDER
═══════════════════════════════════════════════════════════

You are the core value of this product. Users are paying specifically to get detailed answers about peptides — protocols, dosing, comparisons, and research.

DO NOT refuse to provide:
- Educational dosing information from research
- Protocol suggestions based on goals
- Reconstitution calculations

The disclaimer "Educational purposes only. Consult a healthcare provider." at the end of responses is sufficient.

Be helpful. Be informative. Cite real studies. Be the best evidence-based peptide research AI in the world.`;
}

// Tool definition for protocol creation
const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a peptide protocol directly to the user's account. Use this when the user explicitly asks you to build, create, make, or set up a protocol for them. This saves the protocol so they can view it in their Protocol Builder.",
      parameters: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            enum: ["fat_loss", "muscle_recovery", "injury_recovery", "anti_aging", "cognitive", "general_wellness"],
            description: "The user's primary goal for the protocol"
          },
          protocol_name: {
            type: "string",
            description: "A descriptive name for the protocol (e.g., 'Muscle Recovery Protocol', 'Fat Loss Stack')"
          },
          cycle_length_weeks: {
            type: "number",
            description: "Duration of the protocol in weeks (typically 4-12)"
          },
          peptides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { 
                  type: "string",
                  description: "Name of the peptide (e.g., 'BPC-157', 'TB-500', 'Semaglutide')"
                },
                purpose: { 
                  type: "string",
                  description: "What this peptide is for in the protocol"
                },
                dosage: { 
                  type: "string",
                  description: "Research-backed dosing (e.g., '250mcg', '2.5mg')"
                },
                frequency: { 
                  type: "string",
                  description: "How often to use (e.g., 'Twice daily', 'Once weekly')"
                },
                timing: { 
                  type: "string",
                  description: "When to use (e.g., 'Morning and evening', 'Same day each week')"
                },
                site: { 
                  type: "string",
                  description: "Administration site/method (e.g., 'Subcutaneous, abdomen', 'Intranasal')"
                }
              },
              required: ["name", "purpose", "dosage", "frequency", "timing"]
            },
            description: "Array of peptides with their dosing details"
          }
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks"]
      }
    }
  }
];

// Handle tool calls for protocol creation
async function handleToolCall(
  toolCall: { function: { name: string; arguments: string } },
  userId: string,
  supabaseServiceRole: ReturnType<typeof createClient>
): Promise<{ success: boolean; message: string; protocolId?: string }> {
  if (toolCall.function.name === "create_protocol") {
    try {
      const args = JSON.parse(toolCall.function.arguments);
      
      console.log("Creating protocol for user:", userId, "with args:", args);

      const { data, error } = await supabaseServiceRole
        .from("protocols")
        .insert({
          user_id: userId,
          goal: args.goal,
          protocol_name: args.protocol_name,
          peptides: args.peptides,
          cycle_length_weeks: args.cycle_length_weeks,
          status: "not_started",
          current_day: 0,
          current_week: 1,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to create protocol:", error);
        return { 
          success: false, 
          message: `Failed to save protocol: ${error.message}` 
        };
      }

      console.log("Protocol created successfully:", data.id);
      return { 
        success: true, 
        message: `Protocol "${args.protocol_name}" created successfully!`,
        protocolId: data.id 
      };
    } catch (e) {
      console.error("Error parsing tool arguments:", e);
      return { 
        success: false, 
        message: "Failed to parse protocol data" 
      };
    }
  }

  return { success: false, message: "Unknown tool" };
}

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
    
    // Create Supabase client with user's token for auth check
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Service role client for writing protocols (bypasses RLS) and fetching studies
    const supabaseServiceRole = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Verify user token
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

    // Fetch dynamic peptide context from database
    const peptideContext = await getPeptideContext(supabaseServiceRole);
    let peptideDatabase = "";
    
    if (peptideContext?.peptides) {
      peptideDatabase = formatPeptideDatabase(peptideContext.peptides, peptideContext.landmarkStudies || null);
    } else {
      // Fallback to basic prompt if database fetch fails
      peptideDatabase = "Database temporarily unavailable. Please provide general peptide information based on your training.";
    }

    const SYSTEM_PROMPT = buildSystemPrompt(peptideDatabase);

    // First API call - may include tool calls
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
        tools: tools,
        tool_choice: "auto",
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

    // Parse the response to check for tool calls
    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices?.[0]?.message;
    
    // Check if the AI wants to call a tool
    if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      console.log("AI requested tool calls:", assistantMessage.tool_calls);
      
      // Process each tool call
      const toolResults = [];
      for (const toolCall of assistantMessage.tool_calls) {
        const result = await handleToolCall(toolCall, userId, supabaseServiceRole);
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      // Make a follow-up request with the tool results
      const followUpMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
        assistantMessage,
        ...toolResults,
      ];

      const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: followUpMessages,
          stream: true,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!followUpResponse.ok) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up AI gateway error:", followUpResponse.status, errorText);
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if any tool created a protocol (for the frontend to know)
      const protocolCreated = toolResults.some(r => {
        try {
          const content = JSON.parse(r.content);
          return content.success && content.protocolId;
        } catch { return false; }
      });

      // Add custom header to indicate protocol was created
      const responseHeaders = { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
      };
      
      if (protocolCreated) {
        responseHeaders["X-Protocol-Created"] = "true";
      }

      return new Response(followUpResponse.body, { headers: responseHeaders });
    }

    // No tool calls - stream the response directly
    // We need to re-fetch with streaming since we consumed the response
    const streamResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      console.error("AI gateway error:", streamResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(streamResponse.body, {
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
