"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import StudentsDataTable from "@/app/dashboard/components/students-data-table";
import { useStudents } from "@/hooks/use-students";
import { useEffect } from "react";
// import { useUsers } from "@/hooks/use-users";

export default function DashboardPage() {
  // const { users } = useUsers();
  // console.log("users: ", users);
  const { getAllCanteenStudents } = useStudents();

  useEffect(() => {
    getAllCanteenStudents();
  }, [getAllCanteenStudents]);

  // console.log("studens: ", students);
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="px-4 lg:px-6">
        <StudentsDataTable />
      </div>
    </div>
  );
}


// {
// 	"0": {
// 		"id": "24947fa0-9229-4b0b-b6f5-f06638f753d0",
// 		"schoolStudent": {
// 			"id": "08253a8e-c90e-4742-a6cc-ebf501b660e5",
// 			"name": "René Leroux",
// 			"class": "3ème Humanités Sciences Sociales",
// 			"gender": "M",
// 			"matricule": "2025/87",
// 			"createdAt": "2025-03-11T14:15:33.277Z",
// 			"updatedAt": "2025-03-11T14:15:33.277Z"
// 		},
// 		"parent": {
// 			"id": "04a7f765-3df4-4942-b23f-3fbe4c59f86c",
// 			"user": {
// 				"id": "04a7f765-3df4-4942-b23f-3fbe4c59f86c",
// 				"email": "parent1@gmail.com",
// 				"name": "Parent Name1"
// 			}
// 		},
// 		"abonnements": []
// 	}
// }
// {
// 	"1": {
// 		"id": "4ef94594-f71c-4f76-98f1-fae08745f253",
// 		"schoolStudent": {
// 			"id": "08392156-16c7-4693-a601-14cc2f1c0503",
// 			"name": "Dr Noël Girard",
// 			"class": "8ème Générale",
// 			"gender": "F",
// 			"matricule": "2025/66",
// 			"createdAt": "2025-03-11T14:15:33.277Z",
// 			"updatedAt": "2025-03-11T14:15:33.277Z"
// 		},
// 		"parent": {
// 			"id": "04a7f765-3df4-4942-b23f-3fbe4c59f86c",
// 			"user": {
// 				"id": "04a7f765-3df4-4942-b23f-3fbe4c59f86c",
// 				"email": "parent1@gmail.com",
// 				"name": "Parent Name1"
// 			}
// 		},
// 		"abonnements": [
// 			{
// 				"duration": 7,
// 				"price": 5000,
// 				"startDate": "2025-03-11T18:05:59.157Z",
// 				"endDate": "2025-03-18T18:05:59.157Z",
// 				"status": "actif",
// 				"createdAt": "2025-03-11T18:02:06.671Z",
// 				"updatedAt": "2025-03-11T18:05:59.164Z",
// 				"studentId": "4ef94594-f71c-4f76-98f1-fae08745f253",
// 				"id": 7
// 			}
// 		]
// 	}
// }