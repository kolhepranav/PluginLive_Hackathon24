// import React from 'react'
// // import Video_upload_temp from '@/components/Video_upload_temp/Video_upload_temp'

// const Temp = () => {
//   return (
//     <div>Temp</div>
//   )
// }

// export default Temp









// "use client";

// import { useState } from "react";

// export default function Temp() {
//   const [video, setVideo] = useState(null);
//   const [filename, setFilename] = useState("");

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("video", video);

//     const response = await fetch("/main/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       alert("Video uploaded successfully!");
//       setFilename(video.name); // Set filename to retrieve and play video
//     } else {
//       alert("Failed to upload video.");
//     }
//   };

//   return (
//     <div>
//       <h1>Upload and Play Video</h1>

//       <form onSubmit={handleUpload}>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideo(e.target.files[0])}
//           required
//         />
//         <button type="submit">Upload</button>
//       </form>

//       {filename && (
//         <div>
//           <h2>Uploaded Video</h2>
//           <video controls width="600">
//             <source src={`/main/api/upload?filename=${filename}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// }






"use client"
import { useState } from "react";
import { storage } from "@/app/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Temp() {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null); // Reset error on new file selection
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a video file to upload.");
      return;
    }

    setUploading(true);

    // Create a reference for the file in Firebase Storage
    const storageRef = ref(storage, `videos/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
      setVideoURL(downloadURL);
      setUploading(false);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Error uploading video. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload Video</h1>

      {/* File upload form */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display uploaded video */}
      {videoURL && (
        <div style={{ marginTop: "20px" }}>
          <h2>Uploaded Video: {videoURL}</h2>
          <video width="600" controls>
            <source src={videoURL} type="video/mp4" />
            
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
