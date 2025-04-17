"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

interface ApiError {
  status: number;
  message: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  alert: {
    type: "info" | "error" | "success" | "note" | null;
    message: string | null;
  };
  setAlert: (
    type: "success" | "error" | "info" | "note",
    message: string
  ) => void;
  clearAlert: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // Exposé pour pouvoir rafraîchir l'état
}

type AuthStateResponse = {
  isAuthenticated: boolean;
  user?: User;
  message?: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: User | null;
    isLoading: boolean;
    isInitialized: boolean;
    isAuthenticated: boolean;
    error: string | null;
    alert: {
      type: "info" | "error" | "success" | "note" | null;
      message: string | null;
    };
  }>({
    user: null,
    isLoading: true,
    isInitialized: false,
    isAuthenticated: false,
    error: null,
    alert: {
      type: null,
      message: null,
    },
  });

  const router = useRouter();

  const setAlert = useCallback(
    (type: "success" | "error" | "info" | "note", message: string) => {
      setAuthState((prev) => ({
        ...prev,
        alert: { type, message },
      }));
    },
    []
  );

  const clearAlert = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      alert: { type: null, message: null },
    }));
  }, []);

  const checkAuthState = async () => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      alert: { type: null, message: null },
    }));
    try {
      const response = (await apiClient.get(
        "/auth/user-state"
      )) as AuthStateResponse;

      setAuthState({
        isAuthenticated: response.isAuthenticated,
        user: response.user || null,
        isLoading: false,
        error: null,
        isInitialized: true,
        alert: {
          type: "note",
          message: `Bienvenue ${response.user?.name || "Invité"}`,
        },
      });
    } catch (error: unknown) {
      const errorMessage =
        (error as ApiError)?.message || "Erreur de vérification";
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: errorMessage,
        isInitialized: true,
        alert: {
          type: null,
          message: "",
        },
      });
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      alert: { type: null, message: null },
    }));
    try {
      const response = (await apiClient.post("/auth/login", {
        email,
        password,
      })) as { user: User };

      setAuthState({
        user: response.user,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: true,
        error: null,
        alert: {
          type: "success",
          message: `Connecté avec succès en tant que "${
            response.user.name || "Invité"
          }"`,
        },
      });
      setTimeout(() => {
        // router.push("/dashboard");
      }, 4500);
      // console.log("response login: ", response);
    } catch (error) {
      console.log("error when loggedin: ", error);
      const errorMessage =
        (error as ApiError)?.message || "Erreur de connexion";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        alert: {
          type: "error",
          message: errorMessage || "Erreur de connexion",
        },
      }));
    }
  };

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await apiClient.post("/auth/logout", {});
      setAuthState({
        user: null,
        isLoading: false,
        isInitialized: true,
        isAuthenticated: false,
        error: null,
        alert: {
          type: "info",
          message: "Déconnexion réussie",
        },
      });
      router.push("/login");
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Erreur de déconnexion",
        alert: {
          type: "error",
          message: "Erreur de déconnexion",
        },
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        setUser: (user) => setAuthState((prev) => ({ ...prev, user })),
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        isInitialized: authState.isInitialized,
        alert: authState.alert,
        setAlert,
        clearAlert,
        login,
        logout,
        checkAuth: checkAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
