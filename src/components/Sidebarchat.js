import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";

import SideChat from "./SideChat.js";

export default function Sidebarchat({ newchatlist }) {
  const {
    reveal,
    chatlist,
    setChatlist,
    account,
    currentchat,
    setCurrentchat,
    newMessage,
    incomingMessage,
  } = useContext(DataContext);

  return (
    <div>
      {chatlist &&
        newchatlist &&
        newchatlist?.map((chat, index) => {
          if (chat.archived == reveal && account.sub != chat.sub) {
            return (
              <SideChat
                key={index}
                newchatlist={newchatlist}
                index={index}
                chat={chat}
              />
            );
          }
        })}
    </div>
  );
}
