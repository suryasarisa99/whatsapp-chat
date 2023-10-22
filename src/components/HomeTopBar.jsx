import React from "react";
import { AiOutlineCamera, AiOutlineSearch } from "react-icons/ai";
export default function HomeTopBar() {
  return (
    <div className="home-top-bar">
      <div className="title">WhatsApp</div>
      <div className="icons">
        <AiOutlineCamera />
        <AiOutlineSearch />
      </div>
    </div>
  );
}
