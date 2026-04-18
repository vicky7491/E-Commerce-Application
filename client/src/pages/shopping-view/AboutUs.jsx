import React from "react";
import Footer from "./Footer";
import BookingForm from "./BookingForm";
import CallToAction from "./CallToAction";
import FounderImage from "../../assets/brand-logo.jpg";
import {
  Shield,
  Award,
  Heart,
  Palette,
  Star,
  Users,
  CalendarDays,
  Package,
  Layers,
  Truck,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const whyCards = [
  {
    icon: Shield,
    title: "100% Safe Materials",
    desc: "Non-toxic, skin-safe alginate and plaster certified for newborns and all ages.",
  },
  {
    icon: Award,
    title: "Premium Finishes",
    desc: "Matte, Gloss, Pearl, Antique Bronze/Gold/Silver — tailored to your taste.",
  },
  {
    icon: Heart,
    title: "Every Age, Every Bond",
    desc: "From newborn handprints to grandparent legacy pieces — we capture them all.",
  },
  {
    icon: Palette,
    title: "Custom Coloring",
    desc: "Choose your finish and color to match your home décor perfectly.",
  },
  {
    icon: Star,
    title: "Fine Art Display",
    desc: "Wall-mounted, on stands, or suspended — each piece is gallery-worthy.",
  },
  {
    icon: Users,
    title: "Family-First Studio",
    desc: "A comfortable, patient environment for babies, toddlers, and entire families.",
  },
];

const processSteps = [
  {
    icon: CalendarDays,
    step: "01",
    title: "Book a Session",
    desc: "Pick a date that suits you. We come to you or you visit our studio.",
  },
  {
    icon: Package,
    step: "02",
    title: "We Prepare the Kit",
    desc: "Food-grade alginate mold is prepared — completely safe for all skin types.",
  },
  {
    icon: Layers,
    step: "03",
    title: "Cast & Sculpt",
    desc: "We capture the impression in minutes and craft your 3D sculpture with care.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Delivered to You",
    desc: "Your finished keepsake is shipped safely to your doorstep, beautifully packed.",
  },
];

const artistDetails = [
  "Safe, non-toxic materials certified for all ages",
  "Premium finishes: Matte, Gloss, Pearl, Antique (Bronze/Gold/Silver)",
  "Custom coloring options available",
  "Popular for newborns, families, and special occasions",
];

// ─── Component ────────────────────────────────────────────────────────────────

const AboutUs = () => {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <main id="main-content">

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1 — Hero  (dark navy, matches ContactUs.jsx)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20 md:py-28 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0a1a2f 0%, #112240 50%, #1a3357 100%)",
          }}
          aria-labelledby="hero-heading"
        >
          {/* Decorative gold blur circles */}
          <div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(193,157,86,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(193,157,86,0.10) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />

          {/* SVG dot pattern overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.07 }}
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#c19d56" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">

            {/* Left — text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              {/* Overline */}
              <p
                className="text-sm uppercase tracking-[0.25em] font-medium mb-4"
                style={{ color: "#c19d56" }}
              >
                Our Story
              </p>

              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
              >
                Celebrate Love, Family &amp; Memories
              </h1>

              {/* Gold divider */}
              <div
                className="w-24 h-[2px] mb-6 mx-auto md:mx-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #c19d56, transparent)",
                }}
              />

              <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.80)" }}>
                Discover the art of life casting with{" "}
                <strong className="text-white font-semibold">
                  Beautiful Molds
                </strong>
                . We capture your most emotional moments in 3D sculptures that
                tell a story — yours.
              </p>

              <a
                href="#booking"
                className="inline-block font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #c19d56, #d4af37)",
                  color: "#0a1a2f",
                }}
              >
                Book a Casting Session
              </a>
            </div>

            {/* Right — founder image (kept exactly as original) */}
            <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-2xl transform rotate-3"
                  style={{ background: "rgba(193,157,86,0.20)" }}
                />
                <img
                  src={FounderImage}
                  alt="Aniket Kumar, founder of Beautiful Molds"
                  className="relative rounded-2xl shadow-xl border-4 border-white max-w-full"
                  width={480}
                  height={320}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2 — Animated Quote Banner
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-14 text-white"
          style={{ background: "linear-gradient(135deg, #c19d56 0%, #d4af37 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-medium italic leading-relaxed" style={{ color: "#0a1a2f" }}>
                &ldquo;We don&apos;t just mold hands and feet &mdash; we preserve love,
                legacy, and the essence of moments.&rdquo;
              </p>
              <footer className="mt-5 text-lg not-italic font-bold tracking-wide" style={{ color: "#1a3357" }}>
                — Aniket Kumar, Founder
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3 — Why Choose Us  (replaces deleted gallery)
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-gray-50" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-14">
              <p
                className="text-sm uppercase tracking-[0.25em] font-medium mb-3"
                style={{ color: "#c19d56" }}
              >
                Our Promise
              </p>
              <h2
                id="why-heading"
                className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4"
              >
                Why Families Choose Us
              </h2>
              <div
                className="w-24 h-[2px] mx-auto"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #c19d56, transparent)",
                }}
              />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-transparent
                             transition-all duration-300 hover:border-[#c19d56] hover:shadow-md group"
                >
                  {/* Icon container — navy background matching ContactUs */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 
                               transition-colors duration-300 group-hover:bg-[#c19d56]"
                    style={{ background: "#0a1a2f" }}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-charcoal mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4 — Process Steps
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 px-6"
          style={{
            background:
              "linear-gradient(135deg, #0a1a2f 0%, #112240 50%, #1a3357 100%)",
          }}
          aria-labelledby="process-heading"
        >
          <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-14">
              <p
                className="text-sm uppercase tracking-[0.25em] font-medium mb-3"
                style={{ color: "#c19d56" }}
              >
                How It Works
              </p>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                From Booking to Your Doorstep
              </h2>
              <div
                className="w-24 h-[2px] mx-auto"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #c19d56, transparent)",
                }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {processSteps.map(({ icon: Icon, step, title, desc }, idx) => (
                <div key={step} className="relative flex flex-col items-center text-center px-4 pb-10 md:pb-0">

                  {/* Connecting line — right side (desktop only, not on last) */}
                  {idx < processSteps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] z-0"
                      style={{
                        background:
                          "linear-gradient(to right, #c19d56 0%, rgba(193,157,86,0.25) 100%)",
                        transform: "translateX(28px)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Step circle — navy with gold icon */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 border-2"
                    style={{ background: "#0a1a2f", borderColor: "#c19d56" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#c19d56" }} strokeWidth={1.6} />
                  </div>

                  {/* Step number */}
                  <span
                    className="text-xs font-bold tracking-widest mb-2"
                    style={{ color: "#c19d56" }}
                  >
                    STEP {step}
                  </span>

                  <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5 — Meet the Artist + Booking Form
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 px-6"
          aria-labelledby="artist-heading"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Left — artist info */}
            <div>
              {/* Badge — navy bg + gold text matching ContactUs card style */}
              <span
                className="mb-5 inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
                style={{ background: "#0a1a2f", color: "#c19d56" }}
              >
                Meet the Artist
              </span>

              <h2
                id="artist-heading"
                className="text-3xl font-bold text-brand-charcoal mb-6"
              >
                Crafting Memories with Precision
              </h2>

              {/* Gold left-border accent panel */}
              <div
                className="pl-5 mb-8"
                style={{ borderLeft: "4px solid #c19d56" }}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold text-brand-charcoal">
                    Aniket Kumar
                  </span>
                  , experienced life casting artist, blends skill and sensitivity
                  to preserve the beauty of fleeting moments. From newborns to
                  grandparents, every sculpture is a personal tribute.
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-4 mb-10">
                {artistDetails.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {/* Checkmark icon — inline SVG, no new import */}
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: "#c19d56" }}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        width="12"
                        height="12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#0a1a2f"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-base">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Italic quote block */}
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(193,157,86,0.08)",
                  borderLeft: "4px solid #c19d56",
                }}
              >
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  &ldquo;Each casting is a unique piece of fine art that can be
                  wall-mounted, displayed on stands, or suspended for dramatic
                  effect.&rdquo;
                </p>
              </div>
            </div>

            {/* Right — Booking Form (must stay inside id="booking") */}
            <div
              id="booking"
              className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <BookingForm formId="aboutus" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            Bottom — CallToAction + Footer
        ══════════════════════════════════════════════════════════════════════ */}
        <CallToAction />
        <Footer />
      </main>
    </>
  );
};

export default AboutUs;