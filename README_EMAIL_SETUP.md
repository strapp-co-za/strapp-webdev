# Email Infrastructure Setup (Strapp)

This project uses **Supabase Edge Functions** to bridge the contact form and **Resend**.

## 1. Prerequisites
- A [Resend](https://resend.com) account (Get your API key).
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed.

## 2. Configuration (Terminal)
Run these commands in your project root to secure your API key and deploy the engine:

```bash
# Login to your Supabase account
supabase login

# Set the Resend API Secret (Replace the placeholder)
supabase secrets set RESEND_API_KEY=re_your_actual_key_here

# Deploy the function to production
# Note: --no-verify-jwt is used because this is a public-facing contact form
supabase functions deploy contact-email --no-verify-jwt
```

## 3. Frontend Linkage
In `public/runtime.html`, find the `fetch` call and replace `YOUR_SUPABASE_PROJECT_ID` with the Reference ID found in your Supabase Project Settings (General tab).

## 4. Testing
Submit the form. Resend's `onboarding@resend.dev` will send the email directly to `strapp.co.za@gmail.com`. Once you verify a custom domain in Resend, you can change the `from` address in the Edge Function.