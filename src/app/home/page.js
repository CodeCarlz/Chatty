"use client";
import React, { useEffect, useState } from "react";
import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import Messages from "@/components/messages";
import { UserProvider, useUser } from "@/context/Usercontext";
import { axiosInstance } from "@/utils/api";


const Page = () => {
  const { user } = useUser();
  const [allChat, setAllchat] = useState([]);
  const [userId, setUserId] = useState(null);


  const getAllChatHandler = async () => {
    try {
      const response = await axiosInstance.get("/chats");
      setAllchat(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserIdChange = (userId) => {
    setUserId(userId);
  };

  console.log(userId);
  useEffect(() => {
    getAllChatHandler();
  }, []);

  return (
    <>
      <div className="relative  flex justify-center items-center h-[100vh] w-screen">
        <div className="context z-10  h-screen w-screen flex justify-center items-center gap-8 py-10 px-24">
          <Sidebar />
          <Chat
            allchat={allChat}
            user={user}
            onUserIdChange={handleUserIdChange}
          />
          <Messages allchat={allChat} userId={userId} user={user} />
        </div>

        <div className="area absolute">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
