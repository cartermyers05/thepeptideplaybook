

# Conversational AI Quiz Onboarding

## Overview

Transform the current static quiz (clickable cards) into an **AI-powered conversational onboarding** experience. Instead of picking from pre-defined options, users chat with an AI that asks questions, listens to their answers, and progressively builds their personalized course in real-time.

**Core Experience**: Each "step" of the quiz is a conversation with the AI. The AI asks a question, the user types a natural response, and the AI extracts the relevant information while responding in a warm, personalized way.

---

## User Flow

```text
Step 0: Welcome
├── AI: "Hey! I'm going to build you a personalized peptide course. 
│        But first, I need to understand what you're looking for. 
│        What's your main goal - what are you hoping peptides can help with?"
│
Step 1: Goal Discovery (Conversational)
├── User types: "I want to lose some stubborn belly fat"
├── AI: "Got it - fat loss is a great goal! A lot of people come here 
│        for that exact reason. Quick question - have you ever used 
│        peptides before, or would this be your first time?"
│
Step 2: Experience Level (Conversational)
├── User types: "Never, this is completely new to me"
├── AI: "No problem at all - we built this course specifically for 
│        beginners. One thing I want to address upfront: what worries 
│        you most about starting? Is it the injections, the dosing, 
│        or something else?"
│
Step 3: Biggest Concern (Conversational)
├── User types: "honestly the needles scare me a bit"
├── AI: "Totally normal! Most people feel that way at first. Your 
│        course will include a step-by-step injection guide that makes 
│        it way less scary. Last question - when are you thinking of 
│        starting? This week, this month, or still researching?"
│
Step 4: Timeline (Conversational)
├── User types: "probably this month once I get supplies"
├── AI: "Perfect. Let me build your course..."
│
Step 5: Course Building Animation
├── Show: "Analyzing your goals... Selecting peptides... Creating lessons..."
├── Real-time display of extracted info:
│   • Goal: Fat Loss ✓
│   • Experience: Beginner ✓
│   • Concern: Injections ✓
│   • Timeline: This month ✓
│
Step 6: Email Capture
├── AI: "Your Fat Loss Course is ready! 🎉 Enter your email to see 
│        your personalized protocol and start learning."
│
└── Redirect to /course/fat-loss preview
```

---

## Technical Architecture

### New Edge Function: `supabase/functions/quiz-chat/index.ts`

**Purpose**: Handle the conversational flow with structured output extraction

**Flow per message**:
1. Receive user message + current step + conversation history
2. Call Lovable AI with a step-specific system prompt
3. AI returns:
   - `response`: The conversational reply to show the user
   - `extracted_value`: The structured value extracted (e.g., `fat_loss`)
   - `confidence`: How confident the AI is in the extraction
   - `move_to_next`: Boolean - should we advance to next step?
4. Return response + update quiz state

**System Prompt Structure**:
```text
You are a friendly onboarding assistant for Peptide Playbook. Your job 
is to have a natural conversation while extracting specific information.

CURRENT STEP: Goal Discovery
VALID VALUES: fat_loss, muscle, recovery, anti_aging, cognitive, beginner
QUESTION TO ASK: What's your main goal with peptides?

Your response MUST include:
1. A warm, conversational reply (2-3 sentences)
2. A natural transition to the next question
3. Extraction of their answer into one of the valid values

If their answer is unclear, ask a clarifying question instead of guessing.

Return JSON:
{
  "response": "Your conversational reply...",
  "extracted_value": "fat_loss" | null,
  "confidence": 0.9,
  "move_to_next": true | false,
  "next_question": "The question for the next step if moving forward"
}
```

### New Component: `src/components/quiz/ConversationalQuiz.tsx`

