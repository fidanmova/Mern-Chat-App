import React from "react";
import Login from "../components/Authentication/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Signup from "../components/Authentication/Signup";

import {
  Container,
  Box,
  Text,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

export default function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user === null) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg={"black"}
        opacity={"0.8"}
        color="white"
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        fontWeight="bold"
      >
        <Center>
          <Text fontSize="4xl" fontFamily="Work sans">
            Chat Form
          </Text>
        </Center>
      </Box>
      <Box
        bg="black"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        opacity={"0.8"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login />}</TabPanel>
            <TabPanel>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
