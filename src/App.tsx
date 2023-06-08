import useCSVParser from "./hooks/useCSVParser";
import { EmployeeCollection } from "./types/EmployeeType";
import { validateEmployeeCollection } from "./utils/validateCSVData";

const pathToCSVFile = "/public/data.csv";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();
  console.log("🚀 parsedData:", parsedData);

  if (parsedData.length > 0) {
    const employeeCollection: EmployeeCollection | null =
      validateEmployeeCollection(parsedData);

    console.log("🚀 ~ employeeCollection:", employeeCollection);
  }

  const handleButtonClick = () => {
    fetchAndParseCSVFileByUrl(pathToCSVFile);
  };

  return (
    <>
      <button onClick={handleButtonClick}>load existing csv file</button>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
    </>
  );
}

export default App;
