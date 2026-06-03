"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Button, Input } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { api, ApiError } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_STRENGTH_RE = /(?=.*[A-Z])(?=.*\d)/;

interface ProfileErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface PasswordErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });
  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  function validateProfile(): boolean {
    const next: ProfileErrors = {};
    if (!profile.firstName.trim()) next.firstName = "First name is required";
    else if (profile.firstName.trim().length < 2) next.firstName = "Must be at least 2 characters";
    if (!profile.lastName.trim()) next.lastName = "Last name is required";
    else if (profile.lastName.trim().length < 2) next.lastName = "Must be at least 2 characters";
    if (!profile.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(profile.email)) next.email = "Enter a valid email address";
    setProfileErrors(next);
    return Object.keys(next).length === 0;
  }

  function validatePassword(): boolean {
    const next: PasswordErrors = {};
    if (!passwords.currentPassword) next.currentPassword = "Current password is required";
    if (!passwords.newPassword) next.newPassword = "New password is required";
    else if (passwords.newPassword.length < 8)
      next.newPassword = "Password must be at least 8 characters";
    else if (!PASSWORD_STRENGTH_RE.test(passwords.newPassword))
      next.newPassword = "Must contain at least 1 uppercase letter and 1 number";
    else if (passwords.newPassword === passwords.currentPassword)
      next.newPassword = "New password must differ from current password";
    if (passwords.confirmPassword !== passwords.newPassword)
      next.confirmPassword = "Passwords do not match";
    setPasswordErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateProfile()) return;
    setSavingProfile(true);
    try {
      const updated = await api.users.updateMe({
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        email: profile.email.trim(),
      });
      updateUser(updated);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validatePassword()) return;
    setSavingPassword(true);
    try {
      await api.users.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordErrors({});
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <>
      <PageHeader title="Profile" description="Manage your account details" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Account details</h2>
            {user && <StatusBadge status={user.role} kind="role" />}
          </div>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First name"
                value={profile.firstName}
                error={profileErrors.firstName}
                onChange={(e) => {
                  setProfile({ ...profile, firstName: e.target.value });
                  if (profileErrors.firstName)
                    setProfileErrors((p) => ({ ...p, firstName: undefined }));
                }}
              />
              <Input
                label="Last name"
                value={profile.lastName}
                error={profileErrors.lastName}
                onChange={(e) => {
                  setProfile({ ...profile, lastName: e.target.value });
                  if (profileErrors.lastName)
                    setProfileErrors((p) => ({ ...p, lastName: undefined }));
                }}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={profile.email}
              error={profileErrors.email}
              onChange={(e) => {
                setProfile({ ...profile, email: e.target.value });
                if (profileErrors.email) setProfileErrors((p) => ({ ...p, email: undefined }));
              }}
            />
            <Button type="submit" loading={savingProfile} disabled={savingProfile}>
              Save changes
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Change password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current password"
              type="password"
              autoComplete="current-password"
              value={passwords.currentPassword}
              error={passwordErrors.currentPassword}
              onChange={(e) => {
                setPasswords({ ...passwords, currentPassword: e.target.value });
                if (passwordErrors.currentPassword)
                  setPasswordErrors((p) => ({ ...p, currentPassword: undefined }));
              }}
            />
            <Input
              label="New password"
              type="password"
              autoComplete="new-password"
              value={passwords.newPassword}
              error={passwordErrors.newPassword}
              onChange={(e) => {
                setPasswords({ ...passwords, newPassword: e.target.value });
                if (passwordErrors.newPassword)
                  setPasswordErrors((p) => ({ ...p, newPassword: undefined }));
              }}
              placeholder="Min 8 chars, 1 uppercase, 1 number"
            />
            <Input
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              value={passwords.confirmPassword}
              error={passwordErrors.confirmPassword}
              onChange={(e) => {
                setPasswords({ ...passwords, confirmPassword: e.target.value });
                if (passwordErrors.confirmPassword)
                  setPasswordErrors((p) => ({ ...p, confirmPassword: undefined }));
              }}
            />
            <Button type="submit" loading={savingPassword} disabled={savingPassword}>
              Change password
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-500">
            Forgot your current password?{" "}
            <Link href="/forgot-password" className="font-medium text-slate-700 hover:underline">
              Reset via email
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
}
