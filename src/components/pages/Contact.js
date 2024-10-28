import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Notification from '../assets/Notification';

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
          className="font-sans min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://imgur.com/DRnBROY.jpg')" }}
        >
          <div className="bg-black bg-opacity-30 min-h-screen py-8">
            <main className="container mx-auto px-4">
              <motion.h1 
                variants={slideUp}
                className="text-4xl font-bold mb-8 text-left text-white"
              >
                <span className="text-teal-400">Contact</span>{' '}
                <span className="text-[#eeb95d]">Us</span>
              </motion.h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={slideUp} className="space-y-8">
                  <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-80">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-4">Reception Office</h2>
                    <p className="text-gray-700 mb-2">10103, Santo Domingo, Dominican Republic</p>
                    <p className="text-gray-700 mb-4">Monday - Friday 9:00 AM - 5:00 PM</p>
                    
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">Contact Information</h3>
                    <p className="text-gray-700 mb-1">Phone: +1-(829) 423-2020</p>
                    <p className="text-gray-700">
                      Email: <a href="mailto:turquesabayrd@gmail.com" className="text-teal-600 hover:text-teal-800">
                        turquesabayrd@gmail.com
                      </a>
                    </p>
                  </div>

                  <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-80">
                    <h3 className="text-xl font-semibold text-teal-700 mb-4">Location</h3>
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78178.60200827541!2d-69.61468943408546!3d19.20625671902215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaeff7e40e4fc13%3A0x2d03588e9c980382!2sTurquesa%20bay!5e0!3m2!1sen!2sdo!4v1727051055548!5m2!1sen!2sdo" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={slideUp} className="space-y-8">
                  <div className="p-6 rounded-lg shadow-md bg-white bg-opacity-80">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-4">Contact Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white bg-opacity-50`} 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white bg-opacity-50`} 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                        <input 
                          type="text" 
                          id="subject" 
                          name="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white bg-opacity-50`} 
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="4" 
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white bg-opacity-50`}
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                      <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300">Send</button>
                    </form>
                  </div>
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