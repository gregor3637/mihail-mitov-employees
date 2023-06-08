import { useCallback, useState } from "react";
import { CSVEntry } from "../types/CSVTypes";
import Papa, { ParseResult } from "papaparse";

const useCSVParser = () => {
  const [parsedData, setData] = useState<CSVEntry[]>([]);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : undefined;

      if (file) {
        const reader = new FileReader();

        const parseFile = () =>
          new Promise<CSVEntry[]>((resolve, reject) => {
            reader.onload = () => {
              Papa.parse(reader.result as string, {
                complete: (result: ParseResult<any>) => {
                  console.log("!!! Parsed Results:", result.data);
                  resolve(result.data);
                },
                header: true,
                transform: function(value:string) {
                  // Replace empty cells with null
                  if (value.trim() === "") {
                    return null;
                  }
                  return value;
                },
              });
            };

            reader.onerror = reject;

            reader.readAsText(file);
          });

        try {
          const parsedData = await parseFile();
          setData(parsedData);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      }
    },
    []
  );

  const fetchAndParseCSVFileByUrl = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      Papa.parse(data, {
        complete: (result: ParseResult<any>) => {
          console.log("Parsed Results:", result.data);
          setData(result.data);
        },
        header: true,
      });
    } catch (error) {
      console.error("Error fetching and parsing CSV:", error);
    }
  }, []);

  return { parsedData, handleFileChange, fetchAndParseCSVFileByUrl };
};

export default useCSVParser;
