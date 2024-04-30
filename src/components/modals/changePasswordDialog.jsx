import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Changepassworddialog = () => {
  return (
    <div className="absolute bottom-5">
      <Dialog className="bg-red-500">
        <DialogTrigger className="font-semibold text-sm bg-gray-400 px-2 py-1 rounded-lg">
          Change Password
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex gap-3">
            <DialogTitle>Change Your Password</DialogTitle>
            <DialogDescription className="flex flex-col items-center gap-3">
              <div className="flex flex-col gap-2">
                <Input type="password" placeholder="Old Password"></Input>
                <Input type="password" placeholder="New Password"></Input>
                <Input type="password" placeholder="Confirm Password"></Input>
              </div>
              <div className="flex gap-2">
                <Button>YES</Button>
                <Button size={"content"}>
                  <DialogClose className=" h-full w-full">NO</DialogClose>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Changepassworddialog;
