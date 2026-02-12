

# Add Automated Email After Quiz Completion

## The Problem

The quiz results email gate captures an email address and saves it to the `leads` table, but never sends an actual email to the user. There is no email delivery system connected.

## The Fix

### 1. Create a `send-quiz-results-email` edge function

A new backend function that sends a branded email using Supabase's built-in `supabase.auth.admin` mail or a third-party service (Resend is the simplest to integrate). The email would contain:

- Subject: "Your Peptide Blueprint Is Ready"
- The user's matched protocol name (from their quiz goal)
- A direct link back to `/quiz/results` to view their full results
- A CTA button linking to `/signup` to get the full blueprint

### 2. Connect a mail provider

Since there's no email service configured, we need one. Two options:

- **Option A: Resend** — Simple API, generous free tier (100 emails/day). Requires adding a `RESEND_API_KEY` secret and verifying a sending domain.
- **Option B: Supabase Auth email** — Limited to auth-related emails only (signup confirmation, password reset). Not suitable for marketing/transactional emails like this.

Resend is the recommended choice.

### 3. Call the edge function from the quiz results email gate

After successfully inserting into the `leads` table, call the new edge function with the user's email and quiz goal so it can send the personalized email.

### 4. Fix the silent insert failure

Add proper error handling to the email gate form so users see a toast notification if the save fails, rather than silently proceeding.

## Files to create/modify

| File | Change |
|------|--------|
| `supabase/functions/send-quiz-results-email/index.ts` | New edge function to send branded email via Resend |
| `src/pages/QuizResults.tsx` | Call the edge function after lead insert; add error toast |

## Prerequisites

- A **Resend API key** needs to be added as a secret
- A **verified sending domain** or use Resend's free `onboarding@resend.dev` for testing

## What the email contains

```
Subject: Your Peptide Blueprint Is Ready

Hey,

Based on your quiz answers, we matched you with the [Protocol Name].

Here's a preview of what's in your blueprint:
- [Peptide 1]: [Purpose]
- [Peptide 2]: [Purpose]

[View Your Full Results] -> link to /quiz/results
[Get Your Blueprint - $67] -> link to /signup

-- Peptide Playbook
```

