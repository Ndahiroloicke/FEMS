"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Card, Button, Input, Alert } from "@/components/ui/primitives";
import { api, ApiError } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      await api.auth.forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-8">
      <h1 className="text-xl font-semibold text-slate-900">Forgot password</h1>
      <p className="mt-1 text-sm text-slate-500">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      {error && <Alert message={error} />}
      {sent && (
        <Alert
          type="success"
          message="If an account exists for that email, a reset link has been sent."
        />
      )}

      {!sent && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            error={emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder="you@example.com"
          />
          <Button type="submit" className="w-full" loading={submitting} disabled={submitting}>
            Send reset link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href="/login" className="font-medium text-slate-900 hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
