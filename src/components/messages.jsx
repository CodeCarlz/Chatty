import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Phone,
  Video,
  EllipsisVertical,
  SendHorizontal,
  Paperclip,
  Smile,
} from "lucide-react";
import { axiosInstance } from "@/utils/api";
import { all } from "axios";

const Messages = ({ userId, user }) => {
  const [allMessages, setAllMessages] = useState([]);

  const getAllMessage = async (id) => {
    const response = await axiosInstance.get(`messages/${id}`);
    try {
      setAllMessages(response.data.data);
    } catch (error) {}
  };

 
  useEffect(() => {
    if (userId) {
      getAllMessage(userId);
    }
  }, [userId]);
  return (
    <div className="bg-white h-full w-full rounded-3xl grid grid-rows-[100px_1fr_90px] overflow-hidden">
      {/* Profile Container */}
      <div className=" flex flex-col ">
        <div className="flex flex-1">
          <div className=" flex flex-1">
            <div className=" w-[100px] flex justify-end items-center mr-2">
              <div className=" h-[60px] w-[60px] rounded-full overflow-hidden">
                <Image src="/boys.png" height="100" width="100" alt="profile" />
              </div>
            </div>
            <div className=" flex items-center flex-1">
              <div className="">
                <h1 className="text-lg font-semibold">Carlz</h1>
                <div className="flex gap-2 text-gray-500">
                  <p>
                    Online <span>-</span>
                  </p>
                  <p>Last seen, 2:02pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end items-center pr-10 gap-5 flex-1 text-[#4e54c8]">
            <Phone size={30} />
            <Video size={35} />
            <EllipsisVertical size={30} />
          </div>
        </div>
        <span className="border-b-2 mx-5 mt-1"></span>
      </div>

      {/* Chat Container */}
      <div className="customScroll flex flex-col-reverse overflow-y-auto ">
        {allMessages.map((allMessage) =>
          allMessage.sender._id != user._id ? (
            <p key={allMessage._id} className="friendMessage">
              {allMessage?.content}
            </p>
          ) : (
            <p key={allMessage._id} className="myMessage">
              {allMessage?.content}
            </p>
          )
        )}
        {/* <p className="myMessage">Yes?</p>
        <p className="friendMessage">Hello</p> */}
      </div>

      {/* Send container */}
      <div className=" flex items-center px-5 gap-5">
        <div className=" flex items-center flex-1">
          <div className="flex items-center justify-center flex-1 bg-[#dcecfc] h-[70px] rounded-2xl">
            <button>
              <Paperclip size={30} className="mx-5" />
            </button>
            <div className="flex-1  h-full">
              <input
                type="text"
                placeholder="Type Your Message Here..."
                className="w-full h-full px-3 outline-none text-lg bg-transparent placeholder-gray-500"
              />
            </div>
            <button>
              <Smile size={30} className="mx-5" />
            </button>
          </div>
        </div>
        <button className="bg-gradient-to-tr from-[#4e54c8] to-[#b1b4f4] p-3 h-fit rounded-2xl">
          <SendHorizontal size={40} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Messages;

<>
  {/* <div className="chatContainerMiddle">
    {messages.map((message) =>
      message.chats
        .slice()
        .reverse()
        .map((chat, index) =>
          message.name.toLowerCase() == chat.sender.toLowerCase() ? (
            <p className="myMessage" key={index}>
              {" "}
              {chat.Content}
            </p>
          ) : (
            <p className="friendMessage" key={index}>
              {chat.Content}
            </p>
          )
        )
    )}
  </div> */}
</>;
