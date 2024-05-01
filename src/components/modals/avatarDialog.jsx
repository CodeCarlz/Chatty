"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CloudUpload } from "lucide-react";
import { axiosInstance } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/Usercontext";

const Avatardialog = ({ getAllChatHandler }) => {
  const { user, fetchUser } = useUser();
  const [image, setImage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  console.log(user);

  const uploadAvatarHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);

    try {
      const response = await axiosInstance.patch(`users/avatar`, formData);
      console.log(response.data.message);
      console.log(response.data);
      if (response) {
        setUploadSuccess(true);
        toast.success(response.data.message);
      }
      fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setUploadSuccess(false);
      setImage("");
    }
  };

  console.log(uploadSuccess);

  console.log(image);
  return (
    <Dialog>
      <Toaster />
      <DialogTrigger className=" shadow-[0px_4px_4px_4px_#32eed555]">
        <img src={user?.avatar?.url} alt="" className="h-full w-full" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="">Change Avatar</DialogTitle>
          <DialogDescription className="flex justify-center ">
            <form
              className="flex flex-col justify-center items-center gap-5"
              onSubmit={(e) => uploadAvatarHandler(e)}
            >
              <div className="relative h-[200px] w-[200px] rounded-full overflow-hidden  flex justify-center items-center ">
                <input
                  type="file"
                  id="upload"
                  required
                  className="fixed left-[9999px]"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label
                  htmlFor="upload"
                  className="  h-full w-full flex items-end justify-center rounded-full z-50 pb-5 hover:cursor-pointer"
                >
                  <span>
                    <CloudUpload size={30} />
                  </span>
                </label>
                <img
                  src={image ? URL.createObjectURL(image) : "/blankAvatar.jpg"}
                  alt=""
                  className="h-full w-full absolute "
                />
              </div>

              <div className="flex gap-3">
                <DialogClose disabled={!image}>
                  <Button type="submit">YES</Button>
                </DialogClose>
                <DialogClose>
                  <Button onClick={() => setImage("")}>NO</Button>
                </DialogClose>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Avatardialog;
