"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isInitialized && isAuthenticated) {
      router.push("/dashboard");
    }
    if (!isLoading && isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  if (isLoading || !isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }
  return <div>Erreur</div>;
}
