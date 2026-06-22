"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to OpSync">
      <LoginForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#00f0ff] hover:underline hover:text-[#ff00ff] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
