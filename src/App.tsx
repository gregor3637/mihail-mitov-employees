import useCSVParser from "./hooks/useCSVParser";
import { EmployeeCollection } from "./types/EmployeeType";
import { obtainProjectParticipantsData } from "./utils/projectUtils";
import { validateEmployeeCollection } from "./utils/validateCSVData";

const pathToCSVFile = "/public/data.csv";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();
  console.log("🚀 parsedData:", parsedData);

  if (parsedData.length > 0) {
    const employeeCollection: EmployeeCollection | null =
      validateEmployeeCollection(parsedData);

    const projectsData = employeeCollection
      ? obtainProjectParticipantsData(employeeCollection)
      : {};

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
