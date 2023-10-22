import { useEffect, useState } from "react";
import "./home.scss";
import { BiSolidMessageDetail, BiSolidMessageAdd } from "react-icons/bi";
import { TbMessagePlus } from "react-icons/tb";
import { MdOutlinePhone, MdOutlinePeopleAlt } from "react-icons/md";
import { LuPaintbrush } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <div className="bottom-bar">
      <div className="icons">
        <div
          className={
            "icon-block " + (location.pathname == "/" ? "icon-selected" : "")
          }
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="icon-outer">
            <BiSolidMessageDetail className="icon-inner" />
          </div>
          <div className="icon-label">chats</div>
        </div>

        <div
          className={
            "icon-block " +
            (location.pathname == "/themes" ? "icon-selected" : "")
          }
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
