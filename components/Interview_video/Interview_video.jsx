// "use client"

// import React, { useState } from "react";
// import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaEye } from "react-icons/fa";

// const VideoPlaybackQuestions = () => {
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [isMuted, setIsMuted] = useState(false);

//   const questions = [
//     {
//       id: 1,
//       question: "Tell us about yourself?",
//       videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
//     },
//     {
//       id: 2,
//       question: "What’s your view on remote work culture?",
//       videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4"
//     },
//     {
//       id: 3,
//       question: "How do you stay updated with industry trends?",
//       videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4"
//     },
//     {
//       id: 4,
//       question: "What inspired you to choose your career path?",
//       videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_4mb.mp4"
//     }
//   ];

//   const handleQuestionClick = (index) => {
//     setActiveQuestionIndex(index);
//     setIsPlaying(false);
//   };

//   const handlePrevious = () => {
//     if (activeQuestionIndex > 0) {
//       setActiveQuestionIndex(activeQuestionIndex - 1);
//       setIsPlaying(false);
//     }
//   };

//   const handleNext = () => {
//     if (activeQuestionIndex < questions.length - 1) {
//       setActiveQuestionIndex(activeQuestionIndex + 1);
//       setIsPlaying(false);
//     }
//   };

//   const handleSubmit = (questionId) => {
//     console.log("Submitted Question ID:", questionId);
//   };

//   const handlePreview = (index) => {
//     setActiveQuestionIndex(index);
//     setIsPlaying(true);
//     const video = document.getElementById("video-player");
//     if (video) {
//       video.play();
//     }
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//     const video = document.getElementById("video-player");
//     if (video) {
//       isPlaying ? video.pause() : video.play();
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     const video = document.getElementById("video-player");
//     if (video) {
//       video.volume = newVolume;
//     }
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     const video = document.getElementById("video-player");
//     if (video) {
//       video.muted = !isMuted;
//     }
//   };

//   return (
//     // <div className="min-h-screen bg-gray-100 p-6">
//       <div className=" max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col lg:flex-row">
//           {/* Left Column - Video Player */}
//           <div className="lg:w-2/3 p-6">


//             <div className="relative bg-black rounded-lg overflow-hidden">
//               <video
//                 id="video-player"
//                 className="w-full aspect-video"
//                 src={questions[activeQuestionIndex].videoUrl}
//                 onEnded={() => setIsPlaying(false)}
//               >
//                 Your browser does not support the video tag.
//               </video>
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={togglePlay}
//                     className="text-white hover:text-blue-400 transition-colors"
//                     aria-label={isPlaying ? "Pause" : "Play"}
//                   >
//                     {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
//                   </button>
//                   <button
//                     onClick={toggleMute}
//                     className="text-white hover:text-blue-400 transition-colors"
//                     aria-label={isMuted ? "Unmute" : "Mute"}
//                   >
//                     {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
//                   </button>
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.1"
//                     value={volume}
//                     onChange={handleVolumeChange}
//                     className="w-32 accent-blue-500"
//                     aria-label="Volume control"
//                   />
//                 </div>
//               </div>


              
//             </div>


           
//       <h1 className="dyanamic_ques mt-11 text-center text-4xl font-extrabold text-blue-600 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text  p-4">
//       {questions[activeQuestionIndex].question}
//       </h1>
    
//           </div>









//           {/* Right Column - Questions and Controls */}
//           <div className="lg:w-1/3 p-6 bg-gray-50">
//             <h2 className="text-2xl font-bold mb-6">Questions</h2>
//             <div className="space-y-4 mb-6">
//               {questions.map((question, index) => (
//                 <div key={question.id} className="space-y-2">
//                   <button
//                     onClick={() => handleQuestionClick(index)}
//                     className={`w-full text-left p-4 rounded-lg transition-colors ${
//                       index === activeQuestionIndex
//                         ? "bg-blue-500 text-white"
//                         : "bg-white hover:bg-gray-100"
//                     }`}
//                     aria-current={index === activeQuestionIndex ? "true" : "false"}
//                   >
//                     <span className="font-medium">{question.question}</span>
//                   </button>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handlePreview(index)}
//                       className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//                     >
//                       <FaEye className="mr-2" /> Preview
//                     </button>
//                     <button
//                       onClick={() => handleSubmit(question.id)}
//                       className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between mb-6">
//               <button
//                 onClick={handlePrevious}
//                 disabled={activeQuestionIndex === 0}
//                 className={`px-4 py-2 rounded-lg ${
//                   activeQuestionIndex === 0
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={activeQuestionIndex === questions.length - 1}
//                 className={`px-4 py-2 rounded-lg ${
//                   activeQuestionIndex === questions.length - 1
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default VideoPlaybackQuestions;
































