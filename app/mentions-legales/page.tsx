import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales - Gogo Gadget",
  description: "Mentions légales et informations juridiques de Gogo Gadget.",
};

export default function MentionsLegales() {
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
          Mentions Légales
        </h1>

        <div className="space-y-8">
          {/* Section 1 - Édition du site */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Édition du site
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Le site <span className="text-white font-medium">gogogadget.app</span> est
              édité par <span className="text-white font-medium">Gogo Gadget</span>.
              <br /><br />
              Pour toute question, vous pouvez nous contacter à :{" "}
              <a
                href="mailto:gogogadget.app@gmail.com"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                gogogadget.app@gmail.com
              </a>
            </p>
          </section>

          {/* Section 2 - Hébergement */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌐</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Hébergement
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Le site est hébergé par la société{" "}
              <span className="text-white font-medium">Vercel Inc.</span>, située au
              340 S Lemon Ave #4133 Walnut, CA 91789, USA.
            </p>
          </section>

          {/* Section 3 - Propriété Intellectuelle */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">©</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Propriété Intellectuelle
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              L&apos;ensemble de ce site relève de la législation française et internationale
              sur le droit d&apos;auteur et la propriété intellectuelle.{" "}
              <span className="text-white font-medium">Tous les droits de reproduction sont réservés.</span>
            </p>
          </section>

          {/* Section 4 - Données Personnelles */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔒</span>
              <h2 className="text-xl font-semibold text-yellow-500">
                Données Personnelles
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Les informations recueillies font l&apos;objet d&apos;un traitement informatique
              destiné à traiter vos commandes.
              <br /><br />
              Conformément à la loi « informatique et libertés », vous bénéficiez d&apos;un{" "}
              <span className="text-white font-medium">droit d&apos;accès et de rectification</span> aux
              informations qui vous concernent.
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
