import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";

import "../styles/Sidebar.css";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";

import SearchIcon from "@mui/icons-material/Search";

import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Sidebarchat from "./Sidebarchat";

export default function Sidebar() {
  const { reveal, setReveal, chatlist } =
    useContext(DataContext);

  const [seachvalue, setSeachvalue] = useState("");

  const [newchatlist, setNewchatlist] = useState(chatlist);


  const handleReveal = () => {
    setReveal(!reveal);
  };

  const handleChange = (e) => {
    setSeachvalue(e.target.value);

    let newlist = chatlist.filter(
      (chat) =>
        chat.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );

    newlist = newlist.filter((chat) => chat.archived == reveal);

    setNewchatlist(newlist);
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
        <div className="archived_number">
          {chatlist.filter((chat) => chat["archived"]).length}
        </div>
      </div>

      <div
        className={`sidebar_archived_section ${reveal ? "revealed" : "hidden"}`}
      >
        <div className="sidebar_archived_section_header">
          <ArrowBackIcon onClick={handleReveal} className="back" />
          <p>Archived</p>
        </div>
        <Sidebarchat
          newchatlist={newchatlist}
          setNewchatlist={setNewchatlist}
        />
      </div>

      <div className="sidebar_chat_list">
        <Sidebarchat
          newchatlist={newchatlist}
          setNewchatlist={setNewchatlist}
        />
      </div>
    </div>
  );
}
