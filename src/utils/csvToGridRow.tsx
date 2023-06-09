import { CSVEntry } from "../types/CSVTypes";
import { CollaboratorsPairData } from "../types/Collaboration";
import { ProjectParticipantCollection } from "../types/ParticipantType";
import { ProjectParticipationCollection } from "../types/ProjectTypes";
import { RowData } from "../types/RowData";
import { removeProjectsWithLessThanTwoParticipators } from "./filters";
import {
  collaborationBetweenParticipants,
  obtainProjectParticipantsData,
} from "./projectUtils";
import { validateProjectParticipationCollection } from "./validateCSVData";

const getCollaborationPairs = (csvEntries: CSVEntry[]) => {
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

  return collaborationPairs;
};

export const longestCollaboration = (csvEntries: CSVEntry[]): RowData[] => {
  const collaborationPairs = getCollaborationPairs(csvEntries);
  console.log("🚀 ~ collaborationPairs:", collaborationPairs);

  const longestCollaborationPair = Array.from(
    collaborationPairs
  ).reduce<CollaboratorsPairData>(
    (
      prev: CollaboratorsPairData,
      [key, value]: [string, CollaboratorsPairData],
      index
    ) => {
      return prev.totalCollaborationDays > value.totalCollaborationDays
        ? prev
        : value;
    },
    collaborationPairs.entries().next().value
  );

  const longestCollaborationRows = longestCollaborationPair.projects.map(
    (proj, index, arr) => {
      const rData = {
        id: longestCollaborationPair.id + proj.id,
        employeeId1: longestCollaborationPair.firstCollaboratorID,
        employeeId2: longestCollaborationPair.secondCollaboratorID,
        projectId: proj.id,
        daysWorked: proj.collaborationDays,
      };

      return rData;
    }
  );

  return longestCollaborationRows;
};

export const allCollaborations = (csvEntries: CSVEntry[]) => {
  const collaborationPairs = getCollaborationPairs(csvEntries);

  const rowsDataForAllCollaborations = Array.from(collaborationPairs).reduce<
    RowData[]
  >((accumulator, [key, value]: [string, CollaboratorsPairData], index) => {
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
  }, []);

  return rowsDataForAllCollaborations;
};
