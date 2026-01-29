
# Remove Chatbot from Home Page

## Summary
Remove the floating chat button from the landing page to prevent visitors from accessing the chatbot before purchasing.

---

## Change

**File:** `src/pages/Index.tsx`

Remove the `FloatingChatButton` component:
- Delete the import on line 14
- Delete the component usage on line 40

This keeps the chatbot available for paying users in the dashboard but removes it from the public landing page.

---

## Technical Details

| Line | Action |
|------|--------|
| Line 14 | Remove `import { FloatingChatButton }...` |
| Line 40 | Remove `<FloatingChatButton />` |

Quick, clean removal — the chatbot functionality stays intact for authenticated users elsewhere in the app.
