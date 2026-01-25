"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

// Composant pour un article du panier
function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: {
    id: string;
    variantId?: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variantName?: string;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(onRemove, 300);
  };

  return (
    <div
      className={`
        flex gap-3 p-3 bg-[#1E1E1E] rounded-lg border border-[#2A2A2A]
        transition-all duration-300
        ${isRemoving ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100'}
      `}
    >
      {/* Image produit */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden bg-[#2A2A2A]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Détails */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm sm:text-base font-medium text-white truncate">
          {item.name}
        </h4>
        {item.variantName && (
          <p className="text-xs text-gray-400">{item.variantName}</p>
        )}
        <p className="text-sm font-bold text-[#D4AF37] mt-1">
          {item.price.toFixed(2)} &euro;
        </p>

        {/* Contrôles quantité */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded bg-[#2A2A2A] text-gray-300 hover:bg-[#D4AF37] hover:text-black transition-colors"
            aria-label="Diminuer la quantité"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded bg-[#2A2A2A] text-gray-300 hover:bg-[#D4AF37] hover:text-black transition-colors"
            aria-label="Augmenter la quantité"
          >
            <Plus className="w-3 h-3" />
          </button>

          {/* Bouton supprimer */}
          <button
            onClick={handleRemove}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            aria-label="Supprimer l'article"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant principal du drawer
export default function CartDrawer() {
  const { items, itemCount, total, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Click outside pour fermer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeCart]);

  // Checkout Stripe (multi-produits)
  const handleStripeCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Erreur checkout");
      }
    } catch (error) {
      console.error("Erreur checkout:", error);
      alert("Erreur lors du paiement. Veuillez réessayer.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`
          fixed top-0 right-0 h-full z-[101]
          w-full sm:w-[400px] max-w-full
          bg-[#121212] border-l border-[#D4AF37]/20
          shadow-2xl shadow-black/50
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        {/* Header du drawer */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-white">
              Mon Panier
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({itemCount} article{itemCount > 1 ? 's' : ''})
              </span>
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded-lg transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#2A2A2A] mb-4" />
              <p className="text-gray-400 text-lg mb-2">Votre panier est vide</p>
              <p className="text-gray-500 text-sm">
                Ajoutez des articles pour commencer
              </p>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.id}-${item.variantId || 'default'}`}
                item={item}
                onUpdateQuantity={(qty) => updateQuantity(item.id, item.variantId, qty)}
                onRemove={() => removeItem(item.id, item.variantId)}
              />
            ))
          )}
        </div>

        {/* Footer avec total et boutons paiement */}
        {items.length > 0 && (
          <div className="border-t border-[#2A2A2A] p-4 space-y-4 bg-[#1E1E1E]">
            {/* Récapitulatif */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} &euro;</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Livraison</span>
                <span className="text-green-400">GRATUITE</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#2A2A2A]">
                <span className="text-white">Total</span>
                <span className="text-[#D4AF37]">{total.toFixed(2)} &euro;</span>
              </div>
            </div>

            {/* Bouton Stripe */}
            <button
              onClick={handleStripeCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#C4A030] text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Redirection...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 10h18v7a3 3 0 01-3 3H6a3 3 0 01-3-3v-7zm18-3v1H3V7a3 3 0 013-3h12a3 3 0 013 3z"/>
                  </svg>
                  Payer par Carte
                </>
              )}
            </button>

            {/* PayPal */}
            <div className="paypal-cart-wrapper">
              <PayPalScriptProvider
                options={{
                  clientId: "AcH8_x9wgLdWo2rlGBZoip6TOfX2flAPVhfgzeoj2EEHhT8uEtsj6JF0XrT6xq2c4V4w1xer_GERkxtC",
                  currency: "EUR",
                  intent: "capture",
                  components: "buttons",
                }}
              >
                <PayPalButtons
                  fundingSource={FUNDING.PAYPAL}
                  style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay", height: 45 }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [{
                        amount: {
                          currency_code: "EUR",
                          value: total.toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "EUR",
                              value: total.toFixed(2),
                            },
                          },
                        },
                        items: items.map((item) => ({
                          name: item.name + (item.variantName ? ` - ${item.variantName}` : ''),
                          quantity: String(item.quantity),
                          unit_amount: {
                            currency_code: "EUR",
                            value: item.price.toFixed(2),
                          },
                          category: "PHYSICAL_GOODS" as const,
                        })),
                      }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      await actions.order.capture();
                      clearCart();
                      window.location.href = `/success?order_id=${data.orderID}`;
                    }
                  }}
                  onError={(err) => {
                    console.error("Erreur PayPal:", err);
                    alert("Erreur de paiement PayPal. Veuillez réessayer.");
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* Lien continuer shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-gray-400 hover:text-[#D4AF37] transition-colors py-2"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
