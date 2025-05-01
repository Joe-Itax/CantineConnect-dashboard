import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useNotification } from "./use-notification";

// Récupérer tous les users
export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors du fetch des utilisateurs");
      const data = await res.json();
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Récupérer un user par son id
export function useUserQuery(userId: string) {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Erreur lors du fetch de l'utilisateur");
      const data = await res.json();
      return data.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

// Ajouter un user
export function useAddUserMutation() {
  const { show } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");
      return res.json();
    },
    onSuccess: (data) => {
      show("success", data.message || "Utilisateur ajouté avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      show("error", error.message || "Erreur lors de l'ajout de l'utilisateur");
    },
  });
}

// Supprimer un user
export function useDeleteUserMutation() {
  const { show } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la suppression");
    },
    onSuccess: () => {
      show("success", "Utilisateur supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      show(
        "error",
        error.message || "Erreur lors de la suppression de l'utilisateur"
      );
    },
  });
}

// Rechercher des users
export function useSearchUsersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (query: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/search?query=${query}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la recherche");
      const data = await res.json();
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Mettre à jour un user
export function useUpdateUserMutation() {
  const { show } = useNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<User>) => {
      const { id, ...payload } = user;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      return res.json();
    },
    onSuccess: (data) => {
      show("success", data.message || "Utilisateur mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (error) => {
      show(
        "error",
        error.message || "Erreur lors de la mise à jour de l'utilisateur"
      );
    },
  });
}
