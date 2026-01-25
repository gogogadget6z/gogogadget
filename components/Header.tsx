"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";

export default function Header() {
  const { itemCount, justAdded, openCart } = useCart();
  const { data: session, status } = useSession();

  return (
    <header className="bg-[#1E1E1E]/95 backdrop-blur-md shadow-lg shadow-black/20 sticky top-0 z-50 border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <Image
            src="/logo-brand.png"
            alt="Gogo Gadget"
            width={150}
            height={150}
            className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full object-cover transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:brightness-125"
            style={{
              border: '2px solid #F59E0B',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)',
              filter: 'brightness(1.1) contrast(1.1)',
              imageRendering: '-webkit-optimize-contrast' as never,
            }}
            priority
          />
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold font-[family-name:var(--font-playfair)] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" style={{ color: '#D4AF37' }}>
              Gogo Gadget
            </h1>
            <p className="text-[10px] sm:text-xs italic tracking-wide hidden sm:block" style={{ color: '#A0A0A0' }}>
              Les meilleures trouvailles de l&apos;Inspecteur
            </p>
          </div>
        </Link>

        {/* Right side: Account + Cart + Admin */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Account / Login Button */}
          {status === "loading" ? (
            <div className="p-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#3A3A3A] border-t-[#D4AF37] animate-spin" />
            </div>
          ) : session ? (
            <Link
              href="/mon-compte"
              className="flex items-center gap-2 px-3 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 transition-colors"
              title="Mon compte"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline text-sm font-medium">Mon compte</span>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 px-3 py-2 bg-[#D4AF37] text-[#121212] rounded-lg hover:bg-[#E5C048] transition-colors"
              title="Connexion"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline text-sm font-medium">Connexion</span>
            </Link>
          )}

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative p-2 text-[#C0C0C0] hover:text-[#D4AF37] transition-colors"
            aria-label={`Panier (${itemCount} articles)`}
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />

            {/* Badge compteur */}
            <span
              className={`
                absolute -top-1 -right-1
                min-w-[20px] h-[20px]
                flex items-center justify-center
                text-xs font-bold
                rounded-full
                transition-all duration-300
                ${itemCount > 0
                  ? 'bg-[#D4AF37] text-[#121212]'
                  : 'bg-[#2A2A2A] text-[#666]'
                }
                ${justAdded ? 'animate-bounce scale-125' : ''}
              `}
            >
              {itemCount}
            </span>
          </button>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="p-2 text-[#C0C0C0] hover:text-[#D4AF37] transition-colors"
            title="Administration"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
