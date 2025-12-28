import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
          Paiement réussi !
        </h1>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Merci pour votre achat. Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>

        {/* Order confirmation box */}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Confirmation envoyée
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Vérifiez votre boîte de réception pour le reçu de paiement Stripe.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            Continuer mes achats
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-500">
          Une question ? Contactez notre support client.
        </p>
      </div>
    </div>
  );
}
