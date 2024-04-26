import { useUser } from "@/context/Usercontext";
import { axiosInstance } from "@/utils/api";
import EmojiPicker from "emoji-picker-react";
import {
  EllipsisVertical,
  Loader2,
  MessagesSquare,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  Video,
  cat,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Message from "./message";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Messagescontainer = ({ userId, closeChat, setCloseChat, allchat }) => {
  const { user } = useUser();
  const [allMessages, setAllMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getAllMessage = async (userId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`messages/${userId}`);
      setAllMessages(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (userId, message) => {
    console.log(userId);
    setIsSending(true);
    try {
      const response = await axiosInstance.post(`messages/${userId._id}`, {
        content: message,
      });
      setAllMessages((allMessages) => [response.data.data, ...allMessages]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(userId, sentMessage);
    setSentMessage("");
  };

  const deleteMessageHandler = async (chatId) => {
    try {
      await axiosInstance.delete(`chats/remove/${chatId}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      console.log(userId);
      getAllMessage(userId._id);
    }
  }, [userId]);

  console.log(user);
  console.log(userId);
  const participantData = userId?.participants?.find(
    (participant) => participant._id !== user._id
  );
  console.log(participantData);

  return (
    <div className="bg-white h-full w-full rounded-3xl grid grid-rows-[100px_1fr_90px] overflow-hidden shadow-[0px_4px_5px_2px_#32eed555] ">
      {closeChat ? (
        <>
          {/* Profile Container */}
          {/* {allMessages.map((messenge, index) => console.log(messenge.sender._id !== user._id ? messenge.sender.avatar.url : null))} */}
          <div className=" flex flex-col ">
            <div className="flex flex-1">
              <div className=" flex flex-1">
                <div className=" w-[100px] flex justify-end items-center mr-2">
                  <div className=" h-[60px] w-[60px] rounded-full overflow-hidden">
                    <Image
                      src={participantData?.avatar?.url}
                      height="100"
                      width="100"
                      alt="profile"
                    />
                  </div>
                </div>
                <div className=" flex items-center flex-1">
                  <div className="">
                    <h1 className="text-lg font-semibold">
                      {participantData?.name}
                    </h1>
                    <div className="flex gap-2 text-gray-500">
                      <p>
                        Online
                        {/* <span>-</span> */}
                      </p>
                      {/* <p>Last seen, 2:02pm</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end items-center pr-10 gap-5 flex-1 text-[#4e54c8]">
                <Phone size={30} />
                <Video size={35} />

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical size={30} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button onClick={() => setCloseChat(false)}>
                        Close Chat
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={() => deleteMessageHandler(userId._id)}>
                        Delete Chat
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Block</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <span className="border-b-2 mx-5 mt-1"></span>
          </div>

          {/* Chat Container */}
          <div className="customScroll flex flex-col-reverse overflow-y-auto  gap-7 pb-10">
            {!loading &&
              allMessages.map((allMessage) =>
                allMessage.sender._id != user._id ? (
                  <div key={allMessage._id}>
                    <Message allMessage={allMessage} />
                  </div>
                ) : (
                  <div key={allMessage._id}>
                    <Message allMessage={allMessage} />
                  </div>
                )
              )}
            {loading && (
              <div className="grid place-items-center  justify-center  h-full">
                <Loader2 size={40} className="animate-spin text-primary" />
              </div>
            )}
          </div>

          {/* Send container */}
          <form
            className=" flex items-center px-5 gap-5"
            onSubmit={handleSubmit}
          >
            <div className=" flex items-center flex-1">
              <div className="flex items-center justify-center flex-1 bg-[#dcecfc] h-[70px] rounded-2xl">
                <button>
                  <Paperclip size={30} className="mx-5" />
                </button>
                <div className="flex-1  h-full">
                  <input
                    type="text"
                    placeholder="Type Your Message Here..."
                    className="w-full h-full px-3 outline-none text-lg bg-transparent placeholder-gray-500"
                    value={sentMessage}
                    onChange={(e) => setSentMessage(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      setShowEmojiPicker(!showEmojiPicker);
                      e.preventDefault();
                    }}
                  >
                    <Smile size={30} className="mx-5" />
                  </button>
                  <div className="absolute bottom-10 right-12  bg-red-500 transition ease-in  ">
                    {showEmojiPicker && <EmojiPicker />}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-tr from-[#4e54c8] to-[#b1b4f4] p-3 h-fit rounded-2xl shadow-[0px_4px_5px_2px_#32eed555]"
            >
              {isSending ? (
                <Loader2 size={40} className="text-white animate-spin" />
              ) : (
                <SendHorizontal size={40} className="text-white" />
              )}
            </button>
          </form>
        </>
      ) : (
        <div className=" h-screen w-full flex flex-col  justify-start pt-10 items-center gap-5">
          <div className="h-[300px] w-[300px] rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
            <MessagesSquare size={200} className="text-gray-500" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl mb-5 ">Chatty Web</h1>
            <p>send and recieve messages without keeping your phone online.</p>
            <p>Use Chatty Web Now</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messagescontainer;
