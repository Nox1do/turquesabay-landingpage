import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      description: "Enjoy our luxurious outdoor pool",
      image: "https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg"
    },
    { 
      title: "Fitness Center", 
      description: "State-of-the-art equipment for your workout needs",
      image: "https://images.pexels.com/photos/16513602/pexels-photo-16513602/free-photo-of-body-building-equipment-in-sunlight-and-shadow.jpeg"
    },
    {
      title: "Spa",
      description: "Relax and rejuvenate in our premium spa",
      image: "https://images.pexels.com/photos/6663571/pexels-photo-6663571.jpeg"
    },
    {
      title: "Restaurant",
      description: "Enjoy exquisite cuisine with ocean views",
      image: "https://images.pexels.com/photos/4543004/pexels-photo-4543004.jpeg"
    },
    {
      title: "Beach Access",
      description: "Direct access to pristine sandy beaches with stunning ocean views",
      image: "https://images.pexels.com/photos/29705734/pexels-photo-29705734/free-photo-of-woman-practicing-yoga-on-sandy-beach.jpeg"
    },
    {
      title: "Concierge Service",
      description: "24/7 personalized concierge service to assist with all your needs and requests",
      image: "https://images.pexels.com/photos/6197123/pexels-photo-6197123.jpeg"
    },
  ];

  const [selectedArea, setSelectedArea] = useState(null);

  const openModal = (area) => {
    setSelectedArea(area);
    setZoomLevel(0);
  };

  const closeModal = () => {
    setSelectedArea(null);
    setZoomLevel(0);
  };

  const handleZoom = (newZoom) => {
    setZoomLevel(Math.min(100, Math.max(0, newZoom)));
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

  const [activeTab, setActiveTab] = useState('bloqueD');

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

  return (
    <div className="flex flex-col min-h-screen"> {/* Añadido contenedor flex */}
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
          className="flex-grow font-sans bg-cover bg-center bg-fixed relative overflow-hidden"
          style={{
            backgroundImage: bgImageLoaded ? "url('https://imgur.com/7LcsP6I.jpg')" : "none",
            backgroundColor: "#f0f0f0",
          }}
        >
          <motion.div 
            className="bg-black bg-opacity-50 min-h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.main 
              className="container mx-auto pt-8 p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.h1
                variants={slideUp}
                className="text-4xl font-bold mb-8 text-left text-white"
              >
                <span className="text-teal-400">Our</span> <span className="text-[#eeb95d]">Amenities</span>
              </motion.h1>
              <motion.p variants={slideUp} className="text-xl text-white mb-8">
                Discover the luxurious amenities at TurquesaBay
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    variants={slideUp}
                    className="bg-white bg-opacity-80 rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 bg-gray-300 flex items-center justify-center">
                      {amenity.image ? (
                        <img 
                          src={amenity.image} 
                          alt={amenity.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-lg">{amenity.title} Image</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-teal-600 mb-2">{amenity.title}</h3>
                      <p className="text-gray-600">{amenity.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.section variants={slideUp} className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-left text-white">
                  <span className="text-teal-400">Resort</span> <span className="text-[#eeb95d]">Map</span>
                </h2>
                <div className="mb-4 flex space-x-2">
                  {['bloqueD', 'bloqueCyD'].map((tab) => (
                    <motion.button
                      key={tab}
                      className="px-6 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                      variants={tabVariants}
                      animate={activeTab === tab ? 'active' : 'inactive'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'bloqueD' ? 'Block D' : 'Block C and B'}
                    </motion.button>
                  ))}
                </div>
                <div className="relative inline-block w-full overflow-hidden rounded-lg shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        style={{ width: '100%' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1280 730"
                      >
                        <style>
                          {`
                            .image-mapper-shape {
                              fill: rgba(0, 0, 0, 0);
                              transition: all 0.3s ease;
                              cursor: pointer;
                            }
                            g:hover .image-mapper-shape {
                              fill: rgba(20, 184, 166, 0.5);
                              stroke: white;
                              stroke-width: 2px;
                            }
                            .speech-bubble-text {
                              font-size: 14px;
                              font-weight: bold;
                              fill: white;
                              stroke: black;
                              stroke-width: 0.5px;
                              paint-order: stroke fill;
                            }
                          `}
                        </style>
                        <image
                          xlinkHref={mapData[activeTab].image}
                          style={{ width: '1280px' }}
                        />
                        {mapData[activeTab].areas.map((area) => (
                          <g
                            key={area.id}
                            onMouseEnter={() => setHoveredArea(area.title)}
                            onMouseLeave={() => setHoveredArea(null)}
                            onClick={() => openModal(area)}
                          >
                            <polygon
                              className="image-mapper-shape"
                              points={area.points}
                            ></polygon>
                            <text
                              x={area.x}
                              y={area.y}
                              textAnchor="middle"
                              className="speech-bubble-text"
                            >
                              {hoveredArea === area.title ? area.title : ''}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.section>
            </motion.main>
          </motion.div>

          <AnimatePresence>
            {selectedArea && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              >
                <motion.div
                  className="bg-white rounded-lg p-6 max-w-4xl w-11/12 max-h-[90vh] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedArea.title}</h2>
                  <div 
                    className="flex-grow overflow-auto"
                    onWheel={handleWheel}
                  >
                    <div
                      style={{
                        width: `${100 + zoomLevel}%`,
                        height: `${100 + zoomLevel}%`,
                        transition: 'width 0.3s ease, height 0.3s ease'
                      }}
                    >
                      <img
                        ref={imageRef}
                        src={selectedArea.image}
                        alt={selectedArea.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={closeModal}
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
                    >
                      Close
                    </button>
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      <span className="text-gray-600 whitespace-nowrap">Zoom:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={zoomLevel}
                        onChange={(e) => handleZoom(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-gray-600 whitespace-nowrap">{zoomLevel}%</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      {showNotification && (
        <Notification 
          message="No se pudo cargar la imagen de fondo. Por favor, verifica tu conexión a internet."
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default Amenities;
