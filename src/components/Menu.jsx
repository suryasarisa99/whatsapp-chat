import { useContext, useState, useRef } from "react";

import React from "react";
import { ChatContext } from "../../context/ChatData";

export default function Menu() {
  const {
    setShowClipBoard,
    setShowInfo,
    setShowMenu,
    setDirection,
    showInfo,
    showClipBoard,
  } = useContext(ChatContext);
  return (
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
          setShowClipBoard((prv) => !prv);
          setShowMenu(false);
        }}
      >
        {!showClipBoard ? "Show Clipboard" : "Hide ClipBoard"}
      </div>
    </div>
  );
}