**UI Structure**:
```text
┌─────────────────────────────────────────────────────────────────┐
│  Progress: Step 2 of 5                                          │
│  ████████████░░░░░░░░░░░░░░░░░░                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Bot Avatar]                                                   │
│  "Hey! I'm going to build you a personalized peptide course.    │
│   What's your main goal - what are you hoping peptides can      │
│   help with?"                                                   │
│                                                                 │
│                                    "I want to burn fat and     │
│                                     get more energy" [User]    │
│                                                                 │
│  [Bot Avatar]                                                   │
│  "Fat loss is a great goal! Quick question - have you ever     │
│   used peptides before?"                                       │
│  [Typing indicator...]                                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [Text input: "Type your answer..."]              [Send →]     │
└─────────────────────────────────────────────────────────────────┘

SIDEBAR (collapsible on mobile):
┌──────────────────────┐
│ Building Your Course │
├──────────────────────┤
│ Goal: Fat Loss ✓     │
│ Experience: ⏳        │
│ Concern: ⏳          │
│ Timeline: ⏳          │
└──────────────────────┘
```

### State Machine for Quiz Steps

```text
interface QuizStep {
  id: string;
  question: string;
  validValues: string[];
  valueKey: 'goal' | 'experience' | 'concern' | 'timeline';
  systemPromptAddition: string;
}

const quizSteps: QuizStep[] = [
  {
    id: 'goal',
    question: "What's your main goal with peptides?",
    validValues: ['fat_loss', 'muscle', 'recovery', 'anti_aging', 'cognitive', 'beginner'],
    valueKey: 'goal',
    systemPromptAddition: `Map their response to one of these goals:
      - fat_loss: weight loss, burning fat, metabolism, body composition
      - muscle: building muscle, recovery from workouts, strength, gains
      - recovery: injury healing, surgery recovery, pain, tissue repair
      - anti_aging: longevity, skin, vitality, aging, youthfulness
      - cognitive: focus, memory, brain, clarity, mental performance
      - beginner: unsure, exploring, don't know, general wellness`
  },
  {
    id: 'experience',
    question: "Have you used peptides before?",
    validValues: ['beginner', 'some_experience', 'experienced'],
    valueKey: 'experience',
    systemPromptAddition: `Determine their experience level:
      - beginner: never used, first time, no experience
      - some_experience: tried once or twice, not confident
      - experienced: multiple cycles, knows basics, regular user`
  },
  // ... more steps
];
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/quiz-chat/index.ts` | Edge function for conversational quiz AI |
| `src/components/quiz/ConversationalQuiz.tsx` | Main chat-based quiz component |
| `src/components/quiz/QuizMessage.tsx` | Individual message bubble component |
| `src/components/quiz/QuizProgressSidebar.tsx` | Side panel showing extracted values |
| `src/components/quiz/BuildingAnimation.tsx` | Final "building course" animation |
| `src/hooks/useQuizChat.ts` | Hook for managing quiz conversation state |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Quiz.tsx` | Replace static steps with ConversationalQuiz |
| `supabase/config.toml` | Add quiz-chat function configuration |

---

## Edge Function Implementation Details

### Request/Response Format

**Request**:
```typescript
{
  message: string;           // User's typed message
  currentStep: number;       // 0-4
  conversationHistory: {     // Previous messages
    role: 'user' | 'assistant';
    content: string;
  }[];
  extractedValues: {         // What we've collected so far
    goal: string | null;
    experience: string | null;
    concern: string | null;
    timeline: string | null;
  };
}
```

**Response**:
```typescript
{
  response: string;          // AI's conversational reply
  extracted: {
    key: string;             // 'goal', 'experience', etc.
    value: string | null;    // The extracted value
    confidence: number;      // 0-1
  } | null;
  shouldAdvance: boolean;    // Move to next step?
  isComplete: boolean;       // All steps done?
}
```

### AI Tool Calling for Extraction

Use structured output via tool calling to ensure reliable extraction:

```typescript
const tools = [{
  type: "function",
  function: {
    name: "extract_quiz_answer",
    description: "Extract the user's answer into a structured format",
    parameters: {
      type: "object",
      properties: {
        response: { 
          type: "string", 
          description: "Your conversational reply to the user" 
        },
        extracted_value: { 
          type: "string", 
          enum: currentStep.validValues,
          description: "The extracted value from their answer"
        },
        confidence: { 
          type: "number", 
          description: "Confidence in extraction (0-1)" 
        },
        should_advance: { 
          type: "boolean", 
          description: "Should we move to the next question?" 
        }
      },
      required: ["response", "should_advance"]
    }
  }
}];
```

