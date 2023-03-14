import React from "react";
import { Button } from "@web3uikit/core";
import { signIn, useSession } from "next-auth/react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { hashlist } from "../Hashlist";
import LogoutBtn from "../logoutBtn/logoutBtn";
import Image from "next/image";

export default function LoginBtn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const authenticate = async () => {
    const provider = window.phantom?.solana;
    const resp = await provider.connect();
    const address = resp.publicKey.toString();
    const chain = "mainnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    const message = "Welcome to Valhalla";
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const signature = await isHolder();
    let url = "https://thesmoearn.vercel.app";
    async function isHolder() {
      let data = [];
      const options = {
        address: address,
        network: "mainnet",
      };

      const result = await axios.post(`${url}/api/solanaAPI/getNFTs`, options, {
        headers: {
          "content-type": "application/json",
        },
      });
      if (result.data.length > 0) {
        for (let item of result.data) {
          data.push(item.mint);
        }
      }

      if (data.length > 0) {
        const existe = hashlist.filter((el) => data.includes(el));
        if (existe && existe.length > 0) {
          /* return 'true' */
          return true;
        } else {
          return false;
        }
      }
    }

    try {
      await signIn("credentials", {
        address,
        chain,
        message,
        signature,
        redirect: false,
      });
    } catch (e) {
      return;
    }
  };

  const msg = "This wallet dont have any Thesmophoria NFT.";

  return (
    <div className="w-screen h-[90vh] items-center flex justify-center flex-col gap">
      <Image src="/img/logo.jpg" alt="logo" width={200} height={200} />
      <h1 className="font w-[300px] text-center ">
        You need at the least 1 nft to enter on Valhalla.
      </h1>
      {session && session.user && session.user.signature === "false" && (
        <p className="p-4 text-red-500 font-bold">{msg} </p>
      )}
      {/*  <Button
          text="Login"
          theme="primary"
          onClick={() => {
            authenticate();
          }}
        /> */}
      <div className="flex gap-2 mt-4">
        <a
          href="https://magiceden.io/marketplace/tesmophoria"
          className="bg-pink-500 px-10 p-2 items-center flex justify-center rounded-lg cursor-pointer"
        >
          Enter on Valhalla
        </a>

        {session && session.user && session.user.signature === "false" ? (
          <LogoutBtn />
        ) : (
          <button
            onClick={() => {
              authenticate();
            }}
            className="bg-purple-500 px-10 p-2 items-center flex justify-center rounded-lg cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
