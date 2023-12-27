import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";

import { Avatar } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebarchat({ newchatlist, reveal }) {
  const [dropdownindex, setDropdownindex] = useState(-1);

  const {
    chatlist,
    setChatlist,
    setCurrentchat,
    archivedchatlist,
    setArchivedChatlist,
  } = useContext(DataContext);

  const handleDropdown = (index, event) => {
    event.stopPropagation();
    if (index == dropdownindex) {
      setDropdownindex(-1);
    } else {
      setDropdownindex(index);
    }
  };

  const handleArchive = (index, reveal) => {
    if (reveal) {
      if (index == newchatlist.length - 1) {
        setCurrentchat(newchatlist[0]);
      } else {
        setCurrentchat(newchatlist[index + 1]);
      }

      setChatlist([...chatlist, newchatlist[index]]);
      let deletedchatlist = archivedchatlist;
      deletedchatlist.splice(index, 1);
      setArchivedChatlist(deletedchatlist);
      
    } else {
      if (index == newchatlist.length - 1) {
        setCurrentchat(newchatlist[0]);
      } else {
        setCurrentchat(newchatlist[index + 1]);
      }

      setArchivedChatlist([...archivedchatlist, newchatlist[index]]);
      let deletedchatlist = chatlist;
      deletedchatlist.splice(index, 1);
      setChatlist(deletedchatlist);
    }
  };

  return (
    <div>
      {newchatlist &&
        newchatlist?.map((chat, index) => {
          return (
            <div
              className="sidebar_container"
              key={index}
              // onClick={() => setCurrentchat(chat)}
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
                style={{ display: dropdownindex == index ? "block" : "none" }}
              >
                {reveal ? (
                  <div
                    className="dropdown_item"
                    onClick={() => handleArchive(index, reveal)}
                  >
                    Unarchive Chat
                  </div>
                ) : (
                  <div
                    className="dropdown_item"
                    onClick={() => handleArchive(index, reveal)}
                  >
                    Archive Chat
                  </div>
                )}
                <div className="dropdown_item">Delete Chat</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
