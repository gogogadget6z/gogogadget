"use client";

import { useEffect, useRef, useState } from "react";

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  productName?: string;
  onSuccess?: (orderData: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  className?: string;
  style?: any;
}

// Type pour l'objet global PayPal
declare global {
  interface Window {
    paypal?: {
      Buttons: (options: any) => {
        render: (container: string | HTMLElement) => void;
        close: () => void;
      };
    };
    paypalButtonsInstances: Map<string, { close: () => void }>;
  }
}

// Initialiser le Map global pour stocker les instances
if (typeof window !== "undefined" && !window.paypalButtonsInstances) {
  window.paypalButtonsInstances = new Map();
}

// Compteur global pour générer des IDs uniques
let buttonIdCounter = 0;

export default function PayPalButton({
  amount,
  currency = "EUR",
  productName = "Produit",
  onSuccess,
  onError,
  onCancel,
  className = "",
  style = {
    layout: "vertical",
    color: "gold",
    shape: "rect",
    label: "paypal"
  }
}: PayPalButtonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Générer un ID unique pour cette instance
  const uniqueButtonId = useRef(`paypal-button-${buttonIdCounter++}`);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Récupérer le client ID depuis les variables d'environnement
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    if (!paypalClientId) {
      setError("Configuration PayPal manquante.");
      setIsLoading(false);
      return;
    }

    // Vérifier si le script PayPal est déjà chargé
    const scriptLoaded = !!window.paypal;
    scriptLoadedRef.current = scriptLoaded;

    if (scriptLoaded) {
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Charger le script PayPal dynamiquement - UNIQUEMENT le bouton jaune PayPal
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${currency}&intent=capture&components=buttons&disable-funding=card,credit,paylater,venmo,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort`;
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      scriptLoadedRef.current = true;
    };

    script.onerror = () => {
      setError("Impossible de charger PayPal. Veuillez réessayer.");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Ne pas supprimer le script si d'autres boutons en ont besoin
    };
  }, [currency]);

  useEffect(() => {
    if (!isLoaded || !window.paypal || !paypalContainerRef.current) {
      return;
    }

    const paypal = window.paypal;
    const buttonId = uniqueButtonId.current;

    // Nettoyer l'instance précédente si elle existe
    const previousInstance = window.paypalButtonsInstances?.get(buttonId);
    if (previousInstance) {
      previousInstance.close();
      window.paypalButtonsInstances.delete(buttonId);
    }

    // Créer et rendre le bouton PayPal
    const buttons = paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: productName,
              amount: {
                value: amount.toFixed(2),
                currency_code: currency
              }
            }
          ]
        });
      },
      onApprove: async (data: any, actions: any) => {
        try {
          const order = await actions.order.capture();
          if (onSuccess) {
            onSuccess(order);
          } else {
            // Redirection par défaut vers la page de succès
            window.location.href = `/success?order_id=${order.id}&token=${data.orderID}&PayerID=${data.payerID}`;
          }
        } catch (err) {
          console.error("Erreur lors de la capture de la commande:", err);
          if (onError) {
            onError(err);
          }
        }
      },
      onError: (err: any) => {
        console.error("Erreur PayPal:", err);
        setError("Une erreur est survenue lors du paiement.");
        if (onError) {
          onError(err);
        }
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        } else {
          // Redirection par défaut vers la page d'annulation
          window.location.href = "/cancel";
        }
      },
      style: style
    });

    // Stocker l'instance pour le nettoyage futur
    if (window.paypalButtonsInstances) {
      window.paypalButtonsInstances.set(buttonId, buttons);
    }

    // Rendre le bouton dans le conteneur
    buttons.render(paypalContainerRef.current);

    return () => {
      // Nettoyer l'instance du bouton PayPal
      const instance = window.paypalButtonsInstances?.get(buttonId);
      if (instance) {
        instance.close();
        window.paypalButtonsInstances.delete(buttonId);
      }
    };
  }, [isLoaded, amount, currency, productName, onSuccess, onError, onCancel, style]);

  return (
    <div className={`paypal-button-container ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <svg className="w-6 h-6 text-[#D4AF37] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm text-center p-2">{error}</div>
      )}
      <div ref={paypalContainerRef} />
    </div>
  );
}
