import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Therapists from './components/Therapists';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Admin from './components/Admin';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={
          <div className="min-h-screen bg-gradient-to-br from-spa-50 to-sage-50">
            <Navbar />
        
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <Services />
                  <Therapists />
                  <Reviews />
                  <Contact />
                </motion.div>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/therapists" element={<Therapists />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            
            <Footer />
            
            {/* Chatbot */}
            <AnimatePresence>
              {isChatbotOpen && (
                <Chatbot onClose={() => setIsChatbotOpen(false)} />
              )}
            </AnimatePresence>
            
            {/* Chatbot Toggle Button */}
            <motion.button
              className="fixed bottom-6 right-6 bg-spa-600 hover:bg-spa-700 text-white p-4 rounded-full shadow-lg z-50 chatbot-animation"
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
