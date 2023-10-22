import { useContext } from "react";
import "./topbar.scss";
import { useNavigate } from "react-router-dom";
import DP from "./blank-profile-picture-973460_1280.png";
import { BsArrowLeft } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { ChatContext } from "../../context/ChatData";
import Menu from "./Menu";
export default function TopBar() {
  const { names, direction, showMenu, setShowMenu } = useContext(ChatContext);
  const navigate = useNavigate();
  return (
    <div className="top-bar">
      <div className="back-icon" onClick={() => navigate(-1)}>
        <BsArrowLeft />
      </div>
      <img src={DP} className="dp" alt="" />
      <div className="title">{names[direction == 1 ? 0 : 1]}</div>

      <div className="icons">
        <div className="menu-icon" onClick={() => setShowMenu(true)}>
          <FaEllipsisV />
        </div>
      </div>

      {showMenu && <Menu />}
    </div>
  );
}
