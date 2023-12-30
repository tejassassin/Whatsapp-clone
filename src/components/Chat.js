import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import "../styles/Chat.css";
import { Avatar } from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useParams } from "react-router-dom";
import { addMessage, getConversation } from "../service/api";

export default function Chat() {
  const { account, activeUsers, currentchat } = useContext(DataContext);
  const [input, setInput] = useState("");

  const [conversation, setConversation] = useState({});
  const [newMessage, setNewMessage] = useState(false);

  console.log(activeUsers);

  const getConverstaionDetails = async () => {
    let data = await getConversation({
      senderId: account.sub,
      receiverId: currentchat.sub,
    });
    setConversation(data);
  };

  useEffect(() => {
    getConverstaionDetails();
  }, [currentchat.sub, newMessage]);

  const sendMessage = async (e) => {
    console.log(e);
    const code = e.which;
    if (code == 13) {
      let messsage = {
        conversationId: conversation._id,
        type: "text",
        text: input,
        senderId: account.sub,
        receiverId: currentchat.sub,
      };
      console.log(messsage);
      await addMessage(messsage);

      setInput("");
      setNewMessage(!newMessage);
    }
  };

  const formatDate = (date) => {
    const newdate = new Date(date);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      newdate
    );

    return formattedTime;
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar className="chat_header_avatar" src={currentchat.picture} />
        <div className="chat_name">
          <h3>{currentchat.name}</h3>
          <p>
            {activeUsers?.find((user) => user.sub == currentchat.sub)
              ? "online"
              : "offline"}
          </p>
        </div>

        <CallOutlinedIcon className="phone" />
        <VideocamOutlinedIcon className="video" />
        <SearchIcon className="search" />
      </div>

      <div className="chat_body">
        {conversation &&
          conversation?.messages?.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.senderId == account.sub
                    ? "chat_message chat_sent"
                    : "chat_message"
                }
              >
                {message.text}
                <span>{formatDate(message?.timestamp)}</span>
              </div>
            );
          })}
      </div>

      <div className="chat_footer">
        <EmojiEmotionsOutlinedIcon />
        <AttachFileOutlinedIcon />
        <input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => sendMessage(e)}
        ></input>
        <SendOutlinedIcon />
      </div>
    </div>
  );
}
