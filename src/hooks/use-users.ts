// src/hooks/use-users.ts
"use client";

import { UserContext } from "@/providers/user-provider";
import { useContext } from "react";

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}
