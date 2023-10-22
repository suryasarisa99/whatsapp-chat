import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import DataProvider from "../context/DataContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import ChatProvider from "../context/ChatData.jsx";
registerSW();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
