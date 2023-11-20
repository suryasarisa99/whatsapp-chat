import { useContext, useState } from "react";
import "./topbar.scss";
import { useNavigate } from "react-router-dom";
import DP from "./blank-profile-picture-973460_1280.png";
import { BsArrowLeft } from "react-icons/bs";
import { FaEllipsisV, FaSave, FaArrowLeft, FaSearch } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../../context/ChatData";
import Menu from "./Menu";
import { DataContext } from "../../context/DataContext";
import SearchBar from "./SeachBar";
import { useScroll } from "framer-motion";
export default function TopBar() {
  const {
    names,
    direction,
    showMenu,
    setShowMenu,
    messages,
    fileName,
    query,
    setQuery,
  } = useContext(ChatContext);
  const { setChats, chats } = useContext(DataContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  function save() {
    const chat = {
      messages: messages,
      fileName: fileName,
      names: names,
      lastMssg: messages[messages.length - 1].mssg,
      time: messages[messages.length - 1].time,
      key: uuid(),
    };
    chats.push(chat);
    setChats([...chats]);
    localStorage.setItem("chats", JSON.stringify(chats));
  }
  return (
    <div className="top-bar">
      {!showSearchBar ? (
        <>
          <div className="back-icon" onClick={() => navigate(-1)}>
            <BsArrowLeft />
          </div>
          <img src={DP} className="dp" alt="" />
          <div className="title">{names[direction == 1 ? 0 : 1]}</div>

          <div className="icons">
            <div
              className="save-icon icon"
              onClick={() => setShowSearchBar(true)}
            >
              <FaSearch />
            </div>
            <div className="save-icon icon" onClick={save}>
              <FaSave />
            </div>
            <div className="menu-icon icon" onClick={() => setShowMenu(true)}>
              <FaEllipsisV />
            </div>
          </div>
        </>
      ) : (
        <SearchBar closeSearchBar={() => setShowSearchBar(false)} />
      )}
      {showMenu && !showSearchBar && <Menu />}
    </div>
  );
}
