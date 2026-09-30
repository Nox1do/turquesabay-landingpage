import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowDown, FaArrowRight, FaPlay } from 'react-icons/fa';

function HeroSection({ onWatchVideo }) {
  const reduced = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);
  const entrance = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="hero-section" className="relative isolate overflow-hidden bg-[#092f2d] text-white">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {!imageFailed && <motion.img src="/images/hero-bay.webp" srcSet="/images/bay.webp 1600w, /images/hero-bay.webp 1920w" sizes="100vw" alt="" width="1920" height="1280" fetchPriority="high" onError={() => setImageFailed(true)} className="h-full w-full object-cover object-center" initial={{ scale: reduced ? 1 : 1.035 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 0.6 }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e2b]/95 via-[#062e2b]/65 to-[#062e2b]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062e2b]/80 via-transparent to-[#062e2b]/10" />
      </div>
      <div className="mx-auto flex min-h-[660px] max-w-7xl flex-col justify-between px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:min-h-[calc(100svh-88px)] lg:pt-24">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }} className="max-w-3xl pb-16">
          <motion.p variants={entrance} className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.23em] text-teal-100 sm:text-xs"><span className="h-px w-8 bg-[#eeb95d]" />Samaná, Dominican Republic</motion.p>
          <motion.h1 variants={entrance} className="max-w-3xl font-serif text-[clamp(3.1rem,7vw,6.5rem)] font-normal leading-[1.04] tracking-[-0.035em]">
            A slower pace.<br /><span className="text-[#eeb95d]">A richer life.</span>
          </motion.h1>
          <motion.p variants={entrance} className="mt-7 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">Discover beachfront residences in Samaná. Space to unwind, a place to belong, and the Caribbean at your doorstep.</motion.p>
          <motion.div variants={entrance} className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link to="/amenities#residences" className="action-button w-full bg-[#eeb95d] px-7 py-4 text-sm text-teal-950 hover:bg-[#f3c879] sm:w-auto">Explore residences <FaArrowRight size={13} /></Link>
            <Link to="/contact" className="action-button w-full border border-white/40 px-7 py-4 text-sm text-white hover:bg-white/10 sm:w-auto">Schedule a visit</Link>
          </motion.div>
          <motion.button variants={entrance} type="button" onClick={onWatchVideo} className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white/90 transition-colors hover:text-[#eeb95d]"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40"><FaPlay size={11} /></span>Watch the film</motion.button>
        </motion.div>
        <div className="flex items-end justify-between gap-5 border-t border-white/25 pt-6">
          <a href="#gallery" className="flex min-h-11 items-center gap-3 text-xs font-medium uppercase tracking-widest text-white/85 hover:text-white"><FaArrowDown className="text-[#eeb95d]" />Discover TurquesaBay</a>
          <p className="hidden text-right text-xs leading-relaxed text-white/80 sm:block">Life by the water.<br /><span className="text-[#eeb95d]">Make room for what matters.</span></p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
