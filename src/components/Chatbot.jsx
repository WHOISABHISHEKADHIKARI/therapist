import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Bot, Calendar, Users, Clock, MapPin } from 'lucide-react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m Serenity, your wellness assistant. How can I help you today?',
      timestamp: new Date(),
      options: [
        'View Therapists',
        'Check Availability',
        'Book Appointment',
        'Service Information'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const therapists = [
    { name: 'Sarah Johnson', specialty: 'Massage Therapy', available: 'Today 2-6 PM' },
    { name: 'Michael Chen', specialty: 'Holistic Wellness', available: 'Tomorrow 10 AM-3 PM' },
    { name: 'Emma Rodriguez', specialty: 'Skincare', available: 'Fully booked today' },
    { name: 'David Thompson', specialty: 'Sports Therapy', available: 'Today 4-8 PM' },
    { name: 'Lisa Park', specialty: 'Aromatherapy', available: 'Today 1-5 PM' }
  ];

  const timeSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: false },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: false }
  ];

  const services = [
    { name: 'Massage Therapy', duration: '60-90 min', price: '$80-120' },
    { name: 'Facial Treatment', duration: '45-75 min', price: '$65-95' },
    { name: 'Body Wellness', duration: '75-120 min', price: '$95-150' },
    { name: 'Energy Healing', duration: '60 min', price: '$70' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (type, content, options = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    const userMessage = inputValue.toLowerCase();
    setInputValue('');

    simulateTyping(() => {
      handleBotResponse(userMessage);
    });
  };

  const handleOptionClick = (option) => {
    addMessage('user', option);
    simulateTyping(() => {
      handleBotResponse(option.toLowerCase());
    });
  };

  const handleBotResponse = (userInput) => {
    if (userInput.includes('therapist') || userInput.includes('view therapists')) {
      const therapistList = therapists.map(t => 
        `👤 **${t.name}** - ${t.specialty}\n📅 ${t.available}`
      ).join('\n\n');
      
      addMessage('bot', `Here are our available therapists:\n\n${therapistList}`, [
        'Book with Sarah',
        'Book with Michael',
        'Book with David',
        'Check All Availability'
      ]);
    } else if (userInput.includes('availability') || userInput.includes('check availability')) {
      const availableSlots = timeSlots
        .filter(slot => slot.available)
        .map(slot => `✅ ${slot.time}`)
        .join('\n');
      
      addMessage('bot', `Here are today's available time slots:\n\n${availableSlots}\n\nWould you like to book one of these slots?`, [
        'Book 10:00 AM',
        'Book 12:00 PM',
        'Book 3:00 PM',
        'View Tomorrow'
      ]);
    } else if (userInput.includes('book') || userInput.includes('appointment')) {
      if (userInput.includes('sarah')) {
        addMessage('bot', '📅 Great choice! Sarah Johnson is available today from 2-6 PM.\n\nWhich service would you like to book?', [
          'Swedish Massage (60 min)',
          'Deep Tissue (90 min)',
          'Hot Stone (75 min)',
          'View All Services'
        ]);
      } else if (userInput.includes('michael')) {
        addMessage('bot', '🧘 Excellent! Michael Chen specializes in holistic wellness.\n\nWhat type of session interests you?', [
          'Reiki Healing',
          'Energy Balancing',
          'Meditation Session',
          'Consultation'
        ]);
      } else if (userInput.includes('10:00') || userInput.includes('12:00') || userInput.includes('3:00')) {
        const time = userInput.match(/\d{1,2}:00/)?.[0] || 'selected time';
        addMessage('bot', `Perfect! I can book you for ${time}.\n\nTo complete your booking, I'll need:\n• Your name\n• Phone number\n• Preferred service\n\nShall I redirect you to our booking page?`, [
          'Yes, Book Now',
          'Tell me about services first',
          'Change time',
          'Start over'
        ]);
      } else {
        addMessage('bot', 'I\'d be happy to help you book an appointment! \n\nWhat would you like to do first?', [
          'Choose a therapist',
          'See available times',
          'Browse services',
          'Quick booking'
        ]);
      }
    } else if (userInput.includes('service') || userInput.includes('services')) {
      const serviceList = services.map(s => 
        `💆 **${s.name}**\n⏱️ ${s.duration} | 💰 ${s.price}`
      ).join('\n\n');
      
      addMessage('bot', `Here are our popular services:\n\n${serviceList}\n\nWould you like more details about any service?`, [
        'Massage Details',
        'Facial Details',
        'Body Wellness Info',
        'Book a Service'
      ]);
    } else if (userInput.includes('price') || userInput.includes('cost')) {
      addMessage('bot', '💰 Our pricing is competitive and transparent:\n\n• Massage Therapy: $80-120\n• Facial Treatments: $65-95\n• Body Wellness: $95-150\n• Energy Healing: $70\n• Couples Sessions: $180\n\nWe also offer package deals for multiple sessions!', [
        'View Packages',
        'Book Single Session',
        'Gift Certificates',
        'Payment Options'
      ]);
    } else if (userInput.includes('location') || userInput.includes('address')) {
      addMessage('bot', '📍 **Serenity Spa Location:**\n\n123 Wellness Boulevard\nSerenity District, SD 12345\n\n🚗 Free parking available\n🚌 Near metro station\n♿ Fully accessible\n\nWould you like directions?', [
        'Get Directions',
        'Parking Info',
        'Public Transport',
        'Book Appointment'
      ]);
    } else if (userInput.includes('hours') || userInput.includes('open')) {
      addMessage('bot', '🕐 **Our Hours:**\n\n📅 Monday-Friday: 8:00 AM - 9:00 PM\n📅 Saturday: 9:00 AM - 8:00 PM\n📅 Sunday: 10:00 AM - 6:00 PM\n\nWe\'re open 7 days a week for your convenience!', [
        'Book Today',
        'Book Weekend',
        'Evening Appointments',
        'Holiday Hours'
      ]);
    } else if (userInput.includes('help') || userInput.includes('support')) {
      addMessage('bot', '🤝 I\'m here to help! Here are some things I can assist you with:\n\n• View therapist profiles and availability\n• Check appointment time slots\n• Provide service information and pricing\n• Help with booking appointments\n• Answer questions about our spa\n\nWhat would you like to know?', [
        'Therapist Profiles',
        'Service Menu',
        'Booking Help',
        'Contact Info'
      ]);
    } else {
      addMessage('bot', 'I\'m not sure I understand that request, but I\'m here to help! \n\nLet me know if you\'d like to:', [
        'View Therapists',
        'Check Availability', 
        'Book Appointment',
        'Get Help'
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.includes('**') && line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={index}>
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-spa-600 to-sage-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Serenity Assistant</h3>
            <p className="text-sm opacity-90">Online now</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-spa-600' : 'bg-sage-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-sage-600" />
                  )}
                </div>
                <div className={`rounded-2xl p-3 text-sm ${
                  message.type === 'user'
                    ? 'bg-spa-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {formatMessageContent(message.content)}
                </div>
              </div>
              
              {/* Options */}
              {message.options && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="block w-full text-left p-2 text-sm bg-spa-50 hover:bg-spa-100 text-spa-700 rounded-lg transition-colors border border-spa-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-sage-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent text-sm"
          />
          <motion.button
            onClick={handleSendMessage}
            className="p-3 bg-spa-600 hover:bg-spa-700 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;