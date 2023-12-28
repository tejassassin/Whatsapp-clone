import { Avatar } from "@mui/material";
import React, { useContext, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DataContext } from "../context/DataProvider";

export default function Sidebarchat({ newchatlist }) {
  const { chatlist, setCurrentchat } = useContext(DataContext);


  const [dropdown, setDropdown] = useState(false);

  console.log(newchatlist);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div>
      {newchatlist &&
        newchatlist?.map((user, index) => {
          return (
            <div className="sidebar_container" key={index}>
              <div
                className="sidebar_chat"
                onClick={() => setCurrentchat(user)}
              >
                <Avatar className="sidebar_header_avatar" src={user.pic} />
                <div className="sidebar_chat_info">
                  <h3>{user.name}</h3>
                  <p>{user.messages[user.messages.length - 1].content}</p>
                  <span>{user.messages[user.messages.length - 1].time}</span>
                  <KeyboardArrowDownIcon
                    className="down_arrow"
                    onClick={handleDropdown}
                  />
                </div>
              </div>
              <div
                className="dropdown_content"
                style={{ display: dropdown ? "block" : "none" }}
              >
                <div>Link 1</div>
                <div>Link 2</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
