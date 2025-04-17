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
  }, [isAuthenticated, isLoading, isInitialized, router]);

  if (isLoading || !isInitialized) {
    return <div>Chargement...</div>;
  }
  return <div></div>;
}
