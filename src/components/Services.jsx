import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Waves, Heart, Flower, Zap, Sun, Moon } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);

  // Default fallback services
  const defaultServices = [
    {
      icon: Waves,
      title: 'Massage Therapy',
      description: 'Relax and unwind with our signature massage treatments designed to release tension and restore balance.',
      price: 'From $80',
      duration: '60-90 min',
      features: ['Swedish Massage', 'Deep Tissue', 'Hot Stone', 'Aromatherapy']
    },
    {
      icon: Flower,
      title: 'Facial Treatments',
      description: 'Rejuvenate your skin with our customized facial treatments using premium organic products.',
      price: 'From $65',
      duration: '45-75 min',
      features: ['Anti-Aging', 'Hydrating', 'Acne Treatment', 'Brightening']
    },
    {
      icon: Heart,
      title: 'Body Wellness',
      description: 'Complete body treatments that detoxify, exfoliate, and nourish your skin from head to toe.',
      price: 'From $95',
      duration: '75-120 min',
      features: ['Body Wraps', 'Scrubs', 'Detox', 'Moisturizing']
    },
    {
      icon: Zap,
      title: 'Energy Healing',
      description: 'Restore your inner balance with our holistic energy healing and meditation sessions.',
      price: 'From $70',
      duration: '60 min',
      features: ['Reiki', 'Chakra Balancing', 'Crystal Therapy', 'Meditation']
    },
    {
      icon: Sun,
      title: 'Couples Retreat',
      description: 'Share a relaxing experience with your loved one in our private couples treatment rooms.',
      price: 'From $180',
      duration: '90 min',
      features: ['Side-by-side Massage', 'Private Room', 'Champagne', 'Aromatherapy']
    },
    {
      icon: Moon,
      title: 'Wellness Packages',
      description: 'Complete wellness experiences combining multiple treatments for the ultimate relaxation.',
      price: 'From $200',
      duration: '3-5 hours',
      features: ['Multi-Treatment', 'Lunch Included', 'Spa Access', 'Consultation']
    }
  ];

  // Load services from localStorage or use defaults
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem('spa_services');
      
      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);
        
        // Transform admin services to display format
        const transformedServices = parsedServices.map((service, index) => ({
          icon: [Waves, Flower, Heart, Zap, Sun, Moon][index % 6], // Cycle through icons
          title: service.title,
          description: service.description,
          price: `$${service.price}`,
          duration: `${service.duration} min`,
          features: ['Premium Service', 'Professional Staff', 'Relaxing Environment', 'Quality Products'],
          image: service.image
        }));
        setServices(transformedServices);
      } else {
        setServices(defaultServices);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices(defaultServices);
    }
  }, []);

  // Listen for localStorage changes (when admin updates services)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedServices = localStorage.getItem('spa_services');
        if (storedServices) {
          const parsedServices = JSON.parse(storedServices);
          const transformedServices = parsedServices.map((service, index) => ({
            icon: [Waves, Flower, Heart, Zap, Sun, Moon][index % 6],
            title: service.title,
            description: service.description,
            price: `$${service.price}`,
            duration: `${service.duration} min`,
            features: ['Premium Service', 'Professional Staff', 'Relaxing Environment', 'Quality Products'],
            image: service.image
          }));
          setServices(transformedServices);
        }
      } catch (error) {
        console.error('Error loading services on storage change:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle WhatsApp booking
  const handleBookService = (service) => {
    const phoneNumber = '9865412482';
    const message = `Hello! I would like to book the following service at Serenity Spa:

🌟 Service: ${service.title}
⏰ Duration: ${service.duration}
💰 Price: ${service.price}

📝 Description: ${service.description}

✨ Includes: ${service.features.join(', ')}

Please let me know your available time slots. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of wellness treatments designed to nurture your body, 
            mind, and spirit in our tranquil sanctuary.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                className="card group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {service.image && (
                  <div className="mb-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-spa-100 rounded-lg mr-4 group-hover:bg-spa-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-spa-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="mr-3">{service.duration}</span>
                      <span className="font-medium text-spa-600">{service.price}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Includes:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-spa-400 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-6 btn-secondary text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookService(service)}
                >
                  Book This Service
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We offer custom treatments tailored to your needs.
          </p>
          <button className="btn-primary">
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;