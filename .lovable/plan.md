

# Add Logo to Navbar

## Current State

The navbar currently displays the brand name as a stacked wordmark:
```
PEPTIDE
PLAYBOOK
```

The `Logo` component exists at `src/components/brand/Logo.tsx` with a rainbow hexagon molecule icon that matches the brand identity.

---

## Proposed Change

Add the logo icon next to the wordmark in a horizontal layout:

```
[hexagon icon]  PEPTIDE
                PLAYBOOK
```

The icon will be vertically centered with the stacked text.

---

## Implementation

### File: `src/components/landing/Navbar.tsx`

1. Import the `Logo` component
2. Modify the logo section to include the icon alongside the wordmark
3. Use `showText={false}` to only render the icon (we keep our custom stacked text)
4. Use `size="md"` for appropriate sizing (32px icon)

### Code Change

```tsx
// Add import at top
import { Logo } from "@/components/brand/Logo";

// Update the logo section (lines 31-47)
<Link to="/" className="flex items-center gap-3">
  <motion.div
    className="flex items-center gap-3"
    whileHover={{ 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" } 
    }}
  >
    {/* Rainbow hexagon logo icon */}
    <Logo showText={false} size="md" />
    
    {/* Stacked wordmark */}
    <div className="flex flex-col">
      <span className="text-lg md:text-xl font-bold tracking-tight uppercase">
        Peptide
      </span>
      <span className="text-lg md:text-xl font-bold tracking-tight uppercase -mt-1">
        Playbook
      </span>
    </div>
  </motion.div>
</Link>
```

---

## Visual Result

The navbar will now show:
- Rainbow hexagon molecule icon (32x32px)
- Gap between icon and text
- Stacked "PEPTIDE" / "PLAYBOOK" wordmark
- Smooth hover lift animation on the entire group

This matches the brand identity with the rainbow gradient logo while maintaining the editorial typography style.

