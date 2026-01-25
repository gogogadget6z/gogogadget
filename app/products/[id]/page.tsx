"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import TurboJetBanner from "@/components/TurboJetBanner";
import Header from "@/components/Header";
import AddToCartButton from "@/components/AddToCartButton";
import PayPalButton from "@/components/PayPalButton";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const found = data.find((p: Product) => p.id === params.id);
        if (found) {
          setProduct(found);
          if (found.variants && found.variants.length > 0) {
            setSelectedVariant(found.variants[0]);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <svg className="w-12 h-12 text-yellow-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link href="/" className="text-yellow-500 hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image];
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const unitPrice = selectedVariant && selectedVariant.quantity > 1
    ? (selectedVariant.price / selectedVariant.quantity).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
            &larr; Retour à la boutique
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Galerie d'images */}
          <div className="space-y-4">
            {/* Image principale */}
            <div className="relative aspect-square bg-[#1E1E1E] rounded-2xl overflow-hidden">
              {product.video && selectedImageIndex === 0 ? (
                <video
                  src={product.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={images[product.video ? selectedImageIndex - 1 : selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {product.hasOffer && product.offerBadge && (
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full">
                  {product.offerBadge}
                </div>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.video && (
                  <button
                    onClick={() => setSelectedImageIndex(0)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === 0 ? "border-[#D4AF37]" : "border-transparent"
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xl">▶</span>
                    </div>
                  </button>
                )}
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(product.video ? index + 1 : index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      (product.video ? index + 1 : index) === selectedImageIndex
                        ? "border-[#D4AF37]"
                        : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-400 text-sm uppercase tracking-wide">
                {product.category}
              </p>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-[#D4AF37]">
                {currentPrice.toFixed(2)}€
              </span>
              {unitPrice && (
                <span className="text-lg text-gray-400">
                  ({unitPrice}€/unité)
                </span>
              )}
            </div>

            {/* Variantes */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Choisir une option :</h3>
                <div className="space-y-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedVariant?.id === variant.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-gray-700 hover:border-gray-500 bg-[#1E1E1E]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{variant.name}</span>
                        <span className="text-[#D4AF37] font-bold">{variant.price.toFixed(2)}€</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bouton Ajouter au panier */}
            <AddToCartButton
              product={product}
              selectedVariant={selectedVariant}
              className="py-4 text-lg"
            />

            {/* Paiement direct PayPal */}
            <div className="pt-4 border-t border-gray-700">
              <div className="text-center mb-3">
                <span className="text-gray-400 text-sm">ou payer directement avec</span>
              </div>
              <PayPalButton
                product={product}
                selectedVariant={selectedVariant}
              />
            </div>

            {/* Badges de Rassurance */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-3xl">🚚</span>
                <span className="text-sm text-gray-400 leading-tight">Expédition 24/48h</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-3xl">🔒</span>
                <span className="text-sm text-gray-400 leading-tight">Paiement 100% Sécurisé</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-3xl">🛡️</span>
                <span className="text-sm text-gray-400 leading-tight">Satisfait ou Remboursé</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {product.description}
              </div>
            </div>
          </div>
        </div>

        {/* Turbo Jet Banner - Produit recommandé */}
        {product.id !== "turbo-jet" && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Vous pourriez aussi aimer</h3>
            <TurboJetBanner />
          </div>
        )}
      </main>
    </div>
  );
}
