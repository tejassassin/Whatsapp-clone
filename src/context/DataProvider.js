import { createContext, useState } from "react";

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const [currentchat, setCurrentchat] = useState({});
  const [reveal, setReveal] = useState(false);

  const [account, setAccount] = useState(null);

  const [chatlist, setChatlist] = useState([
    {
      name: "Teja Mallela",
      archived: false,
      pic: "https://mui.com/static/images/avatar/2.jpg",
      messages: [
        {
          content: "Hi Teja.",
          time: "4:40 PM",
          sent: true,
        },
        {
          content: "Hi, how are you.",
          time: "4:41 PM",
          sent: false,
        },
      ],
    },
    {
      name: "Shravya Gopala",
      archived: false,
      pic: "https://i.pinimg.com/564x/3e/fd/7b/3efd7b3dbe7dbc36b0cd692d21665202.jpg",
      messages: [
        {
          content: "hello shravya",
          time: "4:44 PM",
          sent: true,
        },
        {
          content: "Hi, how are you",
          time: "4:41 PM",
          sent: false,
        },
      ],
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        chatlist,
        setChatlist,
        currentchat,
        setCurrentchat,
        reveal,
        setReveal,
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
