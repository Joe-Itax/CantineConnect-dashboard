"use client";

// import { useQueryClient } from "@tanstack/react-query";
import { getQueryClient } from "./react-query-client";

// import { queryClient } from "@/lib/query-client";
// const queryClient = useQueryClient

export function revalidateAuthUser() {
  getQueryClient().invalidateQueries({ queryKey: ["auth-user"] });
}
