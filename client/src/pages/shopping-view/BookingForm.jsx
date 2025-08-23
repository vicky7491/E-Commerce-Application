import { useToast } from "@/components/ui/use-toast";
import React, { useState } from 'react';
import axios from 'axios';
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

  const { toast } = useToast();

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


    const clickedFormId = sessionStorage.getItem("activeForm");
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
      }
    } catch (error) {
      console.error("Error submitting booking:", error.response?.data || error.message);
      toast({
        title: 'Failed to submit booking. Please try again.',
        variant: 'destructive',
    });
  }
  };

  return (
    <div>
      <div id="booking-section" className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-2 text-brand-charcoal">
              Book Your Session
            </h2>
            <p className="text-center text-brand-charcoal/70 mb-8">
              Don't wait — request your pricing in seconds!
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Your Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      required
                      onKeyPress={handleNameKeyPress}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Phone Number*
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={formData.phone}
                      onInput={handlePhoneInput}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Location*
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Concept */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Casting Impressions
                </h3>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Select Your Impressions Concept*
                </label>
                <select
                  required
                  value={selectedConcept}
                  onChange={(e) => setSelectedConcept(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Choose a concept</option>
                  <option value="Baby Concept">Baby Concept</option>
                  <option value="Parents / Aashirwad Concept">Parents / Aashirwad Concept</option>
                  <option value="Couples Concept">Couples Concept</option>
                  <option value="Family / Group">Family / Group Concept</option>
                </select>
              </div>

              {/* Time Preference */}
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Time Preference
                </h3>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Preferred Time*
                </label>
                <select
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a time</option>
                  <option value="early-morning">Early Morning (6AM–9AM)</option>
                  <option value="morning">Morning (9AM–12PM)</option>
                  <option value="afternoon">Afternoon (12PM–4PM)</option>
                  <option value="evening">Evening (4PM–7PM)</option>
                </select>
              </div>

              {/* Comments */}
              <div>
                <label htmlFor="comments" className="block text-sm font-medium mb-1">
                  Additional Comments
                </label>
                <textarea
                  rows={3}
                  id="comments"
                  placeholder="Optional"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  onClick={() => sessionStorage.setItem("activeForm", formId)}
                  className="px-6 py-3 bg-brand-gold hover:bg-brand-clay text-white font-medium rounded-md shadow-md transition-all duration-300"
                >
                  BOOK YOUR SESSION
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
