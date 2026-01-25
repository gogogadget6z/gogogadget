import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-[#1E1E1E] rounded-2xl p-8 shadow-xl border border-[#D4AF37]/20 text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h1 className="text-2xl font-bold text-[#D4AF37] font-[family-name:var(--font-playfair)] mb-4">
            Verifiez votre email
          </h1>

          <p className="text-[#A0A0A0] mb-6">
            Un lien de connexion a ete envoye a votre adresse email.
            <br />
            Cliquez sur le lien pour vous connecter.
          </p>

          <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6">
            <p className="text-sm text-[#C0C0C0]">
              Le lien expire dans 24 heures.
              <br />
              Pensez a verifier vos spams si vous ne le voyez pas.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#2A2A2A] text-[#D4AF37] font-medium rounded-lg hover:bg-[#3A3A3A] transition-colors"
          >
            Retour a la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
