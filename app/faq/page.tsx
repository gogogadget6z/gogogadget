import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - Gogo Gadget",
  description: "Questions fréquentes sur nos produits, livraisons et paiements.",
};

const faqs = [
  {
    question: "Les produits sont-ils compatibles avec tous les téléphones ?",
    answer: "Oui, la majorité de nos accessoires (chargeurs, câbles, supports) sont universels et fonctionnent avec iPhone, Samsung, et tout appareil USB-C ou Bluetooth.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous expédions votre commande sous 24/48h. La livraison prend ensuite 5 à 10 jours ouvrés en moyenne.",
  },
  {
    question: "Puis-je suivre mon colis ?",
    answer: "Absolument. Dès l'expédition, vous recevrez un numéro de suivi par email pour localiser votre commande en temps réel.",
  },
  {
    question: "Que faire si le produit ne me plaît pas ?",
    answer: "Vous avez 14 jours après réception pour changer d'avis. Contactez-nous simplement à gogogadget.app@gmail.com pour organiser le retour et le remboursement.",
  },
  {
    question: "Le paiement est-il sécurisé ?",
    answer: "Oui, nous utilisons Stripe, le leader mondial des paiements en ligne. Vos données bancaires sont cryptées et nous n'y avons jamais accès.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="bg-[#0A0A0A] border-b border-yellow-500/20">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Gogo Gadget
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10">
          Questions Fréquentes
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800"
            >
              <h2 className="text-lg font-bold text-yellow-500 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Bouton retour */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Retour à la boutique
          </Link>
        </div>
      </main>
    </div>
  );
}
