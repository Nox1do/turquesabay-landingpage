import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

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
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="bg-teal-800 text-white py-6 mt-6"
    >
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-3">
          {[ 
            { href: "https://facebook.com/Turquesasrl", icon: faFacebookF },
            { href: "https://www.instagram.com/turquesabay/", icon: faInstagram },
            { href: "https://www.youtube.com/@turquesabay", icon: faYoutube },
            { href: "https://api.whatsapp.com/send?phone=18294232020", icon: faWhatsapp }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#eeb95d] transition duration-300"
              whileHover="hover"
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={social.icon} size="2x" className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
        <p className="mb-2 text-sm">
          &copy; 2024 TurquesaBay. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
