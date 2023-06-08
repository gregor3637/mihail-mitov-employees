import useCSVParser from "./hooks/useCSVParser";
import { CollaboratorsPairData } from "./types/Collaboration";
import { ProjectParticipantCollection } from "./types/ParticipantType";
import { Project, ProjectParticipationCollection } from "./types/ProjectTypes";
import { removeProjectsWithLessThanTwoParticipators } from "./utils/filters";
import {
  getParticipantPairCollaborationTime,
  obtainProjectParticipantsData,
} from "./utils/projectUtils";
import { validateProjectParticipationCollection } from "./utils/validateCSVData";

const pathToCSVFile = "/public/data.csv";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();
  // console.log("🚀 parsedData:", parsedData);

  if (parsedData.length > 0) {
    const participantCollection: ProjectParticipantCollection =
      validateProjectParticipationCollection(parsedData);
    // console.log("🚀🚀🚀🚀 participantCollection:", participantCollection);

    const projectsData: ProjectParticipationCollection =
      obtainProjectParticipantsData(participantCollection);
    console.log("🚀🚀🚀🚀 projectsData:", projectsData);

    const projectsWithMoreThanOneParticipators =
      removeProjectsWithLessThanTwoParticipators(projectsData);

    console.log(
      "🚀🚀🚀🚀 projectsWithMoreThanOneParticipators:",
      projectsWithMoreThanOneParticipators
    );

    const collaborationData = Array.from(
      projectsWithMoreThanOneParticipators.entries()
    ).map(([projId, participants]) => {
      const collaborationData =
        getParticipantPairCollaborationTime(participants);

      const collabolatorsPairCollection: Map<string, CollaboratorsPairData> =
        new Map();

      if (collaborationData.length > 0) {
        const singleCollaborationBetweenParticipants = collaborationData[0];

        if (
          !collabolatorsPairCollection.get(
            singleCollaborationBetweenParticipants.collaborationId
          )
        ) {
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
        // check if collaborationData[n].collaborationId exists in CollaboratorsPairDataCollection
        // if no => create a new CollaboratorsPairData and add the >project id< and >project days<
        // if yes => update the >totalCollaborationDays< and push into >projects<
      }
    });
  }

  const handleButtonClick = () => {
    fetchAndParseCSVFileByUrl(pathToCSVFile);
  };

  return (
    <>
      <button onClick={handleButtonClick}>load existing csv fileee</button>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
    </>
  );
}

export default App;
