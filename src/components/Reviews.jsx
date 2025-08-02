import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);

  // Handle WhatsApp booking
  const handleWhatsAppBooking = () => {
    const phoneNumber = '9865412482';
    const message = `Hello! I would like to book an experience at Serenity Spa.

🌟 After reading the amazing reviews, I'm excited to:
• Schedule my wellness session
• Experience your premium treatments
• Join your satisfied customers

Please let me know your available time slots. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Load reviews from localStorage
  useEffect(() => {
    const loadReviews = () => {
      try {
        const storedReviews = localStorage.getItem('spa_reviews');
        if (storedReviews) {
          const parsedReviews = JSON.parse(storedReviews);
          // Transform admin data to display format
          const transformedReviews = parsedReviews.map(review => ({
            id: review.id,
            name: review.name,
            service: review.service || 'General Service',
            rating: review.rating,
            date: review.date ? formatDate(review.date) : 'Some time ago',
            image: review.image || getDefaultImage(review.id),
            review: review.comment || review.review || '',
            verified: review.verified !== false
          }));
          setReviews(transformedReviews);
        } else {
          // Fallback to default English reviews if no admin data
          setReviews(getDefaultEnglishReviews());
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews(getDefaultEnglishReviews());
      }
    };

    loadReviews();
    
    // Listen for localStorage changes
    const handleStorageChange = () => {
      loadReviews();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper function to format dates in English
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 14) return `${Math.floor(diffDays / 7)} week ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Helper function to get default image based on ID
  const getDefaultImage = (id) => {
    const images = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face'
    ];
    return images[(id - 1) % images.length];
  };

  // Default English reviews as fallback
  const getDefaultEnglishReviews = () => [
    {
      id: 1,
      name: 'Sarah Johnson',
      service: 'Aromatherapy Massage',
      rating: 5,
      date: '2 weeks ago',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      review: 'Absolutely incredible experience! Lisa created the perfect aromatherapy blend for my stress relief. The atmosphere was so peaceful and I left feeling completely rejuvenated. This has become my monthly self-care ritual.',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      service: 'Deep Tissue Massage',
      rating: 5,
      date: '1 month ago',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      review: 'David is amazing! As an athlete, I needed someone who understands sports therapy, and he delivered beyond expectations. My chronic shoulder pain is completely gone. Highly recommend for sports injuries.',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      service: 'Hot Stone Therapy',
      rating: 5,
      date: '3 weeks ago',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      review: 'The hot stone therapy was pure bliss. Maria has such healing hands and created the most relaxing environment. I felt like I was floating on clouds afterwards.',
      verified: true
    }
  ];

  const stats = [
    { label: 'Average Rating', value: '4.9', icon: '⭐' },
    { label: 'Total Reviews', value: `${reviews.length}+`, icon: '💬' },
    { label: 'Verified Reviews', value: '98%', icon: '✅' },
    { label: 'Repeat Customers', value: '85%', icon: '🔄' }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  // Show message if no reviews
  if (reviews.length === 0) {
    return (
      <section id="reviews" className="section-padding bg-white/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            No reviews yet. Use the admin panel to add the first review.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about 
            their transformative experiences at Serenity Spa.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-spa-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Review */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              className="card text-center relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="h-12 w-12 text-spa-200 mx-auto mb-6" />
              
              <div className="flex items-center justify-center mb-6">
                <img
                  src={reviews[currentReview].image}
                  alt={reviews[currentReview].name}
                  className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-spa-100 mr-3 sm:mr-4 flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-left min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center text-sm sm:text-base">
                    {reviews[currentReview].name}
                    {reviews[currentReview].verified && (
                      <span className="ml-2 text-green-500 text-xs sm:text-sm">✓ Verified</span>
                    )}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">{reviews[currentReview].service}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < reviews[currentReview].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                      {reviews[currentReview].date}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "{reviews[currentReview].review}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-spa-50 p-3 rounded-full shadow-lg transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6 text-spa-600" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-spa-50 p-3 rounded-full shadow-lg transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6 text-spa-600" />
          </button>
        </div>

        {/* Review Dots */}
        <div className="flex justify-center space-x-2 mb-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentReview ? 'bg-spa-600' : 'bg-gray-300 hover:bg-spa-300'
              }`}
            />
          ))}
        </div>

        {/* All Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Recent Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, index) => (
              <motion.div
                key={review.id}
                className="card hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover mr-2 sm:mr-3 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      {review.name}
                      {review.verified && (
                        <span className="ml-1 text-green-500 text-xs">✓</span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">{review.service}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{review.review.length > 120 ? review.review.substring(0, 120) + '...' : review.review}"
                </p>
                <p className="text-xs text-gray-500 mt-3">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied customers who have transformed their wellness journey with us.
            </p>
            <button onClick={handleWhatsAppBooking} className="btn-primary">
              Book Your Experience Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
