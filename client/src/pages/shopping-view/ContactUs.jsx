import React from "react";
import BookingForm from "@/pages/shopping-view/BookingForm";
import babyimpression from "../../assets/babyimpression.jpg";
import Footer from "./Footer";
import CallToAction from "./CallToAction";
import { MapPin, Phone, Mail, Clock } from "lucide-react";



const contactDetails = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "Surya Vihar Part 2, Sector 91\nFaridabad, Haryana 121003, India",
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: "+91-8368490492",
    href: "tel:+918368490492",
  },
  {
    icon: Mail,
    label: "Email Address",
    value: "beautifulmolds@gmail.com",
    href: "mailto:beautifulmolds@gmail.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 10:00 AM – 7:00 PM",
  },
];

const ContactUs = () => {
  return (
    <main className="bg-[#f5f5f5] text-[#333] flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0a1a2f] via-[#112240] to-[#1a3357] py-20 md:py-28 text-white text-center overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#c19d56]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#c19d56]/10 blur-3xl pointer-events-none" />

        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23c19d56' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#c19d56] text-sm uppercase tracking-[0.25em] font-medium mb-3">
            We'd Love to Hear From You
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Contact Us
          </h1>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#c19d56] to-transparent mx-auto mb-6" />
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Your memories matter — we make sure they reach you safely and
            promptly.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="bg-[#f9f5ef] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left column: info cards ── */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-serif text-[#b89d4f] mb-1">Get in Touch</h2>
              <p className="text-gray-500 text-sm">
                Reach out through any of the channels below — we typically respond within a few hours.
              </p>
            </div>

            {/* 2×2 info card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#e8dcc8] hover:shadow-md hover:border-[#c19d56]/40 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a1a2f] flex items-center justify-center group-hover:bg-[#c19d56] transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#c19d56] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#c19d56] mb-1">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-gray-700 text-sm leading-relaxed hover:text-[#b89d4f] transition-colors whitespace-pre-line"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* decorative brand tagline banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#0a1a2f] to-[#1a3357] p-6 flex items-center gap-4 shadow-md">
              <div className="w-1 self-stretch rounded-full bg-[#c19d56]" />
              <div>
                <p className="text-white font-semibold text-base">
                  Preserving Your Precious Moments
                </p>
                <p className="text-white/60 text-sm mt-0.5">
                  Every cast tells a story. Let us help yours last forever.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right column: booking form ── */}
          <div className="lg:col-span-1">
            <BookingForm formId="contactus" />
          </div>

        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
};

export default ContactUs;
