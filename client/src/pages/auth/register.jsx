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

// Validation functions
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

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {
      userName: validateUserName(formData.userName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
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
    
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...submitData } = formData;
    
    dispatch(registerUser(submitData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
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
    }).catch((error) => {
      toast({
        title: "An error occurred during registration",
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
          Create new account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      
      <CommonForm
        formControls={registerFormControls.map(control => {
          if (control.name === "password") {
            return {
              ...control,
              type: "password",
              description: "Must be at least 8 characters with uppercase, lowercase, number, and special character"
            };
          }
          if (control.name === "confirmPassword") {
            return {
              ...control,
              type: "password",
              placeholder: "Confirm your password"
            };
          }
          return control;
        }).concat({
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm your password",
          required: true
        })}
        buttonText={isSubmitting ? "Creating Account..." : "Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      
      <div className="text-xs text-muted-foreground mt-4 p-4 bg-muted rounded-lg">
        <p className="font-medium mb-2">Password Requirements:</p>
        <ul className="space-y-1">
          <li className="flex items-center">
            <span className="mr-2">•</span>
            At least 8 characters long
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Contains uppercase and lowercase letters
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Includes at least one number (0-9)
          </li>
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Includes at least one special character (@$!%*?&)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AuthRegister;