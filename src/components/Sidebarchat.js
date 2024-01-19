import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { Avatar } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {  setConversation } from "../service/api";

export default function Sidebarchat({ user, index }) {
  const [dropdownindex, setDropdownindex] = useState(-1);

  const { reveal, chatlist, setChatlist, setCurrentchat, account } =
    useContext(DataContext);


  const handleDropdown = (index, event) => {
    event.stopPropagation();
    if (index == dropdownindex) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const addConversation = async (user) => {
    // console.log(user);

    setCurrentchat(user);
    // add conversation to database
    await setConversation({
      senderId: account.sub,
      receiverId: user.sub,
    });
  };

  const handleArchive = (index, event) => {
    let changedlist = chatlist.map((chat, chatindex) => {
      if (chatindex == index) {
        return { ...chat, archived: true };
      }

      return chat;
    });

    setChatlist(changedlist);
  };

  const handleUnArchive = (index, event) => {
    let changedlist = chatlist.map((chat, chatindex) => {
      if (chatindex == index) {
        return { ...chat, archived: false };
      }

      return chat;
    });

    setChatlist(changedlist);
  };

  return (
    <div>
      <div className="sidebar_container" key={index}>
        <div className="sidebar_chat" onClick={() => addConversation(user)}>
          <Avatar className="sidebar_header_avatar" src={user?.picture} />
          <div className="sidebar_chat_info">
            <h3>{user?.name}</h3>
            {/* <p>{chat.messages[chat.messages.length - 1].content}</p> */}
            {/* <span>{chat.messages[chat.messages.length - 1].time}</span> */}
            <KeyboardArrowDownIcon
              className="down_arrow"
              onClick={(event) => handleDropdown(index, event)}
            />
          </div>
        </div>
        <div
          className="dropdown_content"
          style={{ display: dropdownindex == index ? "block" : "none" }}
        >
          {reveal ? (
            <div
              className="dropdown_item"
              onClick={(event) => handleUnArchive(index, event)}
            >
              Unarchive chat
            </div>
          ) : (
            <div
              className="dropdown_item"
              onClick={(event) => handleArchive(index, event)}
            >
              Archive chat
            </div>
          )}

          <div className="dropdown_item">Delete chat</div>
        </div>
      </div>
    </div>
  );
}
