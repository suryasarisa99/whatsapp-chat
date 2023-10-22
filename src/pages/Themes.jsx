import React from "react";

import "./themes.scss";
import { useNavigate } from "react-router-dom";
export default function Themes() {
  const navigate = useNavigate();
  const themes = ["default", "gray"];

  const handleChangeBackgroundColor = () => {
    // Update the manifest file
    const manifest = {
      ...window.navigator.serviceWorker.manifest,
      background_color: "#181c21",
      theme_color: "#181c21",
    };

    window.navigator.serviceWorker.register(manifest);
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
              handleChangeBackgroundColor();
              navigate(-1);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
