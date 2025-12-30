"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Wrench, Wind, Sparkles, Flame, ShoppingCart } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="bg-[#1E1E1E]/95 backdrop-blur-md shadow-lg shadow-black/20 sticky top-0 z-50 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Wrench
              className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] flex-shrink-0"
              style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 3px rgba(212,175,55,0.4))' }}
            />
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold font-[family-name:var(--font-playfair)] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" style={{ color: '#D4AF37' }}>
                Gogo Gadget
              </h1>
              <p className="text-[10px] sm:text-xs italic tracking-wide hidden sm:block" style={{ color: '#A0A0A0' }}>
                Les meilleures trouvailles de l'Inspecteur
              </p>
            </div>
          </div>
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
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
      {/* NOUVELLE SECTION HERO */}
      <section className="relative w-full bg-[#050505] overflow-hidden border-b border-gray-800">

        {/* Fond avec effet de lumière jaune discret */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">

          {/* Badge Nouveauté */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <span className="text-yellow-400 text-xs md:text-sm font-semibold tracking-wide uppercase">
              Validé par l&apos;Inspecteur • Collection 2025
            </span>
          </div>

          {/* Grand Titre */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
            Les Gadgets <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500">
              Introuvables Ailleurs.
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nous traquons les meilleures innovations Tech & Auto.
            Fini les objets inutiles, place aux outils qui changent vraiment votre quotidien.
          </p>

          {/* Boutons d&apos;action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              Voir les Pépites 🔥
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/10 transition-all">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

        {/* TURBO JET 2025 - Produit Vedette */}
        <section className="mb-12 sm:mb-16">
          <Link href="/turbo-jet" className="block group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-900/40 via-purple-900/40 to-cyan-900/40 border border-cyan-500/30 p-6 sm:p-8 hover:border-cyan-400/50 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                {/* Image */}
                <div className="w-full lg:w-1/3 flex-shrink-0">
                  <img
                    src="https://s.alicdn.com/@sc04/kf/Ha7bdb6a357444c00b217448b58978ea1p.jpg"
                    alt="Turbo Jet 2025"
                    className="w-full max-w-[280px] mx-auto rounded-2xl shadow-2xl shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-cyan-400 text-xs font-bold uppercase tracking-wide">Nouveau 2025</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
                    Turbo Jet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">2025</span>
                  </h2>

                  <p className="text-gray-400 text-lg mb-4">Le souffleur 4-en-1 ultime pour gamers et bricoleurs</p>

                  {/* Features mini */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    <span className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full">
                      <Wind className="w-4 h-4 text-cyan-400" /> Souffleur
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> Aspirateur
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full">
                      <Flame className="w-4 h-4 text-cyan-400" /> Attise-feu
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-yellow-500">34,90€</span>
                      <span className="text-xl text-gray-500 line-through">49,90€</span>
                      <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">-30%</span>
                    </div>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold group-hover:opacity-90 transition shadow-lg shadow-cyan-500/30">
                      <ShoppingCart className="w-5 h-5" />
                      Voir le produit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12 sm:py-16">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <>
            {/* Section High-Tech & Électrique */}
            {products.filter((p: Product) => p.category === "electrique").length > 0 && (
              <section className="mb-12 sm:mb-16">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-[family-name:var(--font-playfair)] flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">⚡</span>
                    High-Tech & Électrique
                  </h2>
                  <div className="mt-2 w-20 sm:w-32 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
                  {products
                    .filter((p: Product) => p.category === "electrique")
                    .map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </section>
            )}

            {/* Section Accessoires Maison & Style */}
            {products.filter((p: Product) => p.category === "maison").length > 0 && (
              <section className="mb-12 sm:mb-16">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-[family-name:var(--font-playfair)] flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">🏠</span>
                    Accessoires Maison & Style
                  </h2>
                  <div className="mt-2 w-20 sm:w-32 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
                  {products
                    .filter((p: Product) => p.category === "maison")
                    .map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </section>
            )}

            {/* Section Accessoires Smartphone */}
            {products.filter((p: Product) => p.category === "accessoires").length > 0 && (
              <section className="mb-12 sm:mb-16">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-[family-name:var(--font-playfair)] flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">📱</span>
                    Accessoires Smartphone
                  </h2>
                  <div className="mt-2 w-20 sm:w-32 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
                  {products
                    .filter((p: Product) => p.category === "accessoires")
                    .map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-[#D4AF37]/30">
                  <svg
                    className="w-8 h-8 sm:w-12 sm:h-12 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#F5F5F5] mb-2 font-[family-name:var(--font-playfair)]">
                  Aucun produit disponible
                </h3>
                <p className="text-sm sm:text-base text-[#C0C0C0]">
                  Revenez bientôt pour découvrir nos nouveautés !
                </p>
              </div>
            )}
          </>
        )}

        {/* Trust badges */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#1E1E1E] rounded-xl sm:rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base text-[#F5F5F5]">Paiement sécurisé</p>
              <p className="text-xs sm:text-sm text-[#C0C0C0]">Stripe 100% sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#1E1E1E] rounded-xl sm:rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base text-[#F5F5F5]">Qualité Premium</p>
              <p className="text-xs sm:text-sm text-[#C0C0C0]">Produits d'exception</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[#1E1E1E] rounded-xl sm:rounded-2xl shadow-lg border border-[#D4AF37]/20">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base text-[#F5F5F5]">Livraison Express</p>
              <p className="text-xs sm:text-sm text-[#C0C0C0]">Expédié sous 24h</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
