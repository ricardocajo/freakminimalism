# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Serena

At the start of every conversation, always activate the Serena project by calling `mcp__plugin_serena_serena__activate_project` with `project=freakminimalism` before doing anything else.

---

## Project Overview

**Freak Minimalism** is a Portuguese minimalist clothing/accessories brand. The site is a Next.js e-commerce storefront hosted on Vercel's free tier. It uses Stripe Checkout for payments — there is no database, no user auth, and no CMS. All product data lives in a static TypeScript file.

The primary markets is Portugal only. The site is bilingual (PT/EN) with i18n via react-i18next.

## Tech Stack

- **Framework**: Next.js 16 (App Router, RSC, SSG)
- **React**: 19
- **Styling**: Tailwind CSS 3 + shadcn/ui (Radix UI primitives)
- **i18n**: react-i18next with bundled JSON translations (no HTTP backend)
- **Payments**: Stripe Checkout Sessions (server-side API route)
- **Hosting**: Vercel free tier
- **Language**: TypeScript (strict mode)

## Project Structure

```
src/
  app/
    [category]/           # Category listing page (SSR)
      [id]/               # Product detail page (SSG via generateStaticParams)
        page.tsx          # Server component
        YouMightAlsoLike.tsx  # Client component (needs useTranslation)
    (carts)/cart/         # Cart page
    api/
      stripe/checkout_sessions/route.ts  # Stripe Checkout Session creation
      personalizar/images/route.ts       # Serves customize page image listings
    customize/
      page.tsx            # Customization order page (client component, large)
      data.ts             # Static data: CATEGORIES, COLOR_CODE_MAP, helpers
    success/              # Post-checkout success page
    actions.ts            # Product lookup helpers (pure functions, no async)
    layout.tsx            # Root layout with Providers, Navbar in Suspense
  components/
    cart/                 # Cart UI components
    common/               # Navbar, Footer, SearchInput, I18nProvider, etc.
    products/             # Products grid, SingleProduct, Images
    skeletons/            # Loading skeleton components
    ui/                   # shadcn/ui primitives (accordion, dialog, etc.)
  contexts/
    CartContext.tsx        # Cart state with localStorage persistence
  data/
    products.ts           # SOURCE OF TRUTH for all products (static array)
  types/
    types.ts              # Sole type definitions file (Product, CartItem)
  i18n.ts                 # i18next configuration (bundled translations)
  styles/globals.css      # Global CSS, Tailwind base, background image
```

## Product Data

All products are defined in [src/data/products.ts](src/data/products.ts). Each product's `_id` **is the Stripe Price ID** (e.g. `price_1T3f4wCTQhRcTCnZNDQh84Rk`). This is passed directly to Stripe as the line item price — there is no separate ID mapping.

```typescript
interface Product {
  _id: string;           // Stripe Price ID — used directly in checkout
  translations: {
    en: { name, description, composition, care };
    pt: { name, description, composition, care };
  };
  price: number;         // Display price in EUR
  discountPrice?: number; // Already the discounted amount (NOT a reduction from price)
  images: string[];      // Public paths under /public/images/
  colors: string[];
  sizes: string[];
  categories: string[];  // Lowercase tags e.g. ["hats"], ["tshirts"], ["parcerias"]
}
```

**Important**: `discountPrice` is the actual final price shown to the customer. It is NOT a discount amount to subtract from `price`. Stripe prices are set to the correct final amounts.

## Stripe Integration

