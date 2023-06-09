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

const Grid = ({ rowsData }: { rowsData: RowData[] }) => {
  const columns = [
    { field: "employeeId1", headerName: "Employee ID #1", width: 150 },
    { field: "employeeId2", headerName: "Employee ID #2", width: 150 },
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "daysWorked", headerName: "Days Worked At Project", width: 350 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        // rows={rowsData}
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
