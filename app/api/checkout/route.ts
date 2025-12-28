import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe key not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey.trim());

    const { productId, variantId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // Find product in mock data
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Determine price and product name based on variant
    let finalPrice = product.price;
    let productName = product.name;
    let quantity = 1;

    if (variantId && product.variants) {
      const variant = product.variants.find((v) => v.id === variantId);
      if (variant) {
        finalPrice = variant.price;
        productName = `${product.name} - ${variant.name}`;
        quantity = variant.quantity;
      }
    }

    // Build full image URL for Stripe
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim() || "https://gogogadget.app";
    const productImage = product.image.startsWith("/")
      ? `${baseUrl}${product.image}`
      : product.image;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: product.description.substring(0, 500), // Stripe limite la description
              images: [productImage],
            },
            unit_amount: Math.round(finalPrice * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL?.trim()}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL?.trim()}/cancel`,
      metadata: {
        productId: product.id,
        productName: productName,
        variantId: variantId || "",
        quantity: quantity.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
