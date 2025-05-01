// Typage des élèves inscrits à l'école
export interface EnrolledStudent {
  id: string;
  name: string;
  matricule: string;
  class: string;
  gender: "M" | "F";
  isRegisteredToCanteen: boolean;
  createdAt: string;
  updatedAt: string;
}

// Typage des élèves inscrits à la cantine
export interface CanteenStudent {
  id: string;
  enrolledStudentId: string;
  matriculeHashe: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  enrolledStudent: EnrolledStudent;
}

// Typage d'une notification
export interface Notification {
  id: number;
  canteenStudentId: string;
  message: string;
  read: boolean;
  type: "abonnement" | "repas" | "abonnement_expiré" | string;
  details: Record<string, string | number | boolean> | null;
  createdAt: string;
  updatedAt: string;
}

// Typage d'un repas
export interface Meal {
  id: string;
  canteenStudentId: string;
  date: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
