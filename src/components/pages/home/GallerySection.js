import React from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from '../../ImageCarousel';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white py-20 sm:py-24">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-teal-200/30 blur-[100px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#eeb95d]/20 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-teal-600/15 bg-teal-600/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-600 backdrop-blur-sm">
            Gallery
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="text-teal-600">Discover Our </span>
            <span className="text-[#eeb95d]">Paradise</span>
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Experience the beauty and luxury of TurquesaBay through our photo gallery.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-1.5 shadow-2xl backdrop-blur-sm"
        >
          <div className="overflow-hidden rounded-xl">
            <ImageCarousel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GallerySection;
