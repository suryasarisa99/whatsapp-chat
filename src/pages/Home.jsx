import { useContext, useEffect, useRef, useState, useCallback } from "react";
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
import { motion } from "framer-motion";
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
  const { setFileContent, fileName, setFileName, chats, setChats } =
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
        {chats.map((x, index) => (
          <ChatSection2
            onClick={() => {
              setNames(x.names);
              setMessages(x.messages);
              navigate("/chat");
            }}
            // key={x.names?.[0] + "x" + x.names?.[1] + index}
            key={x.key}
            name={x.names[1]}
            lastMssg={x.lastMssg}
            time={x.time}
            index={index}
            onRemove={(ind) => {
              chats.splice(index, 1);
              setChats([...chats]);
              localStorage.setItem("chats", JSON.stringify(chats));
            }}
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

function ChatSection({ onClick, s, r, index }) {
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
function ChatSection2({ onClick, name, lastMssg, time, index, onRemove }) {
  const [move, setMove] = useState(0);
  const prvPos = useRef(0);
  const chatItemRef = useRef(null);
  const handleTe = useCallback(
    (e) => {
      // const currentPos = e.targetTouches[0].screenX;
      // const diff = Math.abs(currentPos - prvPos.current);
      if (Math.abs(move) < 180) setMove(0);
      else {
        setMove(move < 0 ? -500 : 500);
        onRemove(index);
      }
    },
    [move]
  );

  useEffect(() => {
    if (onRemove) {
      chatItemRef.current.addEventListener("touchstart", handleTs);
      chatItemRef.current.addEventListener("touchmove", handleTm);
      chatItemRef.current.addEventListener("touchend", handleTe);
      const x = chatItemRef.current;
      return () => {
        x.removeEventListener("touchstart", handleTs);
        x.removeEventListener("touchmove", handleTm);
        x.removeEventListener("touchend", handleTe);
      };
    }
  }, [handleTe]);

  function handleTs(e) {
    prvPos.current = e.targetTouches[0].screenX;
  }
  function handleTm(e) {
    const currentPos = e.targetTouches[0].screenX;
    const diff = currentPos - prvPos.current;
    setMove(diff);
  }

  return (
    <motion.div
      // style={{ x: index == 0 ? move : 0 }}
      style={{ x: move }}
      className="chat-item-2"
      onClick={onClick}
      ref={chatItemRef}
    >
      <img src={Dp} />
      <div className="body">
        <div className="row">
          <div className="name">{name}</div>
          <div className="time">{time}</div>
        </div>
        <div className="last-mssg">{lastMssg}</div>
      </div>
    </motion.div>
  );
}
