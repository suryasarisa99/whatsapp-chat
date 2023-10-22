import React from "react";
import "./home.scss";
import { BiSolidMessageDetail, BiSolidMessageAdd } from "react-icons/bi";
import { TbMessagePlus } from "react-icons/tb";
import { MdOutlinePhone, MdOutlinePeopleAlt } from "react-icons/md";
import { LuPaintbrush } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
export default function BottomBar() {
  const navigate = useNavigate();
  return (
    <div className="bottom-bar">
      <div className="icons">
        <div className="icon-block icon-selected">
          <div className="icon-outer">
            <BiSolidMessageDetail className="icon-inner" />
          </div>
          <div className="icon-label">chats</div>
        </div>

        <div
          className="icon-block"
          onClick={() => {
            navigate("/themes");
          }}
        >
          <div className="icon-outer">
            {/* <TbMessagePlus className="icon-inner" /> */}
            <LuPaintbrush className="icon-inner" />
          </div>
          <div className="icon-label">Themes</div>
        </div>

        <div className="icon-block">
          <div className="icon-outer">
            <MdOutlinePeopleAlt className="icon-inner" />
          </div>
          <div className="icon-label">Communities</div>
        </div>

        <div className="icon-block">
          <div className="icon-outer">
            <MdOutlinePhone className="icon-inner" />
          </div>
          <div className="icon-label">Calls</div>
        </div>
      </div>
    </div>
  );
}
