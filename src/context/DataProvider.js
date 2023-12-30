import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [currentchat, setCurrentchat] = useState(null);

  const [reveal, setReveal] = useState(false);
  const [chatlist, setChatlist] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
  }, []);

  // const [chatlist, setChatlist] = useState([
  //   {
  //     name: "Teja Mallela",
  //     pic: "https://mui.com/static/images/avatar/2.jpg",
  //     messages: [
  //       {
  //         content: "Hi Teja.",
  //         time: "4:40 PM",
  //         sent: true,
  //       },
  //       {
  //         content: "Hi, how are you.",
  //         time: "4:41 PM",
  //         sent: false,
  //       },
  //     ],
  //     archived: false,
  //   },
  //   {
  //     name: "Shravya Gopala",
  //     pic: "https://i.pinimg.com/564x/3e/fd/7b/3efd7b3dbe7dbc36b0cd692d21665202.jpg",
  //     messages: [
  //       {
  //         content: "hello shravya",
  //         time: "4:44 PM",
  //         sent: true,
  //       },
  //       {
  //         content: "Hi, how are you",
  //         time: "4:41 PM",
  //         sent: false,
  //       },
  //     ],
  //     archived: false,
  //   },
  //   {
  //     name: "Tejaswini Ponna",
  //     pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_PGoN16yI_OCFAf_QB8ogFxfaWmuEe6_bQVvPfij2KzvGnIO_rhLaFDhHJ7P7eq3uCc&usqp=CAU",
  //     messages: [
  //       {
  //         content: "hello tejashwini",
  //         time: "4:46 PM",
  //         sent: true,
  //       },
  //       {
  //         content: "Hi, how are you",
  //         time: "4:31 PM",
  //         sent: false,
  //       },
  //     ],
  //     archived: false,
  //   },
  // ]);
  return (
    <DataContext.Provider
      value={{
        socket,
        reveal,
        setReveal,
        account,
        setAccount,
        chatlist,
        setChatlist,
        currentchat,
        setCurrentchat,
        activeUsers,
        setActiveUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
