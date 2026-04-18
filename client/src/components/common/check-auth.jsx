import { Navigate, useLocation } from "react-router-dom";

// Inline spinner — no new package, pure Tailwind
const Spinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
  </div>
);

const PROTECTED_PATHS = [
  "/shop/checkout",
  "/shop/account",
  "/shop/order-success",
  "/shop/payment-success",
  "/admin",
];

const AUTH_PATHS = ["/auth/login", "/auth/register"];

function CheckAuth({ isAuthenticated, isLoading, user, children }) {
  const location = useLocation();

  // ── Root redirect ─────────────────────────────────────────────────────────
  if (location.pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/shop" />;
  }

  // ── Auth pages (login / register / forgot / reset) ────────────────────────
  // While loading: show spinner so we don't flash login then redirect
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/forgot-password") ||
    location.pathname.includes("/reset-password");

  if (isAuthPage) {
    if (isLoading) return <Spinner />;
    if (isAuthenticated) {
      return user?.role === "admin"
        ? <Navigate to="/admin/dashboard" />
        : <Navigate to="/shop" />;
    }
    return <>{children}</>;
  }

  // ── Protected routes (checkout, account, admin, etc.) ────────────────────
  const isProtected = PROTECTED_PATHS.some(p => location.pathname.startsWith(p));

  if (isProtected) {
    if (isLoading) return <Spinner />;
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role === "admin" && location.pathname.startsWith("/shop")) {
      return <Navigate to="/admin/dashboard" />;
    }
    return <>{children}</>;
  }

  // ── Public /shop/* routes — render immediately, no auth needed ────────────
  return <>{children}</>;
}

export default CheckAuth;