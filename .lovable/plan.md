

# Shorten Demo AI Responses

## The Problem

The chatbot demo responses are too long and detailed. Users want quick, summarized answers that give them a taste of the AI's capabilities without overwhelming them.

## Solution

Update the system prompt and reduce `max_tokens` to force shorter, summary-style responses.

## Changes Required

### File: `supabase/functions/chat-demo/index.ts`

**1. Update System Prompt** - Add explicit instructions to keep responses brief:

```text
Current style: Full explanations with context
New style: 2-3 sentence summaries with key takeaway
```

**2. Reduce max_tokens** - Change from 1000 to 300 to enforce brevity

### Updated System Prompt Approach

Add these constraints to the prompt:
- Keep responses to 2-3 sentences maximum
- Lead with the direct answer
- Use bullet points only for quick lists (max 3 items)
- End with a teaser: "Want to learn more? Get full access."
- No lengthy explanations or context

### Example Response Comparison

**Current (too long):**
> "Semaglutide (Ozempic, Wegovy) is FDA APPROVED for Type 2 diabetes and weight management. It works by mimicking GLP-1, a hormone that regulates appetite and blood sugar. Clinical trials showed significant weight loss results of 15-20% body weight. The FDA approved it in 2021 for chronic weight management... [continues for several paragraphs]"

**New (summary):**
> "Yes! **Semaglutide** (Ozempic/Wegovy) and **Tirzepatide** (Mounjaro/Zepbound) are FDA-approved for weight management. Both have strong clinical evidence for 15-20% weight loss. Want the full breakdown? Get access below."

## Technical Changes

| Setting | Current | New |
|---------|---------|-----|
| max_tokens | 1000 | 300 |
| Prompt style | Detailed explanations | Brief summaries |
| Response length | 4-6 paragraphs | 2-3 sentences |

