import React from "react";
import { Button } from "@/components/ui/button";
import BookingForm from "@/pages/shopping-view/BookingForm";
import babyimpression from "../../assets/babyimpression.jpg";
import Footer from "./Footer";
import CallToAction from "./CallToAction";

const ContactUs = () => {
  return (
    <main className="bg-[#f5f5f5] text-[#333] flex flex-col min-h-screen">
      <section className="relative bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] py-16 md:py-24 text-white text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23c19d56' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-[#c19d56] mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Your memories matter — we make sure they reach you safely and
            promptly.
          </p>
        </div>
      </section>
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
