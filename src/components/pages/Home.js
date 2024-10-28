import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import ImageCarousel from '../ImageCarousel'; // Asegúrate de que la ruta sea correcta

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
          {/* Hero Section */}
          <motion.section 
            id="hero-section"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative h-screen w-full overflow-hidden"
          >
            <div className="absolute inset-0">
              {bgImageLoaded ? (
                <img 
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTF0emg3OTk4djhwdWxkd2J3ODY0aHgwZGV0am4zNGMyMTd6bXQwaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cCrIevg50IYRUkVSbk/giphy.webp"
                  alt="Beach background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
              )}
            </div>
            <div className="absolute inset-0 bg-black opacity-45"></div>
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
              <div className="text-white w-full">
                <img 
                  src="https://i.imgur.com/RXfq7xD.png"
                  alt="Logo"
                  className="w-80 h-auto mb-8 mx-auto"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
                  <span className="text-teal-500 drop-shadow-lg">Luxury Living</span> <span className="text-white">in</span> <span className="text-[#eeb95d] drop-shadow-lg">Paradise</span>
                </h1>
                <div className="h-16 overflow-hidden w-full mb-0">
                  <motion.p 
                    key={currentMessageIndex}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={messageAnimation}
                    className="text-lg md:text-xl lg:text-2xl mb-0 text-center"
                  >
                    {messages[currentMessageIndex]}
                  </motion.p>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="w-full flex flex-col items-center mt-2"
                >
                  <div className="relative">
                    <Link 
                      to="/contact" 
                      className="bg-teal-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full text-base md:text-lg font-semibold hover:bg-teal-500 transition duration-300 inline-block shadow-md hover:shadow-lg mb-12"
                    >
                      Reserve now
                    </Link>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
                      <motion.button
                        onClick={openVideoModal}
                        className="bg-teal-600 hover:bg-teal-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <FaPlay size={30} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/*Image Carousel Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-24 bg-white"
          >
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                <span className="text-teal-600 drop-shadow-lg stroke-text">Turquesa</span>
                <span className="text-[#eeb95d] drop-shadow-lg">Photos</span>
              </h2>
              <ImageCarousel />
            </div>
          </motion.section>

          {/* Permits and Approvals Section*/}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-12 md:py-24 bg-green-100"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
                <span className="text-teal-600 drop-shadow-lg text-stroke-thin-black">Permits and Approvals </span>
                <span className="text-[#eeb95d] drop-shadow-lg text-stroke-thin-black">Obtained</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                 {/* column 1*/}
                <div>
                <ul className="space-y-4">
      {[
        { title: "Land Ownership and Title Certification", description: "Verified and certified by the Land Registry." },
        { title: "Zoning and Land Use Approval", description: "Approved by the General Directorate of Territorial Planning and Development (DGODT)." },
        { title: "Environmental Impact Assessment", description: "Approved by the Ministry of Environment and Natural Resources." },
        { title: "Municipal Government of Samaná", description: "Approved by the Municipal Council of Samaná." },
        { title: "Dominican Navy", description: "Approved by the Dominican Navy." }
      ].map((item, index) => (
        <li key={index} className="flex items-start">
          {/* flechas svg */}
          <svg className="w-10 h-10 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div>
            <strong className="text-teal-700 text-xl block">{item.title}</strong> {/* Cambiado a text-xl */}
            <span className="text-gray-700 text-lg">{item.description}</span>
          </div>
        </li>
      ))}
    </ul>

                </div>
                 {/* column 2*/}
                <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-500 bg-teal-500 bg-opacity-20"></div>
                  {[
                    { color: "bg-yellow-500", text: "Environment", angle: 45, image: "https://i.imgur.com/838kbnz.jpeg" },
                    { color: "bg-teal-500", text: "DGODT", angle: 135, image: "https://i.imgur.com/WyLmAqx.jpeg" },
                    { color: "bg-yellow-500", text: "Samaná Municipality", angle: 225, image: "https://i.imgur.com/abcoKBf.png" },
                    { color: "bg-teal-500", text: "Dominican Navy", angle: 315, image: "https://shorturl.at/VV0k0" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className={`absolute w-[100px] h-[100px] rounded-full overflow-hidden group`}
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${item.angle}deg) translate(80px) rotate(-${item.angle}deg) translate(-50%, -50%)`,
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.text}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center`}>
                        <span className="text-white text-sm font-extrabold text-center p-2 leading-tight">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Unforgettable Experience Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="py-12 md:py-24 bg-teal-500 text-white"
          >
            <div className="container mx-auto text-center px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-white drop-shadow-lg">Live an Unforgettable Experience in </span>
                <span className="text-[#eeb95d] drop-shadow-lg">Turquesa</span>
                <span className="text-white drop-shadow-lg">Bay Today!</span>
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8">We can help you fit your stay and experience</p>
              <p className="text-xl md:text-2xl mb-4">FOR MORE INFORMATION PLEASE CALL US</p>
              <a href="tel:+18294232020" className="inline-flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-bold hover:underline">
                <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 inline-block mr-2 md:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                +1-829 423 2020
              </a>
            </div>
          </motion.section>

          {/* Video Modal */}
          {showVideoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer" onClick={handleModalClick}>
              <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/mpuasMTSbTU?autoplay=1" 
                    title="TurquesaBay Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                  <button 
                    onClick={closeVideoModal}
                    className="absolute top-2 right-2 bg-teal-500 text-white px-2 py-1 text-xs rounded-full hover:bg-teal-600 transition-colors"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Here you can add the other sections from index.html */}
          {/* ... */}
        </>
      )}
    </div>
  );
}

export default Home;