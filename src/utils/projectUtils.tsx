import {
  CollaborationData,
  CollaboratorsPairData,
} from "../types/Collaboration";
import {
  ProjectParticipant,
  ProjectParticipantCollection,
  ParticipantWorkSpan,
} from "../types/ParticipantType";
import {
  Project,
  ProjectParticipationCollection,
  ProjectParticipants,
} from "../types/ProjectTypes";

export const obtainProjectParticipantsData = (
  participants: ProjectParticipantCollection
): ProjectParticipationCollection => {
  const projById = participants.reduce(
    (
      allProjects: Map<number, ProjectParticipants>,
      emp: ProjectParticipant
    ) => {
      const participantWorkSpan: ParticipantWorkSpan = {
        empID: emp.empID,
        dateFrom: emp.dateFrom,
        dateTo: emp.dateTo,
      };

      if (!allProjects.has(emp.projectID)) {
        const project: ProjectParticipants = [participantWorkSpan];
        allProjects.set(emp.projectID, project);
      } else {
        allProjects.get(emp.projectID)?.push(participantWorkSpan);
      }

      return allProjects;
    },
    new Map<number, ProjectParticipants>()
  );

  return projById;
};

export const getParticipantPairCollaborationTime = (
  participants: ProjectParticipants
): CollaborationData[] => {
  const participantsByAscId = participants.sort((a, b) => a.empID - b.empID);

  const data = participantsByAscId.reduce<CollaborationData[]>(
    (collaboratorsCollection, participantA, index) => {
      const dateFromA = participantA.dateFrom;
      const dateToA = participantA.dateTo;

      for (let j = index + 1; j < participantsByAscId.length; j++) {
        const participantB = participantsByAscId[j];
        const dateFromB = participantB.dateFrom;
        const dateToB = participantB.dateTo;

        if (dateFromA < dateToB && dateToA > dateFromB) {
          const overlapStart = dateFromA < dateFromB ? dateFromB : dateFromA;
          const overlapEnd = dateToA < dateToB ? dateToA : dateToB;

          const overlapDays = Math.ceil(
            (Number(overlapEnd) - Number(overlapStart)) / (1000 * 60 * 60 * 24)
          );

          collaboratorsCollection.push({
            collaborationId: participantA.empID + "_" + participantB.empID,
            firstCollaboratorID: participantA.empID,
            secondCollaboratorID: participantB.empID,
            days: overlapDays,
          });
        }
      }

      return collaboratorsCollection;
    },
    []
  );

  return data;
};

export const collaborationBetweenParticipants = (
  projectsParticipations: ProjectParticipationCollection
) => {
  const collabolatorsPairCollection: Map<string, CollaboratorsPairData> =
    new Map();

  projectsParticipations.forEach((participants, projId) => {
    const collaborationData = getParticipantPairCollaborationTime(participants);

    if (collaborationData.length > 0) {
      const singleCollaborationBetweenParticipants = collaborationData[0];

      if (
        !collabolatorsPairCollection.get(
          singleCollaborationBetweenParticipants.collaborationId
        )
      ) {
        // check if collaborationData[n].collaborationId exists in CollaboratorsPairDataCollection
        // if no => create a new CollaboratorsPairData and add the >project id< and >project days<
        // if yes => update the >totalCollaborationDays< and push into >projects<

        const pairData: CollaboratorsPairData = {
          id: singleCollaborationBetweenParticipants.collaborationId,
          firstCollaboratorID:
            singleCollaborationBetweenParticipants.firstCollaboratorID,
          secondCollaboratorID:
            singleCollaborationBetweenParticipants.secondCollaboratorID,
          totalCollaborationDays: singleCollaborationBetweenParticipants.days,
          projects: [
            {
              id: projId,
              collaborationDays: singleCollaborationBetweenParticipants.days,
            },
          ],
        };

        collabolatorsPairCollection.set(
          singleCollaborationBetweenParticipants.collaborationId,
          pairData
        );
      } else {
        const collabolatorsPair = collabolatorsPairCollection.get(
          singleCollaborationBetweenParticipants.collaborationId
        );

        if (collabolatorsPair) {
          collabolatorsPair.totalCollaborationDays +=
            singleCollaborationBetweenParticipants.days;

          collabolatorsPair.projects.push({
            id: projId,
            collaborationDays: singleCollaborationBetweenParticipants.days,
          });
        }
      }
    }
  });

  return collabolatorsPairCollection;
};

// const collaborationData = Array.from(projectsParticipations.entries()).map(
//   ([projId, participants]) => {
//     const collaborationData = getParticipantPairCollaborationTime(participants);

//     const collabolatorsPairCollection: Map<string, CollaboratorsPairData> =
//       new Map();

//     if (collaborationData.length > 0) {
//       const singleCollaborationBetweenParticipants = collaborationData[0];

//       if (
//         !collabolatorsPairCollection.get(
//           singleCollaborationBetweenParticipants.collaborationId
//         )
//       ) {
//         // check if collaborationData[n].collaborationId exists in CollaboratorsPairDataCollection
//         // if no => create a new CollaboratorsPairData and add the >project id< and >project days<
//         // if yes => update the >totalCollaborationDays< and push into >projects<

//         const pairData: CollaboratorsPairData = {
//           id: singleCollaborationBetweenParticipants.collaborationId,
//           firstCollaboratorID:
//             singleCollaborationBetweenParticipants.firstCollaboratorID,
//           secondCollaboratorID:
//             singleCollaborationBetweenParticipants.secondCollaboratorID,
//           totalCollaborationDays: singleCollaborationBetweenParticipants.days,
//           projects: [
//             {
//               id: projId,
//               collaborationDays: singleCollaborationBetweenParticipants.days,
//             },
//           ],
//         };

//         collabolatorsPairCollection.set(
//           singleCollaborationBetweenParticipants.collaborationId,
//           pairData
//         );
//       } else {
//         const collabolatorsPair = collabolatorsPairCollection.get(
//           singleCollaborationBetweenParticipants.collaborationId
//         );

//         if (collabolatorsPair) {
//           collabolatorsPair.totalCollaborationDays +=
//             singleCollaborationBetweenParticipants.days;

//           collabolatorsPair.projects.push({
//             id: projId,
//             collaborationDays: singleCollaborationBetweenParticipants.days,
//           });
//         }
//       }
//     }
//   }
// );
