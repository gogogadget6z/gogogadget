import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types";

// In-memory store for new products (resets on server restart)
// In production, use a database like PostgreSQL, MongoDB, etc.
const additionalProducts: Product[] = [];

export async function GET() {
  const { products } = await import("@/lib/products");
  return NextResponse.json([...products, ...additionalProducts]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image } = body;

    // Validation
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "name, price and category are required" },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name,
      description: description || "",
      price: parseFloat(price),
      category,
      image: image || "/images/placeholder.jpg",
    };

    additionalProducts.push(newProduct);

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
