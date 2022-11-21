import React, { useContext } from "react";
import { Context } from "../Store/Context";
import SingleChat from "../components/SingleChat";
import { Flex } from "@chakra-ui/react";

// Chat page on the right behind chat message box
export default function ChatBox() {
  const { selectedChat, fetchAgain, setFetchAgain } = useContext(Context);

  return (
    <Flex
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      opacity={0.6}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {" "}
      {/* For having single page when display get smaller */}
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Flex>
  );
}
