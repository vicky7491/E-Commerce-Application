import React from 'react';
import Footer from './Footer';
import BookingForm from './BookingForm';
import CallToAction from './CallToAction';
import FounderImage from "../../assets/founder.png";

import GalleryImage1 from "../../assets/babyimpression.jpg";
import GalleryImage2 from "../../assets/petimpression.jpg";
import GalleryImage3 from "../../assets/coupleimpression.jpg";
import GalleryImage4 from "../../assets/parentsimpression.jpg";
import GalleryImage5 from "../../assets/account.jpg";
import GalleryImage6 from "../../assets/brand-logo.jpg";

const AboutUs = () => {
  const galleryItems = [
    { id: 1, src: GalleryImage1, alt: "Newborn baby hand casting" },
    { id: 2, src: GalleryImage2, alt: "Family hand sculpture" },
    { id: 3, src: GalleryImage3, alt: "Couple hand casting" },
    { id: 4, src: GalleryImage4, alt: "Baby feet casting" },
    { id: 5, src: GalleryImage5, alt: "Child hand casting" },
    { id: 6, src: GalleryImage6, alt: "Grandparent hand casting" },
  ];

  
  const artistDetails = [
    "Safe, non-toxic materials certified for all ages",
    "Premium finishes: Matte, Gloss, Pearl, Antique (Bronze/Gold/Silver)",
    "Custom coloring options available",
    "Popular for newborns, families, and special occasions"
  ];

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <main id="main-content">
        {/* Hero Section */}
        <section 
          className="relative bg-yellow-50 overflow-hidden" 
          aria-labelledby="hero-heading"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url(${FounderImage})` }}
            aria-hidden="true"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-6">
                Celebrate Love, Family & Memories
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl">
                Discover the art of life casting with <strong>Beautiful Molds</strong>. We capture your most emotional moments in 3D sculptures that tell a story — yours.
              </p>
              <a
                href="#booking"
                className="inline-block bg-brand-terracotta hover:bg-brand-gold transition-all duration-300 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform hover:scale-105 focus:ring-2 focus:ring-brand-gold focus:ring-opacity-50"
              >
                Book a Casting Session
              </a>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-terracotta opacity-20 rounded-2xl transform rotate-3"></div>
                <img
                  src={FounderImage}
                  alt="Aniket Kumar, founder of Beautiful Molds"
                  className="relative rounded-2xl shadow-xl border-4 border-white max-w-full"
                  width={540}
                  height={360}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quote Banner */}
        <section className="bg-brand-gold text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <blockquote className="text-2xl font-medium italic text-center">
              <p className="before:content-['“'] after:content-['”']">
                We don’t just mold hands and feet — we preserve love, legacy, and the essence of moments.
              </p>
              <footer className="mt-4 text-xl not-italic font-semibold">
                — Aniket Kumar, Founder
              </footer>
            </blockquote>
          </div>
        </section>

       

        {/* Meet the Artist */}
        <section 
          className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14"
          aria-labelledby="artist-heading"
        >
          <div>
            <span className="mb-4 inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-base font-medium">
              Meet the Artist
            </span>
            <h2 id="artist-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Crafting Memories with Precision
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <span className="font-semibold text-brand-charcoal">Aniket Kumar</span>, experienced life casting artist, blends skill and sensitivity to preserve the beauty of fleeting moments. From newborns to grandparents, every sculpture is a personal tribute.
            </p>
            
            <ul className="space-y-3 mb-10">
              {artistDetails.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="h-6 w-6 text-yellow-700 mr-3 mt-0.5 flex-shrink-0" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-base">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-700 p-5 rounded-lg">
              <p className="text-gray-700 italic text-lg">
                "Each casting is a unique piece of fine art that can be wall-mounted, displayed on stands, or suspended for dramatic effect."
              </p>
            </div>
          </div>
          
          <div 
            id="booking"
            className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg"
          >
            <BookingForm formId="aboutus"/>
          </div>
        </section>

        {/* Gallery */}
        <section 
          className="py-16 px-6 bg-gray-100" 
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="gallery-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Cherished Memories
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg">
                See how our life castings have helped families preserve precious moments
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={400}
                    height={320}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium text-lg">{item.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
        <Footer />
      </main>
    </>
  );
};

export default AboutUs;