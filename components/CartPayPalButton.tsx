"use client";

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer, FUNDING } from "@paypal/react-paypal-js";
import { useEffect, useState, useCallback, useRef } from "react";
import { CartItem } from "@/contexts/CartContext";

interface CartPayPalButtonProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

// Hook Option Nucléaire - masque l'overlay noir PayPal
function usePayPalOverlayOverride(popupIsOpen: boolean) {
  useEffect(() => {
    const forceOverlayStyles = (element: HTMLElement, hide: boolean) => {
      if (hide) {
        element.style.setProperty('display', 'none', 'important');
      } else {
        element.style.setProperty('background', 'rgba(18, 18, 18, 0.6)', 'important');
        element.style.setProperty('background-color', 'rgba(18, 18, 18, 0.6)', 'important');
        element.style.setProperty('backdrop-filter', 'blur(4px)', 'important');
        element.style.setProperty('-webkit-backdrop-filter', 'blur(4px)', 'important');
      }
    };

    const overlaySelectors = [
      '.paypal-checkout-sandbox',
      '.paypal-checkout-overlay',
      '.paypal-overlay-context-popup',
      '[data-paypal-overlay]',
      'div[style*="z-index"][style*="position: fixed"]',
    ];

    const applyToExisting = () => {
      overlaySelectors.forEach(selector => {
        document.querySelectorAll<HTMLElement>(selector).forEach(el => {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' && parseInt(style.zIndex) > 1000) {
            forceOverlayStyles(el, popupIsOpen);
          }
        });
      });

      document.querySelectorAll<HTMLElement>('iframe[name*="paypal"]').forEach(iframe => {
        const parent = iframe.parentElement;
        if (parent && parent.style.position === 'fixed') {
          forceOverlayStyles(parent, popupIsOpen);
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            const isPayPalOverlay =
              node.className?.includes?.('paypal') ||
              node.id?.includes?.('paypal') ||
              node.querySelector?.('[class*="paypal"]') ||
              (node.style?.position === 'fixed' && node.style?.zIndex && parseInt(node.style.zIndex) > 2000);

            if (isPayPalOverlay) {
              forceOverlayStyles(node, popupIsOpen);
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

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    applyToExisting();
    const interval = setInterval(applyToExisting, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [popupIsOpen]);
}

// Composant interne
function CartPayPalButtonInner({ items, total, onSuccess }: CartPayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const popupOpenedRef = useRef(false);

  usePayPalOverlayOverride(popupIsOpen);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && popupOpenedRef.current) {
        setTimeout(() => {
          if (popupOpenedRef.current) {
            popupOpenedRef.current = false;
            setPopupIsOpen(false);
          }
        }, 500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleClick = useCallback((data: Record<string, unknown>, actions: { resolve: () => Promise<void>; reject: () => Promise<void> }) => {
    popupOpenedRef.current = true;
    setPopupIsOpen(true);
    return actions.resolve();
  }, []);

  const handleCancel = useCallback(() => {
    popupOpenedRef.current = false;
    setPopupIsOpen(false);
  }, []);

  if (isPending) {
    return <div className="text-center py-3 text-gray-400 text-sm">Chargement PayPal...</div>;
  }

  return (
    <PayPalButtons
      fundingSource={FUNDING.PAYPAL}
      style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay", height: 45 }}
      onClick={handleClick}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [{
            amount: {
              currency_code: "EUR",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value: total.toFixed(2),
                },
              },
            },
            items: items.map((item) => ({
              name: item.name + (item.variantName ? ` - ${item.variantName}` : ''),
              quantity: String(item.quantity),
              unit_amount: {
                currency_code: "EUR",
                value: item.price.toFixed(2),
              },
              category: "PHYSICAL_GOODS" as const,
            })),
          }],
        });
      }}
      onApprove={async (data, actions) => {
        if (actions.order) {
          await actions.order.capture();
          popupOpenedRef.current = false;
          setPopupIsOpen(false);
          onSuccess();
          window.location.href = `/success?order_id=${data.orderID}`;
        }
      }}
      onCancel={handleCancel}
      onError={(err) => {
        console.error("Erreur PayPal:", err);
        popupOpenedRef.current = false;
        setPopupIsOpen(false);
        alert("Erreur de paiement PayPal. Veuillez réessayer.");
      }}
    />
  );
}

// Composant principal avec Provider
export default function CartPayPalButton({ items, total, onSuccess }: CartPayPalButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) {
    return <div className="text-center py-3 text-gray-400 text-sm">Chargement...</div>;
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
      <CartPayPalButtonInner items={items} total={total} onSuccess={onSuccess} />
    </PayPalScriptProvider>
  );
}
