import { useContext, useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { DataContext } from "./context/DataProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import { getUser } from "./service/api";

function App() {
  const { account, setChatlist } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      let users = await getUser();
      setChatlist(users);
    };

    fetchData();
  }, []);

  const Sidebar_and_chat = () => {
    return (
      <>
        <Sidebar />
        <Chat />
      </>
    );
  };

  const clientId =
    "777885541443-spdhogpaav2i0l563j05qrgll2jkdppj.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId="1405942827-ppi1ccqh21fel5aaoobfq7emgh1r5ias.apps.googleusercontent.com">
      <div className="App">
        <div className="chat_container">
          {account ? <Sidebar_and_chat /> : <Login />}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
