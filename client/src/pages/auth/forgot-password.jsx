import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/store/auth-slice"; // ← import thunk

function AuthForgotPassword() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // ← get loading from redux instead of local state
  const { isLoading: loading } = useSelector((state) => state.auth);

  async function onSubmit(e) {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // ✅ dispatch instead of raw fetch
    const result = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(result)) {
      setShowSuccess(true);
      toast({
        title: "Password reset link sent",
        variant: "info",
        description: "Check your email inbox if this account exists.",
      });
    } else {
      toast({
        title: "Error",
        description: result.payload || "Failed to send reset link",
        variant: "destructive",
      });
    }
  }

  if (showSuccess) {
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Check your email
          </h1>
          <p className="mt-3 text-muted-foreground">
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your inbox and follow the instructions.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <button
              onClick={() => setShowSuccess(false)}
              className="font-medium text-primary hover:underline"
            >
              Try again
            </button>
          </p>
        </div>
        <div className="text-center mt-6">
          <Link to="/auth/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Forgot Password
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link to="/auth/login">
          <Button variant="ghost" className="text-sm text-muted-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default AuthForgotPassword;