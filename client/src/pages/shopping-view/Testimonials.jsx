// src/components/OurGallery.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import CallToAction from './CallToAction';
import { galleryItems } from '../../config/index';
import Footer from './Footer';
import InstagramHandle from './InstaHandle';

const Testimonials = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // Use navigate here

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isMobile ? 0 : 0.1 } }
  };

  const hoverVariants = {
    hover: { y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)", transition: { duration: 0.4, ease: [0.16,1,0.3,1] } }
  };

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

  const handleExploreKits = () => navigate("/shop/CastingKit");

  return (
    <div>
      <section className="w-full py-16 px-4 sm:px-8 bg-[#faf8f5] relative overflow-hidden">
        {/* Decorative floating elements */}
        <motion.div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#f5ece0] opacity-50"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-10 left-0 w-40 h-40 rounded-full bg-[#f0e7db] opacity-30"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }} className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-[#d9a590] mr-4" />
              <span className="font-serif text-[#d9a590] tracking-widest">TIMELESS MEMORIES</span>
              <div className="h-px w-16 bg-[#d9a590] ml-4" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#4a3f35] mb-4">Cherished Impressions</h2>
            <p className="text-lg md:text-xl text-[#7a6a5a] max-w-3xl mx-auto font-sans">
              Each casting tells a unique story, preserving life's most precious moments in timeless artistry.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <motion.button key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-sans ${
                  activeCategory === category ? 'bg-[#d9a590] text-white' : 'text-[#4a3f35] border border-[#d9c9b8] hover:bg-[#e9ddd0]'
                } transition-all`}>
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <motion.div key={item.id} variants={itemVariants} whileHover="hover" variant={hoverVariants}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden ${
                  item.size === 'large' ? 'lg:col-span-2' : item.size === 'small' ? 'h-64' : 'h-80'
                }`} onClick={() => setSelectedItem(item)} layout>
                <div className="relative h-full w-full overflow-hidden bg-[#f0e7db]">
                  {item.type === 'image' ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="relative w-full h-full">
                      <video className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" muted loop playsInline preload="metadata">
                        <source src={item.image} type={`video/${item.image.split('.').pop()}`} />
                      </video>
                      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a3f35]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="font-serif text-xl text-white">{item.title}</h3>
                      <p className="font-sans text-white/90 mt-1">{item.description}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-[#d9a590] rounded-full text-xs text-white font-sans">{item.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#d9a590] opacity-0 group-hover:opacity-100 transition-opacity">
                      <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

         
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedItem(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-6xl w-full max-h-[90vh] bg-[#f5f0e9] rounded-2xl overflow-hidden shadow-xl"
                onClick={e => e.stopPropagation()}>
                
                <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  onClick={() => setSelectedItem(null)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="h-full flex flex-col md:flex-row">
                  <div className="md:w-7/12 h-[50vh] md:h-auto relative bg-black">
                    {selectedItem.type === 'image' ? (
                      <img src={selectedItem.image} alt={selectedItem.title} className="absolute inset-0 w-full h-full object-contain" />
                    ) : (
                      <video className="absolute inset-0 w-full h-full object-contain" autoPlay muted loop controls>
                        <source src={selectedItem.image} type={`video/${selectedItem.image.split('.').pop()}`} />
                      </video>
                    )}
                  </div>

                  <div className="md:w-5/12 p-6 md:p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="font-serif text-2xl text-[#4a3f35] mb-3">{selectedItem.title}</h3>
                      <p className="text-[#7a6a5a] font-sans mb-4">{selectedItem.description}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#7a6a5a] font-sans">Category:</span>
                        <span className="px-3 py-1 bg-[#d9a590]/20 text-[#b2806d] rounded-full font-sans">{selectedItem.category}</span>
                      </div>
                      <p className="text-[#7a6a5a] font-sans">
                        Each piece is meticulously hand-crafted by our artisans using premium materials that ensure your memories last a lifetime.
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#e6d6c5]">
                      <h4 className="font-serif text-xl text-[#4a3f35] mb-3">Preserve Your Memories</h4>
                      <p className="text-[#7a6a5a] font-sans mb-4">
                        Ready to create your own heirloom? Our casting kits make it easy to capture life's precious moments.
                      </p>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                        onClick={handleExploreKits}
                        className="px-6 py-3 bg-[#d9a590] hover:bg-[#c5927f] text-white font-sans rounded-lg transition-colors w-full">
                        Explore Our Kits
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <InstagramHandle />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Testimonials;