// ------latest ----------

"use client"

import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaEye, FaStop } from "react-icons/fa";
import { auth,storage,ref,uploadBytes,getDownloadURL, listAll } from "@/app/firebase/config";



const VideoPlaybackQuestions = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);  // Loading state

  const [videoUrls, setVideoUrls] = useState([]);

  const [activeQuestionIndex, 
    setActiveQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [recordingQuestionId, setRecordingQuestionId] = useState(null); // Replace isRecording state
  const [stream, setStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recordings, setRecordings] = useState({});
  const videoRef = useRef(null);
  const [isRecordedVideo, setIsRecordedVideo] = useState(false);
  const [progress, setProgress] = useState({}); // Change to object to track per-question progress
  const [isDragging, setIsDragging] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState(''); 

  const MAX_RECORDING_TIME = 60; // 60 seconds limit

  useEffect(() => {
    // Load recordings from localStorage on component mount
    const savedRecordings = localStorage.getItem('interviewRecordings');
    if (savedRecordings) {
      setRecordings(JSON.parse(savedRecordings));
    }

    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);


  }, []);


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






  const handleGenerateReport = async () => {
    try {
      // Create a reference to the Firebase Storage folder
      const storageRef = ref(storage, `${user.email}/`);

      // List all files in the folder
      const videoFiles = await listAll(storageRef);

      // Ensure there are exactly 4 videos
      if (videoFiles.items.length !== 4) {
        throw new Error('Expected 4 videos, but found ' + videoFiles.items.length);
      }

      // Fetch the download URLs of the 4 videos
      const videoUrls = await Promise.all(
        videoFiles.items.map(async (itemRef) => {
          const downloadUrl = await getDownloadURL(itemRef);
          return downloadUrl;
        })
      );

      // Store the video URLs in state variables
      setVideoUrls(videoUrls);

      // Optionally, store each URL in separate variables
      const [video1, video2, video3, video4] = videoUrls;

      // Now you have the 4 video URLs in the variables
      console.log("Video URLs:", video1, video2, video3, video4);

      // Alert that report is being generated
      alert("Report is being generated...");

      // Additional logic for generating report can go here

      setSuccessMessage('Report generated successfully with all videos retrieved!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error generating report:", error);
      setSuccessMessage('Failed to generate report. Please try again.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };









  const handleQuestionClick = async (index) => {
    const previousQuestionId = questions[activeQuestionIndex].id;
    setActiveQuestionIndex(index);
    setIsPlaying(false);
    setIsRecordedVideo(false);
    // Reset progress for the previous question
    setProgress(prev => ({
      ...prev,
      [previousQuestionId]: 0
    }));
    await startLiveVideo();
  };

  const handlePrevious = async () => {
    if (activeQuestionIndex > 0) {
      const newIndex = activeQuestionIndex - 1;
      setActiveQuestionIndex(newIndex);
      setIsPlaying(false);
      setIsRecordedVideo(false);
      await startLiveVideo();
    }
  };

  const handleNext = async () => {
    if (activeQuestionIndex < questions.length - 1) {
      const newIndex = activeQuestionIndex + 1;


      setActiveQuestionIndex(newIndex);
      setIsPlaying(false);
      setIsRecordedVideo(false);
      await startLiveVideo();
    }
  };

  // const handleSubmit = (questionId) => {
  //   console.log("Submitted Question ID:", questionId);
  // };






  const handleSubmit = async (questionId) => {
    // Check if the recording exists for the current question
    const videoUrl = recordings[questionId];
    if (!videoUrl) {
      console.log("No video found for this question.");
      return;
    }
  
    try {
      // Convert video Blob to a File for Firebase Storage
      const videoBlob = await fetch(videoUrl).then(response => response.blob());
      const videoFile = new File([videoBlob], `video_${questionId}.webm`, { type: 'video/webm' });
  
      // Create a reference to Firebase Storage with the video file name
      // const videoRef = ref(storage, `videos/${videoFile.name}`);
      const videoRef = ref(storage, `${user.email}/${videoFile.name}`);
  
      // Upload video to Firebase Storage
      await uploadBytes(videoRef, videoFile);
      console.log("Video uploaded successfully to Firebase Storage");
     // Set success message
     setSuccessMessage("Video submitted successfully!");
     // Set a timer to remove the success message after 3 seconds
     setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // 3000ms = 3 seconds



      // Optionally, you can store the video URL in the database
      // You can retrieve the URL like this:
      // const downloadURL = await getDownloadURL(videoRef);
      // Then, save it to Firebase Firestore or Realtime Database for later retrieval
    } catch (error) {
      console.error("Error uploading video:", error);
      setSuccessMessage("Failed to submit the video. Please try again.");



      // Set a timer to remove the error message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3000ms = 3 seconds
    }




  };
  




  // const handlePreview = async (index) => {
  //   setActiveQuestionIndex(index);
  //   const questionId = questions[index].id;
  //   const recordingUrl = recordings[questionId];
  //   console.log("my video",recordingUrl)
  //   if (recordingUrl) {
  //     if (stream) {
  //       stream.getTracks().forEach(track => track.stop());
  //     }
  //     setIsMetadataLoaded(false); // Reset metadata loaded state
  //     videoRef.current.srcObject = null;
  //     videoRef.current.src = recordingUrl;
  //     videoRef.current.muted = false;
  //     setIsRecordedVideo(true);
  //     setIsPlaying(true);
  //     videoRef.current.play();
  //   } else {
  //     await startLiveVideo();
  //     setIsRecordedVideo(false);
  //   }
  // };



  const handlePreview = async (index) => {
    setActiveQuestionIndex(index);
    const questionId = questions[index].id;
    const recordingUrl = recordings[questionId];
    console.log("my video", recordingUrl);
  
    if (recordingUrl) {
      // Store the video in local storage
      fetch(recordingUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result; // Base64 encoded video data
            localStorage.setItem(`video_${questionId}`, base64data);
            console.log("Video stored in local storage!");
          };
          reader.readAsDataURL(blob); // Convert blob to Base64
        });
  
      // Stop any existing streams
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsMetadataLoaded(false); // Reset metadata loaded state
      videoRef.current.srcObject = null;
      videoRef.current.src = recordingUrl;
      videoRef.current.muted = false;
      setIsRecordedVideo(true);
      setIsPlaying(true);
      videoRef.current.play();
    } else {
      await startLiveVideo();
      setIsRecordedVideo(false);
    }
  };
  




  const startLiveVideo = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.src = '';
        videoRef.current.muted = true; // Mute for live video
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const startRecordingTimer = () => {
    setRecordingTime(0);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        const nextTime = prev + 1;
        if (nextTime >= MAX_RECORDING_TIME) {
          stopRecording(); // This will trigger mediaRecorder.onstop
          return MAX_RECORDING_TIME;
        }
        return nextTime;
      });
    }, 1000);
  };

  const startRecording = async (index) => {
    try {
      const questionId = questions[index].id;
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      mediaRecorder.onstop = () => {
        // Ensure cleanup happens after recording is saved
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
        setRecordingTime(0);
        
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        console.log(videoURL);
        
        const newRecordings = {
          ...recordings,
          [questionId]: videoURL
        };
        setRecordings(newRecordings);
        localStorage.setItem('interviewRecordings', JSON.stringify(newRecordings));

        // Reset states after saving
        setRecordingQuestionId(null);
        mediaRecorderRef.current = null;

        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      };

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true; // Mute for live video
        videoRef.current.play();
      }
      mediaRecorder.start();
      startRecordingTimer();
      setRecordingQuestionId(questionId);
      setActiveQuestionIndex(index);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      // Do not reset states here; let onstop handle it
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
  };

  const handleStart = (index) => {
    const questionId = questions[index].id;
    if (recordingQuestionId === questionId) {
      stopRecording();
    } else {
      if (recordingQuestionId) {
        stopRecording();
      }
      startRecording(index);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  const hasRecording = (questionId) => {
    return recordings.hasOwnProperty(questionId);
  };

  const formatTime = (timeInSeconds) => {
    if (!isFinite(timeInSeconds) || isNaN(timeInSeconds)) return '0:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !isRecordedVideo || !isMetadataLoaded) return;

    try {
      const currentTime = videoRef.current.currentTime || 0;
      const duration = videoRef.current.duration || 0;
      const questionId = questions[activeQuestionIndex].id;
      
      if (isFinite(currentTime) && isFinite(duration) && duration > 0) {
        const progressValue = (currentTime / duration) * 100;
        setProgress(prev => ({
          ...prev,
          [questionId]: Math.min(100, Math.max(0, progressValue))
        }));
      }
    } catch (error) {
      console.error('Error updating time:', error);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !isRecordedVideo || !isFinite(videoRef.current.duration)) return;

    try {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      if (isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
        const newTime = Math.min(videoRef.current.duration, Math.max(0, clickPosition * videoRef.current.duration));
        if (isFinite(newTime)) {
          videoRef.current.currentTime = newTime;
          setProgress(prev => ({
            ...prev,
            [questions[activeQuestionIndex].id]: (newTime / videoRef.current.duration) * 100
          }));
        }
      }
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  };

  const handleProgressMouseDown = (e) => {
    if (videoRef.current && isRecordedVideo) {
      setIsDragging(true);
      updateVideoProgress(e);
    }
  };

  const handleProgressMouseMove = (e) => {
    if (isDragging && videoRef.current && isRecordedVideo) {
      updateVideoProgress(e);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const updateVideoProgress = (e) => {
    if (!videoRef.current || !isRecordedVideo) return;

    try {
      const progressBar = document.querySelector('.progress-bar');
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      if (isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
        const newTime = Math.min(videoRef.current.duration, Math.max(0, clickPosition * videoRef.current.duration));
        if (isFinite(newTime)) {
          videoRef.current.currentTime = newTime;
          setProgress(prev => ({
            ...prev,
            [questions[activeQuestionIndex].id]: (newTime / videoRef.current.duration) * 100
          }));
        }
      }
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleProgressMouseMove);
    document.addEventListener('mouseup', handleProgressMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleProgressMouseMove);
      document.removeEventListener('mouseup', handleProgressMouseUp);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isDragging]);

  // Add this helper function
  const safeProgress = (questionId) => {
    const currentProgress = progress[questionId];
    return isFinite(currentProgress) ? Math.min(100, Math.max(0, currentProgress)) : 0;
  };

  // Add this handler for metadata loading
  const handleMetadataLoaded = () => {
    setIsMetadataLoaded(true);
    // Initialize progress for this video
    if (videoRef.current && isRecordedVideo) {
      const questionId = questions[activeQuestionIndex].id;
      setProgress(prev => ({
        ...prev,
        [questionId]: 0
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        stopRecording();
      }
    };
  }, []);

  return (
    <>

      <div>
      {/* Render Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mt-4 rounded-lg text-center font-bold">
          {successMessage}
        </div>
      )}
      </div>
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-6">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              id="video-player"
              className="w-full aspect-video"
              autoPlay={!isRecordedVideo}
              playsInline
              muted={!isRecordedVideo}
              onLoadedMetadata={handleMetadataLoaded}
              onEnded={() => {
                setIsPlaying(false);
                setProgress(prev => ({
                  ...prev,
                  [questions[activeQuestionIndex].id]: 100
                }));
              }}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
            {recordingQuestionId && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                <span className="text-white font-mono text-lg">
                  {`${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')} / 1:00`}
                </span>
              </div>
            )}
            {isRecordedVideo && (
              <>
                <div className="absolute bottom-12 left-0 right-0 px-4">
                  <div 
                    className="progress-bar relative h-2 bg-gray-600 rounded-full cursor-pointer"
                    onMouseDown={handleProgressMouseDown}
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-100"
                      style={{ width: `${safeProgress(questions[activeQuestionIndex].id)}%` }}
                    />
                    <div 
                      className="absolute h-4 w-4 bg-white rounded-full shadow-md cursor-grab active:cursor-grabbing"
                      style={{ 
                        left: `${safeProgress(questions[activeQuestionIndex].id)}%`, 
                        transform: 'translate(-50%, -25%)',
                        transition: isDragging ? 'none' : 'all 0.1s ease-out'
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-white">
                    <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                    <span>{formatTime(videoRef.current?.duration || 0)}</span>
                  </div>
                </div>
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
              </>
            )}
          </div>
          <h1 className="dyanamic_ques mt-11 text-center text-4xl font-extrabold text-blue-600 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text  p-4">
            {questions[activeQuestionIndex].question}
          </h1>
        </div>
        <div className="lg:w-1/3 p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          {/* <h1>{user.email}</h1>
          
          
          
          */}
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
                    onClick={() => handleStart(index)}
                    className={`flex items-center px-3 py-2 ${
                      recordingQuestionId === question.id ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white rounded-lg transition-colors`}
                  >
                    {recordingQuestionId === question.id ? <><FaStop className="mr-2" /> Stop</> : <><FaPlay className="mr-2" /> Start</>}
                  </button>
                  {hasRecording(question.id) && (
                    <button
                      onClick={() => handlePreview(index)}
                      className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <FaEye className="mr-2" /> Preview
                    </button>
                  )}
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

              



            {/* <button
              onClick={handleNext}
              disabled={activeQuestionIndex === questions.length - 1}
              className={`px-4 py-2 rounded-lg ${
                activeQuestionIndex === questions.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next 
            </button> */}



               {/* Render the Next button until index 3 */}
      {activeQuestionIndex < 3 && (
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
      )}


       {/* When the index is 3, disable the Next button and show the Generate Report button */}
       {activeQuestionIndex === 3 && (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition duration-300"
          onClick={() => handleGenerateReport()}
        >
          Generate Report
        </button>
      )}





          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VideoPlaybackQuestions;









































