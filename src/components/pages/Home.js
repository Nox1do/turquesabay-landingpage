import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaBuilding, FaWater, FaStar, FaRegCalendarCheck, FaRegFileAlt, FaLeaf, FaLandmark, FaAnchor, FaHardHat, FaPhone, FaCheck, FaHome, FaUmbrellaBeach, FaConciergeBell } from 'react-icons/fa';
import ImageCarousel from '../ImageCarousel'; // Asegúrate de que la ruta sea correcta

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    const endValue = parseFloat(end);

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      if (progress < 1) {
        const currentCount = Math.floor(endValue * progress);
        setCount(currentCount);
        countRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    countRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [end, duration]);

  return count;
};

const StatCard = ({ stat, index }) => {
  const count = useCounter(stat.value);
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      {/* Fondo con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:opacity-70`}></div>
      
      {/* Borde con brillo */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>
      
      {/* Contenido */}
      <div className="relative p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center h-full">
        <div className="mb-6">
          {stat.icon}
        </div>
        <div className={`text-5xl font-black mb-3 ${stat.textColor} transition-colors`}>
          {count}{stat.suffix || ''}
        </div>
        <div className={`text-lg font-bold tracking-wide ${stat.textColor} opacity-90`}>
          {stat.label}
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

function Home({ isLoading }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  const messages = [
    "Discover your dream beachfront apartment in Samaná, Dominican Republic.", 
    "Experience the perfect blend of luxury and natural beauty at TurquesaBay.",
    "Wake up to breathtaking ocean views every day. Your paradise awaits at TurquesaBay.",
    "Indulge in world-class amenities and unparalleled comfort. TurquesaBay: Where luxury meets nature.",
    "Invest in your future with our premium beachfront properties. TurquesaBay: A smart choice for discerning investors.",
    "Experience the Caribbean lifestyle at its finest. TurquesaBay: Your gateway to endless summer.",
    "Escape to your own private oasis. TurquesaBay: Where every day feels like a vacation."
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const messageAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTF0emg3OTk4djhwdWxkd2J3ODY0aHgwZGV0am4zNGMyMTd6bXQwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cCrIevg50IYRUkVSbk/giphy.webp";
    bgImage.onload = () => setBgImageLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const openVideoModal = () => setShowVideoModal(true);
  const closeVideoModal = () => setShowVideoModal(false);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  };

  return (
    <div className="font-sans">
      {!isLoading && (
        <>
          {/* Hero Section - Ajustes de centrado */}
          <motion.section 
            id="hero-section"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center"
          >
            {/* Video de fondo con overlay */}
            <div className="absolute inset-0">
              {bgImageLoaded ? (
                <>
                  <div className="relative h-full">
                    <img 
                      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTF0emg3OTk4djhwdWxkd2J3ODY0aHgwZGV0am4zNGMyMTd6bXQwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cCrIevg50IYRUkVSbk/giphy.webp"
                      alt="Beach background"
                      className="w-full h-full object-cover scale-110 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                    
                    {/* Elementos decorativos flotantes */}
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <div className="absolute top-20 left-[20%] w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-float-slow"></div>
                      <div className="absolute bottom-40 right-[30%] w-40 h-40 bg-[#eeb95d]/20 rounded-full blur-3xl animate-float-delay"></div>
                    </motion.div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-900 animate-pulse"></div>
              )}
            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 container mx-auto px-4 py-20">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-7xl mx-auto">
                {/* Columna Izquierda */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="lg:w-1/2 text-center lg:text-left flex flex-col items-center"
                >
                  <h1 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                    <motion.span 
                      className="block text-white mb-3 drop-shadow-[0_4px_0px_rgba(0,0,0,1)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                     Embrace Your
                    </motion.span>
                    <motion.span 
                      className="block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <span className="text-teal-400 font-['Summer_Vibes'] text-6xl lg:text-7xl -mt-4 inline-block">Dream</span>{' '}
                      <span className="text-[#eeb95d] font-['Summer_Vibes'] text-6xl lg:text-7xl -mt-4 inline-block">Paradise</span>
                    </motion.span>
                  </h1>

                  {/* Mensajes animados */}
                  <div className="h-28 mb-10 overflow-hidden max-w-xl mx-auto lg:mx-0">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={currentMessageIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl lg:text-2xl text-white/80 leading-relaxed"
                      >
                        {messages[currentMessageIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Botones de acción */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-8 justify-center w-full"
                  >
                    <Link 
                      to="/contact" 
                      className="group relative px-12 py-4 rounded-full overflow-hidden w-full sm:w-auto text-center bg-teal-500 text-white font-bold hover:bg-teal-600 transition-colors duration-300"
                    >
                      <span className="relative text-xl">
                        Contact Us
                      </span>
                    </Link>

                    <motion.button
                      onClick={openVideoModal}
                      className="flex items-center gap-4 text-white/90 hover:text-white group w-full sm:w-auto justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-teal-500/30 rounded-full animate-ping"></div>
                        <div className="relative bg-teal-500 rounded-full p-3 group-hover:bg-[#eeb95d] transition-colors duration-300">
                          <FaPlay size={20} />
                        </div>
                      </div>
                      <span className="text-xl font-bold">Watch Video</span>
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Columna Derecha - Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="lg:w-1/2 grid grid-cols-2 gap-6 max-w-lg w-full"
                >
                  {[
                    { 
                      value: "40", 
                      label: "Luxury Units", 
                      icon: <FaBuilding className="w-10 h-10 text-[#eeb95d]" />,
                      gradient: "from-[#eeb95d]/20 to-[#eeb95d]/10",
                      textColor: "text-[#eeb95d]"
                    },
                    { 
                      value: "100", 
                      label: "Ocean View", 
                      suffix: "%",
                      icon: <FaWater className="w-10 h-10 text-teal-400" />,
                      gradient: "from-teal-400/20 to-teal-400/10",
                      textColor: "text-teal-400"
                    },
                    { 
                      value: "5", 
                      label: "Star Amenities", 
                      icon: <FaStar className="w-10 h-10 text-[#eeb95d]" />,
                      gradient: "from-[#eeb95d]/20 to-[#eeb95d]/10",
                      textColor: "text-[#eeb95d]"
                    },
                    { 
                      value: "2024", 
                      label: "Completion", 
                      icon: <FaRegCalendarCheck className="w-10 h-10 text-teal-400" />,
                      gradient: "from-teal-400/20 to-teal-400/10",
                      textColor: "text-teal-400"
                    }
                  ].map((stat, index) => (
                    <StatCard key={index} stat={stat} index={index} />
                  ))}
                </motion.div>
              </div>

              {/* Scroll Indicator - Ajustado posición */}
              <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce"></div>
                </div>
              </motion.div>
            </div>

            {/* Estilos CSS adicionales necesarios */}
            <style jsx>{`
              @keyframes slow-zoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
              }
              @keyframes float-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
              @keyframes float-delay {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-30px); }
              }
              .animate-slow-zoom {
                animation: slow-zoom 20s linear infinite alternate;
              }
              .animate-float-slow {
                animation: float-slow 8s ease-in-out infinite;
              }
              .animate-float-delay {
                animation: float-delay 12s ease-in-out infinite;
              }
            `}</style>
          </motion.section>

          {/* TurquesaPhotos Section - Nuevo Diseño */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white"
          >
            {/* Elementos decorativos de fondo */}
            <motion.div 
              className="absolute -left-64 top-0 w-[40rem] h-[40rem] bg-teal-100/40 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -right-64 bottom-0 w-[40rem] h-[40rem] bg-[#eeb95d]/20 rounded-full blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 relative z-10">
              {/* Encabezado */}
              <div className="max-w-3xl mx-auto text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block bg-gradient-to-r from-teal-600/10 to-[#eeb95d]/10 text-teal-600 text-sm font-semibold px-6 py-2 rounded-full mb-6"
                >
                  GALLERY
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  <span className="text-teal-600">Discover Our </span>
                  <span className="text-[#eeb95d]">Paradise</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
                >
                  Experience the beauty and luxury of TurquesaBay through our stunning photo gallery
                </motion.p>
              </div>

              {/* Contenedor del Carousel */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative max-w-6xl mx-auto"
              >
                {/* Marco decorativo */}
                <div className="absolute -inset-4 md:-inset-6 border-2 border-teal-200/30 rounded-3xl"></div>
                <div className="absolute -inset-2 md:-inset-3 border-2 border-[#eeb95d]/20 rounded-2xl"></div>
                
                {/* Contenedor del carousel con sombras y efectos */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  {/* Overlay gradiente superior e inferior */}
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-10"></div>
                  <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                  
                  {/* Carousel Component */}
                  <ImageCarousel />
                </div>

                {/* Decoración lateral izquierda */}
                <motion.div
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-32 hidden lg:block"
                  animate={{ x: [-10, 0, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"></div>
                </motion.div>

                {/* Decoración lateral derecha */}
                <motion.div
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-32 hidden lg:block"
                  animate={{ x: [10, 0, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#eeb95d]/50 to-transparent"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Permits and Approvals Section - Rediseño Elegante */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative py-32 overflow-hidden"
          >
            {/* Fondo con gradiente y textura */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-800">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Elementos decorativos */}
            <motion.div 
              className="absolute left-0 top-0 w-[50rem] h-[50rem] bg-[#eeb95d]/10 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Columna de texto */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2"
                >
                  <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                    <span className="text-teal-400">All Permits</span>
                    <span className="text-white"> & </span>
                    <span className="text-[#eeb95d]">Approvals Ready</span>
                  </h2>
                  
                  <p className="text-white/80 text-lg mb-8 leading-relaxed font-bold">
                    Our project has successfully obtained all necessary permits and approvals, ensuring a secure investment environment for our clients. Every detail has been carefully reviewed and authorized by relevant authorities.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { 
                        icon: FaRegFileAlt, 
                        text: "Land Ownership",
                        subtext: "Land Registry Certified",
                        iconColor: "text-[#eeb95d]",
                        bgColor: "from-[#eeb95d]/20 to-[#eeb95d]/5"
                      },
                      { 
                        icon: FaLandmark, 
                        text: "DGODT Approval",
                        subtext: "Zoning & Land Use",
                        iconColor: "text-teal-400",
                        bgColor: "from-teal-400/20 to-teal-400/5"
                      },
                      { 
                        icon: FaLeaf, 
                        text: "Environmental",
                        subtext: "Impact Assessment",
                        iconColor: "text-[#eeb95d]",
                        bgColor: "from-[#eeb95d]/20 to-[#eeb95d]/5"
                      },
                      { 
                        icon: FaBuilding, 
                        text: "Municipal",
                        subtext: "Samaná Council",
                        iconColor: "text-teal-400",
                        bgColor: "from-teal-400/20 to-teal-400/5"
                      },
                      { 
                        icon: FaAnchor, 
                        text: "Dominican Navy",
                        subtext: "Maritime Approval",
                        iconColor: "text-[#eeb95d]",
                        bgColor: "from-[#eeb95d]/20 to-[#eeb95d]/5"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          opacity: 0,
                          x: index % 2 === 0 ? -50 : 50,
                          y: 20,
                          scale: 0.9
                        }}
                        whileInView={{ 
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: 1
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 1,
                          delay: index * 0.15
                        }}
                        whileHover={{ 
                          y: -8,
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                        className={`group relative flex items-center gap-4 p-6 rounded-xl overflow-hidden`}
                      >
                        {/* Fondo con gradiente animado */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-50`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.5 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Efecto de brillo en hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0"
                          whileHover={{ 
                            opacity: 1,
                            x: ["0%", "100%"]
                          }}
                          transition={{ 
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity
                          }}
                        />
                        
                        {/* Borde con brillo */}
                        <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-500" />

                        {/* Contenido */}
                        <motion.div 
                          className={`relative z-10 w-12 h-12 ${item.iconColor} rounded-xl bg-white/10 flex items-center justify-center`}
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <item.icon className="w-6 h-6" />
                        </motion.div>

                        <div className="relative z-10 flex flex-col">
                          <motion.span 
                            className="text-white font-bold text-lg tracking-wide"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            {item.text}
                          </motion.span>
                          <motion.span 
                            className={`text-base ${item.iconColor} font-bold`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.4 }}
                          >
                            {item.subtext}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Columna de imagen */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2"
                >
                  <div className="relative">
                    {/* Marco decorativo */}
                    <div className="absolute inset-0 border-2 border-[#eeb95d]/20 rounded-2xl transform rotate-3"></div>
                    <div className="absolute inset-0 border-2 border-teal-400/20 rounded-2xl transform -rotate-3"></div>
                    
                    {/* Contenedor de imagen con efecto de máscara */}
                    <div className="relative rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-transparent to-transparent z-10"></div>
                      <img
                        src="https://images.pexels.com/photos/29763051/pexels-photo-29763051/free-photo-of-business-meeting-with-documents-in-bergamo.jpeg"
                        alt="Permits and Documentation"
                        className="w-full h-[600px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Insignia de verificación */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center z-20 border-4 border-[#eeb95d]/20"
                    >
                      <div className="text-center">
                        <FaCheck className="w-10 h-10 text-[#eeb95d] mx-auto mb-1" />
                        <span className="text-white text-sm font-bold">100% Approved</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="h-px bg-gradient-to-r from-transparent via-[#eeb95d]/20 to-transparent"></div>
              <div className="h-20 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
            </div>
          </motion.section>

          {/* Unforgettable Experience Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative py-32 overflow-hidden"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1188470/pexels-photo-1188470.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Overlay oscuro con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

            {/* Patrón de puntos */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Esferas decorativas con animación suave */}
            <motion.div 
              className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#eeb95d]/5 rounded-full blur-[120px]"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            />

            {/* Resto del contenido existente */}
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Columna izquierda - Contenido */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left space-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block bg-teal-500/10 text-teal-300 text-sm font-semibold px-6 py-2 rounded-full border border-teal-500/20"
                    >
                      EXPERIENCE PARADISE
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-4xl lg:text-6xl font-bold leading-tight"
                    >
                      <span className="text-white">Live an </span>
                      <span className="text-teal-400 font-['Summer_Vibes'] text-3xl lg:text-5xl -mt-4 inline-block">Unforgettable </span>
                      <span className="text-[#eeb95d] font-['Summer_Vibes'] text-3xl lg:text-5xl -mt-4 inline-block">Experience</span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-teal-100/80 text-lg max-w-xl mx-auto lg:mx-0"
                    >
                      Ready to make your dream of owning a luxury beachfront property come true? Contact us now and let us help you discover your perfect paradise in Samaná.
                    </motion.p>

                    {/* Call to Action Card - Versión Desktop */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="relative max-w-xl lg:mx-0"
                    >
                      <motion.a
                        href="tel:+18294232020"
                        className="hidden lg:flex items-center gap-2 p-4 rounded-2xl border border-teal-400/20"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {/* Contenedor principal con flex */}
                        <div className="flex items-center gap-4">
                          {/* Icono */}
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-teal-400/30 rounded-full animate-ping"></div>
                            <div className="relative w-14 h-14 rounded-full bg-teal-400 flex items-center justify-center">
                              <FaPhone className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          
                          {/* Texto y número en una sola línea */}
                          <div className="flex items-center">
                            <p className="text-3xl font-bold whitespace-nowrap">
                              <span className="text-teal-400">+1 (829)</span>
                              <span className="mx-1"></span>
                              <span className="text-[#eeb95d]">423-2020</span>
                            </p>
                          </div>
                        </div>

                        {/* Call Now y flecha */}
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xl font-bold text-[#eeb95d]">
                            Call Now
                          </span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-2xl text-[#eeb95d]"
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.a>

                      {/* Versión Móvil */}
                      <motion.a
                        href="tel:+18294232020"
                        className="lg:hidden flex flex-col items-center gap-6 p-6 rounded-2xl border border-teal-400/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-teal-400/30 rounded-full animate-ping"></div>
                          <div className="relative w-20 h-20 rounded-full bg-teal-400 flex items-center justify-center">
                            <FaPhone className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-4xl font-bold whitespace-nowrap">
                            <span className="text-teal-400">+1 (829)</span>
                            <span className="mx-1"></span>
                            <span className="text-[#eeb95d]">423-2020</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[#eeb95d] font-semibold">
                          <span>Tap to call now</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  {/* Columna derecha - Tarjetas de experiencia (solo visible en desktop) */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[600px] hidden lg:block"
                  >
                    {/* Tarjetas de experiencias */}
                    {[
                      { 
                        title: "Luxury Living", 
                        icon: <FaHome className="w-12 h-12 text-[#eeb95d] group-hover:text-teal-400 transition-colors duration-300" />,
                        description: "Experience the epitome of luxury in our beachfront residences",
                        delay: 0.2 
                      },
                      { 
                        title: "Ocean Views", 
                        icon: <FaUmbrellaBeach className="w-12 h-12 text-teal-400 group-hover:text-[#eeb95d] transition-colors duration-300" />,
                        description: "Wake up to breathtaking panoramic ocean views every day",
                        delay: 0.3 
                      },
                      { 
                        title: "Premium Service", 
                        icon: <FaConciergeBell className="w-12 h-12 text-[#eeb95d] group-hover:text-teal-400 transition-colors duration-300" />,
                        description: "Enjoy world-class amenities and personalized service",
                        delay: 0.4 
                      }
                    ].map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          opacity: 0,
                          y: 50,
                          rotateY: -15,
                          scale: 0.95
                        }}
                        whileInView={{ 
                          opacity: 1,
                          y: 0,
                          rotateY: 0,
                          scale: 1
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          mass: 0.8,
                          delay: card.delay
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          rotateY: 5,
                          y: -10,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }
                        }}
                        className="absolute w-72 sm:w-full md:w-80 lg:w-72 p-6 rounded-2xl backdrop-blur-md 
                                  border border-teal-500/20 hover:border-[#eeb95d]/30 
                                  transition-all duration-300 group 
                                  hover:shadow-[0_20px_50px_rgba(13,148,136,0.15)]"
                        style={{
                          top: `${index * (window.innerWidth < 640 ? 35 : 33)}%`,
                          right: `${window.innerWidth < 640 ? '50%' : index * 5}%`,
                          left: window.innerWidth < 640 ? '50%' : 'auto',
                          transform: window.innerWidth < 640 ? 'translateX(-50%)' : 'none',
                          backgroundColor: 'rgba(13, 148, 136, 0.05)',
                          transformStyle: 'preserve-3d',
                          perspective: '1500px',
                          transformOrigin: 'center center',
                          maxWidth: window.innerWidth < 640 ? '85%' : '18rem',
                        }}
                      >
                        {/* Efecto de brillo en hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10"
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ 
                            x: '100%',
                            opacity: 1,
                            transition: {
                              duration: 1,
                              ease: "easeInOut"
                            }
                          }}
                        />
                        
                        {/* Contenido de la tarjeta */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: card.delay + 0.2 }}
                        >
                          <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            {card.icon}
                          </div>
                          <h3 className={`text-${index % 2 === 0 ? '[#eeb95d]' : 'teal-400'} text-xl font-bold mb-2`}>
                            {card.title}
                          </h3>
                          <p className="text-teal-200/70 text-sm mb-4">{card.description}</p>
                          <div className={`w-12 h-1 bg-${index % 2 === 0 ? 'teal-400' : '[#eeb95d]'}`}></div>
                        </motion.div>
                      </motion.div>
                    ))}

                    {/* Líneas decorativas con ajuste responsive */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 hidden lg:block"
                    >
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#eeb95d]/30 to-transparent"></div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Video Modal */}
          <AnimatePresence>
            {showVideoModal && (
              <motion.div 
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer backdrop-blur-0" 
                onClick={handleModalClick}
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0, y: 100 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -100 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.5 
                  }}
                  className="relative max-w-4xl w-full mx-4" 
                  onClick={e => e.stopPropagation()}
                >
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <motion.iframe 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                      src="https://www.youtube.com/embed/mpuasMTSbTU?autoplay=1" 
                      title="TurquesaBay Video" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    />
                    <motion.button 
                      onClick={closeVideoModal}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white w-10 h-10 rounded-full hover:from-teal-600 hover:to-teal-700 flex items-center justify-center shadow-lg"
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Here you can add the other sections from index.html */}
          {/* ... */}
        </>
      )}
    </div>
  );
}

export default Home;
