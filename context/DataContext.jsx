import { createContext, useState, useEffect } from "react";

const DataContext = createContext();
export default function DataProvider({ children }) {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDefaultTheme, setDefaultTheme] = useState(true);
  const statusBarThemeMap = {
    default: "#202c33",
    gray: "#141414",
    blue: "#181c21",
    red: "#211818",
  };
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );
  const changeStatusBarColor = (theme) => {
    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.content = statusBarThemeMap[theme];
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "default";
    if (theme == "default") setDefaultTheme(true);
    else setDefaultTheme(false);
    document.documentElement?.classList?.add(theme);
    changeStatusBarColor(theme);
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
        changeStatusBarColor,
        setDefaultTheme,
        isDefaultTheme,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext };
