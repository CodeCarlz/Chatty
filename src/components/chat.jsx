"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import PeopleCard from "./peoplecard";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/api";
import { useUser } from "@/context/Usercontext";
import { Allan } from "next/font/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
// import Searchpeoplecard from "./searchPeoplecard";

const Chat = ({ allchat, onUserIdChange, setCloseChat }) => {
  const user = useUser();
  // console.log(user);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [filteredAllUser, setFilterAllUser] = useState([]);
  const [startConversationId, setStartConversationId] = useState(null);

  const handlePeopleChange = async (e) => {
    const filter = e.target.value;
    if (filter === "") {
      setFilteredParticipants([]);
      return;
    }

    const filtered = allchat.filter((chat) =>
      chat.participants.some((participant) => {
        const participantName = participant.name.toLowerCase();
        return participantName.includes(filter.toLowerCase());
      })
    );

    setFilteredParticipants(filtered);
  };

  const allPeopleChangeHandler = async (e) => {
    const filter = e.target.value;
    if (filter === "") {
      setFilterAllUser([]);
      return;
    }

    const filtered = allUser.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilterAllUser(filtered);
  };

  const startConversationHandler = async (userId) => {
    console.log(userId);
    try {
      const response = await axiosInstance.post(`chats/c/${userId._id}`);
      console.log(response.data.data);
      // if (response) {
      //   console.log(response.data.data);
      //   const filteredResponse = response.data.data.participants.find(
      //     (participant) => participant._id !== user.user._id
      //   );
      //   console.log(filteredResponse);
      // }
      onUserIdChange(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allUserHandler = async () => {
    try {
      const response = await axiosInstance.get(`users`);
      console.log(response.data);
      const filteredUser = response.data.users.filter(
        (userParticipants) =>
          userParticipants.hasOwnProperty("name") &&
          userParticipants._id !== user.user._id
      );

      setAllUser(filteredUser);
      setFilterAllUser(filteredUser);
      // setAllUser(response.data.users);
    } catch (error) {}
  };

  return (
    <div className="  h-full w-[650px]  flex flex-col gap-5">
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
        <h1 className="text-2xl font-semibold">Groups</h1>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll"></div>
      </div>
      <div className=" h-[470px] max-h-[470px] bg-white rounded-3xl flex flex-col p-5 shadow-[0px_4px_5px_2px_#32eed555]">
        <div className="flex  items-center justify-between ">
          <h1 className="text-2xl font-semibold">People</h1>

          <Dialog>
            <DialogTrigger>
              <button onClick={() => allUserHandler()}>
                <Plus />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Conversation</DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                  <Input
                    onChange={allPeopleChangeHandler}
                    className="text-black tracking-wider"
                  />
                  <div className="flex flex-col gap-3 h-full overflow-y-scroll customScroll">
                    {(filteredAllUser.length > 0
                      ? filteredAllUser
                      : allUser
                    ).map((chat) => (
                      <button
                        className=""
                        key={chat._id}
                        onClick={() => {
                          startConversationHandler(chat);
                          setCloseChat(true);
                          // onUserIdChange(chat);
                          console.log(chat);
                        }}
                      >
                        <DialogClose>
                          <PeopleCard allUser={chat} modal={true} />
                        </DialogClose>
                        {console.log(chat)}
                        {console.log(filteredAllUser)}
                      </button>
                    ))}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-3 pt-3 overflow-y-scroll customScroll  max-h-[280px]">
          {(filteredParticipants.length == 0
            ? allchat
            : filteredParticipants
          ).map((chat) => (
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
