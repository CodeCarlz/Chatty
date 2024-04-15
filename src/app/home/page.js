import React from "react";
import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import Messages from "@/components/messages";

const Page = () => {
  return (
    <>
      <div className="bg-[#dcecfc] h-screen w-screen flex justify-center items-center gap-8 py-10 px-24">
        <Sidebar />
        <Chat />
        <Messages />
      </div>
    </>
  );
};

export default Page;
