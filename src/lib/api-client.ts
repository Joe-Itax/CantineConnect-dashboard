export interface ApiError {
  status: number;
  message: string;
  error?: string;
}
interface ApiResponse<T = unknown> {
  message: string | undefined;
  data?: T;
  error?: {
    status: number;
    message: string;
    details?: unknown;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL n'est pas défini dans les variables d'environnement"
  );
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data: ApiResponse<T> = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = {
      status: response.status,
      message:
        data.error?.message || data?.message || "Une erreur est survenue",
      ...data.error,
    };
    throw error;
  }

  return data as T;
}

/*export const apiClient = {


  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include", // Pour les cookies
      cache: "no-store", // Pour éviter la mise en cache côté serveur
    });
    return handleResponse(response);
  },

  post: async (endpoint: string, body: object) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse(response);
  },

  put: async (endpoint: string, body: object) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse(response);
  },

  patch: async (endpoint: string, body: object) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse(response);
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse(response);
  },
};
*/
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: "include", // Pour les cookies
      cache: "no-store", // Pour éviter la mise en cache côté serveur
    });
    return handleResponse<T>(response); // Passe le type générique à handleResponse
  },

  post: async <T>(endpoint: string, body: object): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse<T>(response);
  },

  put: async <T>(endpoint: string, body: object): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(endpoint: string, body: object): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse<T>(response);
  },
};