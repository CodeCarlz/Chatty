import { useUser } from "@/context/Usercontext";
import { axiosInstance } from "@/utils/api";
import EmojiPicker from "emoji-picker-react";
import {
  EllipsisVertical,
  Loader2,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Message from "./message";
import { Button } from "./ui/button";

const Messages = ({ userId }) => {
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
    setIsSending(true);
    try {
      const response = await axiosInstance.post(`messages/${userId}`, {
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

  useEffect(() => {
    if (userId) {
      getAllMessage(userId);
    }
  }, [userId]);

  return (
    <div className="bg-white h-full w-full rounded-3xl grid grid-rows-[100px_1fr_90px] overflow-hidden shadow-[0px_4px_5px_2px_#32eed555] ">
      {/* Profile Container */}
      <div className=" flex flex-col ">
        <div className="flex flex-1">
          <div className=" flex flex-1">
            <div className=" w-[100px] flex justify-end items-center mr-2">
              <div className=" h-[60px] w-[60px] rounded-full overflow-hidden">
                <Image src="/boys.png" height="100" width="100" alt="profile" />
              </div>
            </div>
            <div className=" flex items-center flex-1">
              <div className="">
                <h1 className="text-lg font-semibold">Carlz</h1>
                <div className="flex gap-2 text-gray-500">
                  <p>
                    Online <span>-</span>
                  </p>
                  <p>Last seen, 2:02pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end items-center pr-10 gap-5 flex-1 text-[#4e54c8]">
            <Phone size={30} />
            <Video size={35} />
            <EllipsisVertical size={30} />
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
          <div className="grid place-items-center">
            <Loader2 size={40} className="animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* Send container */}
      <form className=" flex items-center px-5 gap-5" onSubmit={handleSubmit}>
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
          className="bg-gradient-to-tr from-[#4e54c8] to-[#b1b4f4] p-3 h-fit rounded-2xl"
        >
          {isSending ? (
            <Loader2 size={40} className="text-white animate-spin" />
          ) : (
            <SendHorizontal size={40} className="text-white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Messages;

<>
  {/* <div className="chatContainerMiddle">
    {messages.map((message) =>
      message.chats
        .slice()
        .reverse()
        .map((chat, index) =>
          message.name.toLowerCase() == chat.sender.toLowerCase() ? (
            <p className="myMessage" key={index}>
              {" "}
              {chat.Content}
            </p>
          ) : (
            <p className="friendMessage" key={index}>
              {chat.Content}
            </p>
          )
        )
    )}
  </div> */}
</>;
