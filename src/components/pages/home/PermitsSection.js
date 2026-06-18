import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { PERMIT_ITEMS, PERMITS_IMAGE } from './homeContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function PermitCard({ item, index }) {
  const isGold = item.accent === 'gold';
  const Icon = item.icon;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay: 0.06 * index }}
      className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/10 p-5 shadow-md shadow-black/5 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/15"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10"
        style={{ color: isGold ? '#eeb95d' : '#5eead4' }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-white">{item.text}</span>
        <span
          className="text-sm font-semibold"
          style={{ color: isGold ? '#eeb95d' : '#5eead4' }}
        >
          {item.subtext}
        </span>
      </div>
    </motion.div>
  );
}

function PermitsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-teal-800 py-20 sm:py-24">
      <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[#eeb95d]/10 blur-[120px]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              <span className="text-teal-300">All Permits</span>
              <span className="text-white"> & </span>
              <span className="text-[#eeb95d]">Approvals Ready</span>
            </h2>

            <p className="mb-8 text-base leading-relaxed text-white/80 sm:text-lg">
              Our project has successfully obtained all necessary permits and
              approvals, ensuring a secure investment environment for our
              clients. Every detail has been carefully reviewed and authorized
              by the relevant authorities.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {PERMIT_ITEMS.map((item, index) => (
                <PermitCard key={item.text} item={item} index={index} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={PERMITS_IMAGE}
                alt="Legal documentation and permits review"
                className="h-[420px] w-full object-cover sm:h-[480px] lg:h-[560px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-teal-500/90 to-teal-600/90 text-center shadow-xl backdrop-blur-md">
              <div>
                <FaCheck className="mx-auto mb-1 h-7 w-7 text-[#eeb95d]" />
                <span className="text-xs font-bold text-white">100% Approved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PermitsSection;
