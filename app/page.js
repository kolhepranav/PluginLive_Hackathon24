// ---------default -----------------

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="">
//      hey
//     </div>
//   );
// }

















"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';


import modi from "../public/assets/imgs/modi.jpg";
import logoLeft from "../public/assets/imgs/logo3.png"; // Dummy left logo
import logoRight from "../public/assets/imgs/ministry of law.png"; // Dummy right logo

// import UserInformationModal from "@/components/UserInformationModal/UserInformationModal";

import { getAuth, signInWithPopup } from "firebase/auth"; // Firebase Auth functions
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { provider } from "../app/firebase/config.js";

import NProgress from "nprogress"; // Import NProgress
import "nprogress/nprogress.css"; // Import NProgress styles


const modi_main = modi.src;



// app/page.js
// import MainDash from './(route)/main/MainDash/MainDash';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false); // State to track loading

  const router = useRouter(); // Initialize Next.js router




  //   const handleLogin = async () => {
  //     const auth = getAuth(); // Initialize Firebase Authentication

  //     try {
  //         // Trigger the sign-in process with Google popup
  //         const result = await signInWithPopup(auth, provider);
  //         const user = result.user; // Get the authenticated user details

  //         // Log user email to console
  //         console.log("User signed in:", user.email);

  //         // Redirect to the /main page after successful login
  //         router.push("/main");
  //     } catch (error) {
  //         // Handle errors, e.g., user closed the popup, network issues, etc.
  //         console.error("Error during sign-in: ", error);
  //     }
  // };






  const handleLogin = async () => {
    const auth = getAuth(); // Initialize Firebase Authentication

    try {
      // Start NProgress when login is initiated
      NProgress.start();

      // Trigger the sign-in process with Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Get the authenticated user details

      // Log user email to console
      console.log("User signed in:", user.email);

      // Redirect to the /main page after successful login
      router.push("/main");

      // Complete NProgress after routing
      NProgress.done();
    } catch (error) {
      // Handle errors, e.g., user closed the popup, network issues, etc.
      // console.error("Error during sign-in: ", error);

      // Complete NProgress in case of error
      NProgress.done();
    }
  };


  return (

    <div>
      <header>
        <div className="mx-auto flex justify-between items-center h-20 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* Left Logo */}
          <div className="flex items-center mt-9">
            <Image
              src={logoLeft}
              alt="Left Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Right Logo
          <div className="flex items-center mt-5">
            <Image
              src={logoRight}
              alt="Right Logo"
              width={200}
              height={60}
              className="object-contain"
            />
          </div> */}

          
        </div>
      </header>

      <section className=" flex flex-col lg:flex-row items-center justify-between mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 gap-8">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold sm:text-4xl text-gray-700">
          Welcome to Plugin
          </h2>
           
          <p className="mt-4 text-gray-500 font-semibold text-lg">

          Elevate your English communication with our AI-powered platform, offering real-time speech-to-text conversion, grammar and pronunciation analysis, and fluency feedback tailored for Indian accents. Perfect for interviews, presentations, and personal growth, our system delivers actionable insights to help you excel.
            <br /><br />
            Record and analyze your responses with ease on our secure, user-friendly platform. Access detailed reports, personalized improvement plans, and optional features like body language analysis—all designed to transform your communication skills anytime, anywhere



          </p>

          <div className="mt-8 flex">
            <a
                onClick={handleLogin}
              className="cursor-pointer bg-orange-400 px-12 py-3 text-md font-bold text-white transition hover:bg-gray-400 rounded-full focus:outline-none focus:ring focus:ring-grey-400 mr-4"
             
            >
              Login As User
            </a>


            <a
              onClick={handleLogin}
              className="cursor-pointer bg-gray-400 px-12 py-3 text-md font-bold text-white transition hover:bg-orange-400 rounded-full focus:outline-none focus:ring focus:ring-yellow-400"

            >
              Login As Admin
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src={modi_main}
            alt="Modi Image"
            width={500}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>
      </section>
     
    </div>



  );
}

