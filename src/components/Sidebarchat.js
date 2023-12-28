import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";

import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebarchat({ newchatlist, setNewchatlist }) {
  const [dropdownindex, setDropdownindex] = useState(-1);

  const { reveal, chatlist, setChatlist, setCurrentchat } =
    useContext(DataContext);

  const handleCurrentchat = (chat) => {
    setCurrentchat(chat);
  };

  const handleDropdown = (index, event) => {
    event.stopPropagation();
    if (index == dropdownindex) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const deleteChat = (index, event) => {
    event.stopPropagation();
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

  const handleArchive = (index, reveal, event) => {
    event.stopPropagation();

    if (reveal) {
      if (index == newchatlist.length - 1) {
        setCurrentchat(newchatlist[0]);
      } else {
        setCurrentchat(newchatlist[index + 1]);
      }
      let newlist = chatlist.map((chat, chatindex) => {
        if (index == chatindex) {
          return { ...chat, archived: false };
        }
        return chat;
      });

      setChatlist(newlist);
    } else {
      if (index == newchatlist.length - 1) {
        setCurrentchat(newchatlist[0]);
      } else {
        setCurrentchat(newchatlist[index + 1]);
      }
      let newlist = chatlist.map((chat, chatindex) => {
        if (index == chatindex) {
          return { ...chat, archived: true };
        }
        return chat;
      });

      setChatlist(newlist);
    }
  };

  return (
    <div>
      {chatlist &&
        newchatlist &&
        newchatlist?.map((chat, index) => {
          if (chat.archived == reveal) {
            return (
              <div
                className="sidebar_container"
                key={index}
                onClick={() => handleCurrentchat(chat)}
              >
                <div className="sidebar_chat">
                  <Avatar className="sidebar_header_avatar" src={chat.pic} />
                  <div className="sidebar_chat_info">
                    <h3>{chat.name}</h3>
                    <p>{chat.messages[chat.messages.length - 1].content}</p>
                    <span>{chat.messages[chat.messages.length - 1].time}</span>
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
        })}
    </div>
  );
}
