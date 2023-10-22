import { useContext, useEffect, useState } from "react";
import gray from "./images/gray.jpg";
import { DataContext } from "../context/DataContext";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import "./index.scss";
import { ChatContext } from "../context/ChatData";
import BottomBar from "./components/BottomBar";
import { BiSolidMessageAdd } from "react-icons/bi";
function App() {
  return (
    // <ChatContext>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>

      {/* <BottomBar /> */}
    </div>
    // </ChatContext>
  );
}

export default App;
