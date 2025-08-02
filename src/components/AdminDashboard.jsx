import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Star, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Leaf
} from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('services');
  
  // Load data from localStorage or use default data
  const getStoredData = (key, defaultData) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultData;
    }
  };

  const [services, setServices] = useState(() => getStoredData('spa_services', [
    {
      id: 1,
      title: 'Swedish Massage',
      description: 'Relaxing full-body massage using gentle strokes',
      price: 120,
      duration: 60,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Hot Stone Therapy',
      description: 'Therapeutic massage with heated volcanic stones',
      price: 150,
      duration: 90,
      image: '/api/placeholder/300/200'
    }
  ]));

  const [therapists, setTherapists] = useState(() => getStoredData('spa_therapists', [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Swedish Massage',
      experience: '8 years',
      image: '/api/placeholder/200/200'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Deep Tissue',
      experience: '6 years',
      image: '/api/placeholder/200/200'
    }
  ]));

  const [reviews, setReviews] = useState(() => getStoredData('spa_reviews', [
    {
      id: 1,
      name: 'Emma Wilson',
      rating: 5,
      comment: 'Amazing experience! The staff was professional and the massage was incredibly relaxing.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'David Brown',
      rating: 5,
      comment: 'Best spa in town. The hot stone therapy was exactly what I needed.',
      date: '2024-01-10'
    }
  ]));

  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // WhatsApp settings
  const [whatsappSettings, setWhatsappSettings] = useState(() => 
    getStoredData('spa_whatsapp_settings', { phoneNumber: '9865412482' })
  );
  const [editingWhatsapp, setEditingWhatsapp] = useState(false);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('spa_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('spa_therapists', JSON.stringify(therapists));
  }, [therapists]);

  useEffect(() => {
    localStorage.setItem('spa_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('spa_whatsapp_settings', JSON.stringify(whatsappSettings));
  }, [whatsappSettings]);

  // Reset form states when switching tabs
  useEffect(() => {
    setEditingItem(null);
    setShowAddForm(false);
  }, [activeTab]);

  const tabs = [
    { id: 'services', label: 'Services', icon: Leaf },
    { id: 'therapists', label: 'Therapists', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onLogout(false);
  };

  const deleteService = (id) => {
    if (window.confirm('Delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const deleteTherapist = (id) => {
    if (window.confirm('Delete this therapist?')) {
      setTherapists(therapists.filter(t => t.id !== id));
    }
  };

  const deleteReview = (id) => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleSave = (type, item) => {
    if (type === 'services') {
      if (item.id) {
        setServices(services.map(s => s.id === item.id ? item : s));
      } else {
        const newService = { ...item, id: Date.now() };
        setServices([...services, newService]);
      }
    } else if (type === 'therapists') {
      if (item.id) {
        setTherapists(therapists.map(t => t.id === item.id ? item : t));
      } else {
        setTherapists([...therapists, { ...item, id: Date.now() }]);
      }
    } else if (type === 'reviews') {
      if (item.id) {
        setReviews(reviews.map(r => r.id === item.id ? item : r));
      } else {
        setReviews([...reviews, { ...item, id: Date.now() }]);
      }
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      <div className="grid gap-6">
        {services.map(service => (
          <motion.div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 border"
            layout
          >
            {editingItem?.id === service.id ? (
              <ServiceForm
                service={service}
                onSave={(item) => handleSave('services', item)}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-16 h-12 sm:w-20 sm:h-15 md:w-24 md:h-18 object-cover rounded-lg border flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Price: ${service.price}</span>
                      <span>Duration: {service.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showAddForm && (
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ServiceForm
            service={{}}
            onSave={(item) => handleSave('services', item)}
            onCancel={() => setShowAddForm(false)}
          />
        </motion.div>
      )}
    </div>
  );

  const renderTherapists = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Therapists</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Therapist
        </button>
      </div>

      <div className="grid gap-6">
        {therapists.map(therapist => (
          <motion.div
            key={therapist.id}
            className="bg-white rounded-lg shadow-md p-6 border"
            layout
          >
            {editingItem?.id === therapist.id ? (
              <TherapistForm
                therapist={therapist}
                onSave={(item) => handleSave('therapists', item)}
                onCancel={() => setEditingItem(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  {therapist.image && (
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full border flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{therapist.name}</h3>
                    <p className="text-gray-600 mb-2">Specialty: {therapist.specialty}</p>
                    <p className="text-gray-500">Experience: {therapist.experience}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(therapist)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTherapist(therapist.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showAddForm && (
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TherapistForm
            therapist={{}}
            onSave={(item) => handleSave('therapists', item)}
            onCancel={() => setShowAddForm(false)}
          />
        </motion.div>
      )}
    </div>
  );

  // Update the renderReviews function (around line 324)
  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Reviews</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Review
        </button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border"
        >
          <ReviewForm
            review={{}}
            onSave={(item) => handleSave('reviews', item)}
            onCancel={() => setShowAddForm(false)}
          />
        </motion.div>
      )}

      <div className="grid gap-6">
        {reviews.map(review => (
          <motion.div
            key={review.id}
            className="bg-white rounded-lg shadow-md p-6 border"
            layout
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <button
                onClick={() => deleteReview(review.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                type="button"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Booking management functionality would be implemented here with backend integration.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-spa-600" />
              <h1 className="text-xl font-bold text-gray-900">Serenity Spa Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setEditingItem(null);
                      setShowAddForm(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-spa-100 text-spa-700 border border-spa-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'services' && renderServices()}
                {activeTab === 'therapists' && renderTherapists()}
                {activeTab === 'reviews' && renderReviews()}
                {activeTab === 'bookings' && renderBookings()}
                {activeTab === 'settings' && renderSettings()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Form Component
const ServiceForm = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: service.title || '',
    description: service.description || '',
    price: service.price || '',
    duration: service.duration || '',
    image: service.image || ''
  });
  const [imagePreview, setImagePreview] = useState(service.image || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = { ...service, ...formData, price: Number(formData.price), duration: Number(formData.duration) };
    onSave(newService);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Service preview"
              className="w-24 h-18 sm:w-28 sm:h-21 md:w-32 md:h-24 object-cover rounded-lg border"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  );
};

// Therapist Form Component
const TherapistForm = ({ therapist, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: therapist.name || '',
    specialty: therapist.specialty || '',
    experience: therapist.experience || '',
    image: therapist.image || ''
  });
  const [imagePreview, setImagePreview] = useState(therapist.image || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...therapist, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
        <input
          type="text"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
          placeholder="e.g., 5 years"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Therapist Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Therapist preview"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full border"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminDashboard;

// Add ReviewForm component at the end of the file
const ReviewForm = ({ review, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: review.name || '',
    service: review.service || '',
    rating: review.rating || 5,
    comment: review.comment || '',
    date: review.date || new Date().toISOString().split('T')[0],
    image: review.image || '',
    verified: review.verified !== false
  });
  const [imagePreview, setImagePreview] = useState(review.image || '');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData({ ...formData, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...review, ...formData, rating: Number(formData.rating) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <input
            type="text"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
          >
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Comment</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spa-500 focus:border-transparent"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Customer preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-spa-100"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="verified"
          checked={formData.verified}
          onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
          className="rounded border-gray-300 text-spa-600 focus:ring-spa-500"
        />
        <label htmlFor="verified" className="text-sm text-gray-700">Verified Review</label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-spa-600 hover:bg-spa-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  );
};