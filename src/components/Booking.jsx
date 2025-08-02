import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, CreditCard, CheckCircle } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    therapist: '',
    date: '',
    time: '',
    duration: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  });

  const services = [
    { id: 'massage', name: 'Massage Therapy', duration: '60-90 min', price: '$80-120' },
    { id: 'facial', name: 'Facial Treatment', duration: '45-75 min', price: '$65-95' },
    { id: 'body', name: 'Body Wellness', duration: '75-120 min', price: '$95-150' },
    { id: 'energy', name: 'Energy Healing', duration: '60 min', price: '$70' },
    { id: 'couples', name: 'Couples Retreat', duration: '90 min', price: '$180' },
    { id: 'package', name: 'Wellness Package', duration: '3-5 hours', price: '$200+' }
  ];

  const therapists = [
    { id: 'sarah', name: 'Sarah Johnson', specialty: 'Massage Therapy', available: true },
    { id: 'michael', name: 'Michael Chen', specialty: 'Holistic Wellness', available: true },
    { id: 'emma', name: 'Emma Rodriguez', specialty: 'Skincare', available: false },
    { id: 'david', name: 'David Thompson', specialty: 'Sports Therapy', available: true },
    { id: 'lisa', name: 'Lisa Park', specialty: 'Aromatherapy', available: true },
    { id: 'james', name: 'James Wilson', specialty: 'Couples Therapy', available: true }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookingSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', bookingData);
    setStep(5); // Success step
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    bookingData.service === service.id
                      ? 'border-spa-500 bg-spa-50'
                      : 'border-gray-200 hover:border-spa-300'
                  }`}
                  onClick={() => setBookingData({ ...bookingData, service: service.id })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{service.duration}</p>
                  <p className="text-spa-600 font-medium mt-2">{service.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Therapist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    !therapist.available
                      ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      : bookingData.therapist === therapist.id
                      ? 'border-spa-500 bg-spa-50'
                      : 'border-gray-200 hover:border-spa-300'
                  }`}
                  onClick={() => {
                    if (therapist.available) {
                      setBookingData({ ...bookingData, therapist: therapist.id });
                    }
                  }}
                  whileHover={therapist.available ? { scale: 1.02 } : {}}
                  whileTap={therapist.available ? { scale: 0.98 } : {}}
                >
                  <h4 className="font-semibold text-gray-900">{therapist.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{therapist.specialty}</p>
                  <p className={`text-sm mt-2 ${
                    therapist.available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {therapist.available ? 'Available' : 'Unavailable'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Times
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`p-2 text-sm border rounded-lg transition-all ${
                        bookingData.time === time
                          ? 'border-spa-500 bg-spa-50 text-spa-700'
                          : 'border-gray-200 hover:border-spa-300'
                      }`}
                      onClick={() => setBookingData({ ...bookingData, time })}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
                  value={bookingData.customerInfo.name}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    customerInfo: { ...bookingData.customerInfo, name: e.target.value }
                  })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
                  value={bookingData.customerInfo.email}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    customerInfo: { ...bookingData.customerInfo, email: e.target.value }
                  })}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
                  value={bookingData.customerInfo.phone}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    customerInfo: { ...bookingData.customerInfo, phone: e.target.value }
                  })}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
                  rows={4}
                  value={bookingData.customerInfo.notes}
                  onChange={(e) => setBookingData({
                    ...bookingData,
                    customerInfo: { ...bookingData.customerInfo, notes: e.target.value }
                  })}
                  placeholder="Any special requests, allergies, or preferences..."
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for booking with Serenity Spa. We've sent a confirmation email 
              with all the details to {bookingData.customerInfo.email}.
            </p>
            <div className="card max-w-md mx-auto text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Booking Summary:</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Service:</span> {services.find(s => s.id === bookingData.service)?.name}</p>
                <p><span className="font-medium">Therapist:</span> {therapists.find(t => t.id === bookingData.therapist)?.name}</p>
                <p><span className="font-medium">Date:</span> {bookingData.date}</p>
                <p><span className="font-medium">Time:</span> {bookingData.time}</p>
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                setStep(1);
                setBookingData({
                  service: '',
                  therapist: '',
                  date: '',
                  time: '',
                  duration: '',
                  customerInfo: { name: '', email: '', phone: '', notes: '' }
                });
              }}
            >
              Book Another Appointment
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="section-padding min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your <span className="gradient-text">Appointment</span>
          </h2>
          <p className="text-xl text-gray-600">
            Schedule your perfect wellness experience in just a few simple steps.
          </p>
        </motion.div>

        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-spa-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-spa-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-8 text-sm text-gray-600">
              <span>Service</span>
              <span>Therapist</span>
              <span>Date & Time</span>
              <span>Information</span>
            </div>
          </div>
        )}

        <motion.div
          className="card"
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}

          {step < 5 && (
            <div className="flex justify-between mt-8">
              <button
                className={`btn-secondary ${
                  step === 1 ? 'invisible' : ''
                }`}
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                className="btn-primary"
                onClick={step === 4 ? handleBookingSubmit : handleNext}
                disabled={
                  (step === 1 && !bookingData.service) ||
                  (step === 2 && !bookingData.therapist) ||
                  (step === 3 && (!bookingData.date || !bookingData.time)) ||
                  (step === 4 && (!bookingData.customerInfo.name || !bookingData.customerInfo.email || !bookingData.customerInfo.phone))
                }
              >
                {step === 4 ? 'Confirm Booking' : 'Next'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;