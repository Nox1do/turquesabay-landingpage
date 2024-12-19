import React from 'react';
import ImageWithShimmer from './ImageWithShimmer';
import { motion } from 'framer-motion';

const amenities = [
  {
    title: "Infinity Pool",
    description: "Spectacular infinity pool overlooking the Caribbean Sea",
    image: "https://imgur.com/TMyMETs.jpg",
    alt: "Luxury infinity pool with ocean view at TurquesaBay"
  },
  {
    title: "Private Beach",
    description: "Direct access to pristine white sand beach",
    image: "https://imgur.com/850JOSq.jpg",
    alt: "Private beach access at TurquesaBay resort"
  },
  {
    title: "Gourmet Restaurant",
    description: "Fine dining with panoramic ocean views",
    image: "https://imgur.com/s5LURP6.jpg",
    alt: "Elegant restaurant with ocean view at TurquesaBay"
  },
  {
    title: "Luxury Spa",
    description: "World-class spa and wellness center",
    image: "https://imgur.com/example.jpg",
    alt: "Luxury spa facilities at TurquesaBay"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }
  }
};

function Amenities() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="text-4xl font-bold text-center mb-12"
      >
        <span className="text-teal-600">World-Class</span> Amenities
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {amenities.map((amenity, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }
            }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <ImageWithShimmer
                src={amenity.image}
                alt={amenity.alt}
                className="cursor-pointer transition-all duration-700 ease-in-out transform hover:scale-110"
              />
            </div>
            
            <motion.div 
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-teal-600 mb-2">
                {amenity.title}
              </h3>
              <p className="text-gray-600">
                {amenity.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        <motion.button 
          className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          Explore All Amenities
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Amenities; 