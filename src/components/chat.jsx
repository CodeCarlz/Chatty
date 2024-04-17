"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "lucide-react";
import PeopleCard from "./peoplecard";
import { all } from "axios";

const Chat = ({ allchat, user, onUserIdChange }) => {
  const [userId, setUserId] = useState();

  const handeClick = (id) => {
    setUserId(id);
    onUserIdChange(userId);
  };
  return (
    <div className=" h-full w-[650px]  flex flex-col gap-5">
      <div className="bg-white h-[60px] min-h-[60px] rounded-3xl flex items-center px-5">
        <Search size="30" className="text-gray-500" />
        <input
          type="text"
          className="h-full w-full bg-transparent  outline-none px-2  text-xl placeholder-gray-500 "
          placeholder="Search"
        />
      </div>
      <div className="bg-white h-[300px] max-h-[300px] rounded-3xl flex flex-col p-5">
        <h1 className="text-2xl font-semibold">Groups</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll"></div>
      </div>
      <div className="bg-white h-[475px] rounded-3xl flex flex-col p-5">
        <h1 className="text-2xl font-semibold">People</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll">
          {allchat.map((chat) => (
            <button
              className=""
              key={chat._id}
              onClick={() => handeClick(chat._id)}
            >
              <PeopleCard chat={chat} user={user} key={chat._id} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
