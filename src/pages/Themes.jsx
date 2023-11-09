import { useContext } from "react";
import "./themes.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatData";
import { DataContext } from "../../context/DataContext";

import BottomBar from "../components/BottomBar";
import HomeTopBar from "../components/HomeTopBar";
export default function Themes() {
  const navigate = useNavigate();
  const themes = ["default", "gray", "blue", "red", "light-green"];
  const { changeStatusBarColor, setDefaultTheme } = useContext(DataContext);

  return (
    <div className="themes-page">
      <HomeTopBar />
      <div className="themes">
        {themes.map((theme, ind) => (
          <div
            className={"theme-box " + theme}
            key={theme + ind}
            onClick={() => {
              if (ind == 0) setDefaultTheme(true);
              else setDefaultTheme(false);
              document.documentElement.className = "";
              document.documentElement.classList.add(themes[ind]);
              localStorage.setItem("theme", themes[ind]);
              changeStatusBarColor(themes[ind]);
              navigate(-1);
            }}
          >
            {theme}
          </div>
        ))}
      </div>

      <BottomBar />
    </div>
  );
}
