"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const Sidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  console.log(user);

  return (
    <div className=" h-full w-[133px] bg-gradient-to-l from-[#fafafa] to-[#4e54c8] rounded-2xl flex flex-col items-center justify-between py-10 shadow-[0px_4px_5px_2px_#32eed555]">
      <div className=" w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-500">
        <Sheet>
          <SheetTrigger>
            <Image
              src={user?.avatar?.url}
              alt="Avatar"
              width={100}
              height={100}
            />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="text-3xl">Profile</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-7">
                  <div className="flex justify-center items-center">
                    <div className="h-[200px] w-[200px] rounded-full overflow-hidden">
                      <img
                        src={user?.avatar?.url}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col gap-14 text-black font-medium ">
                    <div className="">
                      <h1 className="font-semibold text-lg">Your Name</h1>
                      <p>{user.name}</p>
                    </div>
                    <div className="">
                      <h1 className="font-semibold text-lg">About</h1>
                      <p>Hey there! I am using Chatty.</p>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <Dialog className="">
        <DialogTrigger>
          <LogOut size="30" className="text-white" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex gap-3">
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogDescription className="flex justify-center items-center gap-3">
              <Button onClick={logoutHandler}>YES</Button>
              <Button size={"content"}>
                <DialogClose className=" h-full w-full">NO</DialogClose>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
