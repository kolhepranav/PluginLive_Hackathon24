


// "use client";
// import { useEffect, useState } from "react";
// import { auth, storage } from "@/app/firebase/config";  // Importing from the firebase.js config
// import VideoPlaybackQuestions from "@/components/Interview_video/Interview_video";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";  // Firebase Storage functions
// import { getFirestore, doc, setDoc } from "firebase/firestore";  // Firestore functions

// // Function to upload MP4 video to Firebase Storage and store URL in Firestore
// const uploadVideoToFirebase = async (file) => {
//   const user = auth.currentUser;
//   if (!user) {
//     alert("No user found. Please log in.");
//     return;
//   }

//   // Create a storage reference to upload the file
//   const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`);

//   // Create an upload task for the video file
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   // Track the upload progress
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//     },
//     (error) => {
//       console.error("Error uploading video:", error);
//     },
//     async () => {
//       // Get the download URL once the upload is complete
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//       console.log("Video available at", downloadURL);

//       // Store the video URL in Firestore
//       const db = getFirestore();
//       const userDocRef = doc(db, "users", user.uid);  // Use the user UID for the document
//       await setDoc(userDocRef, {
//         videoURL: downloadURL,  // Store the download URL in Firestore
//       }, { merge: true });

//       alert("Video uploaded and URL stored in Firestore!");
//     }
//   );
// };

// export default function OrdersPage() {
//   const [user, setUser] = useState(null);  // State to store the current user
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [videoFile, setVideoFile] = useState(null);  // State to store the selected video file

//   useEffect(() => {
//     // Check the current user when the component mounts
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUser(currentUser);
//     }
//     setLoading(false);
//   }, []);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "video/mp4") {
//       setVideoFile(file);  // Set the video file state
//     } else {
//       alert("Please select an MP4 video.");
//     }
//   };

//   const handleUploadClick = () => {
//     if (videoFile) {
//       uploadVideoToFirebase(videoFile);  // Call function to upload the video
//     } else {
//       alert("Please select a video file first.");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading until user data is available
//   }

//   if (!user) {
//     return <div>No user found. Please log in again.</div>;  // Handle case where no user is logged in
//   }

//   return (
//     <>
//       <div>
//         <h2>Welcome, {user.email}</h2>  {/* Display current user's email */}
//       </div>
//       <input
//         type="file"
//         accept="video/mp4"
//         onChange={handleVideoUpload}
//         className="mt-4"
//       />
//       <button
//         onClick={handleUploadClick}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//       >
//         Upload MP4 Video
//       </button>
//       <VideoPlaybackQuestions />
//     </>
//   );
// }















// ----------new ------------




"use client";
import { useEffect, useState } from "react";
import { auth, storage } from "@/app/firebase/config";  // Importing from the firebase.js config
import VideoPlaybackQuestions from "@/components/Interview_video/Interview_video";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";  // Firebase Storage functions
import { getFirestore, doc, setDoc } from "firebase/firestore";  // Firestore functions

// Function to upload MP4 video to Firebase Storage and store URL in Firestore
const uploadVideoToFirebase = async (file) => {
  const user = auth.currentUser;
  if (!user) {
    alert("No user found. Please log in.");
    return;
  }

  // Create a storage reference to upload the file
  const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`);

  // Create an upload task for the video file
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Track the upload progress
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.error("Error uploading video:", error);
    },
    async () => {
      // Get the download URL once the upload is complete
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("Video available at", downloadURL);

      // Store the video URL in Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);  // Use the user UID for the document
      await setDoc(userDocRef, {
        videoURL: downloadURL,  // Store the download URL in Firestore
      }, { merge: true });

      alert("Video uploaded and URL stored in Firestore!");
    }
  );
};

export default function OrdersPage() {
  const [user, setUser] = useState(null);  // State to store the current user
  const [loading, setLoading] = useState(true);  // Loading state
  const [videoFile, setVideoFile] = useState(null);  // State to store the selected video file


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


  useEffect(() => {
    // Check the current user when the component mounts
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);  // Set the video file state
    } else {
      alert("Please select an MP4 video.");
    }
  };

  const handleUploadClick = () => {
    if (videoFile) {
      uploadVideoToFirebase(videoFile);  // Call function to upload the video
    } else {
      alert("Please select a video file first.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Show loading until user data is available
  }

  if (!user) {
    return <div>No user found. Please log in again.</div>;  // Handle case where no user is logged in
  }

  return (
    <>
      <div>
        <h2>Welcome, {user.email}</h2>  {/* Display current user's email */}
      </div>
      {/* <input
        type="file"
        accept="video/mp4"
        onChange={handleVideoUpload}
        className="mt-4"
      />
      <button
        onClick={handleUploadClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Upload MP4 Video
      </button> */}
      <VideoPlaybackQuestions />
    </>
  );
}
