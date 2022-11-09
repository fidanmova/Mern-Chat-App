import React from "react";
import { Badge } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// It's a function, when your search user name for creating chat, this function displays users name inside the boxes that you can remove it

export default function UserBadgeItem({ user, handleFunction }) {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg="#B73E6D"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <CloseIcon pl={1} />
    </Badge>
  );
}
