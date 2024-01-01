import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";

import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getConversation, setConversation } from "../service/api.js";
import "../styles/sidechat.css";
import { formatDate } from "../utils/Utils.js";

export default function SideChat({ newchatlist, chat, index }) {
  const [dropdownindex, setDropdownindex] = useState(-1);

  const [lastMessage, setLastMessage] = useState(null);

  const {
    reveal,
    chatlist,
    setChatlist,
    account,
    setCurrentchat,
    newMessage,
    incomingMessage,
  } = useContext(DataContext);

  const handleDropdown = (index, event) => {
    event.stopPropagation();
    if (index == dropdownindex) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const deleteChat = (index, event) => {
    let newlist = [...chatlist];
    newlist.splice(index, 1);
    setChatlist(newlist);
    setDropdownindex(-1);
    if (index == newchatlist.length - 1) {
      setCurrentchat(newchatlist[0]);
    } else {
      setCurrentchat(newchatlist[index + 1]);
    }
  };

  const handleCurrentchat = async (chat) => {
    setCurrentchat(chat);
    await setConversation({ senderId: account.sub, receiverId: chat.sub });
  };

  const handleArchive = (index, reveal, event) => {
    if (reveal) {
      let newlist = chatlist.map((chat, chatindex) => {
        if (index == chatindex) {
          return { ...chat, archived: false };
        }
        return chat;
      });

      setChatlist(newlist);
    } else {
      let newlist = chatlist.map((chat, chatindex) => {
        if (index == chatindex) {
          return { ...chat, archived: true };
        }
        return chat;
      });

      setChatlist(newlist);
    }
  };

  useEffect(() => {
    const getConverstaionDetails = async (chat) => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: chat.sub,
      });

      setLastMessage(data?.messages[data?.messages.length - 1]);
    };

    getConverstaionDetails(chat);
  }, [newMessage, incomingMessage]);
  return (
    <div
      className="sidebar_container"
      key={index}
      onClick={() => handleCurrentchat(chat)}
    >
      <div className="sidebar_chat">
        <Avatar className="sidebar_header_avatar" src={chat?.picture} />
        <div className="sidebar_chat_info">
          <h3>{chat?.name}</h3>
          {lastMessage ? (
            <p className="truncate-text">{lastMessage?.text}</p>
          ) : (
            <p className="default_message">"Say hi..."</p>
          )}

          {lastMessage ? <span>{formatDate(lastMessage)}</span> : <span></span>}

          <KeyboardArrowDownIcon
            className="down_arrow"
            onClick={(event) => handleDropdown(index, event)}
          />
        </div>
      </div>
      <div
        className="dropdown_content"
        style={{
          display: dropdownindex == index ? "block" : "none",
        }}
      >
        {reveal ? (
          <div
            className="dropdown_item"
            onClick={(event) => handleArchive(index, reveal, event)}
          >
            Unarchive Chat
          </div>
        ) : (
          <div
            className="dropdown_item"
            onClick={(event) => handleArchive(index, reveal, event)}
          >
            Archive Chat
          </div>
        )}
        <div
          className="dropdown_item"
          onClick={(event) => deleteChat(index, event)}
        >
          Delete Chat
        </div>
      </div>
    </div>
  );
}
