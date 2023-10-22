import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { chat1 } from "../data1";
import { chat2 } from "../data2";
import BottomBar from "../components/BottomBar";
import HomeTopBar from "../components/HomeTopBar";
import { BiSolidMessageAdd } from "react-icons/bi";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Dp from "../components/blank-profile-picture-973460_1280.png";
import ChatData from "../../context/ChatData";
import { ChatContext } from "../../context/ChatData";
export default function Home() {
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
    setNames,
    setShowClipBoard,
  } = useContext(ChatContext);
  const { setFileContent, fileName, setFileName, chats } =
    useContext(DataContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    setNames([]);
    setDirection(0);
    setShowMenu(false);
    setShowClipBoard(false);
    setShowInfo(false);
    setHasMore(true);
    setRecords(300);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFileName(file?.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      if (file.name.toLowerCase().includes("teju"))
        localStorage.setItem("teju", JSON.stringify(content));
      navigate("/chat");
    };
    reader.readAsText(file);
  };

  console.log(chats);

  return (
    <div className="home">
      <HomeTopBar />
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileUpload}
        accept=".txt"
      />

      <div className="home-chats">
        <ChatSection2
          onClick={() => {
            setFileContent(chat2);
            setFileName("Vijaya Btech");
            navigate("/chat");
          }}
          name="Vijya Btech"
          lastMssg="Hi"
          time="11:15 pm"
          r="Tarun Kumar"
        />
        <ChatSection2
          onClick={() => {
            setFileContent(chat1);
            navigate("/chat");
          }}
          name="Barbie girll😝"
          lastMssg="Akuva chyku anav ga chynu le anna"
          time="3:02 pm"
        />
        {chats.map((x) => (
          <ChatSection2
            onClick={() => {
              setNames(x.names);
              setMessages(x.messages);
              navigate("/chat");
            }}
            key={x.names?.[0] + x.names?.[1]}
            name={x.names[1]}
            lastMssg={x.lastMssg}
            time={x.time}
          />
        ))}
      </div>
      <div
        className="float-btn-outer"
        onClick={(e) => {
          inputRef.current.click();
        }}
      >
        <BiSolidMessageAdd className="icon" />
      </div>

      <BottomBar />
    </div>
  );
}

function ChatSection({ onClick, s, r }) {
  return (
    <div className="chat-item" onClick={onClick}>
      <img src={Dp} />
      <div className="people">
        <div className="p1">
          <FaLongArrowAltLeft className="icon" />
          <div className="sender">{s}</div>
        </div>
        <div className="p2">
          <div className="reciver">{r}</div>
          <FaLongArrowAltRight className="icon" />
        </div>
      </div>
    </div>
  );
}
function ChatSection2({ onClick, name, lastMssg, time }) {
  return (
    <div className="chat-item-2" onClick={onClick}>
      <img src={Dp} />
      <div className="body">
        <div className="row">
          <div className="name">{name}</div>
          <div className="time">{time}</div>
        </div>
        <div className="last-mssg">{lastMssg}</div>
      </div>
    </div>
  );
}
