import { useUser } from "@/context/Usercontext";
import { axiosInstance } from "@/utils/api";
import EmojiPicker from "emoji-picker-react";
import {
  Dot,
  Ellipsis,
  EllipsisVertical,
  File,
  Loader2,
  MessagesSquare,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  Users,
  Video,
  cat,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { connect, io } from "socket.io-client";
import { useSocket } from "@/context/socketcontext";
import { socketEvent } from "@/utils/socketConfig";

const Messagescontainer = ({
  openChat,
  closeChat,
  setOpenChat,
  getAllChatHandler,
  allMessages,
  setAllMessages,
}) => {
  const { user } = useUser();
  const { socket, isConnected, hisTyping, setHisTyping } = useSocket();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selfTyping, setSelfTyping] = useState(false);
  const [attachment, setAttachment] = useState("");

  const typingTimeoutRef = useRef();
  const msgeInputRef = useRef(null);

  const getCursorPosition = (inputRef) => {
    if (!inputRef) return null;
    return inputRef.selectionStart;
  };
  const getAllMessage = async (chatId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`messages/${chatId}`);
      setAllMessages(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (chatId, message) => {
    setIsSending(true);
    const formData = new FormData();

    if (message) {
      formData.append("content", message);
    }
    formData.append("attachments", attachment);

    try {
      const response = await axiosInstance.post(
        `messages/${chatId._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAllMessages((allMessages) => [response.data.data, ...allMessages]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
      setSentMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(openChat, sentMessage);
    setSentMessage("");
    getAllChatHandler();
  };

  const deleteMessageHandler = async (chatId) => {
    try {
      await axiosInstance.delete(`chats/remove/${chatId}`);
      getAllChatHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnMessageChange = (e) => {
    // Update the message state with the current input value
    setSentMessage(e.target.value);

    // If socket doesn't exist or isn't connected, exit the function
    if (!socket || !isConnected) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(socketEvent.TYPING_EVENT, openChat._id);
    }

    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define a length of time (in milliseconds) for the typing timeout
    const timerLength = 2000;

    // Set a timeout to stop the typing indication after the timerLength has passed
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(socketEvent.STOP_TYPING_EVENT, openChat._id);

      // Reset the user's typing state
      setSelfTyping(false);
    }, timerLength);
  };

  const onEmojiClick = (emojiObject) => {
    if (msgeInputRef) {
      const position = getCursorPosition(msgeInputRef.current);
      if (position) {
        let modifiedMessage =
          sentMessage.slice(0, position) +
          emojiObject.emoji +
          sentMessage.slice(position);
        setSentMessage(modifiedMessage);
      } else {
        setSentMessage((prev) => `${prev}  ${emojiObject.emoji}`);
      }
    }

    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (openChat) {
      getAllMessage(openChat._id);

      socket.emit(socketEvent.JOIN_CHAT_EVENT, openChat._id);
    }
  }, [openChat, socket]);

  const participantData = openChat?.participants?.find(
    (participant) => participant._id !== user._id
  );

  const groupParticipants =
    openChat?.isGroupChat === true
      ? openChat?.participants.filter(
          (participant) => participant._id !== user._id
        )
      : null;

  return (
    <div className="bg-white h-full w-full rounded-3xl grid grid-rows-[100px_1fr_90px] overflow-hidden shadow-[0px_4px_5px_2px_#32eed555] ">
      {openChat ? (
        <>
          <div className=" flex flex-col ">
            <div className="flex flex-1">
              {participantData ? (
                <div className=" flex flex-1 pl-5 md:pl-3">
                  <div className=" w-[45px] md:w-[60px] lg:w-[80px]   flex justify-center items-center  ">
                    <div className=" h-[40px] w-[40px] md:h-[50px] md:w-[50px] lg:h-[60px] lg:w-[60px] rounded-full overflow-hidden">
                      {openChat.isGroupChat === true ? (
                        <Users size={30} className="h-full w-full" />
                      ) : (
                        <Image
                          src={participantData?.avatar?.url}
                          height="100"
                          width="100"
                          alt="profile"
                        />
                      )}
                    </div>
                  </div>
                  <div className=" flex items-center flex-1">
                    <div className="">
                      <h1 className="text-xs md:text-sm lg:text-lg font-semibold whitespace-nowrap ">
                        {openChat.isGroupChat
                          ? openChat.name
                          : participantData?.name}
                      </h1>
                      <div className="flex gap-2 text-gray-500">
                        <p className="text-xs md:text-sm max-w-[40ch] text-ellipsis line-clamp-1">
                          {openChat?.isGroupChat === true
                            ? groupParticipants
                                .map((participant) => participant.name)
                                .join(", ")
                            : "Online"}
                          {/* <span>-</span> */}
                        </p>
                        {/* <p>Last seen, 2:02pm</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 items-center pl-5 ">
                  <Loader2 size={40} className="animate-spin text-primary" />
                </div>
              )}

              <div className=" flex justify-end items-center pr-2 md:pr-5 lg:pr-10 gap-5 flex-1 text-[#4e54c8]">
                <Phone
                  size={30}
                  className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
                />
                <Video
                  size={35}
                  className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
                />

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical
                      size={30}
                      className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button onClick={() => setOpenChat(null)}>
                        Close Chat
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => {
                          deleteMessageHandler(openChat._id);
                          setAllMessages([]);
                          setOpenChat(null);
                          getAllChatHandler;
                        }}
                      >
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
          <div className="relative customScroll flex flex-col-reverse overflow-y-auto  gap-7 pb-10  ">
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
            {hisTyping ? (
              <h1 className="absolute bottom-0 left-16 flex items-start text-gray-500">
                {/* <p className="text-xs ">Typing</p> */}
                <Dot
                  className="animate-bounce  transition-all "
                  style={{
                    animationDuration: "1s",
                    animationTimingFunction: "ease-in-out",
                  }}
                />
                <Dot
                  className="animate-bounce  transition-all"
                  style={{
                    animationDuration: "1.2s",
                    animationTimingFunction: "ease-in",
                  }}
                />
                <Dot
                  className="animate-bounce  transition-all"
                  style={{
                    animationDuration: "1.4s",
                    animationTimingFunction: "ease-in",
                  }}
                />
              </h1>
            ) : (
              ""
            )}
          </div>

          {/* Send container */}
          <form
            className=" flex items-center px-5 gap-5"
            onSubmit={handleSubmit}
          >
            <div className=" flex items-center flex-1">
              <div className="flex items-center justify-center flex-1 bg-[#dcecfc] h-[70px] rounded-2xl">
                <div className="">
                  <input
                    type="file"
                    className="fixed left-[9999px]"
                    id="attachment"
                    onChange={(e) => {
                      setAttachment(e.target.files[0]);
                      setSentMessage((prev) => [prev + e.target.files[0].name]);
                    }}
                  />
                  <label htmlFor="attachment">
                    <Paperclip
                      size={30}
                      className="mx-2 md:mx-3 lg:mx-5 h-[20px] w-[20px] md:h-[25px] md:w-[25px] lg:h-[30px] lg:w-[30px] "
                    />
                  </label>
                </div>
                <div className="flex-1  h-full">
                  <input
                    ref={msgeInputRef}
                    type="text"
                    placeholder="Type Your Message Here..."
                    className="w-full h-full md:px-1  outline-none text-lg bg-transparent placeholder-gray-500 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-lg"
                    value={sentMessage}
                    onChange={(e) => {
                      // setSentMessage(e.target.value);
                      handleOnMessageChange(e);
                    }}
                  />
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      setShowEmojiPicker(!showEmojiPicker);
                      e.preventDefault();
                    }}
                  >
                    <Smile
                      size={30}
                      className="mx-2 h-[20px] w-[20px] md:h-[25px] md:w-[25px] lg:h-[30px] lg:w-[30px] "
                    />
                  </button>
                  <div className="absolute bottom-10 right-12  bg-red-500 transition ease-in  ">
                    {showEmojiPicker && (
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-tr from-[#4e54c8] to-[#b1b4f4] p-3 h-fit rounded-2xl shadow-[0px_4px_5px_2px_#32eed555]"
            >
              {isSending ? (
                <Loader2
                  size={40}
                  className="text-white animate-spin h-[20px] w-[20px] md:h-[25px] md:w-[25px] lg:h-[30px] lg:w-[30px] xl:h-[40px] xl:w-[40px]"
                />
              ) : (
                <SendHorizontal
                  size={40}
                  className="text-white h-[20px] w-[20px] md:h-[25px] md:w-[25px] lg:h-[30px] lg:w-[30px] xl:h-[40px] xl:w-[40px]"
                />
              )}
            </button>
          </form>
        </>
      ) : (
        <div className=" h-screen w-full flex flex-col  justify-start pt-10 items-center gap-5">
          <div className="h-[200px] w-[200px] md:h-[250px] md:w-[250px] rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
            <MessagesSquare
              size={200}
              className="text-gray-500 h-[100px] md:h-[170px]"
            />
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
