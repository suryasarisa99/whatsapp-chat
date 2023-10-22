import React from "react";

import "./themes.scss";
import { useNavigate } from "react-router-dom";
export default function Themes() {
  const navigate = useNavigate();
  const themes = ["default", "gray"];
  return (
    <div className="themes-page">
      <div className="themes">
        {themes.map((theme, ind) => (
          <div
            className="theme-box"
            key={theme + ind}
            onClick={() => {
              document.documentElement.className = "";
              document.documentElement.classList.add(themes[ind]);
              localStorage.setItem("theme", themes[ind]);
              navigate(-1);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
