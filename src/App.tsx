import useCSVParser from "./hooks/useCSVParser";

function App() {
  const { parsedData, handleFileChange } = useCSVParser();
  console.log("🚀 parsedData:", parsedData);

  return (
    <>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
    </>
  );
}

export default App;
