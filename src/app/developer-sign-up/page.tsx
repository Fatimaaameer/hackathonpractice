import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
import { AuthLayout } from "@/features/auth/auth-layout";

export const metadata: Metadata = {
  title: "Developer account | VeriStream",
  description: "Create an illustrative VeriStream developer account.",
};

export default function DeveloperSignUpRoute() {
  return (
    <AuthLayout>
      <AuthForm mode="developer-sign-up" />
    </AuthLayout>
  );
}
