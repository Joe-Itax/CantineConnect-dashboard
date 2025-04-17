// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { apiClient } from "@/lib/api-client";

// interface User {
//   id: string;
//   email: string;
//   role: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
// }

// type AuthStateResponse = {
//   isAuthenticated: boolean;
//   user?: User | null;
//   message?: string;
// };

// export default function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     isAuthenticated: false,
//     user: null,
//     isLoading: true,
//     error: null,
//   });
//   const router = useRouter();

//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       const data = await apiClient.get<AuthStateResponse>("/auth/user-state");

//       if (data) {
//         setAuthState({
//           isAuthenticated: data.isAuthenticated,
//           user: data.user || null,
//           isLoading: false,
//           error: null,
//         });
//       } else {
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           isLoading: false,
//           error: data?.message || "Erreur de vérification",
//         });
//       }
//     } catch (error) {
//       setAuthState({
//         isAuthenticated: false,
//         user: null,
//         isLoading: false,
//         error: "Erreur serveur",
//       });
//     }
//   };

//   const login = async (email: string, password: string) => {
//     setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

//     try {
//       const data: { ok: boolean; user?: User; error?: string } =
//         await apiClient.post("/auth/login", { email, password });
//       console.log("data after login: ", data);

//       if (data?.ok) {
//         setAuthState({
//           isAuthenticated: true,
//           user: data.user ?? null,
//           isLoading: false,
//           error: null,
//         });
//         return { success: true };
//       } else {
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           isLoading: false,
//           error: data.error || "Identifiants incorrects",
//         });
//         return { success: false, error: data.error };
//       }
//     } catch (error) {
//       console.log("error when login: ", error);

//       setAuthState({
//         isAuthenticated: false,
//         user: null,
//         isLoading: false,
//         error: "Erreur serveur",
//       });
//       return { success: false, error: "Erreur serveur" };
//     }
//   };

//   const logout = async () => {
//     setAuthState((prev) => ({ ...prev, isLoading: true }));

//     try {
//       const data: { ok: boolean; error?: string } = await apiClient.post(
//         "/auth/logout",
//         {}
//       );
//       console.log("data after logout: ", data);

//       if (data?.ok) {
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           isLoading: false,
//           error: null,
//         });
//         router.push("/login");
//       } else {
//         // const data = await response.json();
//         setAuthState((prev) => ({
//           ...prev,
//           isLoading: false,
//           error: data.error || "Erreur lors de la déconnexion",
//         }));
//       }
//     } catch (error) {
//       console.log("error when logout: ", error);

//       setAuthState((prev) => ({
//         ...prev,
//         isLoading: false,
//         error: "Erreur serveur",
//       }));
//     }
//   };

//   return {
//     ...authState,
//     login,
//     logout,
//     checkAuthState,
//   };
// }
