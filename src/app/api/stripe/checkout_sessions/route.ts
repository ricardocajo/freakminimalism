import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Server-side whitelist of valid Stripe price IDs sourced from the static catalog.
// Prevents a manipulated client from swapping in arbitrary prices on this account.
const VALID_PRICE_IDS = new Set(products.map(p => p._id));

const MAX_LINE_ITEMS = 50;
const MAX_QUANTITY_PER_ITEM = 20;

interface IncomingCartItem {
  _id: unknown;
  quantity: unknown;
}

export async function POST(request: Request) {
  try {
    const { cartItems, promoCode, freakCardEmail } = await request.json();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'empty_cart' }, { status: 400 });
    }
    if (cartItems.length > MAX_LINE_ITEMS) {
      return NextResponse.json({ error: 'too_many_items' }, { status: 400 });
    }

    // Aggregate quantities for any duplicate price IDs the client sent
    const aggregated = new Map<string, number>();
    for (const raw of cartItems as IncomingCartItem[]) {
      if (typeof raw._id !== 'string' || !VALID_PRICE_IDS.has(raw._id)) {
        return NextResponse.json({ error: 'invalid_item' }, { status: 400 });
      }
      const qty = Number(raw.quantity);
      if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTITY_PER_ITEM) {
        return NextResponse.json({ error: 'invalid_quantity' }, { status: 400 });
      }
      aggregated.set(raw._id, (aggregated.get(raw._id) || 0) + qty);
    }
    // Cap aggregated quantity per line as well
    for (const [id, qty] of aggregated) {
      if (qty > MAX_QUANTITY_PER_ITEM) {
        return NextResponse.json({ error: 'invalid_quantity' }, { status: 400 });
      }
      void id;
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = Array.from(aggregated, ([priceId, quantity]) => ({
      price: priceId,
      quantity,
    }));

    // Resolve Stripe Promotion Code if provided
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (promoCode && typeof promoCode === 'string' && promoCode.length > 0) {
      try {
        const promoList = await stripe.promotionCodes.list({
          code: promoCode,
          active: true,
          limit: 1,
        });
        const found = promoList.data[0];
        if (found) {
          discounts = [
            {
              promotion_code: found.id,
            },
          ];
        }
      } catch (e) {
        console.warn('Failed to look up promotion code:', e);
      }
    }

    // Optional FREAK CARD email — if the customer enters one, we pre-fill the Stripe
    // checkout email so the loyalty webhook can match the purchase to their account.
    const trimmedEmail =
      typeof freakCardEmail === 'string' && /\S+@\S+\.\S+/.test(freakCardEmail)
        ? freakCardEmail.trim().toLowerCase()
        : undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      discounts,
      ...(trimmedEmail ? { customer_email: trimmedEmail } : {}),
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['PT'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 550,
              currency: 'eur',
            },
            display_name: 'Shipping',
          },
        },
      ],
      // Metadata flows through to the webhook so the loyalty side knows this came
      // from the storefront (vs. a subscription invoice on the FREAK CARD site).
      metadata: {
        source: 'freakminimalism',
        ...(trimmedEmail ? { freak_card_email: trimmedEmail } : {}),
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
