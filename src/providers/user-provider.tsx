"use client";

import {
  createContext,
  // useEffect,
  useState,
  useCallback,
} from "react";
import { apiClient } from "@/lib/api-client";
import { User } from "./auth-provider";

interface UserContextType {
  currentUser: User | null;
  updateUser: (data: Partial<User>, userId: string) => Promise<void>;
  addUser: (data: Partial<User>) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  fetchUserDetails: (userId: string) => Promise<User>;
  users: User[];
  fetchUsers: () => Promise<void>;
}

type UserResponse = {
  data: User;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    currentUser: User | null;
    users: User[];
  }>({
    currentUser: null,
    users: [],
  });

  const fetchUserDetails = useCallback(async (userId: string) => {
    const response = await apiClient.get<{ data: User }>(`/users/${userId}`);
    return response.data;
  }, []);

  const updateUser = useCallback(
    async (data: Partial<User>, userId: string) => {
      const response = await apiClient.patch<UserResponse>(
        `/users/${userId}`,
        data
      );
      setState((prev) => ({
        ...prev,
        currentUser: response.data,
      }));
    },
    []
  );

  const addUser = useCallback(async (data: Partial<User>) => {
    const response = await apiClient.post<UserResponse>(`/users/add`, data);
    setState((prev) => ({
      ...prev,
      users: [...prev.users, response.data],
    }));
  }, []);

  const removeUser = useCallback(async (userId: string) => {
    await apiClient.delete(`/users/${userId}`);
    setState((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.id !== userId),
    }));
  }, []);

  const fetchUsers = useCallback(async () => {
    const response = await apiClient.get<{ data: User[] }>(`/users`);
    setState((prev) => ({
      ...prev,
      users: response.data,
    }));
  }, []);

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser: state.currentUser,
        users: state.users,
        updateUser,
        addUser,
        removeUser,
        fetchUserDetails,
        fetchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
