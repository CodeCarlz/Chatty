import React from "react";
import Image from "next/image";

const PeopleCard = ({ chat, user }) => {
 

  const participantNames = chat.participants
    .filter((participant) => participant._id !== user._id)
    .map((participantName) => (
      <p key={participantName._id}>{participantName.name}</p>
    ));

  const formattedDate = new Date(chat.updatedAt).toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  
  return (
    <div className=" max-w-[400px] flex  items-center gap-3">
      <div className=" h-[40px] w-[40px] rounded-full overflow-hidden">
        <Image src="/boys.png" height="100" width="100" alt="profile" />
      </div>
      <div className=" flex justify-between w-[330px]">
        <div className="text-gray-700  text-start">
          <h1 className="font-semibold">{participantNames}</h1>
          <p className="text-gray-400">{chat.lastMessage.content}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 pt-1">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
