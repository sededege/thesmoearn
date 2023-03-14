/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback } from "react";
import Countdown from "react-countdown";
import { GiTwoCoins } from "react-icons/gi";
import Layout from "../app/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { hashtest } from "./hashtest";
import {
  saveUser,
  getAllUsuarios,
  updateNfts,
  getUser,
  updatePoints,
} from "../app/components/utils/firebaseFunctions";


export async function getServerSideProps(context) {
  const session = await getSession(context);
   /*  imgUrl(1); */
  return {
    props: {
      userSession: session.user.address,
    },
  }
}
const staked = ({userSession}) => {
  const [nfts, setNfts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);
  const [stake, setStake] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const data = [];
  let qtyxhr = 12;

  async function imgUrl(num) {
    const wallet = userSession

    /*      const wallet = "5SkhphG62nMnSrpGoB2P5fhkMVYRqutaxyy8z67ZbVj2";
     */
    const body = {
      method: "qn_fetchNFTs",
      params: {
        wallet: wallet,
        page: num,
        perPage: 40,
      },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
    };
    await fetchUsers();
    await fetch(
      "https://billowing-virulent-gas.solana-mainnet.discover.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      options
    )
      .then((res) => res.json())
      .then(
        (res) =>
          res.result &&
          res.result.assets
            .filter((b) => b.collectionName === "Blessed Dogs")
            .map((a) => setNfts((prev) => [...prev, a]))
      );
  }

  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    /*     !session && router.push("/");
     */
  
    /*  imgUrl(1);
    imgUrl(2);
    imgUrl(3);
    imgUrl(4);
    imgUrl(5);
    imgUrl(6);
    imgUrl(7);
    imgUrl(8);
    imgUrl(9);
    imgUrl(10); */
   /*  console.log(session);
    console.log(userSession); */

  }, []);

  const dataa = {
    id: session && session.user.address,
    snapshot: `${Date.now()}`,
    nickname: "test",
    points: 0,
    twitter: null,
    discord: null,
  };

  const fetchUsers = async () => {
    /*  getAllUsuarios().then((data) => {
      data.map((a) => a.id !== session && session.user.address) &&
        saveUser(dataa);
   
      console.log(data.filter((a) => a.id === session && session.user.address))
    }); */
    setUsers(await getUser(session && session.user.address));
  };

  const numeros = [1, 2, 2, 3, 4, 4, 5];

  const eliminaDuplicados = (arr) => {
    const unicos = [];

    for (var i = 0; i < arr.length; i++) {
      const elemento = arr[i];

      if (!unicos.includes(arr[i])) {
        unicos.push(elemento);
      }
    }

    return unicos;
  };

  const sendtostake = (a) => {
    if (a === "all") {
      const tostake = nfts.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const dataa = {
        id: session && session.user.address,
        staked: tostake.concat(users.staked),
      };
      updateNfts(dataa);
      fetchUsers();
      setNfts([]);
    } else if (a === "unstakeall") {
      stake.map((e) => setNfts((prev) => [...prev, e]));
      setStake([]);
      const dataa = {
        id: session && session.user.address,
        staked: [],
      };
      updateNfts(dataa);
      fetchUsers();
    } else if (a === "unstake") {
      select2.map((e) => setNfts((prev) => [...prev, e]));

      setStake(stake.filter((el) => !select2.includes(el)));

      const tounstake = select2.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));
    } else if (a === "claimall") {
      let result = [];

      nfts.forEach((e) =>
        users.staked.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
      console.log("result");
      console.log(result);
      const tostake2 = result.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const data2 = {
        id: session && session.user.address,
        staked: tostake2,
      };

      const datapoints = {
        id: session && session.user.address,
        points: users.points + puntoss,
      };
      updateNfts(data2);
      updatePoints(datapoints);
      fetchUsers();
    } else {
      select.map((e) => setStake((prev) => [...prev, e]));
      setNfts(nfts.filter((el) => !select.includes(el)));
      const tostake = select.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const dataa = {
        id: session && session.user.address,
        staked: tostake.concat(users.staked),
      };
      updateNfts(dataa);
      fetchUsers();
    }

    setSelect([]);
    setSelect2([]);
  };

  const addToStake = (a) => {
    if (select.filter((b) => b.tokenAddress === a.tokenAddress).length > 0) {
      setSelect(select.filter((b) => b.tokenAddress !== a.tokenAddress));
    } else {
      setSelect([...select, a]);
    }
  };
  const addToUnStake = (a) => {
    if (select2.filter((b) => b.tokenAddress === a.tokenAddress).length > 0) {
      setSelect2(select2.filter((b) => b.tokenAddress !== a.tokenAddress));
    } else {
      setSelect2([...select2, a]);
    }
  };

  const filtrar = (b) => {
    let result = [];

    // Find unique elements in arr1 & push them into result
    nfts.forEach((e) =>
      b.find((f) => f.tokenAddress === e.tokenAddress) ? null : result.push(e)
    );
    // Find unique elements in arr2 & push them into result
    /*  arr2.forEach((e) => (arr1.find((f) => f === e) ? null : result.push(e))); */

    return result;
  };

  let puntoss = 0;

  const points = (a, index) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = Math.ceil(
      diferenciaEnMilisegundos / (1000 * 60 * 60)
    );

    /*     const result = (diferenciaEnHoras - 1) * qtyxhr;
     */
    const result = 10;
    return result;
  };
  const pointsearn = (a, index) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = Math.ceil(
      diferenciaEnMilisegundos / (1000 * 60 * 60)
    );

    const result = (diferenciaEnHoras - 1) * qtyxhr;

    result = 10;
    puntoss = puntoss + result;
  };

  const updatestake = (a) => {
    let result = [];

    a &&
      a.forEach((e) =>
        nfts.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
    /* console.log('filtrado')
  console.log(result) */
    return result;
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center items-center w-full h-full pb-20 bg-tesmo">
          <div className="w-full h-full px-20 mt-10 flex md:flex-row gap-10 ">
            <div className="flex flex-col w-full ">
              {/* <h1>
                Scraping data from: 9W9544WeacCPGAFip7tuB9htw5SUrC6LRuNLaAfPspeK
              </h1> */}
              <div className="flex justify-between p-6 mb-4 shadow-slate-700 shadow-lg rounded-lg items-center">
                <h1 className=" text-[1.6rem] text-slate-300 font">
                  UnLocked:{" "}
                  {users && users.staked && filtrar(users.staked).length}
                </h1>

                <div className="flex-col">
                  <h2 className="text-slate-600 font text-[1.4rem]">Balance</h2>
                  <div className="flex  items-center gap-2">
                    <GiTwoCoins className="text-purple-300 font text-[1.4rem]" />
                    <p className="text-purple-300 font text-[1.4rem]">
                      {users && users.staked && users.points}
                    </p>
                  </div>
                </div>
              </div>
              <div className="shadow-lg relative shadow-slate-700 p-4  rounded-lg w-full h-[530px]">
                <div className=" grid grid-cols-4 h-[380px] overflow-auto">
                  {/*                   {nfts && nfts.result.assets.map((a, index) => (
                   */}{" "}
                  {/*                     nfts.filter(a => a.tokenAddress !== '2FWVhyTS3vQJUmqT6QJCGzf599batbLTf24mSpWZCf36')
                   */}{" "}
                  {nfts &&
                    users &&
                    users.staked &&
                    filtrar(users.staked).map((a, index) => (
                      <div
                        key={index}
                        onClick={() => addToStake(a)}
                        className={`${
                          select.includes(a)
                            ? "bg-tesmo2 border-2 border-slate-400"
                            : "bg-tesmo"
                        }  mx-auto hover:border-2 mt-2 transition-all 2s ease-in border-2 cursor-pointer hover:border-tesmo2 h-[180px]  hover:bg-tesmo2 border-tesmo p-2 rounded-lg`}
                      >
                        <img
                          className="w-[100px] object-contain mx-auto rounded-lg"
                          src={a.imageUrl}
                          alt="nft"
                        />
                        <p className="text-white text-center text-[0.9rem] mt-2">
                          {a.name}
                        </p>
                        <div className="text-center text-yellow-300 font-bold flex justify-center  items-center gap-2 ">
                          <GiTwoCoins />{" "}
                          {a.name.slice(0, 4) === "Ruby" ? 2 * qtyxhr : qtyxhr}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between p-4 mt-4 bg-tesmo2 shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                  <div className="flex items-center">
                    <h1 className=" text-[1.2rem] text-slate-300 font">
                      Selected:{" "}
                    </h1>
                    <h1 className=" text-[1.2rem] text-slate-300 font ml-2">
                      {select.length}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => sendtostake()}
                      className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1.4rem]"
                    >
                      Stake
                    </button>
                    <button
                      onClick={() => sendtostake("all")}
                      className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1.4rem]"
                    >
                      Stake All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <div className="flex justify-between p-6 mb-4 shadow-slate-700 shadow-lg rounded-lg items-center">
                <h1 className=" text-[1.6rem] text-slate-300 font">
                  Locked:{" "}
                  {users && users.staked && updatestake(users.staked).length}
                </h1>

                <div className="flex-col flex">
                  <h2 className="text-slate-600 font text-[1.4rem]">Earning</h2>
                  <div className="flex  items-center gap-2">
                    <GiTwoCoins className="text-purple-400 font text-[1.4rem]" />
                    <p className="text-purple-400 font text-[1.4rem]">
                      {users &&
                        users.staked &&
                        updatestake(users.staked).map((a) =>
                          pointsearn(a.snapshot)
                        )}
                      {puntoss}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => sendtostake("claimall")}
                  className="text-white px-8 py-2 rounded-lg border-2 border-slate-700 hover:bg-white hover:text-slate-700 bg-slate-700 cursor-pointer font text-[1.4rem]"
                >
                  Claim
                </button>
              </div>
              <div className="shadow-lg relative shadow-slate-700 p-4  rounded-lg w-full h-[530px]">
                <div className=" grid grid-cols-4 h-[370px] overflow-auto">
                  {users &&
                    users.staked &&
                    updatestake(users.staked).map((a, index) => (
                      <div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          ease: "easeOut",
                          duration: 0.5,
                          delay: 0.3 + index / 5,
                        }}
                        onClick={() => addToUnStake(a)}
                        className={`${
                          select2.includes(a)
                            ? "bg-tesmo2 border-2 border-slate-400"
                            : "bg-tesmo"
                        }  mx-auto hover:border-2 mt-2 transition-all 2s ease-in border-2 cursor-pointer hover:border-tesmo2 hover:bg-tesmo2 border-tesmo p-2 h-[250px] rounded-lg`}
                      >
                        <img
                          className="w-[100px] object-contain mx-auto rounded-lg"
                          src={a.imageUrl}
                          alt="nft"
                        />
                        <p className="text-white text-center text-[0.9rem] mt-2">
                          {a.name}
                        </p>
                        <div className="text-center text-yellow-300 font-bold flex justify-center  items-center gap-2 ">
                          <GiTwoCoins /> {points(a.snapshot, index)}
                        </div>
                        {/* <div></div> */}
                        {points(a.snapshot) > 11 && (
                          <button
                            onClick={() => alert("Wait 24 hs")}
                            className="text-white px-4 py-2 rounded-lg border-2 border-slate-700 hover:bg-white hover:text-slate-700 bg-orange-400 cursor-pointer font text-[0.7rem] mx-auto flex justify-center"
                          >
                            Claim
                          </button>
                        )}

                        {/*   <Countdown
                                                className="text-white justify-center flex "
                                                date={Date.now() + 86399000}
                                            /> */}
                        {/*  <Countdown
                          className="text-white "
                          date={parseInt(a.snapshot) + 864000}
                        /> */}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between p-4 mt-4 bg-tesmo2 shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                  <div className="flex items-center">
                    <h1 className=" text-[1.2rem] text-slate-300 font">
                      Selected:{" "}
                    </h1>
                    <h1 className=" text-[1.2rem] text-slate-300 font ml-2">
                      {select2.length}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => sendtostake("unstake")}
                      className="text-white px-8 py-2 rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700 bg-blue-700 cursor-pointer font text-[1.4rem]"
                    >
                      unStake
                    </button>
                    <button
                      onClick={() => sendtostake("unstakeall")}
                      className="text-white px-8 py-2 rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700 bg-blue-700 cursor-pointer font text-[1.4rem]"
                    >
                      UnStake All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*  <div className="w-full h-[60vh] text-white justify-center flex items-center flex-col text-[1.6rem] md:text-[2rem] menu">
          <p>The raffle will be held in</p>
          <Countdown date={Date.now() + 80000000} />
          <div className="mt-20 text-center">
            <p className="text-white font text-[1rem]">
              Prize: 1 Thesmophoria nft
            </p>
            <p className="text-white font text-[1rem]">
              Only to <span className="font-bold">delisted</span> holders.
            </p>
            <p className="text-white font text-[1rem] underline">
              Snapshot at any time
            </p>
            <p className="text-white font text-[1rem]">
              Buy your tickets{" "}
              <a
                href="https://magiceden.io/marketplace/tesmophoria"
                className="text-pink-500 font-bold"
              >
                Magic Eden
              </a>
              .
            </p>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default staked;
