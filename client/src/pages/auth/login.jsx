import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

// Brand tokens
const brand = {
  charcoal: "#383838",
  gold: "#C9A227",
  terracotta: "#C47D52",
  warmBg: "#faf7f4",
  warmBorder: "#e0d7cf",
  mutedText: "#9a8e85",
  bodyText: "#5a5047",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    return null;
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  function onSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      toast({ title: "Please fix the errors in the form", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    dispatch(loginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message, variant: "success" });
          navigate("/shop");
        } else {
          toast({
            title: data?.payload?.message || "Login failed",
            description: "Please check your credentials and try again",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "An error occurred during login",
          description: error.message || "Please try again later",
          variant: "destructive",
        });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="mx-auto w-full max-w-md" style={{ fontFamily: "sans-serif" }}>

      {/* Header */}
      <div className="mb-8">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-2"
          style={{ color: brand.gold }}
        >
          Welcome Back
        </p>
        <h1
          className="text-3xl font-bold leading-tight mb-2"
          style={{ color: brand.charcoal, fontFamily: "'Georgia', serif" }}
        >
          Sign in to your account
        </h1>
        <p className="text-sm" style={{ color: brand.mutedText }}>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-semibold hover:underline transition-colors"
            style={{ color: brand.gold }}
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div
        className="mb-8"
        style={{ height: "1px", background: `linear-gradient(to right, ${brand.gold}40, transparent)` }}
      />

      {/* Form — CommonForm renders inputs; brand overrides applied via CSS vars on wrapper */}
      <div
        style={{
          "--primary": brand.gold,
          "--primary-foreground": brand.charcoal,
          "--ring": brand.gold,
          "--border": brand.warmBorder,
          "--input": brand.warmBorder,
          "--foreground": brand.charcoal,
          "--muted-foreground": brand.bodyText,
          "--background": "#fff",
          "--radius": "0.5rem",
        }}
      >
        <CommonForm
          formControls={loginFormControls}
          buttonText={isSubmitting ? "Signing in..." : "Sign In →"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Forgot password */}
      <div className="mt-5 text-center">
        <Link
          to="/auth/forgot-password"
          className="text-sm hover:underline transition-colors"
          style={{ color: brand.mutedText }}
          onMouseEnter={(e) => (e.target.style.color = brand.gold)}
          onMouseLeave={(e) => (e.target.style.color = brand.mutedText)}
        >
          Forgot your password?
        </Link>
      </div>

      {/* Bottom trust line */}
      <div
        className="mt-8 pt-6 text-center"
        style={{ borderTop: `1px solid ${brand.warmBorder}` }}
      >
        <p className="text-xs" style={{ color: brand.mutedText }}>
          🔒 Your data is safe and encrypted
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;