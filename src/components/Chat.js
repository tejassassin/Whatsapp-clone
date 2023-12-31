import React, { useContext, useEffect, useRef, useState } from "react";
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
import { formatDate } from "../utils/Utils";

import default_chat from "../images/default_chat.png";

export default function Chat({ activeUsers }) {
  const {
    socket,
    account,
    currentchat,
    newMessage,
    setNewMessage,
    incomingMessage,
    setIncomingMessage,
  } = useContext(DataContext);

  const [input, setInput] = useState("");

  const [conversation, setConversation] = useState({});

  const scrollRef = useRef();

  const getConverstaionDetails = async () => {
    let data = await getConversation({
      senderId: account.sub,
      receiverId: currentchat.sub,
    });
    setConversation(data);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [conversation]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setIncomingMessage(data);
    });
  }, []);

  useEffect(() => {
    if (incomingMessage && conversation && conversation?.messages) {
      setConversation({
        ...conversation,
        messages: [...conversation?.messages, incomingMessage],
      });
    }
  }, [incomingMessage]);

  useEffect(() => {
    getConverstaionDetails();
  }, [currentchat.sub, newMessage]);

  const sendMessage = async (e) => {
    const code = e.which;
    if (code == 13 && input.trim()) {
      let message = {
        conversationId: conversation._id,
        type: "text",
        text: input,
        senderId: account.sub,
        receiverId: currentchat.sub,
        timestamp: new Date(),
      };
      console.log(message);

      socket.emit("sendMessage", message);
      await addMessage(message);

      setInput("");
      setNewMessage(!newMessage);
    }
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
            if (message) {
              return (
                <div
                  ref={scrollRef}
                  key={index}
                  className={
                    message?.senderId == account.sub
                      ? "chat_message chat_sent"
                      : "chat_message"
                  }
                >
                  {message?.text}
                  <span>{formatDate(message)}</span>
                </div>
              );
            }
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
