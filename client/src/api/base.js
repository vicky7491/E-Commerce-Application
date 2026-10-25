// Keep production API requests on the storefront origin so browser auth cookies
// are first-party. Vercel proxies /api requests to the Render API.
const hostname = typeof window === "undefined" ? "" : window.location.hostname;
const usesStorefrontApiProxy =
  hostname === "beautifulmolds.com" ||
  hostname.endsWith(".beautifulmolds.com") ||
  hostname.endsWith(".vercel.app");

export const API_BASE = usesStorefrontApiProxy
  ? ""
  : import.meta.env.VITE_API_BASE_URL || "";
