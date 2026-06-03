"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, Input, Alert, LoadingState } from "@/components/ui/primitives";
import { useToast } from "@/components/providers/toast-provider";
import { api, ApiError } from "@/lib/api";

const PASSWORD_STRENGTH_RE = /(?=.*[A-Z])(?=.*\d)/;

interface FieldErrors {
  newPassword?: string;
  confirmPassword?: string;
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!password) next.newPassword = "Password is required";
    else if (password.length < 8) next.newPassword = "Password must be at least 8 characters";
    else if (!PASSWORD_STRENGTH_RE.test(password))
      next.newPassword = "Must contain at least 1 uppercase letter and 1 number";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.auth.resetPassword(token, password);
      toast.success("Password reset. You can now sign in.");
      router.replace("/login");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unable to reset password. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <Card className="p-8">
        <h1 className="text-xl font-semibold text-slate-900">Reset password</h1>
        <Alert message="This reset link is invalid or has expired." />
        <p className="mt-4 text-center text-sm text-slate-500">
          <Link href="/forgot-password" className="font-medium text-slate-900 hover:underline">
            Request a new link
          </Link>
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <h1 className="text-xl font-semibold text-slate-900">Reset password</h1>
      <p className="mt-1 text-sm text-slate-500">Choose a new password for your account.</p>

      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={fieldErrors.newPassword}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.newPassword) setFieldErrors((p) => ({ ...p, newPassword: undefined }));
          }}
          placeholder="Min 8 chars, 1 uppercase, 1 number"
        />
        <Input
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (fieldErrors.confirmPassword)
              setFieldErrors((p) => ({ ...p, confirmPassword: undefined }));
          }}
        />
        <Button type="submit" className="w-full" loading={submitting} disabled={submitting}>
          Reset password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href="/login" className="font-medium text-slate-900 hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
