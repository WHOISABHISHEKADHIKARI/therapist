import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Users } from 'lucide-react';

const Hero = () => {
  // Handle WhatsApp booking
  const handleWhatsAppBooking = () => {
    const phoneNumber = '9865412482';
    const message = `Hello! I would like to book a session at Serenity Spa.

🌟 I'm interested in your wellness services and would like to:
• Schedule an appointment
• Learn about available treatments
• Discuss pricing and packages

Please let me know your available time slots. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-spa-100 via-sage-50 to-spa-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-spa-50/30 to-sage-100/20" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-spa-200/30 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-sage-200/30 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-8 w-8 text-spa-500 mr-2" />
            <span className="text-spa-600 font-medium text-lg">Welcome to Serenity</span>
            <Sparkles className="h-8 w-8 text-spa-500 ml-2" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Journey to
            <span className="block gradient-text">Wellness Begins</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of luxury and tranquility. Our expert therapists 
            and personalized treatments will rejuvenate your body, mind, and spirit.
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button onClick={handleWhatsAppBooking} className="btn-primary text-lg px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Session
            </button>
            <Link to="/services" className="btn-secondary text-lg px-8 py-4">
              <Users className="w-5 h-5 mr-2" />
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="card text-center">
            <div className="text-3xl font-bold text-spa-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-spa-600 mb-2">15+</div>
            <div className="text-gray-600">Expert Therapists</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-spa-600 mb-2">25+</div>
            <div className="text-gray-600">Wellness Services</div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-spa-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-spa-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;