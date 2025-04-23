import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStudents } from "@/hooks/use-students";
import { useUsers } from "@/hooks/use-users";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AddStudentToCanteen() {
  const {
    schoolStudents,
    getAllSchoolStudents,
    searchSchoolStudent,
    registerStudentToCanteen,
    loading,
  } = useStudents();
  const { fetchUsers, users } = useUsers();

  const [selectedStudent, setSelectedStudent] = useState<Option | null>(null);
  const [selectedParent, setSelectedParent] = useState<Option | null>(null);
  // const [searchQuery, setSearchQuery] = useState("");

  const [studentOptions, setStudentOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await getAllSchoolStudents();
        const options = response.data.map((student) => ({
          value: student.id,
          label: `${student.name} (${student.matricule}) - ${student.class}`,
        }));
        console.log("response getAllSchoolStudents():", response);
        setStudentOptions(options);
      } catch (error) {
        console.error("Erreur lors du chargement initial :", error);
      }
    }

    fetchInitialData();
    fetchUsers();
  }, [getAllSchoolStudents, fetchUsers]);

  const parentOptions: Option[] = users
    .filter((user) => user.role === "parent")
    .map((parent) => ({
      value: parent.id,
      label: `${parent.name} (${parent.email})`,
    }));

  const handleSubmit = async () => {
    if (!selectedStudent || !selectedParent) {
      toast.error("Veuillez sélectionner un élève et un parent");
      return;
    }

    const parentData = users.find((user) => user.id === selectedParent.value);

    if (!parentData) {
      toast.error("Parent introuvable");
      return;
    }

    try {
      await registerStudentToCanteen(
        selectedStudent.value,
        parentData.email,
        parentData.name
      );
      toast.success("Élève ajouté à la cantine avec succès");
      setSelectedStudent(null);
      setSelectedParent(null);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'élève à la cantine");
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" variant="outline">
          <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          Ajouter un élève
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Ajouter un élève à la Cantine</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6 py-4">
          {/* Sélectionner un élève */}
          <div className="space-y-2">
            <Label>Sélectionner un élève</Label>
            <MultipleSelector
              value={selectedStudent ? [selectedStudent] : []}
              onChange={(options) => setSelectedStudent(options[0] || null)}
              defaultOptions={studentOptions}
              placeholder="Rechercher un élève..."
              emptyIndicator={
                <p className="text-center text-sm">Aucun élève trouvé</p>
              }
              maxSelected={1}
              onSearch={async (query: string) => {
                // Si rien dans l'input, recharger la liste de base
                if (
                  !query ||
                  query.length <= 0 ||
                  query === "" ||
                  !query.trim()
                ) {
                  const options = schoolStudents.map((student) => ({
                    value: student.id,
                    label: `${student.name} (${student.matricule}) - ${student.class}`,
                  }));
                  // setStudentOptions(options); // <= refresh ici
                  return options;
                }

                // Petit debounce manuel ici
                await new Promise((resolve) => setTimeout(resolve, 800)); // 0.8s
                try {
                  const students = await searchSchoolStudent({ query });
                  const options = students.data.map((student) => ({
                    value: student.id,
                    label: `${student.name} (${student.matricule}) - ${student.class}`,
                  }));
                  setStudentOptions(options); // <-- refresh visuel
                  return options;
                } catch (error) {
                  console.error(
                    "Erreur lors de la recherche des élèves :",
                    error
                  );
                  return [];
                }
              }}
              hidePlaceholderWhenSelected
              loadingIndicator={
                <p className="text-center text-sm">Recherche...</p>
              }
              // inputProps={{
              //   onValueChange: (value) => setSearchQuery(value),
              // }}
            />
          </div>

          {/* Sélectionner un parent */}
          <div className="space-y-2">
            <Label>Sélectionner un parent</Label>
            <MultipleSelector
              value={selectedParent ? [selectedParent] : []}
              onChange={(options) => setSelectedParent(options[0] || null)}
              defaultOptions={parentOptions}
              placeholder="Rechercher un parent..."
              emptyIndicator={
                <p className="text-center text-sm">Aucun parent trouvé</p>
              }
              maxSelected={1}
              hidePlaceholderWhenSelected
            />
          </div>
        </div>
        <div className="border-t px-6 py-4 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "En cours..." : "Ajouter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
