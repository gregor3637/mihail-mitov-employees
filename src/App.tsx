import Grid from "./components/Grid";
import useCSVParser from "./hooks/useCSVParser";
const pathToCSVFile = "/public/data.csv";
import FileInput from "./components/FileInput";

import styles from "./example.module.css";

function App() {
  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();

  const handleButtonClick = () => {
    fetchAndParseCSVFileByUrl(pathToCSVFile);
  };

  return (
    <>
      <div className={styles.centerContainer}>
        <button
          className={`${styles.red} ${styles.button}`}
          onClick={handleButtonClick}
        >
          load existing csv fileee
        </button>
        <FileInput handleFile={handleFileChange}/>
      </div>
      {parsedData && parsedData.length > 0 && <Grid csvEntries={parsedData} />}
    </>
  );
}

export default App;
