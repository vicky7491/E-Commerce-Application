import React from "react";
import { Button } from "@/components/ui/button";
import BookingForm from "@/pages/shopping-view/BookingForm";
import babyimpression from "../../assets/babyimpression.jpg";
import Footer from "./Footer";
import CallToAction from "./CallToAction";

const ContactUs = () => {
  return (
    <main className="bg-[#f5f5f5] text-[#333] flex flex-col min-h-screen">
      {/* Contact Section */}
      <section className="bg-[#f9f5ef] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info with Image */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif text-[#b89d4f] mb-6">Get in Touch</h2>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
              <img
                src={babyimpression}
                alt="Golden Hand Cast"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#c19d56] space-y-6">
              <div>
                <h3 className="font-bold">Our Location</h3>
                <p className="text-gray-600">Surya Vihar Part 2, Sector 91, Faridabad, Hariyana, 121003, India</p>
              </div>
              <div>
                <h3 className="font-bold">Phone Number</h3>
                <p className="text-gray-600">+91-8368490492</p>
              </div>
              <div>
                <h3 className="font-bold">Email Address</h3>
                <p className="text-gray-600">beautifulmolds@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Booking Form on the Right */}
          <BookingForm />
        </div>
      </section>

     
      <CallToAction />
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ContactUs;
