import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, isAuthLoading, children }) {
  const location = useLocation();

  // ✅ Wait for auth check to complete before any redirect decision
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const isAuthPage = location.pathname.startsWith('/auth/');
  const isAdminPage = location.pathname.startsWith('/admin');

  // Logged-in user hits login/register → redirect out
  if (isAuthenticated && isAuthPage) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop"} replace />;
  }

  // Non-admin tries to access admin
  if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Not logged in on a protected route
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;