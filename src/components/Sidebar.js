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
  const { account, chatlist, reveal, setReveal } = useContext(DataContext);

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

  const chatgpt = {
    name: "ChatGPT",
    picture:
      "https://res.cloudinary.com/teepublic/image/private/s--_alHJqwv--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1678453754/production/designs/40790801_0.jpg",
  };

  return (
    <div className="Sidebar">
      <div className="sidebar_header">
        <Avatar className="sidebar_header_avatar" src={account?.picture} />
        <p className="sidebar_header_name">{account?.name}</p>
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
        {/* <div className="archived_number">{getNoOfArchivedChats()}</div> */}
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

        {newchatlist &&
          newchatlist?.map((user, index) => {
            if (account.sub !== user.sub)
              return <Sidebarchat key={index} newchatlist={newchatlist} />;
          })}
      </div>

      <div className="sidebar_chat_list">
        <Sidebarchat user={chatgpt} index={-10000} />
        {newchatlist &&
          newchatlist?.map((user, index) => {
            if (account.sub !== user.sub)
              return <Sidebarchat key={index} user={user} index={index} />;
          })}
      </div>
    </div>
  );
}
