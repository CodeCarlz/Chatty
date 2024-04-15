import React from "react";
import Image from "next/image";

const Peopleicon = () => {
  return (
    <div className=" max-w-[400px] flex  items-center gap-3">
      <div className=" h-[40px] w-[40px] rounded-full overflow-hidden">
        <Image src="/boys.png" height="100" width="100" alt="profile" />
      </div>
      <div className=" flex justify-between w-[330px]">
        <div className="text-gray-700">
          <h1 className="font-semibold">Friends Forver</h1>
          <p className="text-gray-400">hahahahaha!</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 pt-1">Today, 9:53pm</p>
        </div>
      </div>
    </div>
  );
};

export default Peopleicon;
