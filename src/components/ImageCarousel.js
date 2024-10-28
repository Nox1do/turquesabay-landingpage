import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://imgur.com/LeMGEgR.jpg',
    info: 'Vista panorámica de la playa y el resort'
  },
  {
    src: 'https://imgur.com/TMyMETs.jpg',
    info: 'Hermosa piscina infinita con vista al océano'
  },
  {
    src: 'https://imgur.com/pKNXJ8j.jpg',
    info: 'Lujosas habitaciones con balcón y vista al mar'
  },
  {
    src: 'https://imgur.com/DRnBROY.jpg',
    info: 'Espectacular atardecer en la playa del resort'
  },
  {
    src: 'https://imgur.com/850JOSq.jpg',
    info: 'Área de playa privada con tumbonas y sombrillas'
  },
  {
    src: 'https://imgur.com/s5LURP6.jpg',
    info: 'Elegante restaurante con vista al océano'
  },
  {
    src: 'https://imgur.com/qx74qKE.jpg',
    info: 'Impresionante vista aérea del resort y sus alrededores'
  }
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [direction, setDirection] = useState(0);

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
        <img
          key={index}
          src={image.src}
          alt={`Vista del resort ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 cursor-pointer rounded-lg ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => openModal(currentIndex)}
        />
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
                  alt="Vista ampliada del resort"
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