"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { LoadingState } from "@/components/ui/primitives";

const brandFeatures = [
  "Schedule and track fire extinguisher inspections",
  "Log and manage maintenance records",
  "Generate compliance and audit reports",
  "Stay compliant with fire safety regulations",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingState message="Loading…" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden w-[45%] shrink-0 flex-col justify-between bg-slate-900 px-10 py-12 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">TZW Ltd</p>
              <p className="text-xs text-slate-400">Fire safety management portal</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold leading-snug text-white">
              Fire safety, managed with confidence.
            </h2>
            <p className="mt-4 text-base text-slate-400">
              FEMS gives your team complete visibility over every extinguisher in your fleet —
              from first install to final inspection.
            </p>
          </div>

          <ul className="mt-10 space-y-4">
            {brandFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} TZW Ltd. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-10 sm:px-8">
        {/* Mobile logo (visible below lg) */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">TZW Ltd · FEMS</p>
            <p className="text-xs text-slate-500">Fire Extinguisher Management</p>
          </div>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
