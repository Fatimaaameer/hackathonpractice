"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import {
  authService,
  type DeveloperSignUpInput,
  type SignInInput,
  type SignUpInput,
} from "@/services/auth/auth-service";

export type AuthFormMode = "sign-in" | "sign-up" | "developer-sign-up";

const formContent: Record<
  AuthFormMode,
  { eyebrow: string; title: string; description: string; submitLabel: string }
> = {
  "sign-in": {
    eyebrow: "WELCOME BACK",
    title: "Sign in to VeriStream",
    description: "Access your workspace and agent payment tools.",
    submitLabel: "Sign in",
  },
  "sign-up": {
    eyebrow: "CREATE YOUR ACCOUNT",
    title: "Get started with VeriStream",
    description: "Create a workspace account to explore the platform.",
    submitLabel: "Create account",
  },
  "developer-sign-up": {
    eyebrow: "DEVELOPER ACCESS",
    title: "Create a developer account",
    description: "Set up a profile for building agent-powered services.",
    submitLabel: "Create developer account",
  },
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "The request could not be completed. Please try again.";
}

export function AuthForm({ mode }: { mode: AuthFormMode }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const content = formContent[mode];
  const isSignIn = mode === "sign-in";
  const isDeveloper = mode === "developer-sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const email = String(data.get("email")).trim();
    const password = String(data.get("password"));
    const confirmation = String(data.get("confirmPassword") ?? "");

    if (!isSignIn && password !== confirmation) {
      setError("The password confirmation does not match.");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignIn) {
        const input: SignInInput = { email, password };
        await authService.signIn(input);
      } else if (isDeveloper) {
        const input: DeveloperSignUpInput = {
          fullName: String(data.get("fullName")).trim(),
          email,
          password,
          organization: String(data.get("organization")).trim(),
        };
        await authService.createDeveloperAccount(input);
      } else {
        const input: SignUpInput = {
          fullName: String(data.get("fullName")).trim(),
          email,
          password,
        };
        await authService.signUp(input);
      }
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-card" aria-labelledby="auth-form-title">
      <div className="auth-card-heading">
        <span className="auth-eyebrow">{content.eyebrow}</span>
        <h2 id="auth-form-title">{content.title}</h2>
        <p>{content.description}</p>
      </div>

      <div className="auth-demo-notice" role="note">
        Authentication is not connected in this demo. Submitting a valid form will show an availability error; no account or session is created.
      </div>

      <form
        className="auth-form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isLoading}
      >
        {!isSignIn && (
          <label className="auth-field">
            <span>Full name</span>
            <div className="auth-input-wrap">
              <UserRound size={15} aria-hidden="true" />
              <input
                type="text"
                name="fullName"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                placeholder="Your name"
              />
            </div>
          </label>
        )}

        {isDeveloper && (
          <label className="auth-field">
            <span>Organization</span>
            <input
              type="text"
              name="organization"
              required
              minLength={2}
              maxLength={100}
              autoComplete="organization"
              placeholder="Your company or project"
            />
          </label>
        )}

        <label className="auth-field">
          <span>Email address</span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            autoCapitalize="none"
            placeholder="you@example.com"
          />
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div className="auth-input-wrap">
            <LockKeyhole size={15} aria-hidden="true" />
            <input
              type="password"
              name="password"
              required
              minLength={isSignIn ? 1 : 12}
              maxLength={128}
              autoComplete={isSignIn ? "current-password" : "new-password"}
              placeholder={isSignIn ? "Enter your password" : "At least 12 characters"}
            />
          </div>
          {!isSignIn && <small>Use at least 12 characters. Passwords are never saved in this demo.</small>}
        </label>

        {!isSignIn && (
          <label className="auth-field">
            <span>Confirm password</span>
            <div className="auth-input-wrap">
              <LockKeyhole size={15} aria-hidden="true" />
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
                placeholder="Re-enter your password"
              />
            </div>
          </label>
        )}

        {isDeveloper && (
          <label className="auth-consent">
            <input type="checkbox" name="demoAcknowledgement" required />
            <span>I understand this demo does not create a developer account.</span>
          </label>
        )}

        {error && <p className="auth-form-error" role="alert">{error}</p>}

        <button type="submit" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle size={15} className="auth-loading-icon" aria-hidden="true" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>{content.submitLabel}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <div className="auth-form-links">
        {isSignIn ? (
          <>
            <p>New to VeriStream? <Link href="/sign-up">Create an account</Link></p>
            <p>Building agent services? <Link href="/developer-sign-up">Create a developer account</Link></p>
          </>
        ) : (
          <p>Already have an account? <Link href="/sign-in">Sign in</Link></p>
        )}
        {!isSignIn && !isDeveloper && (
          <p>Need developer access? <Link href="/developer-sign-up">Create a developer account</Link></p>
        )}
        {isDeveloper && <p>Personal account? <Link href="/sign-up">Sign up</Link></p>}
      </div>

      {isSignIn && (
        <p className="auth-wallet-separation">
          Wallet connection is separate from authentication. Connecting a wallet will not sign you in.
        </p>
      )}
    </section>
  );
}
