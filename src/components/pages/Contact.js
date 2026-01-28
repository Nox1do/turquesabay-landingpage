import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Notification from '../assets/Notification';
import { FaBuilding, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [forceShowLottie, setForceShowLottie] = useState(true);

  const closeNotification = useCallback(() => {
    setNotification({ visible: false, message: '' });
  }, []);

  useEffect(() => {
    // Asegurarse de que la pantalla de carga se muestre durante al menos 3 segundos
    const timer = setTimeout(() => {
      setForceShowLottie(false);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (notification.visible) {
      timer = setTimeout(closeNotification, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification.visible, closeNotification]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };


  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      console.log('Datos del formulario a enviar:', templateParams);

      emailjs.send(
        'service_f5pnbwy',
        'template_8khwjj3',
        templateParams,
        'iW3gI3yUtf2gVC4O-'
      )
        .then((result) => {
          console.log('Resultado del envío:', result.text);
          setNotification({ visible: true, message: 'Message sent successfully!' });
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, (error) => {
          console.log('Error en el envío:', error.text);
          setNotification({ visible: true, message: 'Failed to send message. Please try again.' });
        });
    } else {
      console.log('Formulario no válido. Errores:', errors);
    }
  };

  return (
    <>
      {(isLoading || forceShowLottie) ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <iframe
            title="Loading animation"
            src="https://lottie.host/embed/98e3d50b-c427-4a30-8ff7-2098e3cbb814/ZZTiHyhz69.json"
            width="300"
            height="300"
            style={{ border: 'none' }}
            allowFullScreen
          >  </iframe>

        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="font-sans min-h-screen bg-cover bg-center bg-fixed relative"
          style={{ backgroundImage: "url('https://imgur.com/DRnBROY.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-[2px]" />

          <div className="relative min-h-screen py-20">
            <main className="container mx-auto px-4 max-w-7xl">
              <motion.div
                className="text-center mb-16"
                variants={slideUp}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-teal-400">Get in </span>
                  <span className="text-[#eeb95d]">Touch</span>
                </h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  Ready to discover your dream property? We're here to help you every step of the way
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  variants={slideUp}
                  className="space-y-8"
                >
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <FaBuilding className="w-6 h-6 text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Reception Office</h3>
                        <p className="text-white/70">Santo Domingo, Dominican Republic</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#eeb95d]/20 flex items-center justify-center">
                          <FaClock className="w-5 h-5 text-[#eeb95d]" />
                        </div>
                        <div>
                          <p className="text-white/70">Monday - Friday</p>
                          <p className="text-white font-medium">9:00 AM - 5:00 PM</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <FaPhone className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                          <p className="text-white/70">Phone</p>
                          <a href="tel:+18294232020" className="text-white font-medium hover:text-teal-400 transition-colors">
                            +1 (829) 423-2020
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#eeb95d]/20 flex items-center justify-center">
                          <FaEnvelope className="w-5 h-5 text-[#eeb95d]" />
                        </div>
                        <div>
                          <p className="text-white/70">Email</p>
                          <a href="mailto:turquesabayrd@gmail.com" className="text-white font-medium hover:text-[#eeb95d] transition-colors">
                            turquesabayrd@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-bold text-white">Location</h3>
                    </div>
                    <div className="aspect-video w-full">
                      <iframe
                        title="TurquesaBay location map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78178.60200827541!2d-69.61468943408546!3d19.20625671902215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaeff7e40e4fc13%3A0x2d03588e9c980382!2sTurquesa%20bay!5e0!3m2!1sen!2sdo!4v1727051055548!5m2!1sen!2sdo"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      />

                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={slideUp}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} 
                                  rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-white/40
                                  transition-colors`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} 
                                  rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-white/40
                                  transition-colors`}
                        placeholder="Your email"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} 
                                  rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-white/40
                                  transition-colors`}
                        placeholder="Subject"
                      />
                      {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2 text-sm">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} 
                                  rounded-xl focus:outline-none focus:border-teal-400 text-white placeholder-white/40
                                  transition-colors`}
                        placeholder="Your message"
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-xl
                                font-medium hover:from-teal-400 hover:to-teal-500 transition-all duration-300
                                focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </div>
            </main>
          </div>

          <Notification
            message={notification.message}
            isVisible={notification.visible}
            onClose={closeNotification}
          />
        </motion.div>
      )}
    </>
  );
}

export default Contact;
