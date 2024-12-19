import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://imgur.com/LeMGEgR.jpg',
    info: 'Stunning beachfront view of TurquesaBay luxury resort with pristine white sand beach',
    alt: 'TurquesaBay beachfront panoramic view with crystal clear waters and luxury facilities'
  },
  {
    src: 'https://imgur.com/TMyMETs.jpg',
    info: 'Infinity pool overlooking the Caribbean Sea at TurquesaBay',
    alt: 'Luxurious infinity pool with panoramic ocean views at TurquesaBay resort'
  },
  {
    src: 'https://imgur.com/pKNXJ8j.jpg',
    info: 'Luxurious rooms with balcony and sea view',
    alt: 'Luxurious rooms with balcony and sea view'
  },
  {
    src: 'https://imgur.com/DRnBROY.jpg',
    info: 'Spectacular sunset at the resort beach',
    alt: 'Spectacular sunset at the resort beach'
  },
  {
    src: 'https://imgur.com/850JOSq.jpg',
    info: 'Private beach area with loungers and umbrellas',
    alt: 'Private beach area with loungers and umbrellas'
  },
  {
    src: 'https://imgur.com/s5LURP6.jpg',
    info: 'Elegant restaurant with ocean view',
    alt: 'Elegant restaurant with ocean view'
  },
  {
    src: 'https://imgur.com/qx74qKE.jpg',
    info: 'Breathtaking aerial view of the resort and surroundings',
    alt: 'Breathtaking aerial view of the resort and surroundings'
  }
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [direction, setDirection] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    let interval;
    if (!modalImage) {
      interval = setInterval(() => {
        nextImage();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [modalImage, nextImage]);

  const openModal = (index) => {
    setModalImage(images[index]);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const nextModalImage = () => {
    const currentIndex = images.findIndex(img => img.src === modalImage.src);
    setModalImage(images[(currentIndex + 1) % images.length]);
  };

  const prevModalImage = () => {
    const currentIndex = images.findIndex(img => img.src === modalImage.src);
    setModalImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const variants = {
    enter: {
      opacity: 0,
      scale: 0.9,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 1.1,
    },
  };

  return (
    <div className="relative overflow-hidden w-full h-96">
      {images.map((image, index) => (
        <div key={index} className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer
              ${loadedImages[index] ? 'opacity-0' : 'opacity-100'}
              transition-opacity duration-300`}
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite linear'
            }}
          />
          
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onLoad={() => handleImageLoad(index)}
            className={`
              absolute top-0 left-0 
              w-full h-full 
              object-cover 
              transition-opacity duration-500 
              rounded-lg
              ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}
              ${index === currentIndex ? 'z-10' : 'z-0'}
            `}
            onClick={() => openModal(currentIndex)}
          />
        </div>
      ))}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={prevImage}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
        onClick={nextImage}
      >
        &#10095;
      </button>
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
            onClick={handleModalClick}
            onTouchEnd={handleModalClick}
          >
            <motion.div 
              className="relative max-w-4xl max-h-full rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={modalImage.src}
                  src={modalImage.src}
                  alt={modalImage.alt}
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg"
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3, ease: "easeInOut" }
                  }}
                />
              </AnimatePresence>
              <motion.p 
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 font-sans text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {modalImage.info}
              </motion.p>
              <button
                className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 text-sm rounded-full hover:bg-teal-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                X
              </button>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal-500 bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  prevModalImage();
                }}
              >
                &#10094;
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  nextModalImage();
                }}
              >
                &#10095;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageCarousel;
