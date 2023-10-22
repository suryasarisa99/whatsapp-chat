import { useContext } from "react";
import "./themes.scss";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatData";
import { DataContext } from "../../context/DataContext";
export default function Themes() {
  const navigate = useNavigate();
  const themes = ["default", "gray"];
  const { changeStatusBarColor } = useContext(DataContext);

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
              changeStatusBarColor(themes[ind]);
              navigate(-1);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
