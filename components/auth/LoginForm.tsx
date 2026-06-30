"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequest } from "@/types";
import { PremiumInput } from "@/components/ui/PremiumInput";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      const data = await login(credentials);
      console.log(data);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PremiumInput
        icon="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <PremiumInput
        icon="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 bg-[#0F1117]/50 text-[#22D3EE] focus:ring-[#22D3EE]/50 focus:ring-offset-0"
          />
          <span className="text-sm text-gray-400">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-[#22D3EE] hover:text-[#3B82F6] transition-colors"
        >
          Forgot password?
        </Link>
      </div>

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
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#0F1117]/75 text-gray-400">
            or continue with
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
