import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Clock, MapPin, Users } from 'lucide-react';

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);

  // Load therapists from localStorage
  useEffect(() => {
    const storedTherapists = localStorage.getItem('spa_therapists');
    if (storedTherapists) {
      setTherapists(JSON.parse(storedTherapists));
    }
  }, []);

  // Handle WhatsApp booking with therapist
  const handleBookTherapist = (therapist) => {
    const phoneNumber = '9865412482';
    const displayData = getDisplayData(therapist);
    const message = `Hello! I would like to book a session with ${therapist.name} at Serenity Spa.

👤 Therapist: ${therapist.name}
🎯 Specialty: ${therapist.specialty}
⭐ Rating: ${displayData.rating} (${displayData.reviews} reviews)
🕐 Availability: ${displayData.availability}
📍 Location: ${displayData.location}
💼 Experience: ${therapist.experience}

Please let me know the available time slots for booking. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Default fallback image if no image is provided
  const getTherapistImage = (therapist) => {
    return therapist.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face';
  };

  // Generate random rating and reviews for display purposes
  const getDisplayData = (therapist) => {
    const ratings = [4.7, 4.8, 4.9, 5.0];
    const reviewCounts = [45, 67, 89, 123, 156, 203];
    const availabilities = [
      'Mon-Fri, 9AM-6PM',
      'Tue-Sat, 10AM-7PM', 
      'Mon-Thu, 8AM-5PM',
      'Wed-Sun, 9AM-6PM',
      'Mon-Sat, 6AM-8PM'
    ];
    const locations = [
      'Main Studio',
      'Wellness Room',
      'Therapy Suite',
      'Private Room',
      'Relaxation Center'
    ];
    
    return {
      rating: ratings[therapist.id % ratings.length],
      reviews: reviewCounts[therapist.id % reviewCounts.length],
      availability: availabilities[therapist.id % availabilities.length],
      location: locations[therapist.id % locations.length],
      bio: `${therapist.name} is a skilled ${therapist.specialty} specialist with ${therapist.experience} of experience. They are dedicated to providing exceptional wellness treatments tailored to each client's needs.`
    };
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
    <section id="therapists" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Expert Therapists</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified professionals bring years of experience and passion to help you 
            achieve your wellness goals in a nurturing environment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {therapists.length > 0 ? therapists.map((therapist) => {
            const displayData = getDisplayData(therapist);
            return (
              <motion.div
                key={therapist.id}
                className="card group hover:shadow-2xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-6">
                  <img
                    src={getTherapistImage(therapist)}
                    alt={therapist.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-4 border-spa-100 group-hover:border-spa-200 transition-colors"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-spa-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {therapist.experience}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{therapist.name}</h3>
                  <p className="text-spa-600 font-medium mb-2">{therapist.specialty} Specialist</p>
                  
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(displayData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {displayData.rating} ({displayData.reviews} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {displayData.bio}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-2">Specialty:</h4>
                    <span className="bg-spa-100 text-spa-700 px-2 py-1 rounded-full text-xs">
                      {therapist.specialty}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-spa-500" />
                    {displayData.availability}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-spa-500" />
                    {displayData.location}
                  </div>
                </div>

                <motion.button
                  className="w-full btn-primary text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookTherapist(therapist)}
                >
                  Book with {therapist.name.split(' ')[0]}
                </motion.button>
              </motion.div>
            );
          }) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Therapists Available
              </h3>
              <p className="text-gray-600">
                Therapists will appear here once they are added through the admin panel.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="card max-w-2xl mx-auto">
            <Award className="h-12 w-12 text-spa-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Our Therapists Are Certified
            </h3>
            <p className="text-gray-600">
              Every member of our team holds professional certifications and continues 
              their education to provide you with the highest quality care.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Therapists;