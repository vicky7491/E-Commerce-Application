// AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full" style={{ background: "#f5f0eb" }}>
      
      {/* Left side — Brand Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 relative overflow-hidden"
        style={{ background: "#383838" }}
      >
        {/* Gold top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#C9A227" }} />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A227 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Terracotta decorative blob */}
        <div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20"
          style={{ background: "#C47D52" }}
        />
        <div
          className="absolute top-32 -left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "#C9A227" }}
        />

        {/* Top — Logo */}
        <div className="relative z-10 px-10 pt-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#C9A227" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="#383838" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ color: "#C9A227", fontFamily: "'Georgia', serif", letterSpacing: "0.08em" }}
            >
              Beautiful Molds
            </span>
          </div>
        </div>

        {/* Middle — Main copy */}
        <div className="relative z-10 px-10 flex-1 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#C9A227" }}
            >
              Lifetime Keepsakes
            </p>
            <h2
              className="text-4xl font-bold leading-tight"
              style={{ color: "#ffffff", fontFamily: "'Georgia', serif" }}
            >
              Preserve Your Most{" "}
              <span style={{ color: "#C9A227" }}>Precious</span>{" "}
              Moments Forever
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#b0a898" }}>
              Transform cherished memories into timeless, tangible keepsakes treasured for generations.
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-0.5" style={{ background: "#C9A227" }} />

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: "✦", text: "Premium quality casting materials" },
              { icon: "✦", text: "Expert artisan craftsmanship" },
              { icon: "✦", text: "Safe for newborns & toddlers" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-xs" style={{ color: "#C9A227" }}>{icon}</span>
                <span className="text-sm" style={{ color: "#c8bfb4" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Trust badge */}
        <div className="relative z-10 px-10 pb-10">
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.25)" }}
          >
            <div className="flex -space-x-2">
              {["#C47D52", "#C9A227", "#7a6a5a"].map((bg, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ background: bg, borderColor: "#383838", color: "#fff" }}
                >
                  {["A", "B", "C"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "#C9A227" }}>10,000+ families</p>
              <p className="text-xs" style={{ color: "#8a7e74" }}>trust Beautiful Molds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — Form Panel */}
      <div
        className="flex w-full lg:w-3/5 items-center justify-center px-6 py-12 sm:px-10 lg:px-16 relative"
        style={{ background: "#faf7f4" }}
      >
        {/* Subtle terracotta corner accent */}
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-5 rounded-bl-full"
          style={{ background: "#C47D52" }}
        />

        {/* Mobile logo — only visible on small screens */}
        <div className="absolute top-6 left-6 flex items-center gap-2 lg:hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#383838" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="#C9A227" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: "#383838", fontFamily: "'Georgia', serif" }}
          >
            Beautiful Molds
          </span>
        </div>

        <div className="w-full max-w-md relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;