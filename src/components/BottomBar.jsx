import React from "react";
import "./home.scss";
import { BiSolidMessageDetail, BiSolidMessageAdd } from "react-icons/bi";
import { TbMessagePlus } from "react-icons/tb";
import { MdOutlinePhone, MdOutlinePeopleAlt } from "react-icons/md";
export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="icons">
        <div className="icon-block icon-selected">
          <div className="icon-outer">
            <BiSolidMessageDetail className="icon-inner" />
          </div>
          <div className="icon-label">chats</div>
        </div>

        <div className="icon-block">
          <div className="icon-outer">
            <TbMessagePlus className="icon-inner" />
          </div>
          <div className="icon-label">Updates</div>
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
