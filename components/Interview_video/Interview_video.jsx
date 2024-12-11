"use client"

import React, { useState } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaEye } from "react-icons/fa";

const VideoPlaybackQuestions = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Tell us about yourself?",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
      id: 2,
      question: "What’s your view on remote work culture?",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
    },
    {
      id: 3,
      question: "How do you stay updated with industry trends?",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4"
    },
    {
      id: 4,
      question: "What inspired you to choose your career path?",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4"
    }
  ];

  const handleQuestionClick = (index) => {
    setActiveQuestionIndex(index);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
      setIsPlaying(false);
    }
  };

  const handleSubmit = (questionId) => {
    console.log("Submitted Question ID:", questionId);
  };

  const handlePreview = (index) => {
    setActiveQuestionIndex(index);
    setIsPlaying(true);
    const video = document.getElementById("video-player");
    if (video) {
      video.play();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById("video-player");
    if (video) {
      isPlaying ? video.pause() : video.play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const video = document.getElementById("video-player");
    if (video) {
      video.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.getElementById("video-player");
    if (video) {
      video.muted = !isMuted;
    }
  };

  return (
    // <div className="min-h-screen bg-gray-100 p-6">
      <div className=" max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Video Player */}
          <div className="lg:w-2/3 p-6">


            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                id="video-player"
                className="w-full aspect-video"
                src={questions[activeQuestionIndex].videoUrl}
                onEnded={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 accent-blue-500"
                    aria-label="Volume control"
                  />
                </div>
              </div>


              
            </div>


           
      <h1 className="dyanamic_ques mt-11 text-center text-4xl font-extrabold text-blue-600 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text  p-4">
      {questions[activeQuestionIndex].question}
      </h1>
    
          </div>









          {/* Right Column - Questions and Controls */}
          <div className="lg:w-1/3 p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Questions</h2>
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      index === activeQuestionIndex
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    aria-current={index === activeQuestionIndex ? "true" : "false"}
                  >
                    <span className="font-medium">{question.question}</span>
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreview(index)}
                      className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <FaEye className="mr-2" /> Preview
                    </button>
                    <button
                      onClick={() => handleSubmit(question.id)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-6">
              <button
                onClick={handlePrevious}
                disabled={activeQuestionIndex === 0}
                className={`px-4 py-2 rounded-lg ${
                  activeQuestionIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={activeQuestionIndex === questions.length - 1}
                className={`px-4 py-2 rounded-lg ${
                  activeQuestionIndex === questions.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default VideoPlaybackQuestions;



























