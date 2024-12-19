import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ImageWithShimmer({ src, alt, className, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear'
        }}
      />
      
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`
          w-full h-full 
          object-cover 
          ${className}
        `}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          scale: { duration: 0.7, ease: "easeOut" }
        }}
        onLoad={() => setIsLoaded(true)}
        onClick={onClick}
      />
    </div>
  );
}

export default ImageWithShimmer; 