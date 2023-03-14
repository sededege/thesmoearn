import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Layout from "../app/components/Layout";
import Cardreward from "../app/components/Cardreward";


export async function getServerSideProps(context) {
  const session = await getSession(context);
  let isAutorized = true;
  let data = [];
  let url = "";
 /* if (session) {
    const options = {
      network: "mainnet",
      address: session.user.address,
    };
    const options2 = {
      network: "mainnet",
      address: "GZLZPBh6tgWEnWQS6bBapWnt77xuAvyNBJBuUKp2omov",
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
        if (item.mint === "DKrqwLb2JbdSpVh5bcWEx9PHpJLDLcsKjEfGSDULqGCk") {
          isAutorized = true;
        } else {
          data = [...data, item.mint];
        }
      }
    }

    const result2 = await axios.post(
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
    url = image.image;
  } */

  return {
    props: {
      userSession: session,
      isAutorized: isAutorized,
     /*  data: data, */
     /*  image: url, */
    },
  }; 

}

export default function Home({ userSession, isAutorized, data, image }) {
  const router = useRouter();
  useEffect(() => {
    !userSession ? router.push("/") : console.log(userSession);
  }, [userSession]);

  if (userSession) {
    return (
      <Layout>
        {isAutorized && (
          <div className="flex w-full ">
            <div className="w-full ">
             
              <h1 className="font text-[2rem]">Rewards</h1>
              <div className="grid grid-cols-5 gap-4 w-full">
                {/*  <Cardtweet /> */}
                <Cardreward
                  tickets={200}
                  price={1000}
                  buyed={100}
                  time={2000000000}
                  metadata={"LILY #2123"}
                  image="https://img-cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https%3A%2F%2Fbafybeiabyijjqpe7gzmeqrscyxe7cghxbzgsv3glj7k57264nvgshtftem.ipfs.nftstorage.link%2F8654.png%3Fext%3Dpng"
                />
                <Cardreward
                  tickets={999}
                  price={1000}
                  buyed={333}
                  time={4000000000}
                  metadata={"Okay Bears #4323"}
                  image="https://img-cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https%3A%2F%2Fbafybeia26bhw25vnfx7fxhbtzhj3oj6oui4jqnfrweww5zwkbtqvaabqfe.ipfs.nftstorage.link%2F1035.png%3Fext%3Dpng"
                />
                <Cardreward
                  tickets={20}
                  price={20000}
                  buyed={10}
                  metadata={"SolCasino WL"}
                  image="https://pbs.twimg.com/profile_images/1630676277265854464/yn2zpUVs_400x400.jpg"
                />
              </div>
            </div>
          
          </div>
        )}
      </Layout>
    );
  }
}
