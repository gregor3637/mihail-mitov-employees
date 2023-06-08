import { Employee, EmployeeCollection } from "../types/EmployeeType";

export const obtainProjectParticipantsData = (empoyees: EmployeeCollection) => {
  const f = empoyees.reduce((allProjects: any, emp: Employee) => {
    if (!Object.prototype.hasOwnProperty.call(allProjects, emp.ProjectID)) {
      allProjects[emp.ProjectID] = {
        [emp.EmpID]: { DateFrom: emp.DateFrom, DateTo: emp.DateTo },
      };
    } else {
      allProjects[emp.ProjectID] = {
        ...allProjects[emp.ProjectID],
        [emp.EmpID]: { DateFrom: emp.DateFrom, DateTo: emp.DateTo },
      };
    }

    return allProjects;
  }, {});

  return f;
};
