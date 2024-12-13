



"use client"; // Make the component client-side
import { useState ,useEffect} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { auth, provider } from "../../app/firebase/config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { FaSignInAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export default function Sidebar() {
  const [user, setUser] = useState(null); // State to track authenticated user
  const pathname = usePathname();
  const activeClasses = 'bg-white flex items-center text-primary gap-2 px-2 md:px-4 py-1 pr-2 md:pr-7 mb-2 rounded-xl rounded-r-none justify-center md:justify-start';
  const inactiveClasses = 'block px-2 md:px-4 pr-2 md:pr-7 py-1 mb-2 flex items-center gap-2 justify-center md:justify-start';
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user); // Set user state with Firebase user object
        } else {
            setUser(null); // Reset user state if not logged in
        }
    });
    return () => unsubscribe(); // Clean up the subscription on unmount
}, []);



  const links = [
    { url: '/main', label: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /></svg> },
    { url: '/main/Interview', label: 'Interview', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg> },
    // { url: '/main/Temp', label: 'Temp', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg> },
    // Add more links as needed
  ];

  const handleSignIn = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error during sign-in: ", error);
    }
};

const handleSignOut = async () => {
    try {
        await signOut(auth);
        setUser(null); // Clear user state after logout
    } catch (error) {
        console.error("Error during sign-out: ", error);
    }
};
  
  return (
    <aside className="bg-primary text-white  p-1 md:p-5 py-12 pr-0 md:pr-0 ">
      <nav className="sticky top-3 mt-44">
        {links.map(link => (
          <Link key={link.url} href={link.url}
          className={`${pathname === link.url ? activeClasses : inactiveClasses} mb-5 text-[20px] font-bold`}>
              {link.icon}
              <span className="hidden md:block">{link.label}</span>
            
          </Link>
        ))}
      </nav>
        {/* Signout or Signin Icon */}
        <div className="menuItem fixed bottom-0 flex justify-center items-end py-4 cursor-pointer" onClick={user ? handleSignOut : handleSignIn}>
                        {user ? (
                            <>
                                <CiLogout style={{ fontSize: 26 }} />
                                <span className="ml-2">{user.displayName || 'User'}</span> {/* Display user's name */}
                            </>
                        ) : (
                            <>
                            <FaSignInAlt style={{ fontSize: 26 }} />
                            <span className="ml-2">Log In</span> {/* Show "No User" when not logged in */}
                            </>
                            
                        )}
                    </div>
    </aside>
  );
}
