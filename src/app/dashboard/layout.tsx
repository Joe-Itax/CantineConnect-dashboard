"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { DashboardSkeleton } from "./skeleton";
import { useAuthUserQuery } from "@/hooks/use-auth-user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, isError } = useAuthUserQuery();
  const router = useRouter();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user || isError) {
    router.push("/login");
    return null;
  }

  console.log("user: ", user);

  // Utilisateur authentifié -> affichage du dashboard
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
