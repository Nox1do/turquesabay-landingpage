import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Amenities from './components/pages/Amenities';
import Contact from './components/pages/Contact';
import ScrollToTop from './components/assets/ScrollToTop';
import './App.css';

import emailjs from '@emailjs/browser';

emailjs.init("iW3gI3yUtf2gVC4O-");

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular la carga de recursos
    const loadResources = async () => {
      // Aquí puedes agregar la lógica para cargar recursos reales
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulación de carga
      setIsLoading(false);
    };

    loadResources();
  }, []);

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <iframe 
              src="https://lottie.host/embed/98e3d50b-c427-4a30-8ff7-2098e3cbb814/ZZTiHyhz69.json"
              width="300" 
              height="300"
              style={{ border: 'none' }}
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home isLoading={isLoading} />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;