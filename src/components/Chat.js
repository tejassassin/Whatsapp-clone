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

export default function Chat() {
  const { currentchat } = useContext(DataContext);

  return (
    <div className="Chat">
      <div className="chat_header">
        <Avatar className="chat_header_avatar" src={currentchat.pic} />
        <div className="chat_name">
          <h3>{currentchat.name}</h3>
          <p>online</p>
        </div>

        <CallOutlinedIcon className="phone" />
        <VideocamOutlinedIcon className="video" />
        <SearchIcon className="search" />
      </div>

      <div className="chat_body">
        {currentchat?.messages?.map((message, index) => {
          return (
            <div
              key={index}
              className={
                message.sent ? "chat_message chat_sent" : "chat_message"
              }
            >
              {message.content}
              <span>{message.time}</span>
            </div>
          );
        })}
      </div>

      <div className="chat_footer">
        <EmojiEmotionsOutlinedIcon />
        <AttachFileOutlinedIcon />
        <input placeholder="Type a message"></input>
        <SendOutlinedIcon />
      </div>
    </div>
  );
}
