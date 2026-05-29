import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Piège de focus + Échap + restitution du focus pour modales et menus.
 */
export function useFocusTrap(active, onClose, options = {}) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const { initialFocusSelector = '[data-autofocus], .BR-Modal-Close, button, a[href]' } = options;

  useEffect(() => {
    if (!active) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusables = [...containerRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0,
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const timer = window.setTimeout(() => {
      const root = containerRef.current;
      if (!root) return;
      const target =
        root.querySelector(initialFocusSelector) || root.querySelector(FOCUSABLE);
      target?.focus();
    }, 0);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [active, onClose, initialFocusSelector]);

  return containerRef;
}
