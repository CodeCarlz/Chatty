"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import PeopleCard from "./peoplecard";

const Chat = ({ allchat, onUserIdChange }) => {
  return (
    <div className="  h-full w-[650px]  flex flex-col gap-5">
      <div className="bg-white h-[60px] min-h-[60px] rounded-3xl flex items-center px-5 shadow-[0px_4px_5px_2px_#32eed555] ">
        <Search size="30" className="text-gray-500" />
        <input
          type="text"
          className="h-full w-full bg-transparent  outline-none px-2  text-xl placeholder-gray-500 "
          placeholder="Search"
        />
      </div>
      <div className="bg-white h-[300px] max-h-[300px] rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <h1 className="text-2xl font-semibold">Groups</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll"></div>
      </div>
      <div className="bg-white h-[470px] rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <h1 className="text-2xl font-semibold">People</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll">
          {allchat.map((chat) => (
            <button
              className=""
              key={chat._id}
              onClick={() => onUserIdChange(chat._id)}
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
