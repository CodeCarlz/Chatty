import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-red-100 h-full w-[133px] bg-gradient-to-l from-[#8f94fb] to-[#4e54c8] rounded-2xl flex flex-col items-center justify-between py-10">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-500">
        <Image src="/boys.png" alt="a" width={100} height={100} />
      </div>
      <div>
        <LogOut size="30" className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
