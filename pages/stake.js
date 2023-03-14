/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useCallback } from "react";
import { GiTwoCoins } from "react-icons/gi";
import Layout from "../app/components/Layout";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import {
  saveUser,
  getAllUsuarios,
  updateNfts,
  getUser,
  updatePoints,
} from "../app/components/utils/firebaseFunctions";
import { motion, animatePresence } from "framer-motion";

export async function getServerSideProps(context) {
  const session = await getSession(context);
      const wallet = session && session.user.address;
 
/*  const wallet = "9W9544WeacCPGAFip7tuB9htw5SUrC6LRuNLaAfPspeK";
 */
  if (session) {
    

   

    const fetchnfts = async(num) => {

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
      return await fetch(
      "https://billowing-virulent-gas.solana-mainnet.discover.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      options
    )
      .then((res) => res.json())
      .then((res) => {
      return res.result.assets
/*            .filter((b) => b.collectionAddress === "HNvbqajUp8tYYRRBwm4cqeRQRbahLLTSLdvgi6QzM4cB")
 */           .filter((b) => b.collectionName === "Blessed Dogs")
          .map((a) => a)
        
      });

    
    }
    const checkuser = async (a) => {
      const res = await getUser(a);
      if (res) {
        return res;
      } else {
        const dataa = {
          id: session && session.user.address,
          snapshot: `${Date.now()}`,
          nickname: "test",
          points: 0,
          twitter: null,
          discord: null,
          staked: [],
        };
        saveUser(dataa);
        return await getUser();
      }
    };
let array = []
    return {
      props: {
        userSession: session && session.user.address,
        test: [].concat(await fetchnfts(1), await fetchnfts(2),await fetchnfts(3),await fetchnfts(4)),
        userss: await checkuser(session.user.address),
        allusers: await getAllUsuarios(),
      },
    };
  } else {
    return {
      props: {
        userSession: session && session.user.address,
      },
    };
  }
}

