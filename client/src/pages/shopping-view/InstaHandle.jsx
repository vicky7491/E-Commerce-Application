import React, { useState, useEffect } from 'react';

const InstagramHandle = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  
  // Generate memory bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 2000,
      duration: Math.random() * 3000 + 5000
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="h-[250px] bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center p-4">
      {/* Main Instagram handle display */}
      <div className="relative group flex justify-center items-center mt-8 mb-16">
        {/* Floating memory bubbles */}
        {bubbles.map(bubble => (
          <div 
            key={bubble.id}
            className="absolute rounded-full opacity-60 animate-float"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: '-50%',
              animationDelay: `${bubble.delay}ms`,
              animationDuration: `${bubble.duration}ms`,
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(${
                Math.random() > 0.5 ? 249 : 251
              },${Math.random() > 0.5 ? 168 : 207},${Math.random() > 0.5 ? 212 : 232},0.7) 100%)`
            }}
          ></div>
        ))}
        
        {/* Instagram handle with enhanced animations */}
        <a
          href="https://www.instagram.com/3d_casting_frame?igsh=bXBydjkxYTl6aGE4"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center px-8 py-6 rounded-2xl transition-all duration-500 bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Instagram icon */}
          <div className={`mr-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isHovered ? 'animate-wiggle scale-125' : 'scale-100'
          }`}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="text-rose-400 group-hover:text-amber-400 transition-colors duration-500"
              strokeWidth="1.5"
            >
              <rect 
                x="2" 
                y="2" 
                width="20" 
                height="20" 
                rx="5" 
                ry="5"
                className={`transition-all duration-500 ${
                  isHovered ? 'stroke-[2.5]' : ''
                }`}
              ></rect>
              <circle 
                cx="12" 
                cy="12" 
                r="5" 
                className={`transition-all duration-500 ${
                  isHovered ? 'stroke-[2.5]' : ''
                }`}
              ></circle>
              <circle 
                cx="18" 
                cy="6" 
                r="1.2" 
                className={`transition-all duration-500 ${
                  isHovered ? 'fill-amber-400 scale-125' : 'fill-rose-400'
                }`}
              ></circle>
            </svg>
          </div>

          {/* Text with vibrant gradient and animations */}
          <span className="font-dancing text-4xl md:text-5xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-400 to-rose-500 relative">
            @beautifulmolds
            
            {/* Animated underline */}
            <span 
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-700 ease-out rounded-full ${
                isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            ></span>
          </span>
        </a>
        
        {/* Glow effect */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-rose-300/40 to-amber-300/40 rounded-2xl blur-xl opacity-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : ''
        }`}></div>
        
        {/* Floating hearts animation */}
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="animate-float text-amber-400">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        
        {/* Hover tooltip */}
        {/* Hover tooltip */}
<div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 px-4 py-3 bg-gradient-to-r from-rose-50 to-amber-50 backdrop-blur-md rounded-xl shadow-lg transition-all duration-500 ${
  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
}`}>
  <p className="text-base font-medium text-rose-900 whitespace-nowrap flex items-center">
    Follow us for real customer stories 
    <span className="ml-2 text-amber-500 animate-pulse">🧡</span>
  </p>

  {/* Downward arrow (triangle) */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-rose-50 to-amber-50 rotate-45 shadow-sm"></div>
</div>

      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-rose-200/40 to-amber-200/40 blur-xl animate-pulse-slow"></div>
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-amber-200/30 to-rose-200/30 blur-xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-rose-100/50 to-amber-100/50 blur-2xl animate-pulse-slower"></div>
      
      
     
    </div>
  );
};

export default InstagramHandle;