

# Add Logo Pattern to Login Page

A single small change to `src/pages/Login.tsx`:

## Change

### `src/pages/Login.tsx`
- Import the existing `LogoPattern` component from `@/components/brand/LogoPattern`
- Add `<LogoPattern />` alongside the existing background layers (after `FloatingOrbs`, `GridPattern`, and the gradient overlay)
- No other changes needed — the login page already has the glass card, animated backgrounds, and proper z-indexing

This is a one-line import and one-line JSX addition. Everything else stays the same.

