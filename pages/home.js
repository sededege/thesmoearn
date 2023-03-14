import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import Layout from "../app/components/Layout";
import { hashlist } from "../app/components/Hashlist";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let isAutorized = true;
  let data = [];
  let url = "";
  if (!session) {
    const options = {
      network: "mainnet",
      address: session && session.user.address,
      /* address: 'AK3EpwLuTLsRqoMDz2hqCv5rq6tPfaWcVSNqKcrY7sGK', */
    };
  
    const result = await axios.post(
      "http://localhost:3000/api/solanaAPI/getNFTs",
      options,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (result.data.length > 0) {
      for (let item of result.data) {
        data = [...data, item.mint];
      }
    }

    const existe = hashlist.filter((el) => data.includes(el));
    console.log(existe);

    if (existe.length > 0) {
      isAutorized = true;
    } else {
      isAutorized= false
    }
    /* const result2 = await axios.post(
      "http://localhost:9000/getNFTMetadata",
      options2,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const image = await fetch(result2.data.metaplex.metadataUri).then(
      (response) => response.json()
    );

    console.log(result2);
    url = image.image; */

  
  }

  return {
    props: {
      userSession: session,
      isAutorized: isAutorized,
      data: data,
      image: url,
    },
  };
}

export default function Home({ userSession, isAutorized, data, image}) {
  const router = useRouter();
  useEffect(() => {
    !userSession ? router.push("/") : console.log(userSession);
  }, [userSession]);

  if (userSession) {
    return (
      <Layout>
      
       {/*  {isAutorized ? (
          <div className="flex w-full ">
            <div className="w-full ">
              <h1 className="font text-[2rem]">Weakly Challenges</h1>
              <div className="grid grid-cols-6 gap-4 w-full">
                <Cardnft />
                <Cardlisting />
                <Cardnft />
              </div>
              <h1 className="font text-[2rem] mt-10">Raid 2 earn</h1>
              <div className="grid grid-cols-3 gap-4 w-full">
                <Cardtweet
                  username="Thesmophoria"
                  user="@thesmophoria_"
                  image="https://pbs.twimg.com/profile_images/1624072503650918400/gWUWe8uG_400x400.jpg"
                  tweet="GM Goddesses and Kings! Happy Monday to you💓

                We love our active, passionate and inspiring community. We will not let you down and that is a promise!"
                />
                <Carddiscord
                  username="ASAC ROCKY"
                  user="Macks"
                  link="https://discord.gg/macks"
                  image="https://pbs.twimg.com/profile_images/1630989093088665607/TYNpUvma_400x400.jpg"
                  reason="Check your wallets. :salute: 

                There were 401 MNGA Hat items sent out in total..."
                />
              </div>
            </div>
           
          </div>
        ) : (
          <>
          <LogoutBtn />
          <Counter/>
          </>
          
        )} */}
        <div className="w-full h-[80vh] justify-center items-center flex font text-[1.5rem]">
        <p>Coming Soon</p>

        </div>
      </Layout>
    );
  }
}
