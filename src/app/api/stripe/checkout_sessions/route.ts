import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { CartItem } from '@/types/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function POST(request: Request) {
  try {
    const { cartItems } = await request.json();
    
    const lineItems = cartItems.map((item: CartItem) => ({
      price: item._id, // Using _id as the Stripe price ID
      quantity: item.quantity
    }));

    // Create metadata for the session
    const sessionMetadata = {
      items: cartItems.map((item, index) => 
        `${item._id}-${item.size}-${item.color}-${item.quantity}`
      ).join(','),
      total_items: cartItems.length.toString(),
      total_amount: cartItems.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0).toFixed(2)
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
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
            display_name: 'Shipping', // Required
            // delivery_estimate is optional
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: sessionMetadata,
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
