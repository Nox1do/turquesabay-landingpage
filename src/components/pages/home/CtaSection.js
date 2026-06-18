import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaArrowRight } from 'react-icons/fa';
import { CONTACT_PHONE } from './homeContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f3d3a] py-20 sm:py-24">
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#eeb95d]/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Your Paradise Is Waiting.
            <span className="block" style={{ color: '#eeb95d' }}>
              Let's Make It Yours.
            </span>
          </h2>

          <p className="max-w-xl text-base text-white/75 sm:text-lg">
            Speak with our team today and take the first step toward owning a
            beachfront home in Samaná.
          </p>

          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Link
              to="/contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#eeb95d] px-9 py-3.5 text-base font-bold text-teal-950 shadow-lg shadow-black/20 transition-colors hover:bg-[#f3c879] sm:w-auto"
            >
              Get In Touch
              <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={CONTACT_PHONE.href}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-9 py-3.5 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 sm:w-auto"
            >
              <FaPhone className="h-4 w-4" />
              {CONTACT_PHONE.display}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection;
