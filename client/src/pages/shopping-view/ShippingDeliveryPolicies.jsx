import React from "react";
import {
  FaShippingFast,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
// import Header from '@/components/Header';
import Footer from "./Footer";
import CallToAction from "./CallToAction";

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5ef]">
      {/* Hero Section */}
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
            Shipping & Delivery Policy
          </h1>
          <div className="w-24 h-1 bg-[#c19d56] mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Your memories matter — we make sure they reach you safely and
            promptly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Last Updated */}
            <div className="bg-[#f0e6d8] p-6 border-b border-[#e4d5c1]">
              <div className="flex items-center">
                <FaCalendarCheck className="text-[#c19d56] text-xl mr-3" />
                <span className="font-semibold">Last Updated: June 2025</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-[#f9f5ef] p-6 rounded-lg border border-[#e4d5c1]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <FaShippingFast className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1a2f]">
                      Shipping Coverage
                    </h3>
                  </div>
                  <p>
                    We currently deliver to selected areas including{" "}
                    <strong>
                      Delhi, Uttar Pradesh, Haryana, Noida, and Gurgaon
                    </strong>
                    .
                  </p>
                </div>

                <div className="bg-[#f9f5ef] p-6 rounded-lg border border-[#e4d5c1]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <FaClock className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1a2f]">
                      Processing Time
                    </h3>
                  </div>
                  <p>
                    Orders are typically dispatched within 24 hours, excluding
                    Sundays and public holidays.
                  </p>
                </div>

                <div className="bg-[#f9f5ef] p-6 rounded-lg border border-[#e4d5c1]">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0a1a2f] text-[#c19d56] w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <FaCalendarCheck className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1a2f]">
                      Delivery Timeline
                    </h3>
                  </div>
                  <p>
                    Deliveries to serviceable areas usually take{" "}
                    <strong>2–4 business days</strong>, depending on your
                    location.
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-[#0a1a2f] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#c19d56] rounded-full flex items-center justify-center text-white mr-3 text-sm">
                    1
                  </span>
                  Delivery Coverage
                </h2>
                <p className="mb-6 pl-11">
                  At the moment, we only ship within{" "}
                  <strong>
                    Delhi NCR, Uttar Pradesh, Haryana, Gurgaon, and nearby areas
                  </strong>
                  . If your pin code falls outside our serviceable zones, we’ll
                  notify you during checkout or after placing your order.
                </p>

                <h2 className="text-2xl font-bold text-[#0a1a2f] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#c19d56] rounded-full flex items-center justify-center text-white mr-3 text-sm">
                    2
                  </span>
                  Order Timelines
                </h2>
                <p className="mb-6 pl-11">
                  Once dispatched, most orders are delivered within 2–4 working
                  days. However, remote localities within the service regions
                  may take slightly longer.
                </p>

                <h2 className="text-2xl font-bold text-[#0a1a2f] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#c19d56] rounded-full flex items-center justify-center text-white mr-3 text-sm">
                    3
                  </span>
                  Delays & Exceptions
                </h2>
                <p className="mb-6 pl-11">
                  Occasionally, there might be delays due to weather, holidays,
                  or courier service issues. We’ll keep you updated if there’s
                  any significant change to your estimated delivery.
                </p>

                <h2 className="text-2xl font-bold text-[#0a1a2f] mb-4 flex items-center">
                  <span className="w-8 h-8 bg-[#c19d56] rounded-full flex items-center justify-center text-white mr-3 text-sm">
                    4
                  </span>
                  Order Cancellation Policy
                </h2>
                <p className="mb-6 pl-11">
                  If we’re unable to deliver to your address or there are any
                  issues fulfilling your order, we’ll cancel it and issue a full
                  refund to your original payment method.
                </p>

                <div className="mt-12 p-6 bg-[#f9f5ef] rounded-xl border border-[#e4d5c1]">
                  <h3 className="text-xl font-bold text-[#0a1a2f] mb-6 text-center">
                    Our Shipping Guarantee
                  </h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    <div className="flex flex-col items-center text-center max-w-[180px]">
                      <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mb-3">
                        <FaShippingFast className="text-2xl" />
                      </div>
                      <p className="font-semibold">24hr Processing</p>
                      <p className="text-sm mt-1">
                        Orders processed within 24 hours
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center max-w-[180px]">
                      <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mb-3">
                        <FaCalendarCheck className="text-2xl" />
                      </div>
                      <p className="font-semibold">6-Day Shipping</p>
                      <p className="text-sm mt-1">All days except Sundays</p>
                    </div>

                    <div className="flex flex-col items-center text-center max-w-[180px]">
                      <div className="bg-[#0a1a2f] text-[#c19d56] w-16 h-16 rounded-full flex items-center justify-center mb-3">
                        <FaMapMarkerAlt className="text-2xl" />
                      </div>
                      <p className="font-semibold">Local Delivery</p>
                      <p className="text-sm mt-1">
                        Currently serving selected North Indian regions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Need Help with Your Order?
                  </h2>
                  <p className="text-lg opacity-90 max-w-2xl">
                    Our customer support team is here to assist you with any
                    shipping inquiries or concerns.
                  </p>
                </div>

                <div className="md:w-1/3">
                  <div className="bg-[#c19d56] text-center p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="mt-1 mr-3 text-[#0a1a2f]" />
                        <p className="text-[#0a1a2f]">
                          Surya Vihar Part 2, Sector 91, Faridabad, Hariyana
                          121003, India.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="mr-3 text-[#0a1a2f]" />
                        <a
                          href="tel:+918368490492"
                          className="text-[#0a1a2f] hover:underline"
                        >
                          +91-8368490492
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="mr-3 text-[#0a1a2f]" />
                        <a
                          href="mailto:beautifulmolds@gmail.com"
                          className="text-[#0a1a2f] hover:underline"
                        >
                          beautifulmolds@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </div>
  );
};

export default ShippingDelivery;
