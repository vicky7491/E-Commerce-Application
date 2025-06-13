// src/pages/OurGallery.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OurGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState(null);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Memories' },
    { id: 'family', name: 'Family Castings' },
    { id: 'baby', name: 'Baby Impressions' },
    { id: 'couples', name: 'Couples Keepsakes' },
    { id: 'pets', name: 'Pet Paw Prints' },
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');

  // Featured images section
  const featuredImages = [
    { 
      id: 'feat1', 
      title: 'First Steps', 
      description: 'Baby feet casting made with love',
      category: 'baby'
    },
    { 
      id: 'feat2', 
      title: 'Family Hands', 
      description: 'Generational connection captured',
      category: 'family'
    },
    { 
      id: 'feat3', 
      title: 'Wedding Bands', 
      description: 'Eternal love preserved in plaster',
      category: 'couples'
    },
  ];

  // Gallery items
  const galleryItems = [
    { 
      id: 'g1', 
      title: 'Newborn Hands', 
      description: 'Tiny hands preserved forever', 
      category: 'baby',
      date: '2023-05-12'
    },
    { 
      id: 'g2', 
      title: 'Family Circle', 
      description: 'Three generations together', 
      category: 'family',
      date: '2023-06-18'
    },
    { 
      id: 'g3', 
      title: 'Golden Anniversary', 
      description: '50 years of love captured', 
      category: 'couples',
      date: '2023-07-22'
    },
    { 
      id: 'g4', 
      title: 'Puppy Paws', 
      description: 'First paw prints of our new family member', 
      category: 'pets',
      date: '2023-08-05'
    },
    { 
      id: 'g5', 
      title: 'Sibling Love', 
      description: 'Brother and sister hands together', 
      category: 'family',
      date: '2023-09-14'
    },
    { 
      id: 'g6', 
      title: 'Tiny Toes', 
      description: 'Perfect baby footprints', 
      category: 'baby',
      date: '2023-10-03'
    },
    { 
      id: 'g7', 
      title: 'Engagement Cast', 
      description: 'Celebrating the beginning of forever', 
      category: 'couples',
      date: '2023-11-11'
    },
    { 
      id: 'g8', 
      title: 'Kitty Prints', 
      description: 'Our feline friend immortalized', 
      category: 'pets',
      date: '2023-12-01'
    },
  ];

  // Video showcase
  const videoItems = [
    {
      id: 'v1',
      title: 'The Art of Memory Preservation',
      description: 'A behind-the-scenes look at our casting process'
    },
    {
      id: 'v2',
      title: 'Family Memories Preserved Forever',
      description: 'Heartwarming stories from our customers'
    }
  ];

  // Open lightbox with content
  const openLightbox = (content) => {
    setLightboxContent(content);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxContent(null);
    document.body.style.overflow = 'auto';
  };

  // Filter gallery items
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-r from-brand-terracotta/90 to-brand-charcoal/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Gallery of Memories</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Where precious moments are transformed into timeless art pieces
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? 'bg-white text-brand-terracotta shadow-lg'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Memories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Featured Memories</h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto"></div>
            <p className="mt-6 text-brand-charcoal/80 max-w-2xl mx-auto">
              Some of our most cherished creations that tell beautiful stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-square bg-gradient-to-br from-brand-terracotta/10 to-brand-charcoal/10 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-4/5 h-4/5" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-brand-cream mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-charcoal">Memory Collection</h2>
              <p className="text-brand-terracotta mt-2">
                {activeCategory === 'all' 
                  ? 'All precious moments' 
                  : `Showing ${categories.find(c => c.id === activeCategory)?.name}`}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-brand-charcoal/70">
                {filteredItems.length} precious moments
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
                whileHover={{ y: -5 }}
                onClick={() => openLightbox({
                  type: 'image',
                  title: item.title,
                  description: item.description
                })}
              >
                <div className="relative aspect-square bg-gradient-to-br from-brand-terracotta/5 to-brand-charcoal/5 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-4/5 h-4/5" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-brand-charcoal truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 mt-1 min-h-[40px]">
                    {item.description}
                  </p>
                  <div className="flex items-center mt-3">
                    <span className="text-xs bg-brand-terracotta/10 text-brand-terracotta px-2 py-1 rounded">
                      {item.date}
                    </span>
                    <span className="ml-2 text-xs bg-brand-charcoal/10 text-brand-charcoal px-2 py-1 rounded">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Moments in Motion</h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto"></div>
            <p className="mt-6 text-brand-charcoal/80 max-w-2xl mx-auto">
              Watch how we transform fleeting moments into lasting treasures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="relative aspect-video bg-gradient-to-br from-brand-terracotta/20 to-brand-charcoal/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <button 
                    className="relative z-10"
                    onClick={() => openLightbox({
                      type: 'video',
                      title: item.title,
                      description: item.description
                    })}
                  >
                    <div className="bg-brand-terracotta rounded-full p-4 hover:scale-110 transition-transform">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Cherished Memories</h2>
            <div className="w-24 h-1 bg-brand-terracotta mx-auto"></div>
            <p className="mt-6 text-brand-charcoal/80 max-w-2xl mx-auto">
              Stories from families who have preserved their precious moments with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="text-amber-400 text-2xl">★★★★★</div>
                  <span className="ml-2 text-brand-charcoal/80">5.0</span>
                </div>
                <p className="text-brand-charcoal italic mb-4">
                  "The baby feet casting we received is absolutely precious. It captures every tiny detail perfectly. This will be a family heirloom for generations."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="ml-4">
                    <div className="font-medium text-brand-charcoal">Sarah Johnson</div>
                    <div className="text-sm text-brand-terracotta">Baby's First Steps Casting</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-terracotta/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-brand-charcoal mb-4">Ready to Create Your Memory?</h3>
            <p className="text-brand-charcoal/80 mb-6 max-w-2xl mx-auto">
              Preserve your special moments in beautiful, timeless castings that will be cherished for generations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-8 py-3 bg-brand-terracotta text-white rounded-lg hover:bg-brand-terracotta/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Session
              </motion.button>
              <motion.button
                className="px-8 py-3 bg-white text-brand-terracotta border border-brand-terracotta rounded-lg hover:bg-brand-terracotta/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-brand-terracotta transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-black rounded-xl">
            {lightboxContent.type === 'image' ? (
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-[500px]" />
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{lightboxContent.title}</h3>
                  <p className="text-gray-300">{lightboxContent.description}</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-video bg-gradient-to-br from-brand-terracotta/20 to-brand-charcoal/20 flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 rounded-full p-4">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{lightboxContent.title}</h3>
                  <p className="text-gray-300">{lightboxContent.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurGallery;