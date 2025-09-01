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

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Update the setFormData handler to work with the enhanced CommonForm
  const handleFormDataChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  // Validation functions
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
    
    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== null);
  };

  function onSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // Redirect to dashboard or home page after successful login
        navigate("/shop");
      } else {
        toast({
          title: data?.payload?.message || "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    }).catch((error) => {
      toast({
        title: "An error occurred during login",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={handleFormDataChange}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      
      {/* Forgot Password Link */}
      <div className="text-center pt-2">
        <Link
          to="/auth/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export default AuthLogin;