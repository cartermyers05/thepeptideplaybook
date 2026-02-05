

# AI Chat → Protocol Builder Integration

## Overview

Connect the AI Chat to the Protocol Builder so when a user asks "build me a protocol" in the chat, the AI can directly create and save a protocol to their account, which automatically appears in the Protocol Builder section.

---

## Architecture Approach

We'll use **AI Function Calling** (tool use) to give the AI the ability to create protocols directly in the database when the user requests one during chat.

```text
User: "Hey, build me a recovery protocol for my shoulder"
         ↓
AI recognizes protocol request → calls create_protocol tool
         ↓
Edge function inserts protocol into database
         ↓
AI responds with confirmation + protocol details
         ↓
User navigates to Protocol Builder → sees new protocol ready
```

---

## Changes Required

### 1. Update Chat Edge Function with Function Calling

**File:** `supabase/functions/chat/index.ts`

Add a "tool" definition for `create_protocol` that the AI can call:

| Tool | Description | Parameters |
|------|-------------|------------|
| `create_protocol` | Creates a peptide protocol based on user's stated goal | `goal` (string), `protocol_name` (string), `peptides` (array), `cycle_length_weeks` (number) |

The AI will:
1. Gather the user's goal and preferences through conversation
2. Decide which peptides to include based on its knowledge
3. Call the `create_protocol` tool with structured data
4. Return a confirmation message to the user

### 2. Add Protocol Creation Logic to Edge Function

When the AI calls the tool, the edge function will:
1. Parse the tool call arguments
2. Insert the protocol into the `protocols` table for that user
3. Return success/failure to the AI
4. AI then confirms to the user with a link to view their protocol

### 3. Update System Prompt

Add instructions telling the AI when and how to use the protocol creation tool:

```text
PROTOCOL CREATION TOOL:
When a user explicitly asks you to "create", "build", "make", or "set up" a protocol for them:
1. Gather their primary goal (if not stated)
2. Gather experience level (if not stated)
3. Use the create_protocol tool to save it directly to their account
4. Confirm the protocol was created and suggest they view it in the Protocol Builder

Only use this tool when the user clearly wants you to CREATE a protocol for them, not just discuss protocols in general.
```

### 4. Invalidate Protocol Query After Creation

**File:** `src/components/dashboard/ChatInterface.tsx`

After a successful chat response, check if a protocol was created and invalidate the protocol query so it refreshes automatically.

---

## Technical Details

### Tool Definition (OpenAI Function Calling Format)

```typescript
const tools = [
  {
    type: "function",
    function: {
      name: "create_protocol",
      description: "Create and save a peptide protocol to the user's account. Use this when the user explicitly asks to build/create/make a protocol for them.",
      parameters: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            enum: ["fat_loss", "muscle_recovery", "injury_recovery", "anti_aging", "cognitive", "general_wellness"],
            description: "The user's primary goal"
          },
          protocol_name: {
            type: "string",
            description: "A descriptive name for the protocol"
          },
          cycle_length_weeks: {
            type: "number",
            description: "Duration of the protocol in weeks"
          },
          peptides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                purpose: { type: "string" },
                dosage: { type: "string" },
                frequency: { type: "string" },
                timing: { type: "string" },
                site: { type: "string" }
              },
              required: ["name", "purpose", "dosage", "frequency", "timing"]
            },
            description: "Array of peptides with dosing details"
          }
        },
        required: ["goal", "protocol_name", "peptides", "cycle_length_weeks"]
      }
    }
  }
];
```

### Protocol Insert in Edge Function

```typescript
// When AI calls the create_protocol tool
if (toolCall.function.name === "create_protocol") {
  const args = JSON.parse(toolCall.function.arguments);
  
  const { data, error } = await supabase
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
    
  // Return result to AI for confirmation message
}
```

---

## User Experience Flow

1. **User in AI Chat**: "Hey, build me a protocol for muscle recovery"

2. **AI responds**: "I'd be happy to build a muscle recovery protocol for you! Let me ask a couple quick questions:
   - What's your experience level with peptides (beginner, intermediate, or advanced)?
   - Any preferences like avoiding injections or budget constraints?"

3. **User**: "I'm a beginner, no constraints"

4. **AI creates protocol via tool call and responds**: 
   "Done! I've created a **Muscle & Recovery Protocol** for you. Here's what's included:
   
   **BPC-157** - 250mcg twice daily for tissue repair
   **TB-500** - 2.5mg twice weekly for systemic healing
   
   *8-week cycle*
   
   **[View Your Protocol →](/dashboard/protocols)**
   
   Would you like me to explain anything about this protocol?"

5. **User clicks link or navigates to Protocol Builder** → Protocol is already there, ready to start

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `supabase/functions/chat/index.ts` | Add function calling with `create_protocol` tool, handle tool execution, use service role for DB writes |
| `src/components/dashboard/ChatInterface.tsx` | Add protocol query invalidation after chat to refresh protocol state |

---

## Benefits

- **Seamless experience**: Users can stay in the chat and get a protocol created instantly
- **Smart AI**: AI can ask clarifying questions before creating the protocol
- **Customizable**: AI can create protocols with any peptide combination, not just the fixed templates
- **Synced state**: Protocol appears immediately in the Protocol Builder after creation

