import { useCallback, useLayoutEffect, useRef } from 'react';

// Dialogs render through a body portal so transformed sections cannot clip them.
export default function useDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  const openerRef = useRef(null);
  closeRef.current = onClose;
  const restoreFocus = useCallback(() => {
    if (openerRef.current?.isConnected) openerRef.current.focus();
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    openerRef.current = opener;
    const previousOverflow = document.body.style.overflow;
    const root = document.getElementById('root');
    const previousHidden = root?.getAttribute('aria-hidden');
    const previousInert = root?.inert;
    document.body.style.overflow = 'hidden';
    if (root) {
      root.inert = true;
      root.setAttribute('aria-hidden', 'true');
    }
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), iframe, [tabindex="0"]'
    ) || []);
    (dialogRef.current?.querySelector('[data-autofocus]') || focusable()[0] || dialogRef.current)?.focus();

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!items.length) {
        event.preventDefault();
        dialogRef.current?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      if (root) {
        root.inert = previousInert;
        if (previousHidden === null) root.removeAttribute('aria-hidden');
        else root.setAttribute('aria-hidden', previousHidden);
      }
      if (opener?.isConnected) opener.focus();
    };
  }, [isOpen]);

  return { dialogRef, restoreFocus };
}
