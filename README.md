# Perfume E-commerce Platform

A modern, feature-rich e-commerce platform for selling perfumes, built with Next.js 14, featuring advanced UI interactions, scroll animations, and comprehensive order tracking.

## Features

- 🎨 **Modern UI Design**: Glassmorphism, 3D effects, kinetic typography, and microinteractions
- 📱 **Fully Responsive**: Mobile-first design with container queries
- 🎬 **Scroll Animations**: GSAP-powered scroll-triggered animations and parallax effects
- 🌀 **Immersive Category Scroll**: Pinned, full-height category totems with hover-activated placeholder videos (swap with brand footage later)
- 🛒 **Shopping Cart**: Persistent cart with Zustand state management
- 💳 **Payment Integration**: Stripe and PayPal support
- 📦 **Order Tracking**: Complete order management and tracking system
- 🎥 **Video Hero**: Infinite-loop hero video with scroll-triggered video sections
- 🗂️ **5 Categories**: Floral, Woody, Fresh, Oriental, and Citrus perfumes
- ♿ **Accessible**: WCAG AA compliant with reduced-motion support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: GSAP + ScrollTrigger
- **Database**: Prisma ORM (MySQL/PostgreSQL compatible)
- **Authentication**: NextAuth.js
- **Payments**: Stripe, PayPal
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MySQL or PostgreSQL database (Hostinger compatible)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd perfume-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database connection string
- Stripe API keys
- NextAuth secret
- App URL

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Seed the database (optional):
```bash
npm run seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
perfume-ecommerce/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Shop pages (home, categories, products, cart, checkout)
│   ├── (dashboard)/       # User dashboard (orders)
│   └── api/               # API routes
├── components/            # React components
│   ├── animations/        # GSAP animation components
│   ├── cart/              # Shopping cart components
│   ├── checkout/          # Checkout components
│   ├── hero/              # Hero section components
│   ├── layout/            # Layout components (Header, Footer, Navigation)
│   ├── orders/            # Order tracking components
│   └── products/          # Product display components
├── lib/                   # Utility libraries
│   ├── db/                # Database client
│   ├── motion/            # Motion utilities and tokens
│   └── stripe/            # Stripe integration
├── hooks/                 # Custom React hooks
├── prisma/                # Prisma schema
└── styles/                # Global styles and design tokens
```

## Design System

The platform uses a comprehensive design token system based on the documentation in the `docs/` folder:

- **Motion Tokens**: Centralized durations, easing, and parallax speeds
- **Color Tokens**: Light/dark mode support with semantic color names
- **Spacing Tokens**: Fluid spacing system using `clamp()`
- **Typography**: Variable fonts with fluid scaling

## Animation System

The platform features an advanced animation system:

- **GSAPScrollReveal**: Scroll-triggered element reveals
- **ScrollParallax**: Multi-layer parallax effects
- **ScrollTextReveal**: Kinetic typography with word/letter splits
- **Scroll3DEffect**: 3D tilt effects (desktop only)
- **ScrollVideoPlayer**: Videos that play on scroll

All animations respect `prefers-reduced-motion` and are optimized for mobile devices.

## Payment Integration

### Stripe

1. Create a Stripe account and get your API keys
2. Add keys to `.env`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3. Set up webhook endpoint in Stripe dashboard: `/api/webhooks/stripe`

### PayPal

PayPal integration is set up in the codebase but requires PayPal SDK configuration.

## Database Schema

The Prisma schema includes:

- **Users**: Authentication and user management
- **Categories**: 5 perfume categories
- **Products**: Product information with variants
- **Orders**: Order management with tracking
- **Cart**: Shopping cart persistence
- **Reviews**: Product reviews and ratings

## Environment Variables

See `.env.example` for all required environment variables.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database

## Performance

The platform is optimized for performance:

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- GPU-accelerated animations
- Mobile-optimized animations (reduced parallax, shorter durations)
- Font optimization with variable fonts

## Accessibility

- WCAG AA color contrast
- Keyboard navigation support
- Focus indicators
- Screen reader optimization
- Reduced motion support

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

