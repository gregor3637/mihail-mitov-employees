import Grid from "./components/Grid";
import useCSVParser from "./hooks/useCSVParser";
import { CollaboratorsPairData } from "./types/Collaboration";
import { ProjectParticipantCollection } from "./types/ParticipantType";
import { Project, ProjectParticipationCollection } from "./types/ProjectTypes";
import { removeProjectsWithLessThanTwoParticipators } from "./utils/filters";
import {
  collaborationBetweenParticipants,
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

    const collaborationPairs = collaborationBetweenParticipants(
      projectsWithMoreThanOneParticipators
    );
    console.log(
      "🚀 ~ file: App.tsx:38 ~ App ~ collaborationPairs:",
      collaborationPairs
    );
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
      <Grid />
    </>
  );
}

export default App;
