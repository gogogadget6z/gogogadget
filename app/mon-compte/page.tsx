"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import { User, Mail, LogOut } from "lucide-react";

export default function MonComptePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        </div>
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#121212] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1E1E1E] rounded-2xl p-8 shadow-xl border border-[#D4AF37]/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h1 className="text-3xl font-bold text-[#D4AF37] font-[family-name:var(--font-playfair)]">
                Mon Compte
              </h1>
            </div>

            <div className="space-y-6">
              <div className="bg-[#2A2A2A] rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-sm text-[#A0A0A0]">Email</p>
                    <p className="text-white font-medium">{session.user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#3A3A3A] pt-6">
                <h2 className="text-xl font-semibold text-[#C0C0C0] mb-4">
                  Historique des commandes
                </h2>
                <div className="bg-[#2A2A2A] rounded-lg p-6 text-center">
                  <p className="text-[#A0A0A0]">
                    Aucune commande pour le moment.
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600/20 text-red-400 font-medium rounded-lg hover:bg-red-600/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Se deconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
