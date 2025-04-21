"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/hooks/use-auth";
import { DashboardSkeleton } from "../dashboard/skeleton";

export default function LoginPage() {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!isLoading && isInitialized && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  useEffect(() => {
    if (!isLoading && isInitialized) {
      setIsFirstLoad(false);
    }
  }, [isLoading, isInitialized]);

  // Charger DashboardSkeleton uniquement au premier chargement de la page
  if (isFirstLoad && (isLoading || !isInitialized)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <LinkIcon className="size-4" />
            </div>
            Cantine Connect
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={`/placeholder.svg`}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={800}
          height={1200}
        />
      </div>
    </div>
  );
}
