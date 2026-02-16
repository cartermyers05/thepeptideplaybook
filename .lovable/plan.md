
# Unified AI Entity -- Site-Wide Intelligence Layer

## Overview

This plan adds a unified AI "brain" across the entire Peptide Playbook product. Rather than having separate, disconnected AI functions with duplicated prompts, we create a single shared intelligence layer that powers every AI touchpoint consistently. The AI acts as a single entity -- the "Peptide Playbook Intelligence" -- ensuring content quality, user assistance, and scientific accuracy everywhere.

## Architecture

The core idea: one shared system prompt and context engine, multiple specialized edge functions that all call through a common utility module.

```text
Shared Layer (supabase/functions/_shared/ai-engine.ts)
  |
  |-- Core identity + safety rules + evidence standards
  |-- Dynamic context loader (peptides DB, user profile, quiz data)
  |-- Response quality validator
  |
  +-- peptide-coach (protocol building + coaching)
  +-- chat (research assistant, streaming)
  +-- chat-demo (public demo, rate-limited)
  +-- quiz-chat (onboarding extraction)
  +-- generate-article (content generation)
  +-- ai-review (NEW: content quality checker)
```

## What Changes

### 1. Create Shared AI Engine Module

**File: `supabase/functions/_shared/ai-engine.ts`**

A single shared module containing:
- **CORE_IDENTITY**: The unified personality, safety rules, evidence rating system, legal status awareness, and banned words list -- currently duplicated across `chat/index.ts`, `coach/index.ts`, and `peptide-coach/index.ts`
- **buildContextBlock()**: Reusable function that fetches user profile, quiz data, active protocol, and recent logs from the database
- **callLovableAI()**: Wrapper around the Lovable AI Gateway call with standardized error handling for 429/402, consistent model selection, and logging
- **validateResponse()**: Post-processing function that checks AI output for banned words ("comprehensive", "leverage", etc.), ensures safety disclaimers are present, and verifies evidence ratings are used
- **formatPeptideDatabase()**: Moved from `chat/index.ts` -- reusable peptide context builder

This eliminates ~300 lines of duplicated prompt text across 3 edge functions.

### 2. Upgrade Peptide Coach (Protocol Builder)

**File: `supabase/functions/peptide-coach/index.ts`**

- Import shared `CORE_IDENTITY`, `callLovableAI`, `buildContextBlock` from `_shared/ai-engine.ts`
- Add streaming support (currently returns full response, not streamed)
- Add response validation via `validateResponse()` before returning
- Upgrade model to `google/gemini-2.5-flash` for better reasoning on protocol generation
- Keep protocol-specific additions (YOUR PROTOCOL: marker, compound/schedule formatting)

### 3. Upgrade Research Chat (Dashboard)

**File: `supabase/functions/chat/index.ts`**

- Import shared module instead of maintaining its own 400+ line system prompt
- Keep streaming (already works)
- Add `validateResponse()` post-processing to check each streamed response chunk
- Keep peptide database context fetching (already has it) but use shared helper
- Keep protocol creation detection

### 4. Upgrade Coach Function (Legacy)

**File: `supabase/functions/coach/index.ts`**

- Import shared module
- Deduplicate the CORE_RESEARCH_PROMPT (identical to chat's prompt)
- Keep user context injection (check-ins, lessons, course progress)

### 5. New: AI Content Review Function

**File: `supabase/functions/ai-review/index.ts`**

A new edge function that reviews and improves content quality. This acts as the AI "quality layer" across the site:

- **Input**: `{ content: string, content_type: "guide" | "article" | "coach_response" | "protocol", context?: any }`
- **Action**: Uses `google/gemini-2.5-flash` to analyze content for:
  - Scientific accuracy (are claims supported by evidence?)
  - Safety compliance (are disclaimers present? no prescriptive language?)
  - Tone consistency (matches the Peptide Playbook voice?)
  - Evidence ratings (are star ratings used correctly?)
  - Legal status accuracy (2026 FDA status correct?)
  - Banned words check
- **Output**: `{ score: number (0-100), issues: Array<{type, severity, description, suggestion}>, improved_content?: string }`

This function can be called:
- By the article generator to validate generated articles before saving
- By the coach to validate protocol recommendations
- By an admin dashboard to review existing guide content

### 6. Frontend: AI Quality Indicator

**File: `src/components/dashboard/AIQualityBadge.tsx`** (new)

A small badge component shown on AI-generated content:
- Green checkmark: "AI-verified" -- content passed quality checks
- Shows on coach responses, protocol recommendations, and generated articles
- Tapping shows a tooltip: "This response was checked for scientific accuracy and safety compliance"

### 7. Frontend: Smart Context on Every Page

**File: `src/hooks/useAIContext.ts`** (new)

A hook that builds the user's full context for any AI call:
- Active protocol from `user_protocols`
- Recent daily logs
- User profile from `user_profiles`
- Quiz responses
- Current page/section (so the AI knows where the user is)

This replaces the scattered context-building logic currently in `Coach.tsx`, `ChatInterface.tsx`, and the edge functions.

### 8. Coach Page: Streaming Support

**File: `src/pages/dashboard/Coach.tsx`**

Currently the coach uses `supabase.functions.invoke()` which doesn't support streaming. Update to use `fetch()` with SSE parsing (same pattern as `ChatInterface.tsx`) so users see tokens appear in real-time instead of waiting for the full response.

### 9. Update Config

**File: `supabase/config.toml`**

Add the new `ai-review` function:
```toml
[functions.ai-review]
verify_jwt = false
```

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `supabase/functions/_shared/ai-engine.ts` | New | Shared AI identity, context builder, API wrapper, response validator |
| `supabase/functions/peptide-coach/index.ts` | Rewrite | Use shared module, add streaming, add validation |
| `supabase/functions/chat/index.ts` | Refactor | Use shared module, keep streaming, add validation |
| `supabase/functions/coach/index.ts` | Refactor | Use shared module, deduplicate prompt |
| `supabase/functions/chat-demo/index.ts` | Refactor | Use shared identity for consistent voice |
| `supabase/functions/ai-review/index.ts` | New | Content quality review endpoint |
| `src/hooks/useAIContext.ts` | New | Unified context builder hook |
| `src/components/dashboard/AIQualityBadge.tsx` | New | Quality verification badge |
| `src/pages/dashboard/Coach.tsx` | Update | Add streaming support via fetch + SSE |
| `supabase/config.toml` | Update | Add ai-review function config |

## What Does NOT Change

- Database schema (no new tables needed)
- Landing page, guides, blog, articles pages
- Quiz flow
- Navigation structure
- Auth, payments, Stripe integration
- Existing edge function APIs (all remain backward compatible)

## Technical Notes

- The `_shared/` directory is already used in the project (`supabase/functions/_shared/rateLimiter.ts`), so this pattern is established
- All functions continue using `google/gemini-3-flash-preview` by default, with `google/gemini-2.5-flash` for the review function (needs more careful reasoning)
- The quality badge is lightweight -- it doesn't block rendering, it shows after the response is complete
- Streaming in Coach.tsx follows the exact same pattern already proven in ChatInterface.tsx
