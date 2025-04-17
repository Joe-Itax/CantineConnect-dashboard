"use client";

import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit étre utilisé dans un AuthProvider");
  }
  return context;
}
