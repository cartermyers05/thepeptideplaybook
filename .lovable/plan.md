
# Replace Sidebar with Top Navbar for Dashboard

## Overview
Transform the dashboard navigation from a side sidebar to a sleek top navbar with animated button interactions. This will give the dashboard a more modern, app-like feel with smooth transitions when switching between sections.

## Design Concept

### Visual Layout
```text
┌─────────────────────────────────────────────────────────────────┐
│  [Logo: PEPTIDE PLAYBOOK]                    [Avatar ▼] [⚙️]   │
├─────────────────────────────────────────────────────────────────┤
│   [  Dashboard  ]  [  My Course  ]  [  My Plan  ]  [  AI Coach  ]   │
│      ════════                                                   │
│      (active indicator slides between buttons)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      PAGE CONTENT                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Cool Button Interactions
1. **Sliding Pill Indicator**: A background pill slides smoothly to the active tab using Framer Motion's `layoutId` (like the existing TabSwitcher)
2. **Hover Scale**: Buttons scale up slightly on hover with spring animation
3. **Click Ripple**: Subtle press animation (scale down then up)
4. **Icon Animation**: Icon color transitions and slight rotation on hover

## Implementation

### 1. Create New Navbar Component
**New file: `src/components/dashboard/DashboardNavbar.tsx`**

Features:
- Fixed header with logo on the left
- Centered navigation tabs with sliding indicator
- User avatar dropdown and settings on the right
- Uses `motion.div` with `layoutId="dashboard-nav-indicator"` for the sliding pill effect
- `whileHover` and `whileTap` for satisfying micro-interactions
- Responsive: On mobile, only show icons (no labels) in a compact row

Structure:
```tsx
<header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
  {/* Top row: Logo + User actions */}
  <div className="flex items-center justify-between px-6 py-3">
    <Logo />
    <div className="flex items-center gap-2">
      <UserAvatarDropdown />
      <SettingsButton />
    </div>
  </div>
  
  {/* Navigation tabs row */}
  <nav className="flex items-center justify-center gap-1 px-4 pb-3">
    {navItems.map(item => (
      <NavLink>
        <Icon />
        <span>{label}</span>
        {isActive && <motion.div layoutId="nav-pill" />}
      </NavLink>
    ))}
  </nav>
</header>
```

### 2. Update DashboardLayout
**File: `src/components/dashboard/DashboardLayout.tsx`**

Changes:
- Remove `DashboardSidebar` import and usage
- Add new `DashboardNavbar` component
- Remove `md:ml-60` margin that was for sidebar spacing
- Keep `MobileBottomNav` for mobile (it works well on small screens)

### 3. Animation Details

**Sliding Pill Indicator:**
```tsx
{isActive && (
  <motion.div
    layoutId="dashboard-nav-pill"
    className="absolute inset-0 bg-black rounded-full"
    style={{ zIndex: -1 }}
    transition={{ type: "spring", stiffness: 500, damping: 35 }}
  />
)}
```

**Button Hover & Tap:**
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
```

**Icon Micro-animation:**
```tsx
<motion.div
  whileHover={{ rotate: 5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <Icon />
</motion.div>
```

### 4. User Actions Section
The right side of the navbar will include:
- **User Avatar**: Shows first letter of name, opens dropdown on click
- **Dropdown Menu**: Contains Settings and Sign Out options
- Uses existing shadcn DropdownMenu component

## File Changes

### New Files
| File | Purpose |
|------|---------|
| `src/components/dashboard/DashboardNavbar.tsx` | Main navbar component with animated tabs |

### Modified Files
| File | Changes |
|------|---------|
| `src/components/dashboard/DashboardLayout.tsx` | Replace sidebar with navbar, adjust layout |
| `src/components/dashboard/DashboardSidebar.tsx` | Can be deleted or kept for reference |

## Mobile Behavior
- **Keep the existing MobileBottomNav** for phones (it's a proven pattern for mobile apps)
- **Navbar visible on tablets/desktop** only (`hidden md:block`)
- The transition between mobile and desktop navigation will be seamless

## Technical Notes
- Framer Motion's `layoutId` enables the smooth sliding indicator effect
- The `AnimatePresence` wrapper may be needed for enter/exit animations
- Using `NavLink` from react-router-dom (wrapped in motion.div) to track active state
- Spring animations feel more natural than linear easing
