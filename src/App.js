import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [chatlist, setChatlist] = useState([
    {
      name: "Teja Mallela",
      pic: "https://mui.com/static/images/avatar/2.jpg",
      messages: [
        {
          content: "Hi Teja.",
          time: "4:40 PM",
          sent: true,
        },
        {
          content: "Hi, how are you.",
          time: "4:41 PM",
          sent: false,
        },
      ],
    },
    {
      name: "Shravya Gopala",
      pic: "https://i.pinimg.com/564x/3e/fd/7b/3efd7b3dbe7dbc36b0cd692d21665202.jpg",
      messages: [
        {
          content: "hello shravya",
          time: "4:44 PM",
          sent: true,
        },
        {
          content: "Hi, how are you",
          time: "4:41 PM",
          sent: false,
        },
      ],
    },
  ]);

  const Sidebar_and_chat = ({ chatlist }) => {
    return (
      <>
        <Sidebar chatlist={chatlist} />
        <Chat chatlist={chatlist} />
      </>
    );
  };

  return (
    <div className="App">
      <div className="chat_container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Sidebar chatlist={chatlist} />} />
            <Route
              path="/chat/:id"
              element={<Sidebar_and_chat chatlist={chatlist} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
