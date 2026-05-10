import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import bgImage from "@/assets/hero-bg.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleAuth = async (credential: string) => {
    setError("");
    try {
      await loginWithGoogle(credential);
      navigate(redirectTo);
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="glass-card overflow-hidden rounded-3xl border-white/10 shadow-2xl">
          <CardHeader className="space-y-3 pb-6 pt-8 text-center">
            <CardTitle className="font-display text-3xl font-bold tracking-wide text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-white/60">
              Sign in to continue to Movix
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-8">
            <GoogleAuthButton disabled={isLoading} onCredential={handleGoogleAuth} />

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="mx-4 text-xs font-medium text-white/40 uppercase tracking-widest">Or email</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white/80">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:ring-offset-0"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:ring-offset-0"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full rounded-xl bg-primary py-6 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pb-8 pt-4">
            <div className="text-center text-sm text-white/60">
              Don’t have an account?{" "}
              <Link to={`/sign-up?redirect=${redirectTo}`} className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;