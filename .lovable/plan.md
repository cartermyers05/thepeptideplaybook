
# Add Interactive Chatbot Demo to Landing Page

## Overview

Create a new `ChatbotDemo` component that allows visitors to ask **one free question** from a predefined list, receive a real AI response streamed from the backend, and then see a soft paywall prompting them to purchase.

---

## Placement

The demo will be inserted **after AgitationSection** and **before SolutionSection** in `src/pages/Index.tsx`:

```text
HeroSection
ProblemSection
AgitationSection
↓
NEW: ChatbotDemo  ← Insert here
↓
SolutionSection
ProductPreview
...
```

---

## New Component: `src/components/landing/ChatbotDemo.tsx`

### Structure

```text
┌─────────────────────────────────────────────────────────────┐
│  Section Header                                             │
│  "See What Peptide Playbook AI Can Do"                      │
│  "Ask one question free. Pick a topic below."               │
├─────────────────────────────────────────────────────────────┤
│  4 Question Buttons (styled to match brand)                 │
│  • "What peptides are actually FDA approved?"               │
│  • "Are peptides safe to use?"                              │
│  • "What's the best peptide for fat loss?"                  │
│  • "How do I know if a peptide source is legit?"            │
├─────────────────────────────────────────────────────────────┤
│  Chat Interface (appears after selection)                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  User question bubble                                   ││
│  │  AI response bubble (streamed with markdown)            ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Paywall Card (appears after response completes)            │
│  "Want to keep exploring?"                                  │
│  "Unlock unlimited questions + the complete guide"          │
│  [Get Full Access — $67]                                    │
└─────────────────────────────────────────────────────────────┘
```

### Functionality

1. **Initial State**: Show 4 question buttons, no chat visible
2. **On Question Click**:
   - Check localStorage for `demo-question-used`
   - If already used → Show paywall immediately, skip API call
   - If not used → Add question as user message, call chat API, stream response
3. **API Call**: Use the existing `chat` edge function via `supabase.functions.invoke()`
4. **Streaming**: Parse SSE stream same as `ChatWidget.tsx` does
5. **After Response**: 
   - Set `localStorage.setItem("demo-question-used", "true")`
   - Show paywall card below the response
6. **Subsequent Clicks**: If user clicks another question → Paywall immediately

### State Management

```typescript
const [hasUsedQuestion, setHasUsedQuestion] = useState(false);
const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
const [response, setResponse] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showPaywall, setShowPaywall] = useState(false);

// On mount: check localStorage
useEffect(() => {
  const used = localStorage.getItem("demo-question-used") === "true";
  setHasUsedQuestion(used);
}, []);
```

---

## Styling

- Use existing `glass-card` class for the chat container
- Question buttons: `bg-muted hover:bg-primary/10` with purple border on hover
- Chat bubbles: Match `ChatWidget.tsx` styling
  - User: `bg-primary text-primary-foreground rounded-2xl rounded-br-sm`
  - AI: `bg-muted rounded-2xl rounded-bl-sm` with ReactMarkdown
- Paywall card: Gradient border with primary color accent

---

## Files to Create/Modify

### 1. Create: `src/components/landing/ChatbotDemo.tsx`

New component with:
- Section wrapper with id="demo" for anchor links
- Headline and subheadline
- 4 question buttons (grid layout)
- Chat interface (hidden until question selected)
- Paywall card (hidden until response complete or question already used)
- Integration with chat edge function
- localStorage persistence

### 2. Modify: `src/pages/Index.tsx`

- Import `ChatbotDemo`
- Insert `<ChatbotDemo />` after `<AgitationSection />` and before `<SolutionSection />`

---

## Technical Details

### Chat API Integration

```typescript
const handleQuestionClick = async (question: string) => {
  // Check if already used
  if (hasUsedQuestion) {
    setShowPaywall(true);
    return;
  }

  setSelectedQuestion(question);
  setIsLoading(true);

  try {
    const response = await supabase.functions.invoke("chat", {
      body: { messages: [{ role: "user", content: question }] },
    });

    if (response.error) throw response.error;

    // Stream the response
    const reader = response.data.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || "";
            fullContent += content;
            setResponse(fullContent);
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }

    // Mark as used
    localStorage.setItem("demo-question-used", "true");
    setHasUsedQuestion(true);
    setShowPaywall(true);
  } catch (error) {
    console.error("Demo chat error:", error);
    setResponse("Sorry, something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

### Predefined Questions

```typescript
const DEMO_QUESTIONS = [
  "What peptides are actually FDA approved?",
  "Are peptides safe to use?",
  "What's the best peptide for fat loss?",
  "How do I know if a peptide source is legit?",
];
```

### Paywall Component

```tsx
{showPaywall && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
  >
    <h4 className="text-lg font-semibold mb-1">Want to keep exploring?</h4>
    <p className="text-muted-foreground text-sm mb-4">
      Unlock unlimited questions + the complete guide
    </p>
    <Link to="/signup" className="relative z-10">
      <Button className="btn-primary-clean">
        Get Full Access — $67
      </Button>
    </Link>
  </motion.div>
)}
```

---

## Animations

- Section fade-in on scroll (using framer-motion viewport animation)
- Question buttons: subtle hover scale effect
- Chat messages: fade-in animation
- Paywall: slide up + fade in after response completes
- Loading state: bouncing dots animation (same as ChatWidget)
