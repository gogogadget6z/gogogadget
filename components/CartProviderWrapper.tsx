"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import { CartToast } from "./AddToCartButton";

export default function CartProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CartToast />
    </CartProvider>
  );
}
