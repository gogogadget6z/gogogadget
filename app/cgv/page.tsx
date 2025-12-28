import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente - Gogo Gadget",
  description: "Conditions générales de vente de Gogo Gadget.",
};

export default function CGV() {
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
          Conditions Générales de Vente (CGV)
        </h1>

        <div className="space-y-8">
          {/* Article 1 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Article 1 - Objet
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Les présentes conditions régissent les ventes par la société Gogo Gadget d&apos;accessoires High-Tech et Auto.
            </p>
          </section>

          {/* Article 2 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Article 2 - Prix
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Les prix sont indiqués en euros. Nous nous réservons le droit de modifier nos prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
            </p>
          </section>

          {/* Article 3 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Article 3 - Paiement
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Le fait de valider votre commande implique l&apos;obligation de payer le prix indiqué. Le règlement s&apos;effectue par carte bancaire via notre système sécurisé.
            </p>
          </section>

          {/* Article 4 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Article 4 - Rétractation
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Conformément à la législation en vigueur, vous disposez d&apos;un délai de 14 jours pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.
            </p>
          </section>

          {/* Article 5 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Article 5 - Garanties
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés.
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
