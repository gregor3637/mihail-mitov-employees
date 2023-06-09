import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CSVEntry } from "../types/CSVTypes";
import { CollaboratorsPairData } from "../types/Collaboration";
import { ProjectParticipantCollection } from "../types/ParticipantType";
import { Project, ProjectParticipationCollection } from "../types/ProjectTypes";
import { removeProjectsWithLessThanTwoParticipators } from "../utils/filters";
import {
  collaborationBetweenParticipants,
  getParticipantPairCollaborationTime,
  obtainProjectParticipantsData,
} from "../utils/projectUtils";
import { validateProjectParticipationCollection } from "../utils/validateCSVData";
import { RowData } from "../types/RowData";

const Grid = ({ csvEntries }: { csvEntries: CSVEntry[] }) => {
  const participantCollection: ProjectParticipantCollection =
    validateProjectParticipationCollection(csvEntries);
  // console.log("🚀🚀🚀🚀 participantCollection:", participantCollection);

  const projectsData: ProjectParticipationCollection =
    obtainProjectParticipantsData(participantCollection);
  // console.log("🚀🚀🚀🚀 projectsData:", projectsData);

  const projectsWithMoreThanOneParticipators =
    removeProjectsWithLessThanTwoParticipators(projectsData);

  // console.log(
  //   "🚀🚀🚀🚀 projectsWithMoreThanOneParticipators:",
  //   projectsWithMoreThanOneParticipators
  // );

  const collaborationPairs = collaborationBetweenParticipants(
    projectsWithMoreThanOneParticipators
  );
  console.log("🚀 ~ collaborationPairs:", collaborationPairs);

  const rowsData = Array.from(collaborationPairs).reduce<RowData[]>(
    (accumulator, [key, value]: [string, CollaboratorsPairData], index) => {
      value.projects.forEach((proj) => {
        const rData = {
          id: value.id + proj.id,
          employeeId1: value.firstCollaboratorID,
          employeeId2: value.secondCollaboratorID,
          projectId: proj.id,
          daysWorked: proj.collaborationDays,
        };

        accumulator.push(rData);
      });

      return accumulator;
    },
    []
  );
  // console.log("🚀 ~ file: Grid.tsx:51 ~ Grid ~ rowsData:", rowsData);

  const columns = [
    { field: "employeeId1", headerName: "Employee ID #1", width: 150 },
    { field: "employeeId2", headerName: "Employee ID #2", width: 150 },
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "daysWorked", headerName: "Days Worked", width: 150 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Grid;
