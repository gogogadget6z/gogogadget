"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { categories } from "@/lib/products";

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Tech",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: `Produit "${formData.name}" ajouté avec succès !` });
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Tech",
        });
      } else {
        setMessage({ type: "error", text: data.error || "Erreur lors de l'ajout" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur de connexion au serveur" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Administration
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Connecté</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Form Card */}
        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Ajouter un produit
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Remplissez le formulaire pour ajouter un nouvel article à la boutique.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-xl ${
                message.type === "success"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {message.type === "success" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {message.text}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Nom du produit *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: iPhone 16 Pro"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Décrivez votre produit..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Price & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Prix (EUR) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="99.99"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
                    €
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Ajout en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter le produit
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Info */}
        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Les produits ajoutés seront visibles immédiatement sur la boutique.
        </p>
      </main>
    </div>
  );
}
