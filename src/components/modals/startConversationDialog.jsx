import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { axiosInstance } from "@/utils/api";
import { useUser } from "@/context/Usercontext";
import PeopleCard from "../peoplecard";

const StartconversationDialog = ({
  getAllChatHandler,
  onUserIdChange,
  setCloseChat,
}) => {
  const user = useUser();
  const [filteredAllUser, setFilterAllUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [startConversationId, setStartConversationId] = useState(null);
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

  const startConversationHandler = async (userId) => {
    console.log(userId);
    try {
      const response = await axiosInstance.post(`chats/c/${userId._id}`);
      console.log(response.data.data);

      onUserIdChange(response.data.data);
      getAllChatHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              {(filteredAllUser.length > 0 ? filteredAllUser : allUser).map(
                (chat) => (
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
                )
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StartconversationDialog;
