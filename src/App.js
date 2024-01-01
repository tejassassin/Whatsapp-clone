import { useContext, useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DataContext } from "./context/DataProvider";
import { getUsers } from "./service/api";
import default_chat from "./images/default_chat.png";

function App() {
  const { socket, chatlist, setChatlist, account, currentchat } =
    useContext(DataContext);

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      setChatlist(response);
    };
    if (chatlist.length == 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (account && socket) {
      socket.emit("addUsers", account);

      socket.on("getUsers", (users) => {
        if (JSON.stringify(users) !== JSON.stringify(activeUsers)) {
          setActiveUsers(users);
        }
      });
    }
  }, [account, socket]);

  const Sidebar_and_chat = ({ activeUsers, setActiveUsers }) => {
    return (
      <>
        <Sidebar setActiveUsers={setActiveUsers} activeUsers={activeUsers} />
        {currentchat ? (
          <Chat activeUsers={activeUsers} />
          // <img src={default_chat} />
        ) : (
          <img src={default_chat} />
        )}
      </>
    );
  };

  const clientId =
    "777885541443-spdhogpaav2i0l563j05qrgll2jkdppj.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <div className="chat_container">
          {account ? (
            <Sidebar_and_chat
              activeUsers={activeUsers}
              setActiveUsers={setActiveUsers}
            />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
