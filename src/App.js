import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="chat_container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
