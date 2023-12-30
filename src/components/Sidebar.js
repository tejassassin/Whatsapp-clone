import React, { useContext, useState } from "react";
import "../styles/Sidebar.css";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";

import SearchIcon from "@mui/icons-material/Search";

import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Sidebarchat from "./Sidebarchat";
import { DataContext } from "../context/DataProvider";

export default function Sidebar() {
  const { chatlist, reveal, setReveal } = useContext(DataContext);

  console.log(chatlist, "chatlist");
  const handleReveal = () => {
    setReveal(!reveal);
  };

  const [seachvalue, setSeachvalue] = useState("");
  const [newchatlist, setNewchatlist] = useState(chatlist);

  const handleChange = (e) => {
    setSeachvalue(e.target.value);
    console.log();

    let newlist = chatlist.filter(
      (chat) =>
        chat.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );

    setNewchatlist(newlist);
    console.log(newchatlist);
  };

  const getNoOfArchivedChats = () => {
    let number = 0;

    chatlist.map((chat, index) => {
      if (chat.archived == true) {
        number = number + 1;
      }
    });

    return number;
  };

  return (
    <div className="Sidebar">
      <div className="sidebar_header">
        <Avatar
          className="sidebar_header_avatar"
          src="https://mui.com/static/images/avatar/2.jpg"
        />
        <h5>Chats</h5>
        <BorderColorIcon className="sidebar_icons edit" />
        <MoreHorizIcon className="sidebar_icons more" />
      </div>

      <div className="sidebar_search">
        <input
          placeholder="Search or start a new chat"
          value={seachvalue}
          onChange={(e) => handleChange(e)}
        ></input>
        <SearchIcon />
      </div>

      <div className="sidebar_archived" onClick={handleReveal}>
        <BusinessCenterOutlinedIcon className="archived" />
        Archived
        <div className="archived_number">{getNoOfArchivedChats()}</div>
      </div>

      <div
        className="sidebar_archived_section"
        style={{
          marginLeft: reveal ? "0%" : "-140%",
          opacity: reveal ? "1" : "0",
        }}
      >
        <div className="sidebar_archived_section_header">
          <ArrowBackIcon onClick={handleReveal} className="back" />
          <p>Archived</p>
        </div>
        <Sidebarchat newchatlist={newchatlist} />
      </div>

      <div className="sidebar_chat_list">
        <Sidebarchat newchatlist={newchatlist} />
      </div>
    </div>
  );
}
