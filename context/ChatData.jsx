import { useState, useContext, useEffect, createContext } from "react";

const ChatContext = createContext();
export default function ChatData({ children }) {
  let [messages, setMessages] = useState([]);
  let [showInfo, setShowInfo] = useState(false);
  let [showMenu, setShowMenu] = useState(false);
  let [direction, setDirection] = useState(0);
  let [hasMore, setHasMore] = useState(true);
  let [records, setRecords] = useState(300);
  const [showClipBoard, setShowClipBoard] = useState(false);
  let [names, setNames] = useState([]);
  let [query, setQuery] = useState("");
  let [len, setLen] = useState();
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        showInfo,
        setShowInfo,
        showMenu,
        setShowMenu,
        direction,
        setDirection,
        hasMore,
        setHasMore,
        records,
        setRecords,
        showClipBoard,
        setShowClipBoard,
        names,
        setNames,
        query,
        setQuery,
        len,
        setLen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
