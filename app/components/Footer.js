import React from 'react'
import { AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='w-full text-white bg-tesmo text-center h-[30px] fixed bottom-0 justify-between hidden md:flex py-2 md:py-8 md:items-center
     px-20'>
        <p>
        All rights reserved © Thesmophoria 2023.
        </p>
        <div className="md:flex hidden gap-4 items-center cursor-pointer">
        <a href="https://magiceden.io/marketplace/tesmophoria">
          <img className="w-8 h-8 object-contain" src='img/me.png' alt="me" />
        </a>
        <a href="https://twitter.com/thesmophoria_">
          <AiOutlineTwitter className="text-[30px] text-white  hover:text-sky-500" />
        </a>
        <a href="https://discord.com/invite/tesmophoria">
          <FaDiscord className="text-[30px] text-white hover:text-purple-500" />
        </a>
      </div>
    </div>
  )
}

export default Footer