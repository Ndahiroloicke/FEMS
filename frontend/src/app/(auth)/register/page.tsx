"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Alert } from "@/components/ui/primitives";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { ApiError } from "@/lib/api";

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_STRENGTH_RE = /(?=.*[A-Z])(?=.*\d)/;

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    else if (form.firstName.trim().length < 2) next.firstName = "Must be at least 2 characters";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    else if (form.lastName.trim().length < 2) next.lastName = "Must be at least 2 characters";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters";
    else if (!PASSWORD_STRENGTH_RE.test(form.password))
      next.password = "Must contain at least 1 uppercase letter and 1 number";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const user = await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success(`Account created. Welcome, ${user.firstName}!`);
      router.replace("/");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unable to create account. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-8">
      <h1 className="text-xl font-semibold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-500">Get started managing your fire extinguishers.</p>

      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            value={form.firstName}
            error={errors.firstName}
            onChange={(e) => { setForm({ ...form, firstName: e.target.value }); clearError("firstName"); }}
          />
          <Input
            label="Last name"
            value={form.lastName}
            error={errors.lastName}
            onChange={(e) => { setForm({ ...form, lastName: e.target.value }); clearError("lastName"); }}
          />
        </div>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => { setForm({ ...form, email: e.target.value }); clearError("email"); }}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          error={errors.password}
          onChange={(e) => { setForm({ ...form, password: e.target.value }); clearError("password"); }}
          placeholder="Min 8 chars, 1 uppercase, 1 number"
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }); clearError("confirmPassword"); }}
        />

        <Button type="submit" className="w-full" loading={submitting} disabled={submitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-slate-900 hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
