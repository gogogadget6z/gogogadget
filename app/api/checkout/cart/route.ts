import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CartItem {
  id: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json() as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Le panier est vide" },
        { status: 400 }
      );
    }

    // Construire les line_items pour Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name + (item.variantName ? ` - ${item.variantName}` : ''),
          images: [item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gogogadget-lac.vercel.app'}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Stripe utilise les centimes
      },
      quantity: item.quantity,
    }));

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gogogadget-lac.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gogogadget-lac.vercel.app'}/cancel`,
      locale: "fr",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      metadata: {
        cart_items: JSON.stringify(items.map(i => ({ id: i.id, qty: i.quantity }))),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur création session Stripe:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