---

## UI Component Details

### ConversationalQuiz.tsx

**State**:
```typescript
interface QuizState {
  currentStep: number;
  messages: Message[];
  extractedValues: {
    goal: string | null;
    experience: string | null;
    concern: string | null;
    timeline: string | null;
  };
  isLoading: boolean;
  isBuilding: boolean;  // Final animation phase
  email: string;
}
```

**Key Features**:
- Chat bubbles with typing animation
- AI responses stream in with typewriter effect
- Side panel shows "Building Your Course" with checkmarks as values are extracted
- Smooth transitions between steps
- Mobile-responsive (sidebar becomes collapsed drawer)

### Message Styling

```text
AI Messages:
- Left-aligned
- Avatar with bot icon
- Light background
- Typewriter animation on new messages

User Messages:
- Right-aligned  
- Primary color background
- No avatar (or user avatar)
- Instant display

Suggested Responses (optional enhancement):
- Show 2-3 clickable chips for common answers
- "Fat loss", "Muscle building", "Injury recovery"
- Clicking auto-fills and sends
```

---

## Special Handling

### Clarification Flow

If the AI can't confidently extract a value:

```text
User: "I just want to feel better"
AI: "I hear you! Can you tell me a bit more about what 'feeling better' 
     means for you? Are you looking to have more energy, recover from 
     something specific, or maybe something else?"
→ Don't advance, ask for clarification
```

### Off-Topic Handling

```text
User: "Where can I buy peptides?"
AI: "Great question, but I can't recommend specific vendors. Let's focus 
     on building your course first - we can talk sourcing later! So, 
     what's your main goal with peptides?"
→ Don't advance, redirect to question
```

### Quick Answers

Still allow quick selection for users who prefer it:

```text
Below the chat input, show:

Quick answers:
[Fat Loss] [Build Muscle] [Heal Injury] [Anti-Aging] [Cognitive] [Not Sure]
```

---

## Final Animation Sequence

After all 4 questions answered:

```text
1. AI says: "Perfect! Let me build your personalized course..."

2. Chat area transitions to full-screen building animation:
   
   ┌─────────────────────────────────────────┐
   │         Building Your Course...         │
   │                                         │
   │  ✓ Goal: Fat Loss                       │
   │  ✓ Experience: Beginner                 │
   │  ✓ Addressing: Injection anxiety        │
   │  ✓ Timeline: This month                 │
   │                                         │
   │  [Progress bar animating...]            │
   │                                         │
   │  ⏳ Selecting optimal peptides...       │
   │  ⏳ Creating 8-week program...          │
   │  ⏳ Personalizing lessons...            │
   └─────────────────────────────────────────┘

3. After 3-4 seconds, show email capture:
   
   ┌─────────────────────────────────────────┐
   │     🎉 Your Fat Loss Course is Ready!   │
   │                                         │
   │  8 weeks · Semaglutide · Beginner-      │
   │  friendly · Injection guide included    │
   │                                         │
   │  [Email input field]                    │
   │  □ Send me weekly peptide research      │
   │                                         │
   │  [See My Course →]                      │
   └─────────────────────────────────────────┘

4. On submit → Save to database → Redirect to /course/fat-loss
```

---

## Implementation Order

1. **Edge function** - Create `quiz-chat` with tool calling for extraction
2. **useQuizChat hook** - State management and API calls
3. **QuizMessage component** - Chat bubble styling
4. **ConversationalQuiz component** - Main chat UI
5. **QuizProgressSidebar** - Side panel with extracted values
6. **BuildingAnimation** - Final course building animation
7. **Update Quiz.tsx** - Replace static quiz with new conversational flow
8. **Testing** - End-to-end flow verification

---

## Success Criteria

- [ ] User can type natural language and AI extracts structured values
- [ ] Conversation feels natural, not robotic
- [ ] AI asks clarifying questions when answers are unclear
- [ ] Progress sidebar shows checkmarks as values are collected
- [ ] Building animation plays after all questions answered
- [ ] Email capture works and saves quiz response
- [ ] Redirect to correct /course/:goal page
- [ ] Mobile responsive with good UX
- [ ] Streaming responses for natural feel

