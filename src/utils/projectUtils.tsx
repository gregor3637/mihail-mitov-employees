import {
  ProjectParticipant,
  ProjectParticipantCollection,
} from "../types/ParticipantType";

export const obtainProjectParticipantsData = (
  empoyees: ProjectParticipantCollection
) => {
  const f = empoyees.reduce((allProjects: any, emp: ProjectParticipant) => {
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
