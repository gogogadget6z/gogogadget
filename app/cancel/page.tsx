import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
          Paiement annulé
        </h1>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Le paiement a été annulé, votre panier est toujours conservé. Vous pouvez reprendre vos achats à tout moment.
        </p>

        {/* Cart info box */}
        <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Panier sauvegardé
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Vos articles vous attendent. Finalisez votre commande quand vous êtes prêt.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            Retourner à la boutique
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-500">
          Besoin d'aide ? Notre équipe est là pour vous.
        </p>
      </div>
    </div>
  );
}
