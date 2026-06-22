"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Join OpSync today">
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#00f0ff] hover:underline hover:text-[#ff00ff] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
