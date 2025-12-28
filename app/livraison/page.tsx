import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expédition & Livraison - Gogo Gadget",
  description: "Informations sur nos délais et conditions de livraison.",
};

export default function Livraison() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Expédition & Livraison
        </h1>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Chez Gogo Gadget, nous nous engageons à vous livrer les meilleures
          trouvailles de l&apos;Inspecteur le plus rapidement possible.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📦</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Traitement de la commande
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre commande est préparée et expédiée sous <span className="text-white font-medium">24h à 48h ouvrées</span>.
              Vous recevrez un email de confirmation dès l&apos;envoi.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🚚</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Délais de livraison
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Nos produits proviennent directement de nos partenaires internationaux
              pour vous offrir le meilleur rapport qualité/prix. Comptez généralement
              <span className="text-white font-medium"> 5 à 10 jours ouvrés</span> pour
              la livraison en France.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📍</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Suivi de colis
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Chaque colis dispose d&apos;un <span className="text-white font-medium">numéro de suivi</span> qui
              vous sera communiqué par email. Vous pourrez ainsi suivre votre
              commande à tout moment.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💰</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Frais de livraison
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <span className="text-green-400 font-medium">Livraison offerte</span> pour
              toute commande supérieure à <span className="text-white font-medium">50€</span>.
              <br />
              Sinon, frais de livraison : <span className="text-white font-medium">4,90€</span>.
            </p>
          </section>
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
