import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { axiosInstance } from "@/utils/api";
import { useUser } from "@/context/Usercontext";
import PeopleCard from "../peoplecard";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";

const Startgroupdialog = ({ getAllChatHandler, setCloseChat }) => {
  const user = useUser();
  const [filteredAllUser, setFilterAllUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [startConversationId, setStartConversationId] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState([]);
  const [participantHidden, setParticipantHidden] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const inputRef = useRef();

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const allUserHandler = async () => {
    try {
      const response = await axiosInstance.get(`users`);
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

  const startGroupConversationHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const groupMember = selectedParticipant.map(
      (participant) => participant._id
    );
    console.log(groupMember);
    try {
      const response = await axiosInstance.post(`/chats/group`, {
        name: groupName,
        participants: groupMember,
      });
      toast.success(response.data.message);

      setOpenModal(false);
      setSelectedParticipant([]);
      setGroupName(null);
      getAllChatHandler();
    } catch (error) {
      toast.error("Please select at least 2 participants.");
      console.log(error);
    }
  };

  const handleSelectedParticipant = (participant) => {
    const isSelected = selectedParticipant.some(
      (p) => p._id === participant._id
    );

    // If the participant is already selected, remove it from the array
    if (isSelected) {
      setSelectedParticipant((prevSelected) =>
        prevSelected.filter((p) => p._id !== participant._id)
      );
    } else {
      // If the participant is not selected, add it to the array
      setSelectedParticipant((prevSelected) => [...prevSelected, participant]);
    }
  };

  const handleReomveParticipant = (participantId) => {
    setSelectedParticipant((prevParticipants) =>
      prevParticipants.filter(
        (participant) => participant._id !== participantId
      )
    );
  };
  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocus(false);
    }, 200);
  };
  return (
    <>
      <Toaster />
      <Dialog>
        <DialogTrigger>
          <button
            onClick={() => {
              allUserHandler();
              setOpenModal(true);
            }}
          >
            <Plus />
          </button>
        </DialogTrigger>
        {openModal && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start Conversation</DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                <form
                  action=""
                  onSubmit={(e) => startGroupConversationHandler(e)}
                  className="flex flex-col "
                >
                  <div className="flex flex-col gap-3">
                    <div action="" className="flex flex-col gap-3 ">
                      <Input
                        // onChange={allPeopleChangeHandler}
                        className="text-black tracking-wider"
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col items-center gap-3   customScroll h-[35px] border-2 rounded-lg px-1 ">
                      <div className="w-full h-full flex items-center gap-3 ">
                        {(selectedParticipant != []
                          ? selectedParticipant
                          : allUser
                        ).map((participant) => (
                          <>
                            <button
                              className="pl-3 pr-1 bg-gray-100 text-nowrap rounded-lg flex items-center gap-2 text-purple-500"
                              key={participant._id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReomveParticipant(participant._id);
                              }}
                            >
                              {participant.name}
                              <X size={10} />
                            </button>
                          </>
                        ))}

                        <div className="bg-red-500 h-full w-full relative rounded-lg">
                          <input
                            type="text"
                            ref={inputRef}
                            className="w-full h-full outline-none placeholder:text-sm px-2"
                            placeholder="Search Participant"
                            onChange={allPeopleChangeHandler}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => handleInputBlur()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {inputFocus && (
                    <div
                      className=" flex flex-col gap-1 max-h-[100px] overflow-y-auto customScroll  px-2 py-1  bg-gray-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {(filteredAllUser.length > 0
                        ? filteredAllUser
                        : allUser
                      ).map((participant) => {
                        const isSelected = selectedParticipant.some(
                          (parti) => parti._id === participant._id
                        );
                        if (!isSelected) {
                          return (
                            <button
                              className=" text-start p-1 px-2 rounded-lg text-gray-600 bg-gray-200"
                              key={participant._id}
                              onClick={() =>
                                handleSelectedParticipant(participant)
                              }
                            >
                              {participant.name}
                            </button>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  )}
                  <div className="flex justify-center gap-2 mt-5">
                    <Button type="submit" className="min-w-[60px]">
                      YES
                    </Button>
                    {/* <DialogClose> */}
                    <Button
                      className="min-w-[60px]"
                      onClick={() => {
                        setOpenModal(false);
                        setSelectedParticipant([]);
                        setGroupName(null);
                      }}
                    >
                      NO
                    </Button>
                    {/* </DialogClose> */}
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Startgroupdialog;
