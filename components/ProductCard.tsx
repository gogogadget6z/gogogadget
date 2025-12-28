"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/types";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  // Use images array if available, otherwise fall back to single image
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  // Create media array: video first (if exists), then images
  const media: { type: "video" | "image"; src: string }[] = [];
  if (product.video) {
    media.push({ type: "video", src: product.video });
  }
  images.forEach((img) => {
    media.push({ type: "image", src: img });
  });

  // Generate placeholder if no image
  const categoryColors: Record<string, string> = {
    Tech: "3b82f6",
    Mode: "ec4899",
    Maison: "22c55e",
    Divers: "f59e0b",
  };
  const bgColor = categoryColors[product.category] || "6b7280";
  const placeholderImage = `https://placehold.co/400x400/${bgColor}/ffffff?text=${encodeURIComponent(product.name.split(" ")[0])}`;

  const getImageSrc = (img: string) => {
    return img?.startsWith("/") ? img : placeholderImage;
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="group bg-[#1E1E1E] rounded-2xl sm:rounded-3xl shadow-lg border border-[#D4AF37]/20 overflow-hidden hover:shadow-2xl hover:border-[#D4AF37]/40 transition-all duration-300">
      {/* Image/Video Carousel */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#2A2A2A] cursor-pointer">
        {/* Main Media */}
        {media[currentImageIndex]?.type === "video" ? (
          <video
            src={media[currentImageIndex].src}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img
            src={getImageSrc(media[currentImageIndex]?.src || "")}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-[#121212]/90 rounded-[4px] flex items-center justify-center shadow-lg active:bg-[#D4AF37] sm:hover:bg-[#D4AF37] transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 border border-[#D4AF37]/50"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-[#121212]/90 rounded-[4px] flex items-center justify-center shadow-lg active:bg-[#D4AF37] sm:hover:bg-[#D4AF37] transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 border border-[#D4AF37]/50"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {media.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-[#D4AF37] w-4"
                    : "bg-white/50 active:bg-white/75"
                }`}
                aria-label={`Voir image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {media.length > 1 && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium">
            {currentImageIndex + 1} / {media.length}
          </div>
        )}

        {/* Offer Badge */}
        {product.hasOffer && product.offerBadge && (
          <div className="absolute bottom-10 sm:bottom-12 left-2 right-2 sm:left-4 sm:right-4 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] text-[#121212] text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl shadow-lg text-center animate-pulse">
            {product.offerBadge}
          </div>
        )}
      </Link>

      {/* Thumbnail Strip - Smaller on mobile */}
      {media.length > 1 && (
        <div className="flex gap-1.5 sm:gap-2 p-2 sm:p-3 bg-[#2A2A2A] overflow-x-auto scrollbar-hide">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? "border-[#D4AF37] ring-1 sm:ring-2 ring-[#D4AF37]/30"
                  : "border-transparent active:border-[#D4AF37]/50"
              }`}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <img
                  src={getImageSrc(item.src)}
                  alt={`Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-5">
        {/* Product Name */}
        <Link href={`/products/${product.id}`} className="block group">
          <h3 className="text-base sm:text-lg font-bold text-[#F5F5F5] mb-1 font-[family-name:var(--font-playfair)] group-hover:text-yellow-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <Link
          href={`/products/${product.id}`}
          className="inline-block text-xs text-yellow-500 hover:text-yellow-400 mb-2 transition-colors"
        >
          Voir les détails →
        </Link>

        {/* Description */}
        <div className="mb-3 sm:mb-4">
          <p className={`text-xs sm:text-sm text-[#C0C0C0] whitespace-pre-line ${!showFullDescription ? "line-clamp-3" : ""}`}>
            {product.description}
          </p>
          {product.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-xs sm:text-sm font-medium text-[#D4AF37] active:text-[#F5F5F5] flex items-center gap-1 px-2 sm:px-3 py-1 border border-[#D4AF37]/30 rounded-[4px] active:border-[#D4AF37] active:bg-[#D4AF37]/10 transition-all duration-300"
            >
              {showFullDescription ? (
                <>
                  Voir moins <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              ) : (
                <>
                  Voir plus <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3 sm:mb-4 space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-[#C0C0C0]">
              Choisissez une option :
            </p>
            <div className="space-y-1.5 sm:space-y-2">
              {product.variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${
                    selectedVariant?.id === variant.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-[#2A2A2A] active:border-[#D4AF37]/50"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="radio"
                      name={`variant-${product.id}`}
                      value={variant.id}
                      checked={selectedVariant?.id === variant.id}
                      onChange={() => setSelectedVariant(variant)}
                      className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
                    />
                    <span className="font-medium text-[#F5F5F5] text-xs sm:text-sm">
                      {variant.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#D4AF37] text-xs sm:text-sm whitespace-nowrap">
                    {variant.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}&nbsp;€
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price & Button Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold text-[#F5F5F5] whitespace-nowrap">
              {currentPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}&nbsp;€
            </span>
            {selectedVariant && selectedVariant.quantity > 1 && (
              <span className="text-[10px] sm:text-xs text-[#D4AF37] font-medium whitespace-nowrap">
                soit {(selectedVariant.price / selectedVariant.quantity).toFixed(2)}&nbsp;€/unité
              </span>
            )}
          </div>

          {/* View Product Button */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Voir le produit
          </Link>

        </div>
      </div>
    </div>
  );
}
