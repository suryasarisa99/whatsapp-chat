import { useContext, useEffect, useState } from "react";
import gray from "./images/gray.jpg";
import { DataContext } from "../context/DataContext";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import { Routes, Route } from "react-router-dom";
import "./index.scss";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
