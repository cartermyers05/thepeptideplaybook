

# Fix Landing Page Chatbot Demo

## The Problem

The "See What Peptide Playbook AI Can Do" demo section is broken because:

1. The `chat` edge function requires authentication AND a paid subscription
2. Landing page visitors (anonymous users) get a 402 error: "Upgrade required - Chat is available for paid members only"
3. Even logged-in free-tier users can't use the demo
4. The ChatbotDemo component catches this error but displays a generic "Sorry, something went wrong" message

## Solution: Create a Dedicated Demo Endpoint

Create a separate `chat-demo` edge function specifically for the landing page demo that:
- Allows unauthenticated requests
- Limits to 1 question per session (tracked by IP or client)
- Has stricter rate limiting to prevent abuse
- Uses the same AI system prompt

```text
Request Flow:
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│  ChatbotDemo    │ --> │  /chat-demo      │ --> │  Lovable AI │
│  (landing page) │     │  (no auth req'd) │     │  Gateway    │
└─────────────────┘     └──────────────────┘     └─────────────┘
        │
        ├── Rate limited by IP
        ├── No paid tier check
        └── Same AI knowledge base
```

---

## Implementation Details

### 1. New Edge Function: `supabase/functions/chat-demo/index.ts`

**Features:**
- No authentication required (open to public)
- Rate limiting: Max 3 requests per IP per hour
- Uses same `SYSTEM_PROMPT` and peptide database
- Shorter max tokens (1000 vs 2000) to save costs
- Returns streaming response like the main chat

**Rate Limiting Strategy:**
- Track requests by IP address using a simple in-memory cache
- Allow 3 requests per IP per hour
- Return 429 with friendly message if exceeded

### 2. Update ChatbotDemo Component: `src/components/landing/ChatbotDemo.tsx`

**Changes:**
- Call `/chat-demo` instead of `/chat`
- Better error handling for specific status codes:
  - 402: Show "Demo limit reached" message
  - 429: Show "Too many requests, please wait"
- Handle the case where user has already used their demo question

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/chat-demo/index.ts` | **Create** - New demo endpoint |
| `src/components/landing/ChatbotDemo.tsx` | **Modify** - Use demo endpoint, improve error handling |

---

## Edge Function Code Structure

```text
chat-demo/index.ts:
├── CORS headers
├── PEPTIDE_DATABASE (same knowledge base)
├── SYSTEM_PROMPT (same prompt)
├── In-memory rate limit map (IP -> timestamps)
├── Rate limit check (3 req/hour/IP)
├── Call Lovable AI Gateway
└── Stream response
```

---

## Error Handling Improvements

| Error Code | User Message |
|------------|--------------|
| 429 | "You've asked too many questions. Please wait a moment and try again." |
| 402 | "Demo limit reached. Get full access to ask unlimited questions!" |
| 500 | "Our AI is taking a break. Please try again in a moment." |

---

## Security Considerations

- Rate limiting prevents abuse
- No database writes (stateless)
- Same content guardrails as paid version
- IP-based tracking (not foolproof but sufficient for demo)
- Short response length cap

