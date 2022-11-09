import { createContext, useState } from "react";
import useLocalStorage from "use-local-storage";

const Context = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("userInfo", {});
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  // After logging out update the chat groups
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchAgain,
        setFetchAgain,
      }}
    >
      {children}
    </Context.Provider>
  );
  // };
}
export { Context, ContextProvider };
