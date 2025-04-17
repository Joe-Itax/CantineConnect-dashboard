"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  if (isLoading || !isInitialized) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
