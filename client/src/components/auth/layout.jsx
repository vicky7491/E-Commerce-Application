// AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left side - Brand Section */}
      <div className="hidden lg:flex items-center justify-center w-2/5 bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_rgba(255,255,255,0.1)_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(255,255,255,0.1)_0%,_transparent_60%)]"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-12 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-16 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-sm space-y-8 text-center text-white relative z-10 px-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-wide leading-tight">
              Beautiful Molds
            </h1>
            <p className="text-white/90 text-lg leading-relaxed font-medium">
              Preserve life's precious moments in timeless castings
            </p>
          </div>
          
          {/* Features list */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">Premium quality materials</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">Expert craftsmanship</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">Lifetime memories</span>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-white/80 text-sm">Trusted by 10,000+ families</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form Section */}
      <div className="flex w-full lg:w-3/5 items-center justify-center px-6 py-12 sm:px-8 lg:px-12 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(59,130,246,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="w-full max-w-lg relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
