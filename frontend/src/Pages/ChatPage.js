// import { useState } from "react";
import { Context } from "../Store/Context";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

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
      <SideDrawer />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "90vh",
          p: "10px",
        }}
      >
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
}
