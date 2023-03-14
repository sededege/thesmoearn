import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import LoginBtn from "./loginBtn/loginBtn";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
/* session && session.user && console.log(session.user.message)
 */
const router = useRouter()
React.useEffect(() => {
  router.push('/stake')
}, [])

  return (
    <>
      {session && session.user && session.user.signature === 'false' ? (
        <>
          <Header />
          <div className="px-20 w-full h-full bg-tesmo text-white pb-10 flex">
            {children}
          </div>
          <Footer />
        </>
      ) : (
        <div className="px-20 w-full h-full bg-tesmo text-white pb-10 flex">
         
          <LoginBtn/>
        </div>
      )}
    </>
  );
};

export default Layout;
