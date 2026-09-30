import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname, hash } = useLocation();
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  if (!visible) return null;
  return <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })} className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-teal-900 text-white shadow-lg hover:bg-teal-800"><FaArrowUp /></button>;
}

export default ScrollToTop;
