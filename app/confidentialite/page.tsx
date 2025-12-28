import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Gogo Gadget",
  description: "Politique de confidentialité et protection des données personnelles de Gogo Gadget.",
};

export default function Confidentialite() {
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
          Politique de Confidentialité
        </h1>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          La protection de vos données personnelles est une priorité pour Gogo Gadget.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              1. Collecte des données
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Nous collectons uniquement les informations nécessaires au traitement de votre commande (Nom, Adresse, Email).
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              2. Utilisation des données
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Vos données ne sont jamais revendues à des tiers. Elles servent uniquement à l&apos;expédition de vos produits et au service client.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              3. Paiements
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Les informations bancaires sont traitées directement par notre partenaire sécurisé Stripe. Nous n&apos;avons jamais accès à vos numéros de carte.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              4. Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Nous utilisons des cookies pour le bon fonctionnement du panier et l&apos;analyse du trafic.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              5. Vos droits
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Vous disposez d&apos;un droit d&apos;accès, de modification et de suppression de vos données sur simple demande à :{" "}
              <a
                href="mailto:gogogadget.app@gmail.com"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                gogogadget.app@gmail.com
              </a>
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
