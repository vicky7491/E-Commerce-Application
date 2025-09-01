import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, MessageSquare, Camera, Send, CheckCircle, Sparkles, Heart } from 'lucide-react';
import axios from "axios";
import { API_BASE } from "@/api/base";

const BookingForm = ({formId}) => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [date, setDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock toast function since we can't use the external one
  const toast = (message) => {
    console.log(message);
    // You can replace this with your actual toast implementation
  };

  const concepts = [
    { value: "Baby Concept", icon: "👶", description: "Precious moments with your little one", color: "from-rose-100 to-pink-100" },
    { value: "Parents / Aashirwad Concept", icon: "🙏", description: "Blessings and family traditions", color: "from-amber-100 to-yellow-100" },
    { value: "Couples Concept", icon: "💕", description: "Romantic and intimate sessions", color: "from-rose-100 to-orange-100" },
    { value: "Family / Group", icon: "👨‍👩‍👧‍👦", description: "Everyone together, memories forever", color: "from-slate-100 to-rose-100" }
  ];

  const timeSlots = [
    { value: "early-morning", label: "Early Morning", time: "6AM–9AM", icon: "🌅" },
    { value: "morning", label: "Morning", time: "9AM–12PM", icon: "☀️" },
    { value: "afternoon", label: "Afternoon", time: "12PM–4PM", icon: "🌤️" },
    { value: "evening", label: "Evening", time: "4PM–7PM", icon: "🌇" }
  ];

  const handleNameKeyPress = (e) => {
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.location || !selectedConcept || !date || !preferredTime) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
          comments: '',
        });
        setSelectedConcept('');
        setDate('');
        setPreferredTime('');
      }, 3000);
    }, 2000);

   
    const clickedFormId = sessionStorage?.getItem("activeForm");
    if (clickedFormId !== formId) return;

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      concept: selectedConcept,
      date,
      time: preferredTime,
      comments: formData.comments,
    };

    try {
      const res = await axios.post(`${API_BASE}/bookings/booking`, payload);
      if (res.status === 201) {
        toast({ title: 'Booking submitted successfully!' });
        // Reset form...
      }
    } catch (error) {
      console.error("Error submitting booking:", error.response?.data || error.message);
      toast({
        title: 'Failed to submit booking. Please try again.',
        variant: 'destructive',
      });
    }
    
  };

  if (isSubmitted) {
    return (
      <div className="relative">
        {/* Background elements matching your homepage */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/50 rounded-3xl"></div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
            Booking Submitted!
          </h2>
          <p className="text-slate-600 text-lg">Thank you for choosing us. We'll contact you soon to confirm your session.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background elements matching your homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-rose-50/30 to-amber-50/50 rounded-3xl"></div>
      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-rose-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Header matching your homepage style */}
        <div className="text-center mb-8 p-8 pb-0">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-rose-400 mr-3"></div>
            <Sparkles className="w-5 h-5 text-rose-500 mx-2" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-rose-400 ml-3"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-3 tracking-tight">
            Book Your Session
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Don't wait — request your pricing in seconds!
          </p>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Your Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <User className="w-3 h-3" />
                  <span>Your Name*</span>
                </label>
                <input
                  type="text"
                  onKeyPress={handleNameKeyPress}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Phone className="w-3 h-3" />
                  <span>Phone Number*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onInput={handlePhoneInput}
                  className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white text-sm"
                  placeholder="10-digit phone number"
                />
              </div>
              
              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Mail className="w-3 h-3" />
                  <span>Email Address*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white text-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <MapPin className="w-3 h-3" />
                  <span>Your Location*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white text-sm"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Concept Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Casting Impressions</h3>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Your Impressions Concept*
              </label>
              <div className="grid grid-cols-1 gap-3">
                {concepts.map((concept) => (
                  <div
                    key={concept.value}
                    className={`relative p-4 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md group ${
                      selectedConcept === concept.value
                        ? 'border-rose-400 bg-gradient-to-r from-rose-50/50 to-orange-50/50 shadow-md'
                        : 'border-slate-200/50 bg-white/70 backdrop-blur-sm hover:border-rose-300'
                    }`}
                    onClick={() => setSelectedConcept(concept.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{concept.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-sm mb-1">{concept.value}</h4>
                        <p className="text-xs text-slate-600">{concept.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        selectedConcept === concept.value 
                          ? 'border-rose-400 bg-rose-400' 
                          : 'border-slate-300 group-hover:border-rose-400'
                      }`}>
                        {selectedConcept === concept.value && (
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Preference */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Time Preference</h3>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Calendar className="w-3 h-3" />
                  <span>Preferred Date*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Clock className="w-3 h-3" />
                  <span>Preferred Time*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.value}
                      className={`p-3 border rounded-xl cursor-pointer transition-all duration-300 hover:shadow-sm group ${
                        preferredTime === slot.value
                          ? 'border-rose-400 bg-gradient-to-r from-rose-50/50 to-orange-50/50 shadow-sm'
                          : 'border-slate-200/50 bg-white/70 backdrop-blur-sm hover:border-rose-300'
                      }`}
                      onClick={() => setPreferredTime(slot.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{slot.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{slot.label}</div>
                          <div className="text-xs text-slate-600">{slot.time}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          preferredTime === slot.value 
                            ? 'border-rose-400 bg-rose-400' 
                            : 'border-slate-300 group-hover:border-rose-400'
                        }`}>
                          {preferredTime === slot.value && (
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-rose-600" />
              </div>
              <label className="text-xl font-bold text-slate-800">Additional Comments</label>
            </div>
            
            <textarea
              rows={3}
              placeholder="Optional"
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200/50 rounded-xl focus:border-rose-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:bg-white resize-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={(e) => {
                if (typeof sessionStorage !== 'undefined') {
                  sessionStorage.setItem("activeForm", formId);
                }
                handleSubmit(e);
              }}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700'
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>BOOK YOUR SESSION</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;