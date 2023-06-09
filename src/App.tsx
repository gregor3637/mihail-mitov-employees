import Grid from "./components/Grid";
import useCSVParser from "./hooks/useCSVParser";
const pathToCSVFile = "/public/data.csv";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();

  const handleButtonClick = () => {
    fetchAndParseCSVFileByUrl(pathToCSVFile);
  };

  return (
    <>
      <button onClick={handleButtonClick}>load existing csv fileee</button>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      {parsedData && parsedData.length > 0 && <Grid csvEntries={parsedData} />}
    </>
  );
}

export default App;
