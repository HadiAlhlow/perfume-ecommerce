# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your database connection string (Hostinger compatible)
   - Add Stripe API keys
   - Set NextAuth secret and URL

3. **Set Up Database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run seed
   ```

4. **Copy Video File**
   - Ensure `videos/7815751-hd_1920_1080_25fps.mp4` exists
   - The app will reference it from `/videos/7815751-hd_1920_1080_25fps.mp4`

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Database Setup (Hostinger)

1. Log into your Hostinger control panel
2. Create a MySQL database
3. Get the connection string (usually in format: `mysql://user:password@host:port/database`)
4. Add to `.env` as `DATABASE_URL`

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the dashboard
3. Add to `.env`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (starts with `pk_`)
   - `STRIPE_SECRET_KEY` (starts with `sk_`)
4. Set up webhook endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## NextAuth Setup

1. Generate a secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to `.env` as `NEXTAUTH_SECRET`
3. Set `NEXTAUTH_URL` to your app URL (e.g., `http://localhost:3000`)

## Video Setup

The hero video should be placed in:
- Source: `videos/7815751-hd_1920_1080_25fps.mp4`
- The app references it as `/videos/7815751-hd_1920_1080_25fps.mp4`

If you need to use a different video:
1. Place it in `public/videos/`
2. Update references in:
   - `app/(shop)/page.tsx` (hero section)
   - `app/(shop)/page.tsx` (scroll-triggered video section)

## Categories

The platform includes 5 perfume categories:
- Floral
- Woody
- Fresh
- Oriental
- Citrus

These are automatically created when you run the seed script.

## Troubleshooting

### Video not playing
- Check that the video file exists in `public/videos/`
- Verify the file path in the component
- Check browser console for errors

### Database connection issues
- Verify your `DATABASE_URL` is correct
- Ensure your Hostinger database is accessible
- Check if Prisma can connect: `npx prisma db pull`

### Stripe checkout not working
- Verify API keys are correct
- Check webhook endpoint is configured
- Ensure `NEXT_PUBLIC_APP_URL` matches your domain

### Animations not working
- Check browser console for GSAP errors
- Verify `prefers-reduced-motion` is not enabled
- Ensure GSAP is properly imported

