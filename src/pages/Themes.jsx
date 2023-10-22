import React from "react";

import "./themes.scss";
import { useNavigate } from "react-router-dom";
export default function Themes() {
  const navigate = useNavigate();
  const themes = ["default", "gray"];

  const changeThemeColor = (color) => {
    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.content = color;
    }
  };
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
              // handleChangeBackgroundColor("");/
              changeThemeColor("#181c21");
              navigate(-1);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
