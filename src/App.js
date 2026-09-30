import React from 'react';
import { MotionConfig } from 'framer-motion';
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
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
    <Router>
      <div className="App flex flex-col min-h-screen">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
    </MotionConfig>
  );
}

export default App;
