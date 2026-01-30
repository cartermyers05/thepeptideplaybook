

# Hero AI Typing Demo Implementation

## The "Wow Moment" Vision

When visitors land on the page, they'll immediately see the AI answering a compelling peptide question in real-time. The response streams in character-by-character with a typing effect, demonstrating the product's core value within 3 seconds of arrival.

```text
+------------------------------------------+
|           Ask Anything About Peptides    |
|           Get Research Backed Answers    |
|                                          |
|    +----------------------------------+  |
|    | "What peptides are FDA approved?"|  |
|    +----------------------------------+  |
|    |                                  |  |
|    | Several peptides have FDA        |  |
|    | approval:                        |  |
|    |                                  |  |
|    | ✅ Semaglutide (Ozempic, Wego... |  |
|    | ✅ Tirzepatide (Mounjaro)...     |  |
|    |          ▊ (typing cursor)       |  |
|    +----------------------------------+  |
|                                          |
|      [Get Full Access - $67]             |
+------------------------------------------+
```

---

## Technical Architecture

### Option A: Pre-cached Response (Recommended)

Since the demo question is always the same ("What peptides are FDA approved?"), we can pre-cache the response and simulate streaming on the client. This eliminates API calls and rate limit concerns.

**Pros:**
- Zero API costs for demo
- Instant, reliable playback
- No rate limiting issues
- Works even if AI service is down

**Cons:**
- Response is static (but that's fine for a demo)

### Option B: Live API Call

Create a public demo endpoint with strict rate limiting.

**Pros:**
- Fresh, dynamic responses

**Cons:**
- API costs for every visitor
- Rate limit risk under traffic
- Latency on first load

**Recommendation: Option A** - The demo should feel instant and polished. A pre-cached response with realistic typing animation creates a better first impression.

---

## Implementation Steps

### Step 1: Create `HeroDemoCard` Component

A new component that displays a mini chat interface in the hero section:

```typescript
// src/components/landing/HeroDemoCard.tsx

Features:
- Glassmorphism card styled to match design system
- Pre-written question displayed
- AI response that types out on page load (after 1.5s delay)
- Blinking cursor during typing
- Fade-in animation when complete
- Compact design that fits above the CTAs
```

### Step 2: Pre-cache the Demo Response

Store a high-quality, pre-written response that demonstrates the AI's capabilities:

```typescript
const DEMO_RESPONSE = `Several peptides have full FDA approval:

✅ **Semaglutide** (Ozempic, Wegovy) - For diabetes & weight management

✅ **Tirzepatide** (Mounjaro, Zepbound) - Dual GIP/GLP-1 agonist

✅ **Tesamorelin** (Egrifta) - For HIV lipodystrophy

Most other peptides like BPC-157 and TB-500 are **research-only** with no FDA approval for human use.

*Always verify current FDA status before making decisions.*`;
```

### Step 3: Typing Animation Logic

Create a smooth, realistic typing effect:

```typescript
// Typing speed: 20-40ms per character (random for realism)
// Start delay: 1.5s after component mounts
// Cursor blinks during and briefly after typing
// Uses requestAnimationFrame for smooth performance
```

### Step 4: Update HeroSection Layout

Modify the hero section to include the demo card:

```text
Current Layout:
- Headline
- Subheadline  
- Stats row
- CTAs
- Trust signals

New Layout:
- Headline
- Subheadline
- Demo Card (NEW - between subhead and stats)
- Stats row (moved below demo)
- CTAs
- Trust signals
```

---

## File Changes

| File | Action |
|------|--------|
| `src/components/landing/HeroDemoCard.tsx` | Create - New demo card component |
| `src/components/landing/HeroSection.tsx` | Modify - Add HeroDemoCard |
| `src/index.css` | No changes - existing styles work |

---

## Technical Details

### HeroDemoCard Component Structure

```typescript
function HeroDemoCard() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Start typing after 1.5s delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, 1500);
    return () => clearTimeout(startDelay);
  }, []);
  
  // Typing animation
  useEffect(() => {
    if (!hasStarted) return;
    
    let index = 0;
    const typeNextChar = () => {
      if (index < DEMO_RESPONSE.length) {
        setDisplayedText(DEMO_RESPONSE.slice(0, index + 1));
        index++;
        // Random delay for realistic typing
        const delay = 15 + Math.random() * 25;
        setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
      }
    };
    typeNextChar();
  }, [hasStarted]);
  
  return (
    <motion.div className="glass-card max-w-xl mx-auto p-5">
      {/* Question bubble */}
      <div className="flex justify-end mb-3">
        <div className="bg-primary text-primary-foreground rounded-2xl px-4 py-2 text-sm">
          What peptides are FDA approved?
        </div>
      </div>
      
      {/* AI Response */}
      <div className="flex items-start gap-2">
        <Bot className="w-5 h-5 text-primary mt-1" />
        <div className="flex-1 text-sm">
          <ReactMarkdown>{displayedText}</ReactMarkdown>
          {isTyping && <span className="typing-cursor" />}
        </div>
      </div>
    </motion.div>
  );
}
```

### Animation Timing

- Page loads
- Headlines animate in (0-0.5s)
- Subheadline fades in (0.3-0.6s)
- Demo card slides up (0.5-0.8s)
- Typing starts (1.5s mark)
- Full response typed (~4-5s)
- CTAs visible throughout

---

## Visual Polish

1. **Glassmorphism card** - Uses existing `glass-card` class
2. **Bot icon** - Purple icon with subtle glow
3. **Typing cursor** - Uses existing `.typing-cursor::after` CSS
4. **Question bubble** - Styled like chat interface
5. **Responsive** - Stacks nicely on mobile

---

## Performance Considerations

- No API calls = zero latency
- Typing animation uses `setTimeout` (not interval)
- Cleanup on unmount prevents memory leaks
- `ReactMarkdown` only renders visible text

