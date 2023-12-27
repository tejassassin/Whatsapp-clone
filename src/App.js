import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Sidebar_and_chat = ({ chatlist }) => {
    return (
      <>
        <Sidebar />
        <Chat />
      </>
    );
  };

  return (
    <div className="App">
      <div className="chat_container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/chat/:id" element={<Sidebar_and_chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
