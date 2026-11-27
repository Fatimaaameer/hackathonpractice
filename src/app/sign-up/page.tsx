import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
import { AuthLayout } from "@/features/auth/auth-layout";

export const metadata: Metadata = {
  title: "Sign up | VeriStream",
  description: "Create a VeriStream demo workspace account.",
};

export default function SignUpRoute() {
  return (
    <AuthLayout>
      <AuthForm mode="sign-up" />
    </AuthLayout>
  );
}
