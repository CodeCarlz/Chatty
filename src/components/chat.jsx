import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import Peopleicon from "./peopleIcon";

const Chat = () => {
  return (
    <div className="bg-blue-00 h-full w-[650px]  flex flex-col gap-5">
      <div className="bg-white h-[60px] min-h-[60px] rounded-3xl flex items-center px-5">
        <IoSearch size="30" className="text-gray-500" />
        <input
          type="text"
          className="h-full w-full bg-transparent  outline-none px-2  text-xl placeholder-gray-500 "
          placeholder="Search"
        />
      </div>
      <div className="bg-white h-[300px] max-h-[300px] rounded-3xl flex flex-col p-5">
        <h1 className="text-2xl font-semibold">Groups</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll">
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
        </div>
      </div>
      <div className="bg-white h-[475px] rounded-3xl flex flex-col p-5">
        <h1 className="text-2xl font-semibold">People</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll">
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
          <Peopleicon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
