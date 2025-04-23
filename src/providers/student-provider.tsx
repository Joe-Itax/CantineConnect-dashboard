"use client";

import { createContext, useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";

// Interfaces pour les types de données
interface SchoolStudent {
  id: string;
  name: string;
  class: string;
  gender: string;
  matricule: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface Parent {
  id: string;
  user: User;
}

interface Abonnement {
  id: number;
  duration: number;
  price: number;
  startDate: string;
  endDate: string;
  status: "actif" | "inactif" | "expiré";
  createdAt: string;
  updatedAt: string;
  studentId: string;
}

interface Student {
  id: string;
  schoolStudent: SchoolStudent;
  parent: Parent;
  abonnements?: Abonnement[]; // Facultatif
}

interface ApiResponse<T = unknown> {
  message: string;
  totalItems: number;
  limitPerPage: number;
  totalPages: number;
  currentPage: number;
  data: T;
}

interface StudentContextType {
  // Élèves enregistrés à la cantine
  canteenStudents: Student[];
  // Élèves de l'école (non nécessairement enregistrés à la cantine)
  schoolStudents: SchoolStudent[];
  currentStudent: Student | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  pagination: {
    totalItems: number;
    limitPerPage: number;
    totalPages: number;
    currentPage: number;
  };

  // Méthodes pour les élèves de la cantine
  registerStudentToCanteen: (
    schoolStudentId: string,
    parentEmail: string,
    parentName: string
  ) => Promise<Student>;
  getAllCanteenStudents: (params?: {
    page?: number;
    limit?: number;
  }) => Promise<ApiResponse<Student[]>>;
  getCanteenStudentDetails: (studentId: string) => Promise<Student>;
  getStudentAbonnements: (studentId: string) => Promise<Abonnement[]>;

  // Méthodes pour les élèves de l'école
  getAllSchoolStudents: (params?: {
    page?: number;
    limit?: number;
  }) => Promise<ApiResponse<SchoolStudent[]>>;
  searchSchoolStudent: (params?: {
    query?: string;
    page?: number;
    limit?: number;
  }) => Promise<ApiResponse<SchoolStudent[]>>;

  // Méthodes pour les parents
  getParentStudents: (parentId: string) => Promise<Student[]>;
}

export const StudentContext = createContext<StudentContextType | undefined>(
  undefined
);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    canteenStudents: Student[];
    schoolStudents: SchoolStudent[];
    currentStudent: Student | null;
    loading: boolean;
    error: string | null;
    pagination: {
      totalItems: number;
      limitPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }>({
    canteenStudents: [],
    schoolStudents: [],
    currentStudent: null,
    loading: false,
    error: null,
    pagination: {
      totalItems: 0,
      limitPerPage: 10,
      totalPages: 0,
      currentPage: 1,
    },
  });

  const setLoading = (loading: boolean) =>
    setState((prev) => ({ ...prev, loading }));
  const setError = (error: string | null) =>
    setState((prev) => ({ ...prev, error }));

  // Enregistrer un élève à la cantine
  const registerStudentToCanteen = useCallback(
    async (
      schoolStudentId: string,
      parentEmail: string,
      parentName: string
    ): Promise<Student> => {
      setLoading(true);
      try {
        const response = await apiClient.post<Student>("/students/add", {
          schoolStudentId,
          parentEmail,
          parentName,
        });

        setState((prev) => ({
          ...prev,
          canteenStudents: [...prev.canteenStudents, response],
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to register student to canteen"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtenir tous les élèves de la cantine
  const getAllCanteenStudents = useCallback(
    async ({
      page = 1,
      limit = 10,
    }: { page?: number; limit?: number } = {}): Promise<
      ApiResponse<Student[]>
    > => {
      setLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<Student[]>>(
          `/students?page=${page}&limit=${limit}`
        );

        setState((prev) => ({
          ...prev,
          canteenStudents: response.data,
          pagination: {
            totalItems: response.totalItems,
            limitPerPage: response.limitPerPage,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
          },
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch canteen students"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtenir les détails d'un élève de la cantine
  const getCanteenStudentDetails = useCallback(
    async (studentId: string): Promise<Student> => {
      setLoading(true);
      try {
        const response = await apiClient.get<Student>(`/students/${studentId}`);

        setState((prev) => ({
          ...prev,
          currentStudent: response,
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch student details"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtenir les abonnements d'un élève
  const getStudentAbonnements = useCallback(
    async (studentId: string): Promise<Abonnement[]> => {
      setLoading(true);
      try {
        const response = await apiClient.get<Abonnement[]>(
          `/students/${studentId}/abonnements`
        );

        // Mettre à jour les abonnements de l'élève courant
        setState((prev) => ({
          ...prev,
          currentStudent:
            prev.currentStudent?.id === studentId
              ? { ...prev.currentStudent, abonnements: response }
              : prev.currentStudent,
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch student abonnements"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtenir tous les élèves de l'école
  const getAllSchoolStudents = useCallback(
    async ({
      page = 1,
      limit = 10,
    }: { page?: number; limit?: number } = {}): Promise<
      ApiResponse<SchoolStudent[]>
    > => {
      setLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<SchoolStudent[]>>(
          `/students/school-students?page=${page}&limit=${limit}`
        );

        setState((prev) => ({
          ...prev,
          schoolStudents: response.data,
          pagination: {
            totalItems: response.totalItems,
            limitPerPage: response.limitPerPage,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
          },
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch school students"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Rechercher un élève de l'école
  /*const searchSchoolStudent = useCallback(
    async (query: string): Promise<SchoolStudent[]> => {
      setLoading(true);
      try {
        const response = await apiClient.get<SchoolStudent[]>(
          `/students/search?query=${query}`
        );
        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to search school students"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );*/
  // Rechercher un élève de l'école
  const searchSchoolStudent = useCallback(
    async ({
      query = "",
      page,
      limit,
    }: { query?: string; page?: number; limit?: number } = {}): Promise<
      ApiResponse<SchoolStudent[]>
    > => {
      setLoading(true);
      try {
        const response = await apiClient.get<ApiResponse<SchoolStudent[]>>(
          `/students/search?query=${query}&page=${page}&limit=${limit}`
        );

        return response; // Comme getAllSchoolStudents
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to search school students"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Obtenir les élèves d'un parent
  const getParentStudents = useCallback(
    async (parentId: string): Promise<Student[]> => {
      setLoading(true);
      try {
        const response = await apiClient.get<Student[]>(
          `/canteen/parents/${parentId}/students`
        );

        setState((prev) => ({
          ...prev,
          canteenStudents: response,
        }));

        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch parent's students"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <StudentContext.Provider
      value={{
        canteenStudents: state.canteenStudents,
        schoolStudents: state.schoolStudents,
        currentStudent: state.currentStudent,
        loading: state.loading,
        error: state.error,
        pagination: state.pagination,
        registerStudentToCanteen,
        getAllCanteenStudents,
        getCanteenStudentDetails,
        getStudentAbonnements,
        getAllSchoolStudents,
        searchSchoolStudent,
        getParentStudents,
        setError,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
