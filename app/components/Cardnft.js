import Image from "next/image";
import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";

const Cardnft = () => {
  return (
    <div className="bg-tesmo2 rounded-lg p-4">
      {/*       <Tweet tweetId="1624841242055004161" options={{ theme: "dark" }} />
       */}
      <Image
        src="https://img-cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https%3A%2F%2Farweave.net%2FASBuauGABm6_tYduPQI5Ll4TwLzWb0MKvW6vdvGRbS0%3Fext%3Dpng"
        width={400}
        height={400}
        className="rounded-lg"
      />
      <p className="text-center text-[0.8rem] text-slate-400 mt-4">
        Bought +5 thesmophoria NFT and hold for 3 days
      </p>
      <div className='flex items-center gap-2 mx-auto justify-center'>
        <GiTwoCoins className="text-yellow-300 text-[2rem]" />
        <p className='text-yellow-300 font-bold'>100</p>
      </div>

      <div className="flex gap-2 mt-4">
        <p className="bg-pink-500 w-[120px] rounded-lg text-center p-2 cursor-pointer">
          Buy ME
        </p>
        <p className="bg-tesmo3 w-[120px] rounded-lg text-center p-2 cursor-pointer">
          Start
        </p>
      </div>
    </div>
  );
};

export default Cardnft;
