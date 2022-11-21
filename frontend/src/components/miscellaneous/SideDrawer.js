import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../../components/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

import { Tooltip, Text } from "@chakra-ui/react";
import { Context } from "../../Store/Context";
import ProfileModel from "./ProfileModel";
import axios from "axios";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useToast,
  Spinner,
} from "@chakra-ui/react";

export default function SideDrawer() {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useContext(Context);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Logout and go to  Home page
  const logoutHandler = () => {
    setUser({});
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  // For Button "Go"
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    // For API Call
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // we have to send query, that's why search?
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  // After search the User direct to the Chat room
  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // make an API request ( take from create a chat API) Also we are creating new chat here
      const { data } = await axios.post("/api/chat", { userId }, config);
      // if it finds inside of the list, that already with us , it's gonna update the list with setChats and appending the chat inside of it
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          padding: "5px 10px 5px 10px",
          borderWidth: "8px",
        }}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Text>Search User</Text>
          </Button>
        </Tooltip>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
        </div>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user ? user.name : null}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <ProfileModel>{/* <MenuItem>My Profile</MenuItem> */}</ProfileModel>
            <MenuDivider color="black" />
            <MenuItem color="black" onClick={logoutHandler}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <div>
              <input
                value={search}
                // Input to Search the users
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
                style={{
                  margin: "15px",
                  border: "2px solid white",
                }}
              />
              <button
                onClick={handleSearch}
                style={{ border: "2px solid white" }}
              >
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  // By clicking User enter the Chat room
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
