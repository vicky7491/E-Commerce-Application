import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import BookingDashboard from "./pages/admin-view/BookingDashboard";

import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import OrderSuccess from "./pages/shopping-view/OrderSuccess";
import SearchProducts from "./pages/shopping-view/search";
import FAQ from "./pages/shopping-view/FAQ";
import ContactUs from "./pages/shopping-view/ContactUs";
import AboutUs from "./pages/shopping-view/AboutUs";
import ShippingDelivery from "./pages/shopping-view/ShippingDeliveryPolicies";
import PrivacyPolicy from "./pages/shopping-view/PrivacyPolicy";
import TermsAndConditions from "./pages/shopping-view/TermsAndConditions";
import Testimonials from "./pages/shopping-view/Testimonials";
import CastingKit from "./pages/shopping-view/casting-kit";

import NotFound from "./pages/not-found";
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";
import ScrollToTop from "./components/common/ScrollToTop";

import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] h-[600px] bg-black" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ScrollToTop />
      <Routes>
        {/* ================= Redirect Root -> Shop ================= */}
        <Route path="/" element={<Navigate to="/shop" replace />} />

        {/* ================= Public + Protected Shop Routes ================= */}
        <Route path="/shop" element={<ShoppingLayout />}>
          {/* Default Shop Home */}
          <Route index element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="shipping-delivery-policies" element={<ShippingDelivery />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="CastingKit" element={<CastingKit />} />

          {/* Protected User Routes */}
          <Route
            path="checkout"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingCheckout />
              </CheckAuth>
            }
          />
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />
          <Route
            path="order-success"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <OrderSuccess />
              </CheckAuth>
            }
          />
          <Route
            path="payment-success"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <PaymentSuccessPage />
              </CheckAuth>
            }
          />
        </Route>

       
       {/* ================= Auth Routes ================= */}
<Route path="/auth" element={<AuthLayout />}>
  <Route
    path="login"
    element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AuthLogin />
      </CheckAuth>
    }
  />
  <Route
    path="register"
    element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AuthRegister />
      </CheckAuth>
    }
  />
</Route>

        {/* ================= Protected Admin Routes ================= */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="bookingDashboard" element={<BookingDashboard />} />
        </Route>

        {/* Fallback Routes */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
