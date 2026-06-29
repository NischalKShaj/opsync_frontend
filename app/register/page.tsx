"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Organization"
      subtitle="Set up your organization in minutes"
    >
      <RegisterForm />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Already belong to an organization?{" "}
          <Link
            href="/login"
            className="text-[#22D3EE] hover:text-[#3B82F6] transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
