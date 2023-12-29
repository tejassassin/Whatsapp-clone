import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { Avatar } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebarchat({ newchatlist }) {
  const [dropdownindex, setDropdownindex] = useState(-1);
  const { reveal, chatlist, setChatlist, setCurrentchat } =
    useContext(DataContext);

    console.log(newchatlist)
  const handleDropdown = (index, event) => {
    event.stopPropagation();
    if (index == dropdownindex) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const handleArchive = (index, event) => {
    event.stopPropagation();

    let changedlist = chatlist.map((chat, chatindex) => {
      if (chatindex == index) {
        return { ...chat, archived: true };
      }

      return chat;
    });

    setChatlist(changedlist);
    console.log(changedlist)
  };

  return (
    <div>
      {
        newchatlist &&
        newchatlist?.map((chat, index) => {
          if (reveal == chat.archived)
            return (
              <div className="sidebar_container" key={index}>
                <div
                  className="sidebar_chat"
                  onClick={() => setCurrentchat(chat)}
                >
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
                  style={{ display: dropdownindex == index ? "block" : "none" }}
                >
                  <div
                    className="dropdown_item"
                    onClick={(event) => handleArchive(index, event)}
                  >
                    Archive chat
                  </div>
                  <div className="dropdown_item">Delete chat</div>
                </div>
              </div>
            );
        })}
    </div>
  );
}
