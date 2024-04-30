"use client";
import React, { useEffect, useState } from "react";
import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import Messagescontainer from "@/components/messagesContainer";
import { UserProvider, useUser } from "@/context/Usercontext";
import { axiosInstance } from "@/utils/api";

const Page = () => {
  const [allChat, setAllchat] = useState([]);
  const [userId, setUserId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [closeChat, setCloseChat] = useState(false);
  console.log(userId);

  console.log(allChat);
  const getAllChatHandler = async () => {
    try {
      const response = await axiosInstance.get("/chats");
      setAllchat(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChatHandler();
  }, []);

  return (
    <>
      <div className="bg-[#EFF6FC] relative  flex justify-center items-center h-[100vh] w-screen">
        <div className="context z-10  h-screen w-screen flex justify-center items-center gap-2 md:gap-4 lg:gap-6 py-10 px-2 sm:px-5 md:px-8 lg:px-12">
          <Sidebar getAllChatHandler={getAllChatHandler} />
          <Chat
            allchat={allChat}
            onUserIdChange={setUserId}
            closeChat={closeChat}
            setCloseChat={setCloseChat}
            getAllChatHandler={getAllChatHandler}
          />
          <Messagescontainer
            allchat={allChat}
            userId={userId}
            closeChat={closeChat}
            setCloseChat={setCloseChat}
            getAllChatHandler={getAllChatHandler}
          />
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
