import { createContext, useState, useEffect } from "react";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );

  useEffect(() => {
    document.documentElement?.classList?.add(
      localStorage.getItem("theme") || "default"
    );
  }, []);

  return (
    <DataContext.Provider
      value={{
        fileContent,
        setFileContent,
        fileName,
        setFileName,
        chats,
        setChats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
