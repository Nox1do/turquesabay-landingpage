import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ImageCarousel from '../../ImageCarousel';

function GallerySection() {
  const reduced = useReducedMotion();
  return (
    <section id="gallery" className="bg-[#fbfaf7] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: reduced ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="mb-10 grid items-end gap-5 md:grid-cols-2">
          <div><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700">01 / Discover the setting</p><h2 className="font-serif text-4xl leading-tight tracking-tight text-teal-950 sm:text-5xl">A place to<br /><span className="italic text-[#9b6f30]">feel at home.</span></h2></div>
          <p className="max-w-md text-base leading-relaxed text-slate-600 md:ml-auto">From the palms to the bay, discover the details that give TurquesaBay its character. Take a closer look, at your own pace.</p>
        </motion.div>
        <ImageCarousel />
      </div>
    </section>
  );
}

export default GallerySection;
