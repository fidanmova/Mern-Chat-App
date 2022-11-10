import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Context } from "../Store/Context";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { Tooltip, Avatar } from "@chakra-ui/react";

export default function ScrollableChat({ messages }) {
  const { user } = useContext(Context);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              fontWeight: "bold",
              color: "black",
              fontSize: "20px",
            }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}
// npm install react-scrollable-feed
