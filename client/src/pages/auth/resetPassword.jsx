import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, CheckCircle, XCircle, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams(); // token from /reset-password/:token
  const navigate = useNavigate();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password requirements checklist
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", validator: (pwd) => pwd.length >= 8 },
    { id: 2, text: "Contains a number", validator: (pwd) => /\d/.test(pwd) },
    { id: 3, text: "Contains a special character", validator: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    { id: 4, text: "Contains uppercase letter", validator: (pwd) => /[A-Z]/.test(pwd) },
    { id: 5, text: "Contains lowercase letter", validator: (pwd) => /[a-z]/.test(pwd) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Validate password meets all requirements
    const unmetRequirements = passwordRequirements
      .filter(req => !req.validator(password))
      .map(req => req.text);
    
    if (unmetRequirements.length > 0) {
      toast({
        title: "Password requirements not met",
        description: `Please ensure your password includes: ${unmetRequirements.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: data.message || "Password reset successful",
        });
        // Redirect to login after a brief delay to show success message
        setTimeout(() => navigate("/auth/login"), 1500);
      } else {
        toast({
          title: "Error",
          description: data.message || "Invalid or expired reset token",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-0">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
          <CardDescription className="text-base">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {/* Password requirements checklist */}
            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium">Password must contain:</p>
              <ul className="space-y-1">
                {passwordRequirements.map((req) => {
                  const isMet = req.validator(password);
                  return (
                    <li key={req.id} className="flex items-center text-xs">
                      {isMet ? (
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-3 w-3 text-gray-400 mr-2" />
                      )}
                      <span className={isMet ? "text-green-600" : "text-gray-500"}>
                        {req.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}