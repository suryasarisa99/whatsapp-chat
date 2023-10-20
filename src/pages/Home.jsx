import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { chat1 } from "../data1";
import { chat2 } from "../data2";
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
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileUpload}
        accept=".txt"
      />
      <br />
      <button
        className=""
        onClick={(e) => {
          inputRef.current.click();
        }}
      >
        Select File
      </button>
      {/* <p>{fileName}</p> */}
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
      </button>
    </div>
  );
}
