
# Remove Floating Chat Button from Dashboard

## Change

### `src/pages/dashboard/Home.tsx`
- Remove the import of `FloatingChatButton` from `@/components/dashboard/home/FloatingChatButton`
- Remove the `<FloatingChatButton ... />` JSX line near the bottom of the component
- Remove the `shouldPulse` variable since it's only used by the chat button
- Keep everything else as-is

This is a 3-line deletion. The floating bubble in the bottom-right corner will be gone immediately.
