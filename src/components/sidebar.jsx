import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useUser } from "@/context/Usercontext";

const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className=" h-full w-[133px] bg-gradient-to-l from-[#fafafa] to-[#4e54c8] rounded-2xl flex flex-col items-center justify-between py-10 shadow-[0px_4px_5px_2px_#32eed555]">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-500">
        <Image src={user?.avatar?.url} alt="a" width={100} height={100} />
      </div>
      <div>
        <LogOut size="30" className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
