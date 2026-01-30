

# Enhance Hero Demo with Chat Bubbles

## Current Issue

The HeroDemo component looks bare because the AI response area displays raw markdown text without a chat bubble wrapper, making it feel incomplete compared to a real chat interface.

## Visual Changes

```text
Current Layout:
┌──────────────────────────────────┐
│ 🤖 Peptide Playbook AI           │  ← Header looks plain
├──────────────────────────────────┤
│            [User question] →     │  ← Has bubble ✓
│                                  │
│ 🤖 Raw text here without         │  ← Missing bubble wrapper
│    any background...             │
│                                  │
│ ● ○ ○                           │
└──────────────────────────────────┘

Enhanced Layout:
┌──────────────────────────────────┐
│ 🤖 Peptide Playbook AI  ● Ready  │  ← Status indicator added
├──────────────────────────────────┤
│            [User question] →     │  ← Keeps bubble
│                                  │
│ 🤖 ┌─────────────────────────┐   │  ← Muted background bubble
│    │ Several peptides have   │   │
│    │ full FDA approval:      │   │
│    │ ✅ Semaglutide...       │   │
│    └─────────────────────────┘   │
│                                  │
│ [Ask about any peptide... ✈️]    │  ← Fake input field
│                                  │
│ ● ○ ○                           │
└──────────────────────────────────┘
```

---

## Technical Changes

### 1. Enhanced Header
Add a pulsing green status dot with "Ready to help" text below the title, matching the AIAssistant component style.

### 2. AI Response Bubble
Wrap the AI response in a styled muted background bubble with rounded corners, similar to how the AIAssistant component does it.

### 3. Add Fake Input Field
Include a disabled input field with placeholder text and send icon at the bottom, making it feel like a complete chat interface.

### 4. Visual Polish
- Add subtle breathing animation to the bot icon
- Improve spacing and padding consistency
- Better visual hierarchy with the bubble backgrounds

---

## File to Modify

| File | Change |
|------|--------|
| `src/components/landing/HeroDemo.tsx` | Add chat bubble styling, status indicator, and fake input field |

---

## Specific Code Changes

**Header Enhancement:**
- Add secondary line with green pulse dot and "Ready to help" text
- Add subtle scale animation to the bot icon

**AI Response Area:**
- Wrap `ReactMarkdown` content in a `bg-muted rounded-2xl rounded-bl-sm px-4 py-3` container
- This creates a proper chat bubble appearance for the AI response

**New Input Field:**
- Add a disabled input with `bg-muted/50 rounded-xl` styling
- Include a Send icon on the right
- Placeholder: "Ask about any peptide..."

This will transform the bare demo into a polished, professional-looking chat interface that immediately conveys the product's value.

