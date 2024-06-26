"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/Usercontext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleX } from "lucide-react";

const Message = ({ allMessage }) => {
  const user = useUser();
  const [isModalImage, setIsModalImage] = useState(false);

  return (
    <>
      <div
        className={cn(
          `relative flex items-center gap-1 min-h-[60px]`,
          user.user._id !== allMessage.sender._id
            ? "ml-3"
            : "flex-row-reverse mr-3"
        )}
      >
        <div
          className={cn(
            "absolute h-8 w-8 rounded-full overflow-hidden self-end",
            user.user._id !== allMessage.sender._id
              ? "-bottom-2 left-1"
              : "-bottom-2 right-1"
          )}
        >
          <Image
            src={allMessage.sender.avatar.url}
            alt="A"
            width={100}
            height={100}
          />
        </div>
        <p
          className={cn(
            `font-size-16 word-wrap break-words inline-block  pre-wrap  px-5 py-2  h-fit w-fit max-w-[15ch] sm:max-w-[20ch] md:max-w-[60%] lg:max-w-[40ch] transition-all ease-in-out`,
            user.user._id !== allMessage.sender._id
              ? "rounded-tl-3xl rounded-r-3xl bg-gray-300 ml-10"
              : "rounded-tr-3xl rounded-l-3xl  bg-gradient-to-tr from-[#4e54c8] to-[#b1b4f4] mr-10 p-3 "
          )}
        >
          {allMessage?.attachments?.map((attachment, index) => (
            <div key={index} className="h-[150px] w-f overflow-hidden">
              <Dialog>
                <DialogTrigger className="w-full h-full">
                  <img
                    src={`${attachment.url}`}
                    alt="Attachments"
                    className="h-full w-full object-contain"
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="relative">
                    {/* <DialogTitle></DialogTitle> */}
                    <DialogClose className="absolute -top-5 -right-5 text-purple-600">
                      <CircleX />
                    </DialogClose>
                    <DialogDescription className="pt-2">
                      <img
                        src={`${attachment.url}`}
                        alt="attachments"
                        className="w-full h-full"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))}
          {allMessage?.content}
        </p>
      </div>
    </>
  );
};

export default Message;
