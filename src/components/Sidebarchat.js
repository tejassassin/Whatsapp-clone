import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DataContext } from "../context/DataProvider";

export default function Sidebarchat({ newchatlist, reveal }) {
  const { chatlist, setChatlist, setCurrentchat } = useContext(DataContext);

  const [dropdownindex, setDropdownindex] = useState(-1);

  console.log(newchatlist);

  const handleDropdown = (index) => {
    if (dropdownindex == -1) {
      setDropdownindex(index);
    } else if (dropdownindex == index) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const handleArchive = (index) => {
    let changedlist = chatlist.map((chat, chatindex) => {
      if (chatindex == index) {
        return { ...chat, archived: true };
      }

      return chat;
    });

    setChatlist(changedlist);
  };

  return (
    <div>
      {newchatlist &&
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
                      onClick={() => handleDropdown(index)}
                    />
                  </div>
                </div>
                <div
                  className="dropdown_content"
                  style={{ display: dropdownindex == index ? "block" : "none" }}
                >
                  <div
                    className="dropdown_item"
                    onClick={() => handleArchive(index)}
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