- **File**: [src/app/api/stripe/checkout_sessions/route.ts](src/app/api/stripe/checkout_sessions/route.ts)
- Shipping: Portugal only (`allowed_countries: ['PT']`), fixed €5.50 (`amount: 550`)
- Promo codes: resolved server-side via `stripe.promotionCodes.list()` before session creation
- Success URL includes `?session_id={CHECKOUT_SESSION_ID}` — the success page validates this param before clearing the cart. Direct `/success` visits redirect home.
- Required env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`

## Cart

- Context: [src/contexts/CartContext.tsx](src/contexts/CartContext.tsx)
- Persisted to `localStorage` key `"cart"`
- Variant identity: `_id + color + size` (the `sameVariant` helper). A product can appear multiple times if it has different color/size selections.
- `decrementQuantity` takes a full `CartItem` object, not just an ID.
- Hydration race fixed with a `useRef(false)` flag — the persist effect skips the first render before localStorage has been read.

## Routing & Categories

URL slugs are mapped to category tags in [src/app/actions.ts](src/app/actions.ts) via `categorySlugAlias`. Currently: `/partnerships` → `parcerias`. Add new aliases here when the URL name differs from the category tag in `products.ts`.

The `[category]` segment is cosmetic for product pages — lookup is by `[id]` (Stripe price ID) only. `generateStaticParams` pre-renders all 12 product pages at build time.

## i18n

- Config: [src/i18n.ts](src/i18n.ts) — translations are bundled (not fetched at runtime)
- Locale files: `public/locales/en/translation.json` and `public/locales/pt/translation.json`
- `useTranslation()` can only be used in client components. Server components must use English fallbacks or extract translated parts into small `"use client"` child components (see `YouMightAlsoLike.tsx` pattern).
- The `Navbar` is wrapped in `<Suspense>` in layout.tsx because it uses `useSearchParams()` (required since Next 14.2).

## Customize Page

- [src/app/customize/page.tsx](src/app/customize/page.tsx) — client component, handles customization orders via WhatsApp
- [src/app/customize/data.ts](src/app/customize/data.ts) — all static data extracted here: `CATEGORIES`, `COLOR_CODE_MAP`, helper functions, WhatsApp phone number
- Images are served by [src/app/api/personalizar/images/route.ts](src/app/api/personalizar/images/route.ts). Path traversal is prevented with `SAFE_SEGMENT = /^[a-zA-Z0-9 ._-]+$/` (spaces allowed — real folder names like `MANGA CUMPRIDA` contain spaces) plus a `path.resolve` prefix check.
- `AbortController` is used for fetch calls so that rapid category/density changes don't cause stale responses to overwrite newer ones.

## Design Constraints

- Background: `fundo.jpeg` with a darkening gradient overlay (defined in `globals.css`). Do not remove this.
- The hero section on the home page (`/`) uses a flyer image — do not modify it.
- Cart icon is a PNG shopping bag (`/images/cart.png`). Keep it; use `drop-shadow` for polish.
- Color scheme: dark site, all new UI should follow dark theme conventions.

## Supabase / FREAK CARD Integration

The storefront connects to the **FREAK CARD** loyalty app (repo: `~/Documents/FREAK-CLIENTE`) via Stripe webhooks.

### How it works

1. The cart page exposes a **"FREAK CARD email"** field (`freakCardEmail` state in the cart component).
2. On checkout, `freakCardEmail` is sent to `/api/stripe/checkout_sessions` as part of the request body.
3. The checkout route sets `customer_email: freakCardEmail` and `metadata.source: 'freakminimalism'` on the Stripe Session.
4. Stripe fires `checkout.session.completed` to the FREAK CARD Supabase Edge Function (`stripe-webhook` v2).
5. The webhook calls the `attribute_purchase(session_id, email, amount_eur)` RPC, which finds the matching FREAK CARD profile by email and awards **5 points per €**.

### Key files in this repo

- `src/app/api/stripe/checkout_sessions/route.ts` — accepts `freakCardEmail` from body, passes it to Stripe
- `src/app/(carts)/cart/` — cart UI including the FREAK CARD email input

### Supabase project (FREAK CARD)

- **Project ID**: `ckqhzjicmtbowuikrerw` (region: eu-north-1)
- **Edge Function**: `stripe-webhook` — receives all Stripe events for this Stripe account (`acct_1RclOgCTQhRcTCnZ`)
- The webhook handles events from both the storefront and the FREAK CARD subscription flows on the same endpoint.

### Stripe

- **Account**: FREAK MINIMALISM (`acct_1RclOgCTQhRcTCnZ`) — **LIVEMODE**
- Webhook must subscribe to: `checkout.session.completed`, `charge.refunded`, `invoice.paid`, `customer.subscription.*`

### npm / dependencies

After editing `package.json` (e.g. bumping `stripe` version), run `npm install` in this directory to update `node_modules` and `package-lock.json`, then commit `package-lock.json`.

---

## Known Limitations / Non-Issues

- 5 `npm audit` moderate vulnerabilities remain — all are `postcss` in Next's internal dependency tree, unfixable without a Next upstream fix. Not a concern.
- No image optimization beyond Next's built-in `<Image>` — Vercel free tier has limited optimization quota, so some images use plain `<img>` tags intentionally.
- No database — product catalog changes require editing `src/data/products.ts` and redeploying.

## Adding a New Product

1. Get the Stripe Price ID from the Stripe dashboard.
2. Add an entry to `src/data/products.ts` with `_id` set to that price ID.
3. Add product images to `public/images/<category>/`.
4. If it belongs to a new category, add nav links in the Navbar and a `categorySlugAlias` entry in `actions.ts` if the URL slug differs from the category tag.

## Common Gotchas

- `params` in App Router pages is a `Promise` — always `await` it: `const { id } = await params`.
- Never add `"use client"` to a page that can be a server component — it disables SSG and deoptimizes to client rendering.
- `useSearchParams()` always requires a `<Suspense>` wrapper in the parent.
- The `CartItem` type is the single source of truth in `src/types/types.ts`. Do not redefine it elsewhere.
- `decrementQuantity` accepts a full `CartItem`, not an ID string.
