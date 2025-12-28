import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retours & Remboursements - Gogo Gadget",
  description: "Politique de retour et conditions de remboursement de Gogo Gadget.",
};

export default function Retours() {
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
          Retours & Remboursements
        </h1>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Votre satisfaction est notre priorité. Découvrez notre politique de retour simple et transparente.
        </p>

        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔄</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Droit de rétractation
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conformément à la législation française, vous disposez d&apos;un délai de{" "}
              <span className="text-white font-medium">14 jours</span> à compter de la réception
              de votre commande pour exercer votre droit de rétractation, sans avoir à justifier
              de motifs.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📦</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Conditions de retour
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Pour être accepté, le produit doit être retourné dans son{" "}
              <span className="text-white font-medium">emballage d&apos;origine</span>, non utilisé
              et en parfait état. Les frais de retour sont à la charge du client.
              <br /><br />
              Merci de nous contacter par email avant tout retour pour obtenir les instructions.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💰</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Remboursement
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Une fois le retour reçu et vérifié, le remboursement sera effectué sous{" "}
              <span className="text-white font-medium">7 jours ouvrés</span> via le même moyen
              de paiement utilisé lors de la commande.
              <br /><br />
              <span className="text-green-400 font-medium">Les frais de livraison initiaux sont également remboursés</span> si le retour
              concerne l&apos;intégralité de la commande.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Produits défectueux
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Si vous recevez un produit défectueux ou endommagé, contactez-nous immédiatement
              avec des photos du produit. Nous organiserons un{" "}
              <span className="text-white font-medium">remplacement ou remboursement intégral</span>,
              frais de retour inclus.
            </p>
          </section>

          {/* Section 5 - Contact */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📧</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Nous contacter
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Pour toute demande de retour ou question, contactez notre service client :{" "}
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
