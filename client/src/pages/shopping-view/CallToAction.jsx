import React from 'react'
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div>
      {/* Call-to-Action Section */}
      <section className="relative bg-gradient-to-r from-brand-charcoal to-brand-charcoal py-20 text-center overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-1/4 w-16 h-16 rounded-full bg-brand-gold/20 animate-float-1"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-brand-gold/15 animate-float-2"></div>
        <div className="absolute bottom-10 left-1/3 w-14 h-14 rounded-full bg-brand-gold/10 animate-float-3"></div>

        {/* Handprint decorative elements */}
        <div className="absolute -left-10 top-1/4 opacity-10 rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19C8.14,19 5,15.86 5,12C5,11.15 5.18,10.34 5.5,9.58C7.1,11.06 9.28,12 12,12C14.72,12 16.9,11.06 18.5,9.58C18.82,10.34 19,11.15 19,12C19,15.86 15.86,19 12,19Z"/>
          </svg>
        </div>

        <div className="absolute -right-10 bottom-1/4 opacity-10 -rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19C8.14,19 5,15.86 5,12C5,11.15 5.18,10.34 5.5,9.58C7.1,11.06 9.28,12 12,12C14.72,12 16.9,11.06 18.5,9.58C18.82,10.34 19,11.15 19,12C19,15.86 15.86,19 12,19Z"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Preserve Your Most <span className="text-brand-gold">Precious Moments</span> Forever
            </h3>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Transform your cherished memories into timeless, tangible keepsakes that will be treasured for generations to come.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="bg-brand-gold hover:bg-brand-clay text-white font-bold py-7 px-12 text-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/40 flex items-center group">
                <span>Book Your Session Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>

              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-7 px-10 text-lg rounded-lg transition-all duration-300">
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CallToAction;
