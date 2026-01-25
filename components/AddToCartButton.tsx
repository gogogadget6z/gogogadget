"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    title?: string;
    price: number;
    image: string;
    images?: string[];
  };
  selectedVariant?: {
    id: string;
    name: string;
    price: number;
  } | null;
  className?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
}

export default function AddToCartButton({
  product,
  selectedVariant,
  className = "",
  showIcon = true,
  fullWidth = true,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      variantId: selectedVariant?.id,
      name: product.title || product.name,
      price: selectedVariant?.price ?? product.price,
      image: product.images?.[0] || product.image,
      variantName: selectedVariant?.name,
    };

    addItem(itemToAdd);

    // Feedback visuel
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`
        relative overflow-hidden
        py-3 px-6
        font-bold text-sm sm:text-base
        rounded-lg
        transition-all duration-300
        ${fullWidth ? 'w-full' : ''}
        ${isAdded
          ? 'bg-green-500 text-white'
          : 'bg-[#2A2A2A] hover:bg-[#D4AF37] text-white hover:text-black border border-[#D4AF37]/30 hover:border-[#D4AF37]'
        }
        ${className}
      `}
      disabled={isAdded}
    >
      <span className={`
        flex items-center justify-center gap-2
        transition-all duration-300
        ${isAdded ? 'scale-110' : ''}
      `}>
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Ajouté !
          </>
        ) : (
          <>
            {showIcon && <ShoppingCart className="w-5 h-5" />}
            Ajouter au panier
          </>
        )}
      </span>

      {/* Effet de ripple au click */}
      {isAdded && (
        <span className="absolute inset-0 bg-white/20 animate-ping" />
      )}
    </button>
  );
}

// Toast de notification (à ajouter dans le layout)
export function CartToast() {
  const { justAdded, items, openCart } = useCart();
  const lastItem = items[items.length - 1];

  if (!justAdded || !lastItem) return null;

  return (
    <div
      className={`
        fixed top-20 right-4 z-[200]
        bg-[#1E1E1E] border border-[#D4AF37]/30
        rounded-lg shadow-xl shadow-black/30
        p-4 max-w-xs
        transition-all duration-300
        ${justAdded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {lastItem.name}
          </p>
          <p className="text-xs text-gray-400">
            Ajouté au panier
          </p>
        </div>
      </div>
      <button
        onClick={openCart}
        className="mt-3 w-full py-2 text-sm font-medium text-[#D4AF37] hover:text-white hover:bg-[#D4AF37]/10 rounded transition-colors"
      >
        Voir le panier
      </button>
    </div>
  );
}
