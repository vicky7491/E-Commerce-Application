import React from 'react';
import Footer from './footer';
import BookingForm from './BookingForm';
import CallToAction from './CallToAction';
import Founder from "../../assets/Founder.png";

const AboutUs = () => {
  return (
    <main>
      {/* Hero Section - Improved semantics and responsive padding */}
      <section 
        className="bg-white py-16 px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto"
        aria-label="About Beautyful Molds"
      >
        <div className="w-full md:w-1/2">
          <img
            src={Founder}
            alt="Beautyful Molds founder"
            className="rounded-xl shadow-lg object-cover h-full w-full"
          />
        </div>
        
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Life Casting by <span className="text-yellow-700">Beautyful Molds</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Our sculptures stand out with their exceptional realism and intricate detail. 
            These timeless pieces become cherished family heirlooms, admired for generations.
          </p>
          <button 
            className="bg-yellow-700 hover:bg-yellow-800 transition-colors text-white px-8 py-3 rounded-lg text-lg font-medium shadow-md"
            aria-label="Learn more about our process"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Process Description - Added icons and better spacing */}
      <section className="bg-gray-50 py-16 px-6" aria-label="Life casting process">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-yellow-100 text-yellow-700 rounded-full p-4 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What is Life Casting?
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Life casting is a specialized art form that creates three-dimensional replicas of living subjects 
            (typically hands, feet, or torsos) using safe molding and casting techniques.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                title: 'Incredible Detail',
                description: 'Captures fingerprints, skin texture, and fine wrinkles'
              },
              {
                icon: 'M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2z',
                title: 'Lasting Memories',
                description: 'Creates permanent keepsakes that last for generations'
              },
              {
                icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Unique Art',
                description: 'Transform moments into beautiful display pieces'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Section - Improved layout and emphasis */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="mb-2 inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            Meet the Artist
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Crafting Memories with Precision
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            <span className="font-semibold">Aniket Kumar</span>, UK-certified artist, brings professional life casting 
            expertise to our studio. We specialize in creating exquisite 3D impressions of hands 
            and feet for clients of all ages.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Safe, non-toxic materials certified for all ages",
              "Premium finishes: Matte, Gloss, Pearl, Antique (Bronze/Gold/Silver)",
              "Custom coloring options available",
              "Popular for newborns, families, and special occasions"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-yellow-700 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-700 p-4 rounded">
            <p className="text-gray-700 italic">
              "Each casting is a unique piece of fine art that can be wall-mounted, 
              displayed on stands, or suspended for dramatic effect."
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-md">
          <BookingForm />
        </div>
      </section>

      {/* Gallery - Added titles and better grid */}
      <section className="py-16 px-6 bg-gray-100" aria-label="Client gallery">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cherished Memories
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              See how our life castings have helped families preserve precious moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/assets/images/gallery1.jpg", alt: "Baby feet casting in bronze finish" },
              { src: "/assets/images/gallery2.jpg", alt: "Family hand casting wall display" },
              { src: "/assets/images/gallery3.jpg", alt: "Couple hands casting with pearl finish" },
              { src: "/assets/images/gallery4.jpg", alt: "Newborn hands casting in antique silver" },
              { src: "/assets/images/gallery5.jpg", alt: "Pregnancy belly casting sculpture" },
              { src: "/assets/images/gallery6.jpg", alt: "Golden anniversary hand casting" }
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
};

export default AboutUs;