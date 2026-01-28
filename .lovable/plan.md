
# Fix: Compliance Modal Cut-Off and Button Visibility

## Problem Analysis

The "Before You Begin" compliance modal is being cut off at the bottom, hiding the "I Understand - Continue" button. This happens because:

1. The Dialog component uses `top-[50%] translate-y-[-50%]` centering, which can push tall content off the bottom of the viewport
2. The modal has no max-height constraint to prevent it from exceeding viewport height
3. No scroll behavior is enabled for overflow content
4. The `glass-panel` class applies `overflow-hidden`, which clips content

---

## Solution

Add proper viewport constraints and scroll behavior to the modal:

### Changes to `src/components/dashboard/ComplianceModal.tsx`

1. **Add max-height and overflow handling** to DialogContent
2. **Ensure the button stays visible** with proper flex layout
3. **Add safe area padding** for mobile devices

```tsx
// Current problematic className:
<DialogContent className="sm:max-w-md [&>button]:hidden glass-panel border-0 overflow-hidden">

// Fixed className:
<DialogContent className="sm:max-w-md [&>button]:hidden glass-panel border-0 max-h-[90vh] overflow-y-auto">
```

### Structural Changes

Wrap the scrollable content in a container while keeping the button fixed at the bottom:

```tsx
<DialogContent className="sm:max-w-md [&>button]:hidden glass-panel border-0 flex flex-col max-h-[85vh]">
  {/* Background effects */}
  
  {/* Scrollable content area */}
  <div className="flex-1 overflow-y-auto">
    <DialogHeader>...</DialogHeader>
    <div className="space-y-4 py-4">...</div>
  </div>
  
  {/* Fixed button at bottom */}
  <motion.div className="pt-4 border-t border-border/20">
    <Button>I Understand - Continue</Button>
  </motion.div>
</DialogContent>
```

---

## File Changes

**Modified: `src/components/dashboard/ComplianceModal.tsx`**

- Add `max-h-[85vh]` to constrain modal height
- Add `flex flex-col` for proper layout
- Remove `overflow-hidden` (conflicts with scrolling)
- Wrap header and checkboxes in scrollable container
- Keep button outside scrollable area so it's always visible
- Add subtle border separator above button

---

## Expected Result

After this fix:
- Modal will never exceed 85% of viewport height
- Content area scrolls if needed on small screens
- Button always remains visible and clickable
- Glass panel styling preserved
- Works on all screen sizes including mobile

