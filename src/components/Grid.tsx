import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Grid = () => {
  const columns = [
    { field: "employeeId1", headerName: "Employee ID #1", width: 150 },
    { field: "employeeId2", headerName: "Employee ID #2", width: 150 },
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "daysWorked", headerName: "Days Worked", width: 150 },
  ];

  const rows = [
    {
      id: 1,
      employeeId1: "E123",
      employeeId2: "E124",
      projectId: "P1",
      daysWorked: 10,
    },
    {
      id: 2,
      employeeId1: "E125",
      employeeId2: "E126",
      projectId: "P2",
      daysWorked: 8,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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
