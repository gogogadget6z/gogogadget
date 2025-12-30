"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wind, Sparkles, CircleDot, Flame, Check, X, Star, ChevronDown, ShoppingCart, Truck, Shield, RotateCcw, CreditCard } from "lucide-react";

export default function TurboJetLanding() {
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 12 });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "turbo-jet",
          variantId: "turbo-jet-1",
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création du paiement");
        setIsCheckingOut(false);
      }
    } catch {
      alert("Erreur lors de la création du paiement");
      setIsCheckingOut(false);
    }
  };

  const features = [
    { icon: Wind, title: "Souffleur Turbo", subtitle: "Pour claviers et PC" },
    { icon: Sparkles, title: "Aspirateur Auto", subtitle: "Aspire miettes et poussière" },
    { icon: CircleDot, title: "Gonfleur Express", subtitle: "Matelas et bouées" },
    { icon: Flame, title: "Attise-Feu", subtitle: "Idéal pour le BBQ" },
  ];

  const reviews = [
    { name: "Marc D.", role: "Gamer", rating: 5, text: "Mon clavier mécanique n'a jamais été aussi propre. Le mode souffleur est ultra puissant !" },
    { name: "Sophie L.", role: "Maman", rating: 5, text: "Parfait pour nettoyer les miettes des enfants dans la voiture. Je l'utilise tous les jours." },
    { name: "Julien P.", role: "Ingénieur", rating: 5, text: "Qualité pro à prix accessible. Le moteur brushless fait vraiment la différence." },
  ];

  const faqs = [
    { q: "Comment passer d'un mode à l'autre ?", a: "Simple ! Un bouton unique permet de basculer entre les 4 modes (Souffleur → Aspirateur → Gonfleur → Attise-feu). Un indicateur LED vous montre le mode actif." },
    { q: "Quelle est l'autonomie réelle ?", a: "La batterie 4000mAh offre environ 30 minutes en mode Turbo (puissance max) et jusqu'à 60 minutes en mode normal. Recharge complète en 2h via USB-C." },
    { q: "Le filtre est-il lavable ?", a: "Oui ! Le filtre HEPA est lavable et réutilisable. Rincez-le à l'eau tiède, laissez sécher 24h, et c'est reparti. Un filtre de rechange est inclus." },
    { q: "Puis-je le recharger avec mon chargeur de téléphone ?", a: "Absolument ! Le Turbo Jet 2025 se recharge via n'importe quel chargeur USB-C (5V-2A minimum). Compatible avec les chargeurs iPhone 15+, Samsung, etc." },
  ];

  const comparisons = [
    { feature: "Fonction", competitor: "Souffleur simple", turbojet: "4-en-1 : Souffle, Aspire, Gonfle, Feu" },
    { feature: "Nettoyage Auto", competitor: "Inutile", turbojet: "Mode Aspirateur inclus" },
    { feature: "Puissance", competitor: "50 m/s", turbojet: "63 m/s Moteur Brushless" },
    { feature: "Batterie", competitor: "20 min", turbojet: "4000 mAh (Longue durée)" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-center py-2 px-4 text-sm font-medium">
        <Truck className="inline w-4 h-4 mr-2" />
        Livraison OFFERTE pour les 100 premières commandes !
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            GogoGadget
          </Link>
          <button
            onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Commander
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              NOUVEAU 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Turbo Jet <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">2025</span>
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Le souffleur 4-en-1 ultime : Souffle, Aspire, Gonfle & Attise le feu
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-yellow-500">99,00€</span>
              <span className="text-xl text-gray-500 line-through">149,00€</span>
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">-33%</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCheckingOut ? (
                "Chargement..."
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <img
              src="https://s.alicdn.com/@sc04/kf/Ha7bdb6a357444c00b217448b58978ea1p.jpg"
              alt="Turbo Jet 2025"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Stock Notification */}
      <div className="max-w-md mx-auto px-4 mb-12">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="text-red-400 font-semibold">
              Forte demande : <span className="text-white font-bold">Plus que 7 pièces</span> en stock
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[90%] bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="max-w-md mx-auto px-4 mb-16">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-gray-400 mb-3">Offre de lancement expire dans :</p>
          <div className="flex justify-center gap-4">
            {[
              { value: timeLeft.hours, label: "H" },
              { value: timeLeft.minutes, label: "M" },
              { value: timeLeft.seconds, label: "S" },
            ].map((item, i) => (
              <div key={i} className="bg-black/50 rounded-xl px-4 py-3">
                <span className="text-3xl font-mono font-bold text-cyan-400">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-gray-500 text-sm ml-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            4 Fonctions en 1
          </h2>
          <p className="text-gray-500 text-center mb-12">Un seul appareil, des possibilités infinies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                  <f.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Pourquoi choisir Turbo Jet 2025 ?
          </h2>
          <p className="text-gray-500 text-center mb-12">La différence est claire</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-black/30">
              <div className="p-4 text-gray-500 text-sm uppercase tracking-wide" />
              <div className="p-4 text-center text-gray-500 font-semibold">Autres Souffleurs</div>
              <div className="p-4 text-center text-cyan-400 font-semibold bg-cyan-500/10 border-l border-cyan-500/30">
                Turbo Jet 2025
              </div>
            </div>
            {comparisons.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-white/5">
                <div className="p-4 text-gray-400">{row.feature}</div>
                <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{row.competitor}</span>
                </div>
                <div className="p-4 text-center bg-cyan-500/5 border-l border-cyan-500/30 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-white">{row.turbojet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Ils l&apos;ont adopté
          </h2>
          <p className="text-gray-500 text-center mb-12">+2000 clients satisfaits</p>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{r.name}</p>
                    <p className="text-gray-500 text-sm">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Questions Fréquentes
          </h2>
          <p className="text-gray-500 text-center mb-12">Tout ce que vous devez savoir</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-400">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section id="order" className="py-16 px-4">
        <div className="max-w-md mx-auto bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Turbo Jet 2025</h2>
          <p className="text-gray-400 mb-6">Souffleur 4-en-1 Professionnel</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-4xl font-black text-yellow-500">99,00€</span>
            <span className="text-xl text-gray-500 line-through">149,00€</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isCheckingOut ? (
              "Chargement..."
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Commander maintenant
              </>
            )}
          </button>
          <p className="text-gray-500 text-sm mt-4">Paiement 100% sécurisé par Stripe</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-white font-semibold">Livraison Offerte</span>
              <span className="text-gray-500 text-sm">France & Belgique</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-white font-semibold">Garantie 2 ans</span>
              <span className="text-gray-500 text-sm">SAV réactif</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-white font-semibold">Retour 30 jours</span>
              <span className="text-gray-500 text-sm">Satisfait ou remboursé</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <CreditCard className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-white font-semibold">Paiement sécurisé</span>
              <span className="text-gray-500 text-sm">CB, PayPal, Apple Pay</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 pt-8 border-t border-white/10">
            <Link href="/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition">CGV</Link>
            <Link href="/confidentialite" className="hover:text-white transition">Confidentialité</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
          <p className="text-center text-gray-600 text-sm mt-8">
            © 2025 GogoGadget. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
