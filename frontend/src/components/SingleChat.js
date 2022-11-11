import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/Context";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./miscellaneous/ProfileModel";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animation/animation.json";

import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

// after installing socket.io client, exchange  http://localhost:5000 with deploying link
// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://chat-j1bt.onrender.com";

let socket, selectedChatCompare;

export default function SingleChat() {
  const toast = useToast();
  //Set messages send the message and cleans the input form from message
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  // for newMessage
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  // creating typing dots....
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // after that go to server and create socket.on(typing)

  const { user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain } =
    useContext(Context);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // For fetching all the chats and call this function in useEffect
  const fetchMessages = async () => {
    // if no chat is selected then just return and don't do anything
    if (!selectedChat) return;
    // otherwise
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // direct fetching all of the messages
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      // after fetching the messages, set all the messages inside the state
      setMessages(data);
      setLoading(false);
      // Socket io
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // Socket io (after that check on console.log if socket io is connected)
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.on("message received", (message) => {
      // setNewMessage(message.content);
      console.log("Message From Server", message);
      messages.push(message);
      setMessages(messages);
      // alert(message.content);
    });
    // return () => {
    // socket.off("connected");
    // socket.off("disconnect");
    // socket.off("pong");
    // };
  }, []);

  // call fetchMessages inside UseEffect
  useEffect(() => {
    fetchMessages();
    // connect real chat now!
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  // to check newMessageReceived
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // if non of the chat is selected, or this chat which is selected doesn't match currently selected chat (then u will get notification)
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived._id
      ) {
        // give notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // on KeyDown we are sending message
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        // Fetch API from backend
        // setNewMessage: after sending the message cleans the input (when you send message it's gone, it's not visible on input form)

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        // Socket io
        socket.emit("new message", data);
        // to append messages and add new message(data)
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing Indicator Logic
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    // decide when to stop typing, when user is not typing
    // let lastTypingTime = new DataTransfer().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      // let timeNow = new DataTransfer().getTime();
      // let timeDiff = timeNow - lastTypingTime;
      // if (timeDiff >= timerLength && typing)

      socket.emit("stop typing", selectedChat._id);
      setIsTyping(false);
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="white"
            w="100%"
            h="70vh"
            borderRadius="lg"
            overflowY="scroll"
            scrollbarWidth="none"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={10}
                h={10}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div
                className="messages"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              //onKeyDown is sending messages when pressing on enter in the input
              onKeyDown={sendMessage}
              isRequired
              mt={3}
            >
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="black"
                placeholder="Enter a message.."
                fontSize={{ base: "17px", md: "25px", lg: "30px" }}
                // typingHandler will also update newMessage state
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text
            fontSize={{ base: "17px", md: "30px", lg: "40px" }}
            pb={3}
            fontFamily="Work sans"
            color="black"
          >
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}
