import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import useCountUp from './useCountUp';
import { HERO_BACKGROUND_GIF, HERO_MESSAGES, HERO_STATS, BRAND_GOLD } from './homeContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function StatCard({ stat, index }) {
  const count = useCountUp(stat.value);
  const isGold = stat.accent === 'gold';
  const Icon = stat.icon;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="rounded-2xl border border-white/25 bg-white/10 p-5 text-center shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:bg-white/15 hover:shadow-xl"
    >
      <Icon
        className="mx-auto mb-3 h-7 w-7 drop-shadow-sm"
        style={{ color: isGold ? BRAND_GOLD : '#5eead4' }}
      />
      <div
        className="text-3xl font-extrabold leading-none drop-shadow-sm sm:text-4xl"
        style={{ color: isGold ? BRAND_GOLD : '#5eead4' }}
      >
        {count}
        {stat.suffix || ''}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-sm">
        {stat.label}
      </div>
    </motion.div>
  );
}

function HeroSection({ onWatchVideo }) {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = HERO_BACKGROUND_GIF;
    bgImage.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black"
    >
      {/* Background media */}
      <div className="absolute inset-0">
        {bgLoaded ? (
          <>
            <img
              src={HERO_BACKGROUND_GIF}
              alt="TurquesaBay beachfront at sunset"
              className="h-full w-full scale-110 animate-slow-zoom object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
            <div className="absolute left-[15%] top-16 h-40 w-40 animate-float-slow rounded-full bg-teal-400/25 blur-3xl" />
            <div className="absolute bottom-24 right-[18%] h-48 w-48 animate-float-delay rounded-full bg-[#eeb95d]/25 blur-3xl" />
          </>
        ) : (
          <div className="h-full w-full animate-pulse bg-gray-900" />
        )}
      </div>

      {/* Content grid: a traditional two-column landing hero, no absolute positioning */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
            Samaná, Dominican Republic
          </span>

          <h1 className="text-4xl font-bold leading-[1.1] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            Discover Your Dream
            <span
              className="mt-1 block font-summer-vibes text-5xl sm:text-6xl lg:text-7xl"
              style={{ color: BRAND_GOLD, filter: 'drop-shadow(0 4px 16px rgba(238,185,93,0.45))' }}
            >
              Paradise
            </span>
          </h1>

          <div className="mx-auto mt-6 h-16 max-w-xl overflow-hidden lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-base leading-relaxed text-white/90 sm:text-lg"
              >
                {HERO_MESSAGES[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row lg:justify-start">
            <Link
              to="/contact"
              className="w-full rounded-full bg-teal-500 px-10 py-3.5 text-center text-base font-bold text-white shadow-[0_8px_30px_rgba(20,184,166,0.35)] transition-all hover:bg-teal-600 hover:shadow-[0_8px_36px_rgba(20,184,166,0.5)] sm:w-auto"
            >
              Contact Us
            </Link>

            <button
              type="button"
              onClick={onWatchVideo}
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white/90 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 transition-colors group-hover:bg-[#eeb95d]">
                <span className="absolute inset-0 rounded-full bg-teal-500/40 animate-ping" />
                <FaPlay size={14} className="relative" />
              </span>
              <span className="text-base font-semibold">Watch Video</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          {HERO_STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="flex h-11 w-7 items-center justify-center rounded-full border-2 border-white/30">
          <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float-slow {
          animation: float-slow 9s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
