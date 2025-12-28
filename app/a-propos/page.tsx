import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À Propos - Gogo Gadget",
  description: "Découvrez l'histoire et la mission de Gogo Gadget, votre laboratoire de sélection de gadgets.",
};

export default function APropos() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-12">
          Qui se cache derrière l&apos;Inspecteur ?
        </h1>

        <div className="space-y-10">
          {/* Section 1 - Le Constat */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Le Constat
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Internet est inondé de gadgets. Certains sont géniaux, d&apos;autres... finissent à la poubelle au bout de deux jours. C&apos;est là que nous intervenons.
            </p>
          </section>

          {/* Section 2 - La Mission */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              La Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Gogo Gadget n&apos;est pas une simple boutique. C&apos;est un laboratoire de sélection. Notre mission est simple : filtrer le bruit pour ne garder que la musique. Nous testons des dizaines de produits chaque mois.
            </p>
          </section>

          {/* Section 3 - Le Label */}
          <section className="bg-[#0A0A0A] rounded-xl p-6 border border-yellow-500/30">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Le Label &quot;Validé par l&apos;Inspecteur&quot;
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Quand vous voyez ce badge sur un produit, cela signifie qu&apos;il a passé nos critères drastiques :
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-yellow-500">✓</span>
                <span className="font-medium text-white">Utilité réelle</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-yellow-500">✓</span>
                <span className="font-medium text-white">Durabilité</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-yellow-500">✓</span>
                <span className="font-medium text-white">Design innovant</span>
              </li>
            </ul>
          </section>

          {/* Section 4 - Notre Promesse */}
          <section>
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Notre Promesse
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Nous ne vendons pas ce que nous n&apos;utiliserions pas nous-mêmes. C&apos;est ça, la garantie Gogo Gadget.
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
