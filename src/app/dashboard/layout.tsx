"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSkeleton } from "./skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  // Redirection si non authentifié
  useEffect(() => {
    if (!isLoading && isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  // État de chargement
  if (isLoading || !isInitialized) {
    return <DashboardSkeleton />;
  }

  // Si non authentifié (après vérification)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
