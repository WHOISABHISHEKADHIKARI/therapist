import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const whatsappMessage = `🌸 *New Contact Form Submission* 🌸\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `📋 *Subject:* ${formData.subject}\n\n` +
      `💬 *Message:*\n${formData.message}\n\n` +
      `Thank you for contacting Serenity Spa! 🧘‍♀️✨`;
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/9865412482?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        '123 Wellness Boulevard',
        'Serenity District, SD 12345',
        'United States'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        'Main: (555) 123-4567',
        'Booking: (555) 123-4568',
        'Emergency: (555) 123-4569'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@serenityspa.com',
        'booking@serenityspa.com',
        'support@serenityspa.com'
      ]
    },
    {
      icon: Clock,
      title: 'Hours',
      details: [
        'Mon-Fri: 8:00 AM - 9:00 PM',
        'Saturday: 9:00 AM - 8:00 PM',
        'Sunday: 10:00 AM - 6:00 PM'
      ]
    }
  ];

  const subjects = [
    'General Inquiry',
    'Booking Question',
    'Service Information',
    'Feedback',
    'Partnership',
    'Other'
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you on your wellness journey. Reach out to us for bookings, 
            questions, or just to say hello. We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-spa-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-spa-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              className="mt-8 h-64 bg-gradient-to-br from-spa-100 to-sage-100 rounded-xl flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <MapPin className="h-12 w-12 text-spa-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-500 mt-1">
                  Click to view directions to our spa
                </p>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((platform) => (
                  <button
                    key={platform}
                    className="w-10 h-10 bg-spa-100 hover:bg-spa-200 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span className="text-spa-600 text-sm font-medium">
                      {platform.charAt(0)}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card">
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Send Us a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent transition-colors"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Message Sent to WhatsApp!
                  </h3>
                  <p className="text-gray-600">
                    Your message has been sent via WhatsApp. We'll respond to you shortly!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="card text-center">
            <div className="text-3xl mb-4">🚗</div>
            <h4 className="font-semibold text-gray-900 mb-2">Free Parking</h4>
            <p className="text-sm text-gray-600">
              Complimentary valet parking available for all our guests
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">♿</div>
            <h4 className="font-semibold text-gray-900 mb-2">Accessible</h4>
            <p className="text-sm text-gray-600">
              Fully wheelchair accessible with dedicated facilities
            </p>
          </div>
          <div className="card text-center">
            <div className="text-3xl mb-4">🚌</div>
            <h4 className="font-semibold text-gray-900 mb-2">Public Transport</h4>
            <p className="text-sm text-gray-600">
              Conveniently located near metro station and bus stops
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;