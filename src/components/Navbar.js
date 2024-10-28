import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, scaleY: 0, originY: 0 },
    open: { opacity: 1, scaleY: 1, originY: 0 }
  };

  const socialLinks = [
    { href: "https://facebook.com/Turquesasrl", icon: faFacebookF },
    { href: "https://www.instagram.com/turquesabay/", icon: faInstagram },
    { href: "https://www.youtube.com/@turquesabay", icon: faYoutube },
    { href: "https://api.whatsapp.com/send?phone=18294232020", icon: faWhatsapp }
  ];

  const iconVariants = {
    hover: {
      scale: 1.5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Desktop and Tablet Navbar */}
        <div className="hidden md:flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src="https://i.imgur.com/46EfL9t.png" alt="TurquesaBay Logo" className="h-12 w-auto mr-3" />
            <span className="text-2xl font-bold">
              <span className="text-teal-600">Turquesa</span>
              <span className="text-[#eeb95d]">Bay</span>
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-teal-600 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link to="/amenities" className="text-gray-600 hover:text-teal-600 relative group">
              Amenities
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-teal-600 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </Link>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition duration-300">Book Now</button>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-between py-4">
            <motion.button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-teal-600 focus:outline-none z-10"
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </motion.button>
            <motion.div
              animate={{ x: isOpen ? "-20%" : 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center"
            >
              <img src="https://i.imgur.com/46EfL9t.png" alt="TurquesaBay Logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold">
                <span className="text-teal-600">Turquesa</span>
                <span className="text-[#eeb95d]">Bay</span>
              </span>
            </motion.div>
            <div className="w-8" /> {/* Spacer */}
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white bg-opacity-90 backdrop-blur-sm py-2 px-4 overflow-hidden"
              >
                <div className="flex justify-between items-center space-x-3 text-lg">
                  <Link to="/" className="text-gray-600 hover:text-teal-600" onClick={toggleMenu}>Home</Link>
                  <Link to="/amenities" className="text-gray-600 hover:text-teal-600" onClick={toggleMenu}>Amenities</Link>
                  <Link to="/contact" className="text-gray-600 hover:text-teal-600" onClick={toggleMenu}>Contact</Link>
                  <button className="bg-teal-600 text-white px-3 py-1 rounded-full hover:bg-teal-700 transition duration-300 text-base" onClick={toggleMenu}>Book Now</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Media Icons (always visible on mobile) */}
        <div className="md:hidden flex justify-center space-x-6 py-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600"
              whileHover="hover"
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={social.icon} size="lg" />
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
