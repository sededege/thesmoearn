import Image from "next/image";
import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";

const Cardreward = ({ tickets, image, buyed,  price, metadata,time}) => {
  return (
    <div className="bg-tesmo2 rounded-lg p-4">
      {/*       <Tweet tweetId="1624841242055004161" options={{ theme: "dark" }} />
       */}
      <Image
        src={image}
        width={400}
        height={400}
        className="rounded-lg"
      />
      <p className="text-center font-bold text-[0.8rem] text-slate-200 mt-4">
        {metadata}
      </p>
      <p className="text-center text-[0.8rem] text-slate-400 mt-2 mb-2">
        {buyed}/{tickets}
      </p>
      <div className='flex items-center gap-2 mx-auto justify-center'>
        <GiTwoCoins className="text-white text-[2rem]" />
        <p className='text-white font-bold'>{price}</p>
      </div>
      <div className='flex justify-center p-2'>
     {
      time && <Countdown date={Date.now() + time} />
     } 

      </div>

      <div className="flex gap-2 mt-4">
        <p className="bg-yellow-300 text-tesmo w-full rounded-lg text-center p-2 cursor-pointer">
          Buy a ticket
        </p>
        </div>
    </div>
  );
};

export default Cardreward;
