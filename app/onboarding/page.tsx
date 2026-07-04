"use client";

import { useSearchParams } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const orgName = searchParams.get("orgName") || "";

  return (
    <ProtectedRoute>
      <OnboardingWizard organizationName={orgName} />
    </ProtectedRoute>
  );
}
