import { useState, useEffect, useContext, useRef } from "react";
import bg from "../images/g2.png";
import { DataContext } from "../../context/DataContext";
import { BsThreeDotsVertical, BsFillClipboardFill } from "react-icons/bs";
// import { MdOutlineContentCopy } from "react-icons/md";

export default function ChatPage() {
  let [messages, setMessages] = useState([]);
  let [names, setNames] = useState([]);
  let [showInfo, setShowInfo] = useState(false);
  let [showMenu, setShowMenu] = useState(false);
  let [direction, setDirection] = useState(0);
  let [limit, setLimit] = useState(1000);
  const [showClipBoard, setShowClipBoard] = useState(false);
  let { fileContent, fileName } = useContext(DataContext);

  let prvDate = useRef(null);

  useEffect(() => { }, []);

  useEffect(() => {
    if (fileContent.length == 0) return;
    const mssgs = getMessages(fileContent, fileName);
    console.log(mssgs);
    setMessages(mssgs);
    let set = new Set(mssgs.slice(0, 8).map((item) => item.name));
    console.log(set);
    setNames(Array.from(set));
  }, [fileContent]);

  function Chat({ chat, ind }) {

    const mssgRef = useRef();
    return (
      <div
        className={
          "chat-block " + (chat.name == names[direction] ? "p1" : "p2")
        }
        onTouchStart={() => {
          if (limit - ind < 500 && limit < messages.length)
            setLimit((prv) => Math.min(prv + 500, messages.length));
        }}
        onMouseOverCapture={() => {
          if (limit - ind < 500 && limit < messages.length)
            setLimit((prv) => Math.min(prv + 500, messages.length));
        }}
      >
        {showClipBoard &&
          <BsFillClipboardFill className="copy-icon" onClick={() => {
            console.log(mssgRef.current);
            console.log(navigator.clipboard);
            navigator.clipboard.writeText(chat.mssg);
          }} />
        }
        <div className="chat">
          {chat.file &&
            <p className="img"></p>
          }

          <p className="mssg" ref={mssgRef}>{chat.mssg}</p>
          <div className="time">{chat.time}</div>
        </div>
      </div>
    );
  }

  const Menu = (
    <div className="menu">
      <div
        className="menu-item"
        onClick={() => {
          setShowInfo((prv) => !prv);
          setShowMenu(false);
        }}
      >
        {showInfo ? "Hide" : "Show"} Info
      </div>
      <div
        className="menu-item"
        onClick={() => {
          setDirection((prv) => (prv == 0 ? 1 : 0));
          setShowMenu(false);
        }}
      >
        Swap
      </div>
      <div
        className="menu-item"
        onClick={() => {
          setShowClipBoard(prv => !prv);
          setShowMenu(false);
        }}
      >
        {!showClipBoard ? "Show Clipboard" : "Hide ClipBoard"}
      </div>
    </div>
  );

  return (
    <div
      className="inner-body"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="menu-icon">
        <BsThreeDotsVertical onClick={() => setShowMenu((prv) => !prv)} />
        {showMenu && <div>{Menu} </div>}
      </div>
      {messages.length > 0 && showInfo && (
        <div className="about">
          <p className="info-item">
            messages count: <span className="info-cnt">{messages.length}</span>{" "}
          </p>
          <p className="row info-item">
            <span className="info-text">
              sent:
              <span className="info-cnt">
                {messages.filter((item) => item.name == names?.[0]).length}
              </span>
            </span>
            <span className="info-text">
              recived:
              <span className="info-cnt">
                {messages.filter((item) => item.name == names?.[1]).length}
              </span>
            </span>
          </p>

          <p className="row info-item">
            <span className="info-text">
              start: <span className="info-date"> {messages[0].date}</span>{" "}
            </span>
            <span>
              end:
              <span className="info-date">
                {messages[messages.length - 1].date}
              </span>
            </span>
          </p>
        </div>
      )}

      <div>
        {messages.slice(0, limit).map((chat, ind) => {
          let Date = null;
          if (prvDate.current != chat.date) {
            console.log("Date");
            Date = <p className="date">{chat.date}</p>;
            prvDate.current = chat.date;
          }

          return (
            <>
              <center>{Date}</center>
              <Chat chat={chat} key={chat.mssg + "xx" + ind} ind={ind} />
            </>
          );
        })}
      </div>
    </div>
  );
}

function getMessages(text, fileName) {
  const messages = text.split(
    /\n(?=\d\d?\/\d\d?\/\d\d\d?\d?, \d\d?:\d\d\s?(?:pm|am)? - )/
  );
  messages.splice(0, 1);
  // console.log(messages);

  return messages
    .map((message, index) => {
      const [timestamp, content] = message.split(" - ");
      const [date, time] = timestamp.split(", ");
      let [name, mssg] = content.split(":");
      let file;

      if (mssg && mssg.includes("(file attached)"))
        [file, mssg] = mssg.split("(file attached)");

      const obj = {
        date: date?.trim(),
        time: time?.trim(),
        name: name?.trim(),
        mssg: mssg?.trim(),
        file: file?.trim(),
      };
      // console.log(obj);  
      console.log(fileName)
      if (fileName.includes("Bosch Siemens")) {
        if (mssg && mssg?.trim()?.length == 16) return obj;
      }
      else if (mssg) return obj;
    })
    .filter((item) => item?.mssg);
}
