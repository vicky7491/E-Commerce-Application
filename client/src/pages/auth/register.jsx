import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Brand tokens — single source of truth
const brand = {
  charcoal: "#383838",
  gold: "#C9A227",
  terracotta: "#C47D52",
  warmBorder: "#e0d7cf",
  mutedText: "#9a8e85",
  bodyText: "#5a5047",
  successGreen: "#4a7c59",
};

// Validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validateUserName = (userName) => {
  if (!userName) return "Username is required";
  if (userName.length < 3) return "Username must be at least 3 characters";
  if (userName.length > 20) return "Username must be less than 20 characters";
  if (!/^[a-zA-Z0-9_]+$/.test(userName)) return "Username can only contain letters, numbers, and underscores";
  return null;
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
  if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)";
  return null;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
};

// Password strength checker — returns 0–4
const getPasswordStrength = (password) => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) score++;
  if (/(?=.*\d)/.test(password)) score++;
  if (/(?=.*[@$!%*?&])/.test(password)) score++;
  return score;
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColor = ["", "#e05252", "#C9A227", "#C47D52", "#4a7c59"];

const passwordRules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Uppercase & lowercase letters", test: (p) => /(?=.*[a-z])(?=.*[A-Z])/.test(p) },
  { label: "At least one number (0–9)", test: (p) => /(?=.*\d)/.test(p) },
  { label: "Special character (@$!%*?&)", test: (p) => /(?=.*[@$!%*?&])/.test(p) },
];

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {
      userName: validateUserName(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
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
    const { confirmPassword, ...submitData } = formData;
    dispatch(registerUser(submitData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            variant: "info",
            description: "You can now login with your credentials",
          });
          setFormData(initialState);
          navigate("/auth/login");
        } else {
          toast({
            title: data?.payload?.message || "Registration failed",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "An error occurred during registration",
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
          Get Started
        </p>
        <h1
          className="text-3xl font-bold leading-tight mb-2"
          style={{ color: brand.charcoal, fontFamily: "'Georgia', serif" }}
        >
          Create your account
        </h1>
        <p className="text-sm" style={{ color: brand.mutedText }}>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold hover:underline transition-colors"
            style={{ color: brand.gold }}
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div
        className="mb-8"
        style={{ height: "1px", background: `linear-gradient(to right, ${brand.gold}40, transparent)` }}
      />

      {/* Form */}
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
          formControls={registerFormControls
            .map((control) => {
              if (control.name === "password") {
                return {
                  ...control,
                  type: "password",
                  description: "Min. 8 chars with uppercase, lowercase, number & special character",
                };
              }
              return control;
            })
            .concat({
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
              placeholder: "Confirm your password",
              required: true,
            })}
          buttonText={isSubmitting ? "Creating Account..." : "Create Account →"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Password strength meter — only shows when typing */}
      {formData.password.length > 0 && (
        <div
          className="mt-5 p-4 rounded-xl"
          style={{ background: "#f5f0eb", border: `1px solid ${brand.warmBorder}` }}
        >
          {/* Strength bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1 flex-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-1.5 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background:
                      passwordStrength >= level
                        ? strengthColor[passwordStrength]
                        : brand.warmBorder,
                  }}
                />
              ))}
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: strengthColor[passwordStrength], minWidth: "40px" }}
            >
              {strengthLabel[passwordStrength]}
            </span>
          </div>

          {/* Checklist */}
          <div className="space-y-1.5">
            {passwordRules.map(({ label, test }) => {
              const passed = test(formData.password);
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: passed ? brand.successGreen : brand.warmBorder,
                      transition: "background 0.2s",
                    }}
                  >
                    {passed && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-xs transition-colors"
                    style={{ color: passed ? brand.bodyText : brand.mutedText }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom trust line */}
      <div
        className="mt-6 pt-5 text-center"
        style={{ borderTop: `1px solid ${brand.warmBorder}` }}
      >
        <p className="text-xs" style={{ color: brand.mutedText }}>
          🔒 Your data is safe and encrypted
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;