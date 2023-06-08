import useCSVParser from "./hooks/useCSVParser";

const pathToCSVFile = "/public/data.csv";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();
  console.log("🚀 parsedData:", parsedData);

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