const staked = ({ userSession, test, userss, allusers }) => {
  const [staking, setStaking] = useState(false);
  const [nfts, setNfts] = useState(test);

  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);
  const [stake, setStake] = useState(userss);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const data = [];
  let qtyxhr = 10;
  let supply = 100;
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    
   console.log(session)
       
 /*   console.log(test)
    session && test === undefined && location.reload();
 */

    setStaking(false);

  }, [session]);

  const dataa = {
    id: session && session.user.address,
    snapshot: `${Date.now()}`,
    nickname: "test",
    points: 0,
    twitter: null,
    discord: null,
  };

  const sendtostake = (a) => {
    if (a === "all") {
      const tostake = filtrar(stake.staked).map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points:  a.name.slice(0, 4) === "Ruby"
        ? 3 * qtyxhr
        : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const dataa = {
        id: session && session.user.address,
        staked: tostake.concat(stake.staked),
      };
      updateNfts(dataa);
      setNfts([]);
      setStake({staked:tostake.concat(stake.staked)})

    } else if (a === "unstakeall") {
      stake && stake.staked.map((e) => setNfts((prev) => [...prev, e]));
     /*  setStake([]); */
      const dataa = {
        id: session && session.user.address,
        staked: [],
      };
      updateNfts(dataa);
      setStake({staked:[]})

    }/*  else if (a === "unstake") {
      select2.map((e) => setNfts((prev) => [...prev, e]));

      setStake(stake.filter((el) => !select2.includes(el)));

      const tounstake = select2.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));
    }  */else if (a === "claimall") {
      let result = [];

     nfts.forEach((e) =>
        stake.staked.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );

      
      const tostake2 = result.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points:  a.name.slice(0, 4) === "Ruby"
        ? 3 * qtyxhr
        : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const data2 = {
        id: session && session.user.address,
        staked: tostake2,
      };

      const datapoints = {
        id: session && session.user.address,
        points: userss.points + puntoss,
      };
      updateNfts(data2);
      updatePoints(datapoints);

    } else {
      setNfts(nfts.filter((el) => !select.includes(el)));
      const tostake = select.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points:  a.name.slice(0, 4) === "Ruby"
        ? 3 * qtyxhr
        : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));


      const dataa = {
        id: session && session.user.address,
        staked: tostake.concat(stake.staked),
      };
      updateNfts(dataa);
      setStake({staked:tostake.concat(stake.staked)})
    }
    /* setStaking(true); */
    setSelect([]);
    setSelect2([]);
    /* router.push("/stake"); */
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
    b && test.forEach((e) =>
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

    const result = (diferenciaEnHoras - 1) * qtyxhr;

    /*      const result = 10;
     */ return result;
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

    /* let result = 10 */
    puntoss = puntoss + result;
  };
  let thes = 0;
  const pointsearn2 = (a) => {
    /* let result = 10 */
    thes = thes + a;
  };

  const updatestake = (a) => {
    let result = [];

    a &&
      a.forEach((e) =>
      test.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
    return result;
  };
  let totalstaked = 0;
  const calculatestake = (a) => {
    totalstaked = totalstaked + a;
  };

  
  return (
    <Layout>
      {nfts ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.5,
            delay: 0.3 / 5,
          }}
          className="flex flex-col w-full h-full"
        >
          {staking && (
            <div className="w-full justify-center flex items-center h-[90vh] fixed z-[1000]">
              <div className="w-[200px] h-[100px] flex justify-center items-center bg-tesmo opacity-80 rounded-lg fixed">
                <p className="text-white font fixed ">Loading</p>
              </div>
            </div>
          )}

          <div className=" pb-4 flex items-center flex-col justify-center ">
            <h1 className="text-white menu text-[1.5rem] font ">Vault</h1>
            {allusers &&
              allusers.map((b) => b.staked && calculatestake(b.staked.length))}
            {totalstaked > 0 && (
              <div className="w-1/2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-purple-600 text-lg font-bold font text-blue-100 text-center  leading-none rounded-full text-[0.8rem]"
                  style={{
                    width: `${Math.round((100 * totalstaked) / supply)}%`,
                  }}
                >
                  {totalstaked > 0
                    ? Math.round((100 * totalstaked) / supply)
                    : 0}{" "}
                  %
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center w-full h-full mt-8  bg-tesmo">
            <div className="w-full h-full px-10 flex md:flex-row gap-10 ">
              <div className="flex flex-col w-full ">
                <div className="flex justify-between p-6 mb-4 shadow-slate-700 shadow-lg rounded-lg items-center">
                  <h1 className=" text-[1.6rem] text-slate-300 font">
                    UnLocked: {userss && filtrar(stake.staked).length}
                  </h1>

                  <div className="flex-col">
                    <h2 className="text-slate-600 font text-[1.4rem]">
                      Balance
                    </h2>
                    <div className="flex  items-center gap-2">
                      <GiTwoCoins className="text-purple-300 font text-[1.4rem]" />
                      <p className="text-purple-300 font text-[1.4rem]">
                        {userss && userss.points}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shadow-lg relative shadow-slate-700 p-4  rounded-lg w-full h-[400px]">
                  <div className=" grid grid-cols-5 h-[300px] overflow-auto gap-2">
                    {/*                   {nfts && nfts.result.assets.map((a, index) => (
                     */}{" "}
                    {/*                     nfts.filter(a => a.tokenAddress !== '2FWVhyTS3vQJUmqT6QJCGzf599batbLTf24mSpWZCf36')
                     */}{" "}
                    {userss && stake && nfts &&
                      filtrar(stake.staked).map((a, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            ease: "easeOut",
                            duration: 0.5,
                            delay: 0.3 + index / 5,
                          }}
                          onClick={() => addToStake(a)}
                          className={`${
                            select.includes(a)
                              ? "bg-tesmo2 border-2 border-slate-300"
                              : "bg-tesmo"
                          }  mx-auto transition-all 2s ease-in border-[1px] border-tesmo cursor-pointer  h-[185px]  hover:bg-tesmo2  p-2 rounded-lg`}
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
                            {a.name.slice(0, 4) === "Ruby"
                              ? 3 * qtyxhr
                              : qtyxhr}
                          </div>
                        </motion.div>
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
                        className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                      >
                        Stake
                      </button>
                      <button
                        onClick={() => sendtostake("all")}
                        className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                      >
                        Stake All
                      </button>
                      <button
                        onClick={() => sendtostake("unstakeall")}
                        className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                      >
                        Unstake all
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <div className="flex justify-between p-6 mb-4 shadow-slate-700 shadow-lg rounded-lg items-center">
                  <h1 className=" text-[1.6rem] text-slate-300 font">
                    Locked: {userss && updatestake(stake.staked).length}
                  </h1>

                  <div className="flex-col flex">
                    <h2 className="text-slate-600 font text-[1.4rem]">
                      Earned
                    </h2>
                    <div className="flex  items-center gap-2">
                      <GiTwoCoins className="text-purple-400 font text-[1.4rem]" />
                      <p className="text-purple-400 font text-[1.4rem]">
                        {userss &&
                          updatestake(stake.staked).map((a) =>
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
                    Claim all
                  </button>
                </div>
                <div className="shadow-lg relative shadow-slate-700 p-4  rounded-lg w-full h-[400px]">
                  <div className=" grid grid-cols-5 h-[300px] overflow-auto gap-2">
                    {userss && 
                      updatestake(stake.staked).map((a, index) => (
                        <motion.div
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
                          }  mx-auto hover:border-2 transition-all 2s ease-in border-2 cursor-pointer hover:border-tesmo2 hover:bg-tesmo2 border-tesmo p-2 h-[185px] rounded-lg`}
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

                          {/*   <Countdown
                                      className="text-white justify-center flex "
                                      date={Date.now() + 86399000}
                                  /> */}
                          {/*  <Countdown
                className="text-white "
                date={parseInt(a.snapshot) + 864000}
              /> */}
                        </motion.div>
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
                      {/*   <button
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
    </button> */}
                      <p className="font-bold">
                        {" "}
                        {userss &&
                          updatestake(stake.staked).map((a) =>
                            pointsearn2(a.points)
                          )}
                        {thes} THES/hr
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="w-full h-[80vh] items-center justify-center flex font text-[1.4rem]">
          <p>Loading...</p>
        </div>
      )}
    </Layout>
  );
};

export default staked;
