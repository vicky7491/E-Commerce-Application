import React, { useState } from 'react';

const BookingForm = () => {
    const [selectedConcept, setSelectedConcept] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!", selectedConcept);
    };

    return (
        <div>
            <div id="booking-section" className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-3xl font-bold text-center mb-2 text-brand-charcoal">Book Your Impressions</h2>
                        <p className="text-center text-brand-charcoal/70 mb-8">Exciting.. Isn't it? Let's Request for Pricing!</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">Your Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-charcoal mb-1">Your Name*</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-charcoal mb-1">Your Phone Number*</label>
                                        <input
                                            type="tel"
                                            required
                                            pattern="[0-9]{10}"
                                            maxLength={10}
                                            className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-charcoal mb-1">Your Email Address*</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-charcoal mb-1">Your Location*</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Impressions Selection */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">Casting Impressions</h3>
                                <label className="block text-sm font-medium text-brand-charcoal mb-2">Select Your Impressions Concept*</label>
                                <select
                                    required
                                    value={selectedConcept || ''}
                                    onChange={(e) => setSelectedConcept(e.target.value)}
                                    className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                >
                                    <option value="">Choose a concept</option>
                                    <option value="Baby Concept">Baby Concept</option>
                                    <option value="Couples Concept">Couples Concept</option>
                                    <option value="Family / Group">Family / Group</option>
                                </select>
                            </div>

                            {/* Time Preference */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">Time Preference</h3>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full mb-4 px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                />

                                <label className="block text-sm font-medium text-brand-charcoal mb-2">Preferred Time*</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                >
                                    <option value="">Select a time</option>
                                    <option value="early-morning">Early Morning (6AM–9AM)</option>
                                    <option value="morning">Morning (9AM–12PM)</option>
                                    <option value="afternoon">Afternoon (12PM–4PM)</option>
                                    <option value="evening">Evening (4PM–7PM)</option>
                                </select>
                            </div>

                            {/* Additional Comments */}
                            <div>
                                <label className="block text-sm font-medium text-brand-charcoal mb-1">Additional Comments</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-brand-charcoal/20 rounded-md focus:ring-2 focus:ring-brand-gold focus:border-brand-gold"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-brand-gold hover:bg-brand-clay text-white font-medium rounded-md shadow-md transition-all duration-300"
                                >
                                    REQUEST PRICE
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
