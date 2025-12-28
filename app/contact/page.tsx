import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Gogo Gadget",
  description: "Contactez l'équipe Gogo Gadget pour toute question sur vos commandes ou nos produits.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="bg-[#0A0A0A] border-b border-yellow-500/20">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Gogo Gadget
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-[#0A0A0A] rounded-2xl p-8 sm:p-10 border border-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contactez l&apos;Inspecteur
          </h1>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Une question sur un gadget ? Un souci avec votre commande ? Notre équipe est là pour vous.
          </p>

          {/* Message FAQ */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 mb-8">
            <p className="text-gray-300 leading-relaxed">
              <span className="text-xl mr-2">💡</span>
              La réponse à votre question se trouve peut-être déjà dans notre{" "}
              <Link
                href="/faq"
                className="text-yellow-500 hover:text-yellow-400 font-medium underline underline-offset-2 transition-colors"
              >
                FAQ
              </Link>
              . N&apos;hésitez pas à la consulter pour une réponse immédiate.
            </p>
          </div>

          {/* Email principal */}
          <div className="text-center py-8 border-t border-b border-gray-800">
            <p className="text-sm text-gray-500 mb-3">Écrivez-nous à :</p>
            <a
              href="mailto:gogogadget.app@gmail.com"
              className="text-2xl sm:text-3xl font-bold text-white hover:text-yellow-500 transition-colors break-all"
            >
              gogogadget.app@gmail.com
            </a>
            <div className="mt-6">
              <a
                href="mailto:gogogadget.app@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Envoyer un email
              </a>
            </div>
          </div>

          {/* Infos délais et horaires */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="text-xl">⏱️</span>
                <h3 className="font-semibold text-white">Délais de réponse</h3>
              </div>
              <p className="text-gray-400">
                Nous répondons à tous les messages sous <span className="text-white font-medium">24h ouvrées</span>.
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="text-xl">🕐</span>
                <h3 className="font-semibold text-white">Horaires</h3>
              </div>
              <p className="text-gray-400">
                Support actif du <span className="text-white font-medium">Lundi au Vendredi</span>, de 9h à 18h.
              </p>
            </div>
          </div>
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
