import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Therapists', path: '/therapists' },
    { name: 'Booking', path: '/booking' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Massage Therapy',
    'Facial Treatments',
    'Body Wellness',
    'Energy Healing',
    'Couples Retreat',
    'Wellness Packages'
  ];

  const policies = [
    'Privacy Policy',
    'Terms of Service',
    'Cancellation Policy',
    'Gift Card Terms',
    'Health & Safety',
    'Accessibility'
  ];

  return (
    <footer className="bg-gradient-to-br from-sage-800 to-spa-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-spa-300" />
                <span className="text-2xl font-bold text-white">Serenity Spa</span>
              </Link>
              <p className="text-sage-200 leading-relaxed mb-6">
                Your sanctuary for wellness and rejuvenation. We're dedicated to 
                providing exceptional spa experiences that nurture your body, mind, and spirit.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                  <motion.button
                    key={platform}
                    className="w-10 h-10 bg-sage-700 hover:bg-spa-600 rounded-lg flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-white text-sm font-medium">
                      {platform.charAt(0)}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sage-200 hover:text-spa-300 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-sage-200 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-spa-300 mt-0.5 flex-shrink-0" />
                  <div className="text-sage-200 text-sm">
                    <p>123 Wellness Boulevard</p>
                    <p>Serenity District, SD 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-spa-300 flex-shrink-0" />
                  <span className="text-sage-200 text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-spa-300 flex-shrink-0" />
                  <span className="text-sage-200 text-sm">info@serenityspa.com</span>
                </div>
              </div>
              
              {/* Hours */}
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Hours</h4>
                <div className="text-sage-200 text-sm space-y-1">
                  <p>Mon-Fri: 8:00 AM - 9:00 PM</p>
                  <p>Saturday: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="border-t border-sage-700 py-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Connected with Serenity
            </h3>
            <p className="text-sage-200 mb-6">
              Subscribe to our newsletter for wellness tips, special offers, and updates on new services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-sage-600 text-white placeholder-sage-300 focus:outline-none focus:ring-2 focus:ring-spa-400 focus:border-transparent"
              />
              <motion.button
                className="px-6 py-3 bg-spa-600 hover:bg-spa-700 text-white rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-sage-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {policies.map((policy) => (
                <button
                  key={policy}
                  className="text-sage-300 hover:text-spa-300 text-sm transition-colors"
                >
                  {policy}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sage-300 text-sm">
              <span>© 2024 Serenity Spa. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for your wellness</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="border-t border-sage-700 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-700 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="text-spa-300 font-bold text-lg">SPA</span>
              </div>
              <p className="text-sage-300 text-xs">Certified Spa</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-700 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="text-spa-300 font-bold text-lg">ECO</span>
              </div>
              <p className="text-sage-300 text-xs">Eco-Friendly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-700 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="text-spa-300 font-bold text-lg">SSL</span>
              </div>
              <p className="text-sage-300 text-xs">Secure Booking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-700 rounded-lg flex items-center justify-center mb-2 mx-auto">
                <span className="text-spa-300 font-bold text-lg">5★</span>
              </div>
              <p className="text-sage-300 text-xs">Top Rated</p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;