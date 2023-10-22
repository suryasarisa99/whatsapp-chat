import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { chat1 } from "../data1";
import { chat2 } from "../data2";
import BottomBar from "../components/BottomBar";
import HomeTopBar from "../components/HomeTopBar";
import { BiSolidMessageAdd } from "react-icons/bi";
import Dp from "../components/blank-profile-picture-973460_1280.png";
export default function Home() {
  const { setFileContent, fileName, setFileName } = useContext(DataContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFileName(file?.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      if (file.name.toLowerCase().includes("teju"))
        localStorage.setItem("teju", JSON.stringify(content));
      navigate("/chat");
    };
    reader.readAsText(file);
  };

  return (
    <div className="home">
      <HomeTopBar />
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileUpload}
        accept=".txt"
      />

      <div className="home-chats">
        <div
          className="chat-item"
          onClick={() => {
            setFileContent(chat2);
            navigate("/chat");
          }}
        >
          <img src={Dp} />
          <div className="people">
            <div className="sender">Vijay Btech</div>
            <div className="reciver">Tarun Kumar</div>
          </div>
        </div>
        <div
          className="chat-item"
          onClick={() => {
            setFileContent(chat2);
            navigate("/chat");
          }}
        >
          <img src={Dp} />
          <div className="people">
            <div className="sender">Barbie Girl</div>
            <div className="reciver">Anil Kumar</div>
          </div>
        </div>
      </div>

      <div
        className="float-btn-outer"
        onClick={(e) => {
          inputRef.current.click();
        }}
      >
        <BiSolidMessageAdd className="icon" />
      </div>

      <BottomBar />
    </div>
  );
}

{
  /* <button
className=""
onClick={(e) => {
  inputRef.current.click();
}}
>
Select File
</button>
<button
onClick={() => {
  setFileContent(chat1);
  navigate("/chat");
}}
>
Sample 1
</button>
<button
onClick={() => {
  setFileContent(chat2);
  navigate("/chat");
}}
>
Sample 2
</button> */
}
