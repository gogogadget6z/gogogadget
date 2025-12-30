"use client";

import Link from "next/link";
import { Wind, Sparkles, Flame, ShoppingCart } from "lucide-react";

export default function TurboJetBanner() {
  return (
    <section id="turbo-jet" className="mb-12 sm:mb-16">
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
                  <span className="text-4xl font-black text-yellow-500">99,00€</span>
                  <span className="text-xl text-gray-500 line-through">149,00€</span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">-33%</span>
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
  );
}
