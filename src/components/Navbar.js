import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaBars, FaTimes, FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const links = [
  { to: '/', label: 'Home', aria: 'Home page' },
  { to: '/amenities', label: 'Amenities', aria: 'View our amenities' },
  { to: '/contact', label: 'Contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 48);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const navigationLinks = (mobile = false) => links.map((link) => (
    <NavLink key={link.to} to={link.to} end={link.to === '/'} aria-label={link.aria}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) => `${mobile ? 'block rounded-xl px-4 py-3' : 'relative px-1 py-2'} text-sm font-semibold transition-colors ${isActive ? 'text-teal-800' : 'text-slate-600 hover:text-teal-800'}`}
    >
      {({ isActive }) => <>
        {link.label}
        {isActive && !mobile && <motion.span layoutId={reduced ? undefined : 'active-nav'} className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-teal-700" />}
      </>}
    </NavLink>
  ));

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${compact ? 'border-teal-900/10 bg-white/95 shadow-sm backdrop-blur-md' : 'border-stone-200 bg-[#fbfaf7]'}`} data-compact={compact}>
      <nav aria-label="Main navigation" className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 md:h-[88px] lg:px-8">
        <Link to="/" aria-label="TurquesaBay home" className="flex shrink-0 items-center gap-2.5">
          <motion.img src="https://i.imgur.com/46EfL9t.png" alt="" width="44" height="44" className="h-10 w-10 object-contain md:h-11 md:w-11" animate={{ scale: compact ? 0.9 : 1 }} />
          <span className="text-xl font-bold tracking-tight md:text-2xl"><span className="text-teal-800">Turquesa</span><span className="text-[#b88030]">Bay</span></span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navigationLinks()}
          <a href="https://api.whatsapp.com/send?phone=18294232020" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hidden text-teal-800 lg:block"><FaWhatsapp size={21} /></a>
          <Link to="/contact" className="action-button bg-teal-900 px-5 py-3 text-sm text-white hover:bg-teal-800">Schedule a visit <FaArrowRight size={12} /></Link>
        </div>
        <button ref={toggleRef} type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-900/15 text-teal-900 md:hidden">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <AnimatePresence>
          {isOpen && <motion.div id="mobile-menu" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.18 }} className="absolute inset-x-0 top-full border-b border-stone-200 bg-[#fbfaf7] p-5 shadow-xl md:hidden">
            {navigationLinks(true)}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="action-button mt-3 w-full bg-teal-900 px-5 py-3 text-sm text-white">Schedule a visit <FaArrowRight size={12} /></Link>
          </motion.div>}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
