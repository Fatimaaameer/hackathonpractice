import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
import { AuthLayout } from "@/features/auth/auth-layout";

export const metadata: Metadata = {
  title: "Sign in | VeriStream",
  description: "Sign in to a VeriStream workspace.",
};

export default function SignInRoute() {
  return (
    <AuthLayout>
      <AuthForm mode="sign-in" />
    </AuthLayout>
  );
}
