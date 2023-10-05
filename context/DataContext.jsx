import { createContext, useState, useEffect } from "react";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [fileContent, setFileContent] = useState("");

  return (
    <DataContext.Provider value={{ fileContent, setFileContent }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
