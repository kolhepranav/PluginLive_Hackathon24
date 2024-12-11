// components/InterviewPreparation.jsx
"use client"
import React from "react";
import Link from "next/link";  // Import Next.js Link component
import { FaChalkboardTeacher, FaBrain, FaUsers, FaBuilding, FaLaptopCode, FaRocket } from "react-icons/fa";

const InterviewPreparation = () => {
  const companies = [
    "Microsoft",
    "Google",
    "Amazon",
    "Meta",
    "Apple",
    "Netflix"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-4">
            <span className="block">Your Dream Tech Career Awaits!</span>
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Leading tech giants are actively hiring. Prepare, Excel, and Land your dream role.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {companies.map((company, index) => (
              <span key={index} className="px-4 py-2 bg-white rounded-full text-indigo-600 font-semibold shadow-sm">
                {company}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-indigo-50">
            <div className="text-indigo-600 mb-6">
              <FaLaptopCode className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Master Technical Skills</h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Access comprehensive study materials and practice real coding challenges
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-indigo-50">
            <div className="text-indigo-600 mb-6">
              <FaBrain className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Interview Preparation</h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Mock interviews, behavioral questions, and system design practice
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 border border-indigo-50">
            <div className="text-indigo-600 mb-6">
              <FaRocket className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Career Growth</h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Resume reviews, networking opportunities, and career mentorship
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-10 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-2">Ready to Begin?</h2>
              <p className="text-lg opacity-90">Take the first step towards your dream career</p>
            </div>
            <Link
              href="/main/Interview/assesment"  // Use Next.js Link with the path to the assessment page
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-white text-indigo-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-150 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;
