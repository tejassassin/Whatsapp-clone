import { useContext, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DataContext } from "./context/DataProvider";

function App() {
  const { account, currentchat } = useContext(DataContext);

  const Sidebar_and_chat = () => {
    return (
      <>
        <Sidebar />
        {currentchat && <Chat />}
      </>
    );
  };

  const clientId =
    "777885541443-spdhogpaav2i0l563j05qrgll2jkdppj.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <div className="chat_container">
          {account ? <Sidebar_and_chat /> : <Login />}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
