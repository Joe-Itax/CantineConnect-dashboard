import { StudentContext } from "@/providers/student-provider";
import { useContext } from "react";

export function useStudents() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
}
