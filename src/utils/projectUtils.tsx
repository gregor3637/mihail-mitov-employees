import {
  ProjectParticipant,
  ProjectParticipantCollection,
  ParticipantWorkSpan,
} from "../types/ParticipantType";
import { Project } from "../types/ProjectTypes";

export const obtainProjectParticipantsData = (
  participants: ProjectParticipantCollection
) => {
  const projById = participants.reduce(
    (allProjects: Map<number, Project>, emp: ProjectParticipant) => {
      const participantWorkSpan: ParticipantWorkSpan = {
        empID: emp.empID,
        dateFrom: emp.dateFrom,
        dateTo: emp.dateTo,
      };

      if (!allProjects.has(emp.projectID)) {
        const project: Project = {
          id: emp.projectID,
          participants: [participantWorkSpan],
        };
        allProjects.set(emp.projectID, project);
      } else {
        allProjects.get(emp.projectID)?.participants.push(participantWorkSpan);
      }

      return allProjects;
    },
    new Map<number, Project>()
  );

  return projById;
};
