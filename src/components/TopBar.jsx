import { useContext } from "react";
import "./topbar.scss";
import { useNavigate } from "react-router-dom";
import DP from "./blank-profile-picture-973460_1280.png";
import { BsArrowLeft } from "react-icons/bs";
import { FaEllipsisV, FaSave } from "react-icons/fa";

import { ChatContext } from "../../context/ChatData";
import Menu from "./Menu";
import { DataContext } from "../../context/DataContext";
export default function TopBar() {
  const { names, direction, showMenu, setShowMenu, messages, fileName } =
    useContext(ChatContext);
  const { setChats, chats } = useContext(DataContext);
  const navigate = useNavigate();

  function save() {
    const chat = {
      messages: messages,
      fileName: fileName,
      names: names,
      lastMssg: messages[messages.length - 1].mssg,
      time: messages[messages.length - 1].time,
    };
    chats.push(chat);
    setChats([...chats]);
    localStorage.setItem("chats", JSON.stringify(chats));
  }
  return (
    <div className="top-bar">
      <div className="back-icon" onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </div>
      <img src={DP} className="dp" alt="" />
      <div className="title">{names[direction == 1 ? 0 : 1]}</div>

      <div className="icons" onClick={save}>
        <div className="save-icon icon">
          <FaSave />
        </div>
        <div className="menu-icon icon" onClick={() => setShowMenu(true)}>
          <FaEllipsisV />
        </div>
      </div>

      {showMenu && <Menu />}
    </div>
  );
}
