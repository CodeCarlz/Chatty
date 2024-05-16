import React from "react";
import Image from "next/image";
import { useUser } from "@/context/Usercontext";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

const PeopleCard = ({ chat, modal, allUser }) => {
  const { user } = useUser();

  console.log(chat);
  // const participantAvatar = chat.participants.find(
  //   (participant) => participant._id != user._id
  // );
  // console.log(participantAvatar)

  const chatFiltered = chat?.participants?.find(
    (participant) => participant._id != user._id
  );

  const groupFiltered = chat?.isGroupChat === true ? chat?.name : null;

  console.log(groupFiltered);

  // const filteredAllUser = allUser?.find((obj) =>
  //   Object.values(obj).every((value) => value !== undefined)
  // );
  // const filterUserData = () => {

  const filterAllUser =
    allUser === undefined
      ? console.log("Data is still being fetched. Please try again.")
      : typeof allUser === "object" && !Array.isArray(allUser)
      ? allUser.hasOwnProperty("name")
        ? allUser
        : console.log('Data does not contain a property named "name".')
      : console.log("Invalid data format. Expected an object.");

  console.log(filterAllUser);

  const formattedDate = new Date(chat?.updatedAt).toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div
      className={cn(
        ` flex  items-center gap-3 `,
        modal ? "bg-gray-300 p-2 rounded-lg w-[400px]" : ""
      )}
    >
      <div className=" h-full w-[40px] md:w-[50px] rounded-full overflow-hidden">
        {chat?.isGroupChat === true ? (
          <div className="h-full w-full ">
            <Users size={20} className="h-full w-full" />
          </div>
        ) : (
          <Image
            src={
              filterAllUser != undefined
                ? filterAllUser.avatar.url
                : chatFiltered?.avatar?.url
            }
            height="100"
            width="100"
            alt="profile"
          />
        )}
      </div>
      <div className=" flex justify-start gap-4 md:justify-between  w-full">
        <div className="text-gray-700  text-start">
          <h1 className="font-semibold whitespace-nowrap">
            {chat?.isGroupChat === true
              ? groupFiltered
              : filterAllUser != undefined
              ? filterAllUser.name
              : chatFiltered?.name}
          </h1>
          <p className="text-gray-400 text-ellipsis line-clamp-1 w-[5ch] md:w-[10ch] lg:w-[18ch]">
            {chat?.lastMessage?.content}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 pt-1 line-clamp-2">
            {allUser ? "" : formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
