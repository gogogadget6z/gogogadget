import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
  return Buffer.from(`admin-${Date.now()}-${Math.random().toString(36)}`).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@hostpass.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      const token = generateToken();

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Connexion réussie" });
    }

    return NextResponse.json(
      { success: false, error: "Email ou mot de passe incorrect" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur de connexion" },
      { status: 500 }
    );
  }
}
