import Image from "next/image";
import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";

const Carddiscord = ({ username, user, image, reason }) => {
  return (
    <div className=" border-slate-700 border-2 bg-tesmo2 p-6  w-full rounded-lg relative">
      <div className="flex gap-2 ">
        <Image src={image} width={50} height={50} className="rounded-full" />
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-slate-400">{user}</p>
        </div>
      </div>
      <p className="mt-2  bg-slate-800 p-2 rounded-lg border-2 border-slate-700">
        "{reason}"
      </p>
      <div className="  cursor-pointer absolute right-3 bottom-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <GiTwoCoins className="text-yellow-300 text-[2rem]" />
          <p className="text-yellow-300 text-[1rem]">100</p>
        </div>
        {/*  <p className="bg-sky-500 w-[120px] rounded-lg text-center p-2">
          {" "}
           Like + RT
        </p> */}
        <p className="bg-tesmo3 w-[120px] rounded-lg text-center p-2">
          {" "}
          Claim points
        </p>
      </div>

      <div className='absolute top-6 right-10 flex items-center gap-2 text-slate-400'>
        React
        <FaDiscord className=" text-[2rem] text-purple-400" />
      </div>
      <div>
        <p className="bg-purple-500 w-[120px] rounded-lg text-center p-2 absolute bottom-3 left-3">
          {" "}
          Go msg
        </p>
      </div>
      {/* <p>Like & Share</p>
      <p className="bg-tesmo3 w-[120px] rounded-lg text-center p-2 cursor-pointer">
        Claim points
      </p> */}
    </div>
  );
};

export default Carddiscord;
