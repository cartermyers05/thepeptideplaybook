

# Comprehensive Security Review

## Executive Summary

Your application has **2 critical**, **7 medium**, and **4 low** priority security findings. The most urgent issues involve **missing admin authorization on admin routes** and **permissive RLS policies** that could allow data manipulation.

---

## Critical Priority Issues

### 1. Admin Routes Lack Role-Based Authorization

**Risk:** Any paying user can access admin functionality

**Location:** `src/App.tsx` lines 60-61

```typescript
<Route path="/admin/generate" element={<ProtectedRoute><ArticleGenerator /></ProtectedRoute>} />
<Route path="/admin/citations" element={<ProtectedRoute><CitationsDashboard /></ProtectedRoute>} />
```

**Problem:** The `ProtectedRoute` component only checks if the user is logged in and has paid (`isPaid`). It does NOT verify if the user has an admin role. Any paying customer can:
- Generate and publish articles
- Access citation analytics data
- Modify published content

**Fix Required:**
- Create an `AdminRoute` component that checks for admin role
- Use the existing `has_role(auth.uid(), 'admin'::app_role)` function
- Wrap admin routes with this new component

---

### 2. Chat Edge Function Has No Authentication

**Risk:** Anyone can use the AI assistant without paying

**Location:** `supabase/functions/chat/index.ts`

**Problem:** The chat function accepts requests from anyone - it doesn't validate the user's authentication token or check their tier. This means:
- Non-paying users can bypass the payment wall
- Bots can abuse the AI API
- No rate limiting per user

**Fix Required:**
- Add JWT validation using `getClaims()`
- Verify user has paid tier before processing
- Add rate limiting based on user ID

---

## Medium Priority Issues

### 3. Leads Table Vulnerable to Spam Attacks

**Risk:** Bots can flood database with fake leads

**Location:** Database table `leads`

```sql
-- Current policy allows anyone to insert
"Anyone can insert leads for signup" WITH CHECK (true)
```

**Problem:** No rate limiting or CAPTCHA verification. Attackers can:
- Fill database with garbage data
- Inflate storage costs
- Corrupt marketing analytics

**Fix Options:**
- Add rate limiting via edge function
- Implement CAPTCHA (hCaptcha/Turnstile)
- Restrict to authenticated users only

---

### 4. Stripe Customer ID Exposed in Profile

**Risk:** Potential for billing manipulation

**Location:** `profiles` table contains `stripe_customer_id`

**Problem:** While RLS restricts users to their own profile, the Stripe customer ID is returned to the frontend. If any auth bug occurs, this could enable billing fraud.

**Fix Required:**
- Create a separate `billing_info` table with admin-only access
- Or create a view that excludes `stripe_customer_id` for client queries

---

### 5. Citation Tracking Has No Authentication

**Risk:** Data pollution and analytics corruption

**Location:** `supabase/functions/track-citation/index.ts`

```sql
-- RLS policy: "Anyone can insert citations"
WITH CHECK (true)
```

**Problem:** Anyone can insert fake citation records, skewing analytics.

**Fix Required:**
- Add request validation (referrer check)
- Consider using a signed token for citation tracking

---

### 6. Permissive RLS INSERT Policies (4 Instances)

**Risk:** Unauthorized data insertion

**Affected Tables:**
- `ai_citations` - Anyone can insert
- `citation_monitoring` - Anyone can insert  
- `leads` - Anyone can insert
- `purchases` - Anyone can insert

**Fix Required:**
- `purchases`: Restrict to service role only (server-side)
- `ai_citations`/`citation_monitoring`: Add validation or rate limiting
- `leads`: Add CAPTCHA or authentication requirement

---

### 7. Leaked Password Protection Disabled

**Risk:** Users can register with compromised passwords

**Location:** Backend auth configuration

**Fix Required:**
- Enable "Leaked Password Protection" in backend settings
- This checks passwords against known breach databases

---

## Low Priority Issues

### 8. Users Cannot Delete Their Own Data

**Risk:** GDPR/privacy compliance issues

**Affected Tables:**
- `messages` - No DELETE policy
- `profiles` - No DELETE policy
- `referrals` - No DELETE policy

**Fix Required:** Add DELETE policies for data subjects

---

### 9. Duplicate RLS Policy on Purchases Table

**Risk:** Maintenance confusion

**Location:** `purchases` table has two identical SELECT policies

**Fix:** Remove duplicate policy

---

### 10. Edge Functions Missing CORS Headers

**Risk:** CORS errors in production

**Location:** `supabase/functions/track-citation/index.ts`

```typescript
// Current - missing extended headers
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
```

**Fix:** Add Supabase client platform headers

---

### 11. Form Input Validation Gaps

**Risk:** Input injection and data quality issues

**Locations:**
- `src/pages/FreeGuide.tsx` - Email/name not validated with schema
- `src/pages/Login.tsx` - No input length limits

**Fix Required:** Add Zod schema validation to all forms

---

## Remediation Priority Order

| Priority | Issue | Effort | Risk |
|----------|-------|--------|------|
| 1 | Admin routes authorization | Medium | Critical |
| 2 | Chat function authentication | Medium | Critical |
| 3 | Leads table spam protection | Low | Medium |
| 4 | Stripe ID isolation | Medium | Medium |
| 5 | Citation tracking validation | Low | Medium |
| 6 | Leaked password protection | Low | Medium |
| 7 | User data deletion policies | Low | Low |
| 8 | Clean up duplicate policies | Low | Low |

---

## Implementation Plan

### Phase 1: Critical Fixes (Immediate)

1. **Create AdminRoute component:**
```typescript
// Check admin role via user_roles table
const { data: roles } = await supabase
  .from('user_roles')
  .select('role')
  .eq('user_id', user.id);

const isAdmin = roles?.some(r => r.role === 'admin');
```

2. **Secure chat edge function:**
```typescript
// Add JWT validation
const authHeader = req.headers.get('Authorization');
const { data, error } = await supabase.auth.getClaims(token);
if (!data?.claims?.sub) return unauthorized();

// Check tier in profiles table
const { data: profile } = await supabase
  .from('profiles')
  .select('tier')
  .eq('user_id', data.claims.sub)
  .single();

if (profile?.tier === 'free') return paymentRequired();
```

### Phase 2: Medium Priority (This Week)

3. Create edge function for leads with rate limiting
4. Move `stripe_customer_id` to admin-only table
5. Enable leaked password protection
6. Add signed tokens for citation tracking

### Phase 3: Low Priority (Next Sprint)

7. Add DELETE policies for GDPR compliance
8. Clean up duplicate RLS policies
9. Add Zod validation to all forms

---

## Security Best Practices Implemented ✅

Your application already has several good security practices:

- RLS enabled on all tables
- User roles stored in separate table (not on profiles)
- `has_role()` security definer function in place
- Proper CORS headers on most edge functions
- JWT verification disabled in config with manual validation pattern available
- Restrictive RLS policies for user data (profiles, messages, conversations)
- Terms acceptance tracking

