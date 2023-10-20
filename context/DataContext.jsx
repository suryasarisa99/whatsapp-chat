import { createContext, useState, useEffect } from "react";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <DataContext.Provider value={{
      fileContent, setFileContent, fileName, setFileName
    }
    }>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
