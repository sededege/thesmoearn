import Image from "next/image";
import React from "react";
import LoginBtn from "./loginBtn/loginBtn";
import { useSession } from "next-auth/react";
import LogoutBtn from "./logoutBtn/logoutBtn";
import { GiTwoCoins } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const count = useSelector(state => state.counter.value)

  const router = useRouter();
  const { keyword } = router;
  const [menu, setMenu] = React.useState("");
  const { data: session, status } = useSession();

  const menunav = [
  /*   {
      id: 0,
      name: "Home",
      tab: "/home",
    },
    {
      id: 1,
      name: "Rewards",
      tab: "/rewards",
    }, */
    {
      id: 3,
      name: "Stake",
      tab: "/stake",
    },
  ];
  return (
    <div className="w-full flex justify-between items-center px-20 h-[10vh] bg-tesmo">
      <div className=" w-[150px] ">
        <Image
          src="/img/logo.jpg"
          alt="logo"
          width={60}
          height={60}
          className="w-full "
        />
      </div>
      <h1 className="font text-white text-[2rem] font-bold left-[calc(50vw-75px)] fixed">Thes2Earn</h1>
      <div className="flex items-center gap-2">
        {/* <Link href="/home">
          <a className="text-white font-bold font text-[1.2rem] cursor-pointer">Home</a>
        </Link>
        <Link href="/rewards">
          <a   className={`${
                menu === 'Rewards' ? "text-yellow-400" : "text-white" 
              }  font-bold font text-[1.2rem] cursor-pointer `}>Rewards</a>
        </Link>
        <Link href="/stake">
          <a className="text-white font-bold font text-[1.2rem] cursor-pointer">Stake</a>
        </Link> */}
        {menunav.map((a, index) => (
          <Link key={index} href={a.tab}>
            <a
              className={`${
                menu === a.name ? "text-yellow-400" : "text-white"
              }  font-bold font text-[1.2rem] cursor-pointer `}
            >
              {a.name}
            </a>
          </Link>
        ))}
        {/* <GiTwoCoins className="text-yellow-300 text-[2rem]" />
        <p className="text-yellow-300 text-[1.5rem] mr-2">500</p>
       */}
{
  session && <LogoutBtn />

}
      </div>
    </div>
  );
};

export default Header;
