import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSwimmer, FaDumbbell, FaSpa, FaUtensils, FaUmbrellaBeach, FaConciergeBell, FaCheck } from 'react-icons/fa';

// Importa el componente de notificación
import Notification from '../assets/Notification';

function Amenities() {
  const [modalImage, setModalImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [hoveredArea, setHoveredArea] = useState(null);
  const imageRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [forceShowLottie, setForceShowLottie] = useState(true);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieError, setLottieError] = useState(false);

  const [touchedArea, setTouchedArea] = useState(null);
  const [isTouching, setIsTouching] = useState(false);

  const [selectedArea, setSelectedArea] = useState(null);
  const [activeTab, setActiveTab] = useState('bloqueD');

  // Añadir estados para el manejo táctil
  const [touchStartDistance, setTouchStartDistance] = useState(null);
  const [currentScale, setCurrentScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = 'https://imgur.com/7LcsP6I.jpg';
    img.onload = () => {
      setBgImageLoaded(true);
    };
    img.onerror = () => {
      setShowNotification(true);
    };

    // Asegurarse de que la pantalla de carga se muestre durante al menos 3 segundos
    const timer = setTimeout(() => {
      setForceShowLottie(false);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Función para manejar la carga del Lottie
  const handleLottieLoad = () => {
    setLottieLoaded(true);
  };

  // Función para manejar el error de carga del Lottie
  const handleLottieError = () => {
    setLottieError(true);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const amenities = [
    {
      title: "Swimming Pool",
      description: "Enjoy our luxurious outdoor pool with infinite ocean views",
      image: "https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg",
      icon: <FaSwimmer className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-cyan-400 to-blue-500",
      features: ["Infinity Edge", "Heated Pool", "Loungers", "Pool Bar"]
    },
    { 
      title: "Fitness Center", 
      description: "State-of-the-art equipment to maintain your fitness routine",
      image: "https://images.pexels.com/photos/16513602/pexels-photo-16513602/free-photo-of-body-building-equipment-in-sunlight-and-shadow.jpeg",
      icon: <FaDumbbell className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-orange-400 to-red-500",
      features: ["Modern Equipment", "Personal Training", "Yoga Studio", "24/7 Access"]
    },
    {
      title: "Spa",
      description: "Relax and rejuvenate in our premium spa",
      image: "https://images.pexels.com/photos/6663571/pexels-photo-6663571.jpeg",
      icon: <FaSpa className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-purple-400 to-pink-500",
      features: ["Massage Therapy", "Sauna", "Beauty Salon", "Wellness Center"]
    },
    {
      title: "Restaurant",
      description: "Experience exquisite cuisine with stunning ocean views",
      image: "https://images.pexels.com/photos/4543004/pexels-photo-4543004.jpeg",
      icon: <FaUtensils className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-yellow-400 to-orange-500",
      features: ["Gourmet Menu", "Ocean View", "Wine Cellar", "Private Events"]
    },
    {
      title: "Beach Access",
      description: "Direct access to pristine beaches with breathtaking ocean views",
      image: "https://images.pexels.com/photos/29705734/pexels-photo-29705734/free-photo-of-woman-practicing-yoga-on-sandy-beach.jpeg",
      icon: <FaUmbrellaBeach className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-blue-400 to-indigo-500",
      features: ["Private Beach", "Water Sports", "Beach Service", "Sunset Views"]
    },
    {
      title: "Concierge Service",
      description: "24/7 personalized concierge service to cater to all your needs",
      image: "https://images.pexels.com/photos/6197123/pexels-photo-6197123.jpeg",
      icon: <FaConciergeBell className="w-8 h-8 text-white group-hover:text-teal-200 transition-colors duration-300" />,
      gradient: "from-emerald-400 to-teal-500",
      features: ["24/7 Service", "Tour Planning", "Transportation", "Reservations"]
    }
  ];

  const openModal = (area) => {
    setSelectedArea(area);
    setZoomLevel(0);
  };

  const closeModal = () => {
    setSelectedArea(null);
    setZoomLevel(0);
  };

  const handleZoom = (newZoom) => {
    // Permitir zoom hasta 200% en móvil y 100% en desktop
    const maxZoom = window.innerWidth > 768 ? 100 : 200;
    setZoomLevel(Math.min(maxZoom, Math.max(0, newZoom)));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY * -0.01;
    handleZoom(zoomLevel + delta * 5);
  };

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    
    if (selectedArea) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventDefault, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', preventDefault);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('wheel', preventDefault);
    };
  }, [selectedArea]);

  // SVG hover effects for text display
  const areas = [
    { id: 1, points: '876.429,173.827 876.429,247.977 782.83,272.289 757.303,280.798 724.482,290.522 677.075,303.894 678.291,237.037', image: 'https://i.imgur.com/gbo7gra.png', title: 'Block D-III 2 Rooms', x: 750, y: 250 },
    { id: 2, points: '996.771,209.079 991.909,125.204 1157.23,69.2878 1170.6,83.8746 1168.17,138.576 1141.42,168.965 1064.84,190.845', image: 'https://i.imgur.com/28LWYC9.png', title: 'Block D-IV 3 Rooms', x: 1050, y: 150 },
    { id: 3, points: '508.11,308.756 624.805,267.426 624.805,318.481 582.26,329.421 555.518,339.145 529.99,346.439 505.679,352.517', image: 'https://i.imgur.com/coH0uuY.png', title: 'Block D-II 2 Rooms', x: 550, y: 320 },
    { id: 4, points: '474.074,324.558 474.074,364.672 447.331,369.535 427.882,378.044 403.571,384.122 404.786,346.439', image: 'https://i.imgur.com/py4GW1i.png', title: 'Block D-I 2 Rooms', x: 450, y: 350 },
  ];

  const mapData = {
    bloqueD: {
      image: "https://i.imgur.com/FVfvl08.jpg",
      areas: [
        { id: 1, points: "876.429,173.827 876.429,247.977 782.83,272.289 757.303,280.798 724.482,290.522 677.075,303.894 678.291,237.037", image: "https://i.imgur.com/gbo7gra.png", title: "Block D-III 2 Rooms", x: 750, y: 250 },
        { id: 2, points: "996.771,209.079 991.909,125.204 1157.23,69.2878 1170.6,83.8746 1168.17,138.576 1141.42,168.965 1064.84,190.845", image: "https://i.imgur.com/28LWYC9.png", title: "Block D-IV 3 Rooms", x: 1050, y: 150 },
        { id: 3, points: "508.11,308.756 624.805,267.426 624.805,318.481 582.26,329.421 555.518,339.145 529.99,346.439 505.679,352.517", image: "https://i.imgur.com/coH0uuY.png", title: "Block D-II 2 Rooms", x: 550, y: 320 },
        { id: 4, points: "474.074,324.558 474.074,364.672 447.331,369.535 427.882,378.044 403.571,384.122 404.786,346.439", image: "https://i.imgur.com/py4GW1i.png", title: "Block D-I 2 Rooms", x: 450, y: 350 },
      ]
    },
    bloqueCyD: {
      image: "https://i.imgur.com/ZC8nxNb.jpg",
      areas: []
    }
  };

  const tabVariants = {
    active: {
      backgroundColor: '#14B8A6',
      color: '#FFFFFF',
      transition: { duration: 0.3 }
    },
    inactive: {
      backgroundColor: '#F3F4F6',
      color: '#4B5563',
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  // Función para calcular la distancia entre dos puntos táctiles
  const getTouchDistance = (touches) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  // Manejadores de eventos táctiles
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      setTouchStartDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      // Drag
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX - dragPosition.x,
        y: e.touches[0].clientY - dragPosition.y
      });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 2 && touchStartDistance !== null) {
      // Pinch zoom con límite de 200% en móvil
      const currentDistance = getTouchDistance(e.touches);
      const scale = (currentDistance / touchStartDistance) * currentScale;
      const newZoom = Math.min(200, Math.max(0, (scale - 1) * 100));
      handleZoom(newZoom);
    } else if (e.touches.length === 1 && isDragging) {
      // Drag
      setDragPosition({
        x: e.touches[0].clientX - startPosition.x,
        y: e.touches[0].clientY - startPosition.y
      });
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDistance(null);
    setIsDragging(false);
  };

  return (
    <>
      {(isLoading || forceShowLottie) ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <iframe 
            src="https://lottie.host/embed/98e3d50b-c427-4a30-8ff7-2098e3cbb814/ZZTiHyhz69.json"
            width="300" 
            height="300"
            style={{ border: 'none' }}
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="font-sans min-h-screen bg-cover bg-center bg-fixed relative"
          style={{ backgroundImage: "url('https://imgur.com/7LcsP6I.jpg')" }}
        >
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-[2px]" />

          <div className="relative min-h-screen py-20">
            <main className="container mx-auto px-4 max-w-7xl">
              {/* Header Section */}
              <motion.div 
                className="text-center mb-16"
                variants={slideUp}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-teal-400">Our</span>{' '}
                  <span className="text-[#eeb95d]">Amenities</span>
                </h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Discover the luxurious amenities at TurquesaBay
                </p>
              </motion.div>

              {/* Grid de amenities */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl"
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Card con efecto de cristal */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-[2px] rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-300" />
                    
                    {/* Contenido de la card */}
                    <div className="relative p-6 z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-full 
                                          ${index % 2 === 0 
                                            ? 'bg-gradient-to-br from-teal-400/30 to-teal-500/20' 
                                            : 'bg-gradient-to-br from-[#eeb95d]/30 to-yellow-500/20'} 
                                          flex items-center justify-center transform group-hover:scale-110 transition-all duration-500`}
                        >
                          <motion.div
                            whileHover={{ 
                              rotate: 12,
                              scale: 1.1,
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 100,
                              damping: 10,
                              mass: 0.8,
                              duration: 0.8
                            }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            {amenity.icon}
                          </motion.div>
                        </div>
                        <h3 className={`text-2xl font-bold 
                                          ${index % 2 === 0 
                                            ? 'bg-gradient-to-r from-teal-300 to-teal-400' 
                                            : 'bg-gradient-to-r from-[#eeb95d] to-yellow-400'} 
                                          bg-clip-text text-transparent`}
                        >
                          {amenity.title}
                        </h3>
                      </div>

                      <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                        <img
                          src={amenity.image}
                          alt={amenity.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                      </div>

                      <p className="text-white/80 mb-6">
                        {amenity.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {amenity.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FaCheck className={`w-4 h-4 ${index % 2 === 0 ? 'text-teal-400' : 'text-[#eeb95d]'}`} />
                            <span className="text-sm text-white/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Efecto de brillo */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Resort Map Section */}
              <motion.section 
                variants={slideUp} 
                className="mt-32 mb-20 relative overflow-hidden"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                  <div className="text-center p-8 border-b border-white/10">
                    <h2 className="text-4xl font-bold mb-4">
                      <span className="text-teal-400">Resort</span>{' '}
                      <span className="text-[#eeb95d]">Map</span>
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                      Explore our luxurious blocks and find your perfect residence
                    </p>
                  </div>

                  <div className="p-6">
                    {/* Tabs con diseño mejorado */}
                    <div className="flex justify-center mb-8">
                      <div className="bg-white/5 backdrop-blur-sm p-2 rounded-full border border-white/10">
                        {['bloqueD', 'bloqueCyD'].map((tab) => (
                          <motion.button
                            key={tab}
                            className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300
                                      ${activeTab === tab 
                                        ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg' 
                                        : 'text-white/70 hover:text-white'}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(tab)}
                          >
                            {tab === 'bloqueD' ? 'Block D' : 'Block C & B'}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Contenedor del mapa con efectos */}
                    <motion.div
                      className="relative rounded-xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Mapa interactivo */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          variants={imageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <svg
                            className="w-full h-auto"
                            viewBox="0 0 1280 730"
                            style={{ 
                              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                              maxHeight: '70vh'
                            }}
                          >
                            <defs>
                              <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>

                            <image
                              xlinkHref={mapData[activeTab].image}
                              className="w-full h-full"
                              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                            
                            {mapData[activeTab].areas.map((area) => (
                              <g
                                key={area.id}
                                onMouseEnter={() => setHoveredArea(area.title)}
                                onMouseLeave={() => setHoveredArea(null)}
                                onClick={() => openModal(area)}
                                onTouchStart={() => {
                                  setTouchedArea(area.title);
                                  setIsTouching(true);
                                }}
                                onTouchEnd={() => {
                                  if (isTouching) {
                                    openModal(area);
                                  }
                                  setTouchedArea(null);
                                  setIsTouching(false);
                                }}
                                onTouchMove={() => setIsTouching(false)}
                                className="cursor-pointer transition-all duration-300"
                              >
                                <polygon
                                  className="transition-all duration-300"
                                  points={area.points}
                                  style={{
                                    fill: hoveredArea === area.title ? 'rgba(20, 184, 166, 0.3)' : 'rgba(0, 0, 0, 0)',
                                    stroke: hoveredArea === area.title ? '#14B8A6' : 'rgba(255, 255, 255, 0.3)',
                                    strokeWidth: hoveredArea === area.title ? '2' : '1',
                                    filter: hoveredArea === area.title ? 'url(#glow)' : 'none'
                                  }}
                                />
                                
                                {(hoveredArea === area.title || touchedArea === area.title) && (
                                  <motion.text
                                    x={area.x}
                                    y={area.y}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-lg font-semibold"
                                    fill="white"
                                    textAnchor="middle"
                                    filter="url(#glow)"
                                  >
                                    {area.title}
                                  </motion.text>
                                )}
                              </g>
                            ))}
                          </svg>
                        </motion.div>
                      </AnimatePresence>

                      {/* Leyenda del mapa */}
                      <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                        <p className="text-white/90 text-sm font-medium mb-2">Interactive Map Legend:</p>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <div className="w-3 h-3 rounded-full bg-teal-400/50" />
                          <span>Hover over areas to explore</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* Modal para ver los planos */}
              <AnimatePresence>
                {selectedArea && (
                  <motion.div
                    className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                  >
                    <motion.div
                      className="relative bg-gradient-to-br from-gray-900/90 to-black/90 p-4 sm:p-8 rounded-3xl border border-white/10 w-full h-full sm:max-w-5xl sm:w-11/12 sm:h-auto sm:max-h-[90vh] overflow-hidden"
                      initial={{ scale: 0.95, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0, y: 20 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-2xl sm:text-3xl font-bold">
                          <span className="text-teal-400">Floor Plan:</span>{' '}
                          <span className="text-[#eeb95d]">{selectedArea.title}</span>
                        </h3>
                        <button
                          onClick={closeModal}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300"
                        >
                          <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Contenedor de la imagen */}
                      <div className="relative h-[calc(100vh-8rem)] sm:h-[calc(90vh-12rem)]">
                        {/* Controles de zoom flotantes */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10 z-10">
                          <button
                            onClick={() => handleZoom(Math.max(0, zoomLevel - 20))}
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-white/80 font-medium min-w-[3rem] text-center">{zoomLevel}%</span>
                          <button
                            onClick={() => handleZoom(Math.min(window.innerWidth > 768 ? 100 : 200, zoomLevel + 20))}
                            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Contenedor de la imagen con scroll */}
                        <div 
                          className="h-full w-full overflow-auto rounded-2xl bg-white/5 border border-white/10"
                          onWheel={handleWheel}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                          <div className="min-h-full min-w-full flex items-center justify-center p-4">
                            <img
                              ref={imageRef}
                              src={selectedArea.image}
                              alt={selectedArea.title}
                              className="w-full h-auto object-contain transition-transform duration-300"
                              style={{
                                transform: `scale(${1 + zoomLevel / 100}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                                touchAction: 'none'
                              }}
                            />
                          </div>
                        </div>

                        {/* Instrucciones de uso */}
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                          <p className="text-white/70 text-sm">
                            {window.innerWidth > 768 
                              ? "Use mouse wheel or controls to zoom"
                              : "Pinch to zoom or use controls"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      )}
      {showNotification && (
        <Notification 
          message="No se pudo cargar la imagen de fondo. Por favor, verifica tu conexión a internet."
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
}

export default Amenities;