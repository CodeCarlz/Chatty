"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import PeopleCard from "./peoplecard";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/api";
import { useUser } from "@/context/Usercontext";
import { Allan } from "next/font/google";
import StartconversationDialog from "./modals/startConversationDialog";
import { useSocket } from "@/context/socketcontext";
import { socketEvent } from "@/utils/socketConfig";
import { io } from "socket.io-client";
import Startgroupdialog from "./modals/startGroupDialog";

const Chat = ({
  allchat,
  setOpenChat,
  getAllChatHandler,
  allMessages,
  setAllMessages,
  setAllchat,
  openChat,
}) => {
  const { user } = useUser();
  const { socket, setIsConnected, hisTyping, setHisTyping } = useSocket();

  const [filterKeyword, setFilterKeyword] = useState("");

  const finalAllChats = !filterKeyword
    ? allchat
    : allchat.filter((chat) =>
        chat.participants.some((participant) => {
          const participantName = participant.name.toLowerCase();
          return participantName.includes(filterKeyword.toLowerCase());
        })
      );
  const handlePeopleChange = async (e) => {
    const filter = e.target.value;
    setFilterKeyword(filter);
  };

  const onMessageRecieve = (newMessage) => {
    setAllMessages((allMessages) => [newMessage, ...allMessages]);
    console.log(newMessage);

    // Update the allchat array with the new lastMessage
    setAllchat((allchat) => {
      // Map over each chat object in the allchat array
      return allchat.map((chat) => {
        // Check if the _id of the chat object matches the chat property of the new message
        if (chat._id === newMessage.chat) {
          // If there's a match, return a new chat object with the lastMessage updated to the new message
          return { ...chat, lastMessage: newMessage };
        }
        // If there's no match, return the chat object unchanged
        return chat;
      });
    });
  };

  const onConnected = (data) => {
    console.log("connected now");
    setIsConnected(true);
    getAllChatHandler();
  };
  const onDisconnect = (data) => {
    console.log(data);
  };
  const onJoinChat = (chatId) => {
    socket.emit(socketEvent.JOIN_CHAT_EVENT, chatId);
  };

  const onLeaveChat = (data) => {
    getAllChatHandler();
    // console.log(allchat, data);
    // console.log("Data received:", data);
    // console.log("All chats:", allchat);
    // const updatedAllChat = allchat.filter((chat) => chat._id !== data._id);
    // console.log("Filtered chats:", updatedAllChat);
    // setAllchat(updatedAllChat);
    // console.log("Updated allchat:", allchat);
  };

  const onNewChat = (data) => {
    setAllchat((allchat) => [data, ...allchat]);
  };
  const onStopTyping = (data) => {
    setHisTyping(false);
  };
  const onTyping = (data) => {
    setHisTyping(true);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(socketEvent.CONNECTED_EVENT, onConnected);
    socket.on(socketEvent.DISCONNECT_EVENT, onDisconnect);

    socket.on(socketEvent.LEAVE_CHAT_EVENT, onLeaveChat);
    socket.on(socketEvent.MESSAGE_RECEIVED_EVENT, onMessageRecieve);
    socket.on(socketEvent.NEW_CHAT_EVENT, onNewChat);
    socket.on(socketEvent.STOP_TYPING_EVENT, onStopTyping);
    socket.on(socketEvent.TYPING_EVENT, onTyping);

    return () => {
      socket.off(socketEvent.CONNECTED_EVENT, onConnected);
      socket.off(socketEvent.DISCONNECT_EVENT, onDisconnect);

      socket.off(socketEvent.LEAVE_CHAT_EVENT, onLeaveChat);
      socket.off(socketEvent.MESSAGE_RECEIVED_EVENT, onMessageRecieve);
      socket.off(socketEvent.NEW_CHAT_EVENT, onNewChat);
      socket.off(socketEvent.STOP_TYPING_EVENT, onStopTyping);
      socket.off(socketEvent.TYPING_EVENT, onTyping);
    };
  }, [socket]);

  return (
    <div className="  h-full w-[300px] md:w-[350px] lg:w-[600px]  flex flex-col gap-5">
      <form className="bg-white h-[60px] min-h-[60px] rounded-3xl flex items-center px-5 shadow-[0px_4px_5px_2px_#32eed555] ">
        <button>
          <Search
            size="30"
            className="text-gray-500 h-[20px] w-[20px] md:h-[25px] md:w-[25px] "
          />
        </button>
        <input
          type="text"
          className="h-full w-full bg-transparent  outline-none px-2  text-xl placeholder-gray-500 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-lg"
          placeholder="Search"
          defaultValue=""
          onChange={handlePeopleChange}
        />
      </form>
      <div className="bg-white min-h-[150px] max-h-[200px] rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <div className="flex  items-center justify-between ">
          <h1 className="text-sm md:text-lg font-semibold">Groups</h1>
          <Startgroupdialog
            getAllChatHandler={getAllChatHandler}
            setOpenChat={setOpenChat}
            // setOpenChat={setCloseChat}
          />
        </div>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll h-[300px] customScroll">
          {finalAllChats
            ?.filter((chat) => chat.isGroupChat)
            .map((chat) => (
              <button
                className=""
                key={chat._id}
                onClick={() => {
                  setOpenChat(chat);
                  onJoinChat(chat._id);
                  // setCloseChat(true);
                  // handleJoinChat(chat._id);

                  console.log(chat);
                }}
              >
                <PeopleCard chat={chat} />
              </button>
            ))}
        </div>
      </div>
      <div className=" min-h-[200px] max-h-[470px] bg-white rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <div className="flex  items-center justify-between ">
          <h1 className="text-sm md:text-lg font-semibold">People</h1>
          <StartconversationDialog
            getAllChatHandler={getAllChatHandler}
            setOpenChat={setOpenChat}
            // setOpenChat={setCloseChat}
          />
        </div>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll h-[330px] customScroll">
          {finalAllChats
            ?.filter((chat) => !chat.isGroupChat)
            .map((chat) => (
              <button
                className=""
                key={chat._id}
                onClick={() => {
                  setOpenChat(chat);
                  onJoinChat(chat._id);
                  // setCloseChat(true);
                  // handleJoinChat(chat._id);
                }}
              >
                <PeopleCard chat={chat} />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
