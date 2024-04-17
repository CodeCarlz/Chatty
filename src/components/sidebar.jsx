import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className=" h-full w-[133px] bg-gradient-to-l from-[#fafafa] to-[#8d93d4] rounded-2xl flex flex-col items-center justify-between py-10">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-blue-500">
        <Image src="/boys.png" alt="a" width={100} height={100} />
      </div>
      <div>
        <LogOut size="30" className="text-[#4e54c8]" />
      </div>
    </div>
  );
};

export default Sidebar;
