import { useEffect,Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Layout components stay eager (shells, tiny, always needed)
import AuthLayout    from "./components/auth/layout";
import AdminLayout   from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";

// Common
import CheckAuth   from "./components/common/check-auth";
import ScrollToTop from "./components/common/ScrollToTop";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "./store/auth-slice";

// ─── Eager (landing page — above the fold, must be instant) ──────────────────
import ShoppingHome from "./pages/shopping-view/home";

// ─── Lazy pages ───────────────────────────────────────────────────────────────
const AuthLogin          = lazy(() => import("./pages/auth/login"));
const AuthRegister       = lazy(() => import("./pages/auth/register"));
const AuthForgotPassword = lazy(() => import("./pages/auth/forgot-password"));
const ResetPassword      = lazy(() => import("./pages/auth/resetPassword"));

const AdminDashboard     = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts      = lazy(() => import("./pages/admin-view/products"));
const AdminOrders        = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures      = lazy(() => import("./pages/admin-view/features"));
const BookingDashboard   = lazy(() => import("./pages/admin-view/BookingDashboard"));

const ShoppingListing    = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout   = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount    = lazy(() => import("./pages/shopping-view/account"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success"));
const OrderSuccess       = lazy(() => import("./pages/shopping-view/OrderSuccess"));
const SearchProducts     = lazy(() => import("./pages/shopping-view/search"));
const FAQ                = lazy(() => import("./pages/shopping-view/FAQ"));
const ContactUs          = lazy(() => import("./pages/shopping-view/ContactUs"));
const AboutUs            = lazy(() => import("./pages/shopping-view/AboutUs"));
const ShippingDelivery   = lazy(() => import("./pages/shopping-view/ShippingDeliveryPolicies"));
const PrivacyPolicy      = lazy(() => import("./pages/shopping-view/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/shopping-view/TermsAndConditions"));
const Testimonials       = lazy(() => import("./pages/shopping-view/Testimonials"));
const CastingKit         = lazy(() => import("./pages/shopping-view/casting-kit"));

const NotFound   = lazy(() => import("./pages/not-found"));
const UnauthPage = lazy(() => import("./pages/unauth-page"));

// ─── Suspense fallback ────────────────────────────────────────────────────────
const PageFallback = (
  <div className="flex items-center justify-center min-h-screen">
    <Skeleton className="w-full h-96" />
  </div>
);

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Shared props — avoids repeating all three on every CheckAuth
  const authProps = { isAuthenticated, isLoading, user };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ScrollToTop />
      <Suspense fallback={PageFallback}>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />

          <Route path="/shop" element={<ShoppingLayout />}>
            <Route index element={<ShoppingHome />} />
            <Route path="listing"                    element={<ShoppingListing />} />
            <Route path="search"                     element={<SearchProducts />} />
            <Route path="faqs"                       element={<FAQ />} />
            <Route path="contactus"                  element={<ContactUs />} />
            <Route path="aboutus"                    element={<AboutUs />} />
            <Route path="shipping-delivery-policies" element={<ShippingDelivery />} />
            <Route path="privacy-policy"             element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions"       element={<TermsAndConditions />} />
            <Route path="testimonials"               element={<Testimonials />} />
            <Route path="CastingKit"                 element={<CastingKit />} />
            <Route path="checkout"        element={<CheckAuth {...authProps}><ShoppingCheckout /></CheckAuth>} />
            <Route path="account"         element={<CheckAuth {...authProps}><ShoppingAccount /></CheckAuth>} />
            <Route path="order-success"   element={<CheckAuth {...authProps}><OrderSuccess /></CheckAuth>} />
            <Route path="payment-success" element={<CheckAuth {...authProps}><PaymentSuccessPage /></CheckAuth>} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login"                 element={<CheckAuth {...authProps}><AuthLogin /></CheckAuth>} />
            <Route path="register"              element={<CheckAuth {...authProps}><AuthRegister /></CheckAuth>} />
            <Route path="forgot-password"       element={<CheckAuth {...authProps}><AuthForgotPassword /></CheckAuth>} />
            <Route path="reset-password/:token" element={<CheckAuth {...authProps}><ResetPassword /></CheckAuth>} />
          </Route>

          <Route path="/admin" element={<CheckAuth {...authProps}><AdminLayout /></CheckAuth>}>
            <Route path="dashboard"        element={<AdminDashboard />} />
            <Route path="products"         element={<AdminProducts />} />
            <Route path="orders"           element={<AdminOrders />} />
            <Route path="features"         element={<AdminFeatures />} />
            <Route path="bookingDashboard" element={<BookingDashboard />} />
          </Route>

          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;