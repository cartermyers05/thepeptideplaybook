

# Influencer Promo Code System

## Overview

Create a promo code system that allows influencers to sign up and get **free full access** without going through the checkout flow.

## How It Works

```text
User Flow:
┌──────────────┐     ┌───────────────────┐     ┌─────────────────┐
│  /signup     │     │  Enter promo code │     │  Account created│
│  ?code=VIP25 │ --> │  during signup    │ --> │  tier = member  │
└──────────────┘     └───────────────────┘     │  (skip checkout)│
                                               └─────────────────┘
```

## Database Changes

### New Table: `promo_codes`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| code | text | Unique promo code (e.g., "VIP25", "INFLUENCER50") |
| type | text | "free_access" (grants full membership) |
| max_uses | integer | How many times code can be used (null = unlimited) |
| times_used | integer | Current usage count |
| expires_at | timestamp | Expiration date (null = never expires) |
| is_active | boolean | Enable/disable the code |
| created_at | timestamp | When code was created |

### New Table: `promo_code_redemptions`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| promo_code_id | uuid | Reference to promo_codes |
| user_id | uuid | User who redeemed |
| redeemed_at | timestamp | When they redeemed |

## Frontend Changes

### Signup Page Updates

1. **Accept promo code from URL** - `/signup?code=VIP25`
2. **Show promo code input field** - Users can enter a code if they have one
3. **Validate code on submission** - Check if code is valid via edge function
4. **Skip checkout if valid** - Go directly to dashboard instead of `/checkout`

### UI Addition

Add a collapsible "Have a promo code?" section on the signup page:

```text
┌─────────────────────────────────────┐
│ Have a promo code?                  │
│ ┌─────────────────┐ ┌─────────────┐ │
│ │ Enter code...   │ │   Apply     │ │
│ └─────────────────┘ └─────────────┘ │
│ ✓ Code applied: VIP Access          │
└─────────────────────────────────────┘
```

## Backend Changes

### New Edge Function: `validate-promo-code`

- Accepts a promo code
- Checks if code exists, is active, not expired, and has uses remaining
- Returns validation result and code type

### New Edge Function: `redeem-promo-code`

- Called after successful signup when user has a valid promo code
- Records the redemption
- Updates the user's profile tier to "member"
- Increments the usage count

## Implementation Files

| File | Action |
|------|--------|
| Database migration | **Create** `promo_codes` and `promo_code_redemptions` tables |
| `supabase/functions/validate-promo-code/index.ts` | **Create** - Validate promo codes |
| `supabase/functions/redeem-promo-code/index.ts` | **Create** - Redeem code and upgrade user |
| `src/pages/Signup.tsx` | **Modify** - Add promo code input and logic |
| `supabase/config.toml` | **Modify** - Register new functions |

## Admin Usage

To create a promo code for an influencer, you'll run an SQL query:

```sql
INSERT INTO promo_codes (code, type, max_uses, is_active)
VALUES ('INFLUENCER2025', 'free_access', 1, true);
```

For a code that can be used by multiple people:

```sql
INSERT INTO promo_codes (code, type, max_uses, is_active)
VALUES ('YOUTUBE50', 'free_access', 50, true);
```

## Security Considerations

- Codes are case-insensitive (converted to uppercase)
- Each user can only redeem one promo code
- RLS policies prevent unauthorized access to promo tables
- Only admin can create/manage codes (via database)

