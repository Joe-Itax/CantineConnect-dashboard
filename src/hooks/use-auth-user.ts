import { useQuery } from "@tanstack/react-query";
import { useNotification } from "@/hooks/use-notification";
import { User } from "@/types/user";

export function useAuthUserQuery() {
  const { show } = useNotification();
  return useQuery<User>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user-state`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Échec de récupération de l'utilisateur.");
      }
      const data = await res.json();
      if (!data.user) {
        throw new Error("Aucun utilisateur connecté.");
      }
      show("note", `Connecté en tant que ${data.user.name}`);
      return data.user as User;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
