import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, ShoppingBag } from "lucide-react";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import Footer from "./Footer";

/* ── Inline SVG geometric hero — no image dependency ── */
function AccountHero() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-[#1c1410]">
      {/* SVG pattern layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Diamond grid pattern */}
          <pattern
            id="diamondGrid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="30,2 58,30 30,58 2,30"
              fill="none"
              stroke="#c17f5e"
              strokeWidth="0.5"
              opacity="0.25"
            />
            <polygon
              points="30,12 48,30 30,48 12,30"
              fill="none"
              stroke="#d4a96a"
              strokeWidth="0.3"
              opacity="0.15"
            />
          </pattern>

          {/* Radial fade mask */}
          <radialGradient id="fadeCenter" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1c1410" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1c1410" stopOpacity="0" />
          </radialGradient>

          {/* Warm glow */}
          <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c17f5e" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c17f5e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base fill */}
        <rect width="100%" height="100%" fill="#1c1410" />

        {/* Diamond grid */}
        <rect width="100%" height="100%" fill="url(#diamondGrid)" />

        {/* Warm glow overlay */}
        <rect width="100%" height="100%" fill="url(#warmGlow)" />

        {/* Large decorative hand outline — left */}
        <g transform="translate(80, 40) rotate(-15)" opacity="0.06">
          <ellipse cx="0" cy="0" rx="18" ry="60" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="22" cy="-10" rx="10" ry="50" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="40" cy="-5" rx="10" ry="48" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="57" cy="5" rx="10" ry="43" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="-16" cy="15" rx="8" ry="35" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
        </g>

        {/* Large decorative hand outline — right */}
        <g transform="translate(1140, 40) rotate(15) scale(-1,1)" opacity="0.06">
          <ellipse cx="0" cy="0" rx="18" ry="60" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="22" cy="-10" rx="10" ry="50" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="40" cy="-5" rx="10" ry="48" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="57" cy="5" rx="10" ry="43" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
          <ellipse cx="-16" cy="15" rx="8" ry="35" fill="none" stroke="#f5e6d3" strokeWidth="1.5" />
        </g>

        {/* Decorative concentric circles — top left */}
        {[40, 70, 100, 130].map((r, i) => (
          <circle
            key={i}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke="#c17f5e"
            strokeWidth="0.4"
            opacity={0.18 - i * 0.03}
          />
        ))}

        {/* Decorative concentric circles — bottom right */}
        {[40, 70, 100, 130].map((r, i) => (
          <circle
            key={i}
            cx="100%"
            cy="100%"
            r={r}
            fill="none"
            stroke="#d4a96a"
            strokeWidth="0.4"
            opacity={0.18 - i * 0.03}
          />
        ))}

        {/* Center radial fade to make text pop */}
        <rect width="100%" height="100%" fill="url(#fadeCenter)" />

        {/* Horizontal ruled lines */}
        {[60, 120, 180, 240].map((y, i) => (
          <line
            key={i}
            x1="0"
            y1={y}
            x2="100%"
            y2={y}
            stroke="#c17f5e"
            strokeWidth="0.3"
            opacity="0.1"
          />
        ))}
      </svg>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <h1
          className="text-4xl sm:text-5xl font-bold"
          style={{
            color: "#f5e6d3",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 20px rgba(193,127,94,0.3)",
          }}
        >
          My Account
        </h1>
        <div
          className="mt-1 h-px w-20"
          style={{ background: "linear-gradient(90deg, transparent, #c17f5e, transparent)" }}
        />
        <p className="text-sm" style={{ color: "#a89080" }}>
          Manage your orders &amp; delivery addresses
        </p>
      </div>
    </div>
  );
}

/* ── Main account page ── */
function ShoppingAccount() {
  return (
    <>
      <div className="flex flex-col min-h-screen" style={{ background: "#faf7f4" }}>
        <AccountHero />

        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div
            className="rounded-2xl shadow-sm overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid #ece8e3" }}
          >
            <Tabs defaultValue="orders">
              {/* Custom tab bar */}
              <div
                className="px-6 pt-5 pb-0"
                style={{ borderBottom: "1px solid #ece8e3" }}
              >
                <TabsList
                  className="h-auto p-0 bg-transparent gap-0"
                  style={{ display: "flex" }}
                >
                  {[
                    { value: "orders", label: "Orders", icon: ShoppingBag },
                    { value: "address", label: "Address", icon: MapPin },
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="relative flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-none bg-transparent border-0 shadow-none
                        data-[state=active]:text-[#c17f5e] data-[state=active]:bg-transparent
                        data-[state=inactive]:text-[#9c8b80]
                        hover:text-[#c17f5e] transition-colors
                        data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#c17f5e] data-[state=active]:after:rounded-t"
                      style={{ outline: "none" }}
                    >
                      <Icon size={15} />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab content */}
              <div className="p-6">
                <TabsContent value="orders" className="mt-0">
                  <ShoppingOrders />
                </TabsContent>
                <TabsContent value="address" className="mt-0">
                  <Address />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShoppingAccount;