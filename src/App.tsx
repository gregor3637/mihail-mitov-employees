import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import useCSVParser from "./hooks/useCSVParser";
import FileInput from "./components/FileInput";
import { allCollaborations, longestCollaboration } from "./utils/csvToGridRow";
import { RowData } from "./types/RowData";

import styles from "./example.module.css";

const pathToCSVFile = "/public/data.csv";

//***
  // additional Date Formats should be easy to set
  // by changing the dateRegex inside:
  // 'utils > regExPatterns.tsx'
  // did not have time to add this functionality
//


function App() {
  const [longestParticipationDataRows, setLongestParticipationDataRows] =
    useState<RowData[]>([]);

  const [allParticipationDataRows, setAllParticipationDataRows] = useState<
    RowData[]
  >([]);

  const { parsedData, handleFileChange, fetchAndParseCSVFileByUrl } =
    useCSVParser();

  const handleButtonClick = () => {
    fetchAndParseCSVFileByUrl(pathToCSVFile);
  };

  useEffect(() => {
    if (parsedData.length > 0) {
      setLongestParticipationDataRows(longestCollaboration(parsedData));
      setAllParticipationDataRows(allCollaborations(parsedData));
    }
  }, [parsedData]);

  return (
    <>
      <div className={styles.centerContainer}>
        <button
          className={`${styles.red} ${styles.button}`}
          onClick={handleButtonClick}
        >
          load existing csv fileee
        </button>
        <FileInput handleFile={handleFileChange} />
      </div>
      {longestParticipationDataRows &&
        longestParticipationDataRows.length > 0 && (
          <div style={{ backgroundColor: "#277db6" }}>
            <h2>Longest Collaboration between employees</h2>
            <Grid rowsData={longestParticipationDataRows} />
          </div>
        )}
      {allParticipationDataRows && allParticipationDataRows.length > 0 && (
        <div style={{ backgroundColor: "#27b67a" }}>
          <h2>All collaborations between employees</h2>
          <Grid rowsData={allParticipationDataRows} />
        </div>
      )}
    </>
  );
}

export default App;
