"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import PeopleCard from "./peoplecard";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/api";
import { useUser } from "@/context/Usercontext";
import { Allan } from "next/font/google";
import StartconversationDialog from "./modals/startConversationDialog";

// import Searchpeoplecard from "./searchPeoplecard";

const Chat = ({ allchat, onUserIdChange, setCloseChat, getAllChatHandler }) => {
  const user = useUser();
  // console.log(user);

  const [filterKeyword, setFilterKeyword] = useState("");

  const handlePeopleChange = async (e) => {
    const filter = e.target.value;
    setFilterKeyword(filter);
  };

  const finalAllChats = !filterKeyword
    ? allchat
    : allchat.filter((chat) =>
        chat.participants.some((participant) => {
          const participantName = participant.name.toLowerCase();
          return participantName.includes(filterKeyword.toLowerCase());
        })
      );

  return (
    <div className="  h-full w-[300px] md:w-[350px] lg:w-[600px]  flex flex-col gap-5">
      <form className="bg-white h-[60px] min-h-[60px] rounded-3xl flex items-center px-5 shadow-[0px_4px_5px_2px_#32eed555] ">
        <button>
          <Search size="30" className="text-gray-500" />
        </button>
        <input
          type="text"
          className="h-full w-full bg-transparent  outline-none px-2  text-xl placeholder-gray-500 "
          placeholder="Search"
          defaultValue=""
          onChange={handlePeopleChange}
        />
      </form>
      <div className="bg-white h-[300px] max-h-[300px] rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <h1 className="text-sm md:text-lg font-semibold">Groups</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll"></div>
      </div>
      <div className=" h-[470px] max-h-[470px] bg-white rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <div className="flex  items-center justify-between ">
          <h1 className="text-sm md:text-lg font-semibold">People</h1>
          <StartconversationDialog
            getAllChatHandler={getAllChatHandler}
            onUserIdChange={onUserIdChange}
            setCloseChat={setCloseChat}
          />
        </div>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll  max-h-[280px]">
          {finalAllChats?.map((chat) => (
            <button
              className=""
              key={chat._id}
              onClick={() => {
                onUserIdChange(chat);
                setCloseChat(true);
                console.log(chat);
              }}
            >
              <PeopleCard chat={chat} />
              {console.log(chat)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
