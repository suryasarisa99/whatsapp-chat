import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { chat1 } from "../data1";
import { chat2 } from "../data2";
import BottomBar from "../components/BottomBar";
import HomeTopBar from "../components/HomeTopBar";
import { BiSolidMessageAdd } from "react-icons/bi";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Dp from "../components/blank-profile-picture-973460_1280.png";
export default function Home() {
  const { setFileContent, fileName, setFileName } = useContext(DataContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);

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
        <ChatSection
          onClick={() => {
            setFileContent(chat2);
            navigate("/chat");
          }}
          s="Vijaya Btech"
          r="Tarun Kumar"
        />
        <ChatSection
          onClick={() => {
            setFileContent(chat1);
            navigate("/chat");
          }}
          s="Anil Kumar"
          r="Barbie Girl"
        />
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
function ChatSection2({ onClick, s, r }) {
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
