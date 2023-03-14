import Image from "next/image";
import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";

const Cardlisting = () => {
  return (
    <div className="bg-tesmo2 rounded-lg p-4">
      {/*       <Tweet tweetId="1624841242055004161" options={{ theme: "dark" }} />
       */}
      <Image
        src="/img/logo.jpg"
        width={400}
        height={400}
        className="rounded-lg"
      />
      <p className="text-center text-[0.8rem] text-slate-400 mt-4">
        Listings above 500 for 3 days. Each holder could claim +20 points per NFT.
      </p>
      <div className='flex items-center gap-2 mx-auto justify-center'>
        <GiTwoCoins className="text-yellow-300 text-[2rem]" />
        <p className='text-yellow-300 font-bold'>1000</p>
      </div>

      <div className="flex gap-2 mt-4">
        <p className="bg-slate-700 w-full rounded-lg text-center p-2 cursor-pointer">
          Community Challange
        </p>
      </div>
    </div>
  );
};

export default Cardlisting;
