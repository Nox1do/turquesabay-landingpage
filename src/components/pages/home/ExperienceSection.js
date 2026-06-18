import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUmbrellaBeach, FaConciergeBell } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const EXPERIENCE_CARDS = [
  {
    title: 'Luxury Living',
    icon: FaHome,
    description: 'Experience the epitome of luxury in our beachfront residences',
    accent: 'gold',
  },
  {
    title: 'Ocean Views',
    icon: FaUmbrellaBeach,
    description: 'Wake up to breathtaking panoramic ocean views every day',
    accent: 'teal',
  },
  {
    title: 'Premium Service',
    icon: FaConciergeBell,
    description: 'Enjoy world-class amenities and personalized service',
    accent: 'gold',
  },
];

function ExperienceCard({ card, index }) {
  const isGold = card.accent === 'gold';
  const Icon = card.icon;

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/15"
    >
      <Icon
        className="mb-4 h-9 w-9 drop-shadow-sm"
        style={{ color: isGold ? '#eeb95d' : '#5eead4' }}
      />
      <h3
        className="mb-2 text-lg font-bold"
        style={{ color: isGold ? '#eeb95d' : '#5eead4' }}
      >
        {card.title}
      </h3>
      <p className="text-sm leading-relaxed text-teal-100/70">{card.description}</p>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1188470/pexels-photo-1188470.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-teal-300/25 bg-teal-500/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300 backdrop-blur-sm">
            Experience Paradise
          </span>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Live an{' '}
            <span className="font-summer-vibes text-teal-400">Unforgettable</span>{' '}
            <span className="font-summer-vibes text-[#eeb95d]">Experience</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-teal-100/80 sm:text-lg">
            Ready to make your dream of owning a luxury beachfront property come
            true? Contact us and let us help you discover your perfect paradise
            in Samaná.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {EXPERIENCE_CARDS.map((card, index) => (
            <ExperienceCard key={card.title} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;
