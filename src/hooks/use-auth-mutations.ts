"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNotification } from "@/hooks/use-notification";
import { revalidateAuthUser } from "@/lib/revalidate-auth-user";
import { toast } from "./use-toast";

export function useLoginMutation() {
  const router = useRouter();
  const { show } = useNotification();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataReceived = await res.json();
      if (!res.ok) {
        throw new Error(dataReceived.message || "Échec de connexion");
      }
      return dataReceived;
    },
    onSuccess: () => {
      revalidateAuthUser(); // <- Recharger le hook useAuthUserQuery automatiquement
      show("success", "Connecté avec succès !");
      setInterval(() => {
        router.push("/dashboard");
      }, 3000);
    },
    onError: (error: Error) => {
      show(
        "error",
        error instanceof Error
          ? error.message
          : "Une erreur inconnue s'est produite"
      );
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const { show } = useNotification();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Erreur de déconnexion");
      }
    },
    onSuccess: () => {
      toast({ title: "Déconnecté avec succès." });
      revalidateAuthUser();
      router.push("/login");
    },
    onError: (error: Error) => {
      show(
        "error",
        error.message || "Une erreur s'est produite lors de la déconnexion"
      );
    },
  });
}
