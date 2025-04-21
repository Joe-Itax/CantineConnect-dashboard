"use client";

import * as React from "react";
import {
  // IconCamera,
  IconChartBar,
  IconDashboard,
  // IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  // IconFileWord,
  IconFolder,
  // IconHelp,
  IconListDetails,
  // IconReport,
  // IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "/l",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/a",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/p",
      icon: IconFolder,
    },
    {
      title: "Elèves",
      url: "/students",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "/settings",
      icon: IconSettings,
    },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
    // {
    //   title: "Recherche",
    //   url: "#",
    //   icon: IconSearch,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  console.log("user: ", user);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* <Link href="/dashboard"> */}
              <div>
                <LinkIcon className="!size-6" />
                <span className="text-base font-semibold">Cantine Connect</span>
              </div>
              {/* </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || { name: "", email: "", avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  );
}
