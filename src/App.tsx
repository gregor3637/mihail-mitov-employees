import useCSVParser from "./hooks/useCSVParser";
import { ProjectParticipantCollection } from "./types/ParticipantType";
import { Project } from "./types/ProjectTypes";
import { obtainProjectParticipantsData } from "./utils/projectUtils";
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

    const projectsData: Map<number, Project> = obtainProjectParticipantsData(
      participantCollection
    );
    // const projectsData: Map<number, Project> | Record<string, never> =
    //   participantCollection
    //     ? obtainProjectParticipantsData(participantCollection)
    //     : {};

    console.log("🚀🚀🚀🚀 projectsData:", projectsData);
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
