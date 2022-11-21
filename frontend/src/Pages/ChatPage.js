// import { useState } from "react";
import { Context } from "../Store/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { Flex } from "@chakra-ui/react";

export default function ChatPage() {
  const { user, fetchAgain, setFetchAgain } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex d="flex" w="100%" direction={{ base: "column", md: "row" }}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
}
