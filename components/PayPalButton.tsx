"use client";

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer, FUNDING } from "@paypal/react-paypal-js";
import { useEffect, useState, useCallback, useRef } from "react";

interface PayPalButtonProps {
  product: {
    title?: string;
    name?: string;
    price: number;
  };
  selectedVariant?: {
    price: number;
    name?: string;
  } | null;
}

// Force override des styles PayPal via JS (contourne les styles inline du SDK)
function usePayPalOverlayOverride(popupIsOpen: boolean) {
  useEffect(() => {
    // Fonction pour forcer les styles sur un élément
    const forceOverlayStyles = (element: HTMLElement, hide: boolean) => {
      if (hide) {
        // Option nucléaire : masquer si popup ouverte
        element.style.setProperty('display', 'none', 'important');
      } else {
        // Sinon, rendre semi-transparent
        element.style.setProperty('background', 'rgba(18, 18, 18, 0.6)', 'important');
        element.style.setProperty('background-color', 'rgba(18, 18, 18, 0.6)', 'important');
        element.style.setProperty('backdrop-filter', 'blur(4px)', 'important');
        element.style.setProperty('-webkit-backdrop-filter', 'blur(4px)', 'important');
      }
    };

    // Sélecteurs connus du SDK PayPal pour l'overlay
    const overlaySelectors = [
      '.paypal-checkout-sandbox',
      '.paypal-checkout-overlay',
      '.paypal-overlay-context-popup',
      '[data-paypal-overlay]',
      'div[style*="z-index"][style*="position: fixed"]', // Fallback générique
    ];

    // Applique les styles sur les overlays existants
    const applyToExisting = () => {
      overlaySelectors.forEach(selector => {
        document.querySelectorAll<HTMLElement>(selector).forEach(el => {
          // Vérifie que c'est bien un overlay PayPal (pas un autre élément)
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' && parseInt(style.zIndex) > 1000) {
            forceOverlayStyles(el, popupIsOpen);
          }
        });
      });

      // Ciblage spécifique des iframes PayPal overlay
      document.querySelectorAll<HTMLElement>('iframe[name*="paypal"]').forEach(iframe => {
        const parent = iframe.parentElement;
        if (parent && parent.style.position === 'fixed') {
          forceOverlayStyles(parent, popupIsOpen);
        }
      });
    };

    // Observer pour détecter l'ajout dynamique d'overlays par le SDK
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            // Vérifie si c'est un overlay PayPal
            const isPayPalOverlay =
              node.className?.includes?.('paypal') ||
              node.id?.includes?.('paypal') ||
              node.querySelector?.('[class*="paypal"]') ||
              (node.style?.position === 'fixed' && node.style?.zIndex && parseInt(node.style.zIndex) > 2000);

            if (isPayPalOverlay) {
              forceOverlayStyles(node, popupIsOpen);
              // Aussi traiter les enfants
              node.querySelectorAll<HTMLElement>('*').forEach(child => {
                const style = window.getComputedStyle(child);
                if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                  forceOverlayStyles(child, popupIsOpen);
                }
              });
            }
          }
        });
      });
    });

    // Démarre l'observation
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Applique immédiatement aux éléments existants
    applyToExisting();

    // Réapplique périodiquement (le SDK peut réappliquer ses styles)
    const interval = setInterval(applyToExisting, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [popupIsOpen]);
}

// Composant interne pour le bouton
function PayPalButtonWrapper({ product, selectedVariant }: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);
  const popupOpenedRef = useRef(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const price = selectedVariant?.price ?? product.price;

  // Active l'override des styles overlay
  usePayPalOverlayOverride(popupIsOpen);

  // Réinitialise l'état si l'utilisateur ferme la popup sans compléter
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && popupOpenedRef.current) {
        // Délai pour laisser PayPal terminer son flow
        setTimeout(() => {
          if (popupOpenedRef.current) {
            popupOpenedRef.current = false;
            setIsProcessing(false);
            setPopupIsOpen(false);
          }
        }, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleClick = useCallback((data: Record<string, unknown>, actions: { resolve: () => Promise<void>; reject: () => Promise<void> }) => {
    // Marque que la popup va s'ouvrir
    popupOpenedRef.current = true;
    setIsProcessing(true);
    setPopupIsOpen(true); // Active l'option nucléaire : masque l'overlay
    // Permet au SDK de continuer l'ouverture de la popup
    return actions.resolve();
  }, []);

  const handleCancel = useCallback(() => {
    // L'utilisateur a fermé la popup PayPal sans payer
    popupOpenedRef.current = false;
    setIsProcessing(false);
    setPopupIsOpen(false);
  }, []);

  if (isPending) {
    return <div className="text-center py-4 text-gray-400">Chargement PayPal...</div>;
  }

  return (
    <PayPalButtons
      fundingSource={FUNDING.PAYPAL}
      style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
      disabled={isProcessing}
      onClick={handleClick}
      createOrder={(data, actions) => {
        const cleanPrice = Number(price).toFixed(2);
        console.log("Creating order for:", cleanPrice);

        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: cleanPrice,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          await actions.order.capture();
          popupOpenedRef.current = false;
          setPopupIsOpen(false);
          window.location.href = `/success?order_id=${data.orderID}`;
        }
      }}
      onCancel={handleCancel}
      onError={(err) => {
        console.error("Erreur PayPal:", err);
        popupOpenedRef.current = false;
        setIsProcessing(false);
        setPopupIsOpen(false);
        alert("Erreur de paiement. Veuillez réessayer.");
      }}
    />
  );
}

// Composant principal avec Provider
const PayPalButton = ({ product, selectedVariant }: PayPalButtonProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center py-4 text-gray-400">Chargement...</div>;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AcH8_x9wgLdWo2rlGBZoip6TOfX2flAPVhfgzeoj2EEHhT8uEtsj6JF0XrT6xq2c4V4w1xer_GERkxtC",
        currency: "EUR",
        intent: "capture",
        components: "buttons",
      }}
      deferLoading={false}
    >
      <PayPalButtonWrapper product={product} selectedVariant={selectedVariant} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
