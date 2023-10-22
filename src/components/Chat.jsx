import { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { BsFillClipboardFill } from "react-icons/bs";
import { ChatContext } from "../../context/ChatData";
export default function Chat({ chat, ind }) {
  // const {  } = useContext(DataContext);
  const mssgRef = useRef();
  const {
    names,
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
  } = useContext(ChatContext);

  return (
    <div
      className={"chat-block " + (chat.name == names[direction] ? "p1" : "p2")}
    >
      {showClipBoard && (
        <BsFillClipboardFill
          className="copy-icon"
          onClick={() => {
            console.log(mssgRef.current);
            console.log(navigator.clipboard);
            navigator.clipboard.writeText(chat.mssg);
          }}
        />
      )}

      <div
        className={
          "chat " + (chat.mssg?.length < 30 ? "chat-flex" : "chat-abs")
        }
      >
        {chat.file && <p className="img">{chat.file}</p>}
        <p className="mssg" ref={mssgRef}>
          <p>{chat.mssg}</p>
          <div className="time">{chat.time}</div>
        </p>
      </div>
    </div>
  );
}
