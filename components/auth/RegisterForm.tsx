"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RegisterRequest } from "@/types";
import { PremiumInput } from "@/components/ui/PremiumInput";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data: RegisterRequest = { name, email, password };
      await register(data);
      window.location.href = "/dashboard";
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PremiumInput
        icon="name"
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        required
      />
      <PremiumInput
        icon="email"
        label="Work Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        required
      />
      <PremiumInput
        icon="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
        required
      />
      <PremiumInput
        icon="password"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />
      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full h-[52px] rounded-xl font-semibold text-white
          bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]
          bg-[length:200%_100%]
          animate-gradient-shift
          hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
          hover:-translate-y-0.5
          active:translate-y-0
          active:shadow-[0_0_20px_rgba(139,92,246,0.2)]
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:translate-y-0 disabled:hover:shadow-none
          flex items-center justify-center gap-2
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0F1117]/75 text-gray-400">
            or sign up with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="microsoft" />
      </div>
    </form>
  );
}
