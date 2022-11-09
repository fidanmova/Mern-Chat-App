import React, { useContext } from "react";
import { Box } from "@chakra-ui/layout";
import { Context } from "../Store/Context";
import SingleChat from "../components/SingleChat";

// Chat page on the right behind chat message box
export default function ChatBox() {
  const { selectedChat, fetchAgain, setFetchAgain } = useContext(Context);

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="black"
      opacity={0.7}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {" "}
      {/* For having single page when display get smaller */}
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
