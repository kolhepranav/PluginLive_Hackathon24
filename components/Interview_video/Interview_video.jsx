



// ------latest ----------

"use client"

import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaEye, FaStop } from "react-icons/fa";
import { auth,storage,ref,uploadBytes,getDownloadURL, listAll ,db} from "@/app/firebase/config";
import { CircularProgress } from "@mui/material";
import { doc, setDoc } from 'firebase/firestore';



const VideoPlaybackQuestions = () => {
 

  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);  // Loading state
  const [Subloading, setSubloading] = useState({});  // Loading state

  const [PGloading, setPGLoading] = useState(false); // State to track loading

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

//................... for testing purpose ............................................
  // const result = {
  //   "transcription_2": {
  //     "transcription": "I believe remote work has significantly changed the landscape of work, particularly in the tech industry. It offers undeniable benefits like increased flexibility and improved work-life balance. For developers, it allows for focused work without distractions, potentially boosting productivity. However, effective remote work requires strong communication and collaboration tools and practices. Clear communication channels, regular virtual meetings, and collaborative platforms are essential to maintain team cohesion and prevent feelings of isolation. I think a hybrid model combining the benefits of remote work with occasional in-person interactions for brainstorming and team building can be the most effective approach. This balance allows for both focused individual work and collaborative teamwork.",
  //     "metrics": {
  //       "grammatical_errors": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "word_clarity": {
  //         "score": 1.0,
  //         "unclear_words": []
  //       },
  //       "phonetic_accuracy": {
  //         "score": 0.98,
  //         "issues": [
  //           {
  //             "word": "collaborative",
  //             "expected_pronunciation": "/k\u0259\u02c8l\u00e6b\u0259re\u026at\u026av/",
  //             "actual_pronunciation": "/k\u0259\u02c8l\u00e6br\u0259t\u026av/",
  //             "timestamp": 26.5
  //           }
  //         ],
  //         "excluded_words": []
  //       },
  //       "pause_patterns": {
  //         "average_pause_duration": 0.25,
  //         "longest_pause": {
  //           "duration": 0.7,
  //           "timestamp_start": 12.2,
  //           "timestamp_end": 12.9
  //         },
  //         "short_pauses": 15
  //       },
  //       "filler_word_usage": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "speaking_pace": {
  //         "words_per_minute": 120,
  //         "variability": "consistent"
  //       }
  //     }
  //   },
  //   "transcription_3": {
  //     "transcription": "The web development landscape is constantly evolving, so staying up-to-date is crucial. I use a multi-faceted approach. I regularly follow reputable tech blogs and websites like Smashing Magazine, CSS Tricks, and Hacker News. I also subscribe to newsletters and attend online webinars and conferences on topics like JavaScript frameworks, emerging CSS techniques, and web performance optimization. Participating in online developer communities like Stack Overflow and GitHub is also essential for learning from other developers and staying informed about current trends and best practices. Furthermore, I believe that practical application is key. I dedicate time for personal projects and side projects where I experiment with new technologies and frameworks, which solidifies my understanding and keeps my skills sharp.",
  //     "metrics": {
  //       "grammatical_errors": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "word_clarity": {
  //         "score": 1.0,
  //         "unclear_words": []
  //       },
  //       "phonetic_accuracy": {
  //         "score": 1.0,
  //         "issues": [],
  //         "excluded_words": [
  //           {
  //             "word": "Smashing Magazine",
  //             "type": "website_name",
  //             "reason": "Proper noun"
  //           },
  //           {
  //             "word": "CSS Tricks",
  //             "type": "website_name",
  //             "reason": "Proper noun"
  //           },
  //           {
  //             "word": "Hacker News",
  //             "type": "website_name",
  //             "reason": "Proper noun"
  //           },
  //           {
  //             "word": "JavaScript",
  //             "type": "programming_language",
  //             "reason": "Proper noun"
  //           },
  //           {
  //             "word": "GitHub",
  //             "type": "website_name",
  //             "reason": "Proper noun"
  //           },
  //           {
  //             "word": "Stack Overflow",
  //             "type": "website_name",
  //             "reason": "Proper noun"
  //           }
  //         ]
  //       },
  //       "pause_patterns": {
  //         "average_pause_duration": 0.2,
  //         "longest_pause": {
  //           "duration": 0.6,
  //           "timestamp_start": 15.5,
  //           "timestamp_end": 16.1
  //         },
  //         "short_pauses": 15
  //       },
  //       "filler_word_usage": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "speaking_pace": {
  //         "words_per_minute": 150,
  //         "variability": "consistent"
  //       }
  //     }
  //   },
  //   "transcription_4": {
  //     "transcription": "I have always been fascinated by the power of internet to connect people and provide access to information. The ability to build interactive and engaging web experiences that can reach a global audience is incredibly motivating. I remember being particularly impressed by a web app like Google. This sparked my interest in web development and I started learning HTML and CSS on my own. As I progressed, I realized the immense potential of web technologies to solve real world problems and create innovative solutions. This realization combined with my passion for problem solving and my desire to create things solidified my decision to pursue a career in web development. I'm excited to contribute to this dynamic field and continue learning and growing as a developer.",
  //     "metrics": {
  //       "grammatical_errors": {
  //         "count": 1,
  //         "details": [
  //           {
  //             "error": "internet",
  //             "suggested_correction": "the internet",
  //             "context": "I have always been fascinated by the power of internet to connect people..."
  //           }
  //         ]
  //       },
  //       "word_clarity": {
  //         "score": 0.98,
  //         "unclear_words": []
  //       },
  //       "phonetic_accuracy": {
  //         "score": 0.95,
  //         "issues": [],
  //         "excluded_words": [
  //           {
  //             "word": "Google",
  //             "type": "company_name",
  //             "reason": "Proper noun; pronunciation variations exist."
  //           },
  //           {
  //             "word": "HTML",
  //             "type": "acronym",
  //             "reason": "Acronym pronunciation is context-dependent."
  //           },
  //           {
  //             "word": "CSS",
  //             "type": "acronym",
  //             "reason": "Acronym pronunciation is context-dependent."
  //           }
  //         ]
  //       },
  //       "pause_patterns": {
  //         "average_pause_duration": 0.25,
  //         "longest_pause": {
  //           "duration": 0.7,
  //           "timestamp_start": 10.5,
  //           "timestamp_end": 11.2
  //         },
  //         "short_pauses": 15
  //       },
  //       "filler_word_usage": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "speaking_pace": {
  //         "words_per_minute": 120,
  //         "variability": "consistent"
  //       }
  //     }
  //   },
  //   "transcription_1": {
  //     "transcription": "I am a driven and enthusiastic web developer currently pursuing my B.Tech in Computer Science at VIT. I am passionate about creating user-friendly and efficient web applications. My coursework at VIT has provided me with a solid foundation in programming principles, data structures, and algorithms, which I apply to my web development projects. I am proficient in front-end technologies like HTML, CSS, and JavaScript, and I am also exploring back-end technologies like Node.js, Python, Django, PHP, etcetera. I am a quick learner and eager to expand my skill set. I am also actively involved in hackathons and personal projects. I am excited about the opportunity to contribute my skills and learn from experienced professionals in real-world settings.",
  //     "metrics": {
  //       "grammatical_errors": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "word_clarity": {
  //         "score": 1.0,
  //         "unclear_words": []
  //       },
  //       "phonetic_accuracy": {
  //         "score": 0.95,
  //         "issues": [
  //           {
  //             "word": "etcetera",
  //             "expected_pronunciation": "/\u025bt\u02c8s\u025bt\u0259r\u0259/",
  //             "actual_pronunciation": "/\u025bk\u02c8s\u025btr\u0259/",
  //             "timestamp": 26.5
  //           }
  //         ],
  //         "excluded_words": [
  //           {
  //             "word": "VIT",
  //             "type": "place_name",
  //             "reason": "Proper noun, pronunciation may vary depending on speaker."
  //           },
  //           {
  //             "word": "HTML",
  //             "type": "abbreviation",
  //             "reason": "Acronym, pronunciation not standardized."
  //           },
  //           {
  //             "word": "CSS",
  //             "type": "abbreviation",
  //             "reason": "Acronym, pronunciation not standardized."
  //           },
  //           {
  //             "word": "JavaScript",
  //             "type": "programming language",
  //             "reason": "Proper noun, pronunciation may vary."
  //           },
  //           {
  //             "word": "Node.js",
  //             "type": "programming language",
  //             "reason": "Proper noun, pronunciation may vary."
  //           },
  //           {
  //             "word": "Python",
  //             "type": "programming language",
  //             "reason": "Proper noun, pronunciation may vary."
  //           },
  //           {
  //             "word": "Django",
  //             "type": "programming language",
  //             "reason": "Proper noun, pronunciation may vary."
  //           },
  //           {
  //             "word": "PHP",
  //             "type": "programming language",
  //             "reason": "Acronym, pronunciation not standardized."
  //           },
  //           {
  //             "word": "B.Tech",
  //             "type": "abbreviation",
  //             "reason": "Acronym, pronunciation not standardized."
  //           }
  //         ]
  //       },
  //       "pause_patterns": {
  //         "average_pause_duration": 0.2,
  //         "longest_pause": {
  //           "duration": 0.7,
  //           "timestamp_start": 32.2,
  //           "timestamp_end": 32.9
  //         },
  //         "short_pauses": 15
  //       },
  //       "filler_word_usage": {
  //         "count": 0,
  //         "details": []
  //       },
  //       "speaking_pace": {
  //         "words_per_minute": 150,
  //         "variability": "consistent"
  //       }
  //     }
  //   },
  //   "feedback": {
  //     "assessment_summary": {
  //       "strengths": "Your communication demonstrates strong clarity and a consistent speaking pace across all samples.  You effectively articulate complex ideas related to web development and remote work.  Your vocabulary is rich and appropriate for your subject matter.",
  //       "improvement_areas": [
  //         "Minor pronunciation inconsistencies",
  //         "Occasional longer pauses",
  //         "Addressing one grammatical error identified"
  //       ]
  //     },
  //     "recommendations": {
  //       "grammar": "Review the sentence, \"I have always been fascinated by the power of internet to connect people...\" and correct the grammatical error (missing \"the\" before \"internet\"). Practice identifying and correcting subject-verb agreement and article usage in your writing and speaking. Use online grammar checkers like Grammarly to aid in this process.",
  //       "pronunciation": "Focus on the accurate pronunciation of words like \"collaborative\" (/k\u0259\u02c8l\u00e6b\u0259re\u026at\u026av/),  and \"etcetera\" (/\u025bt\u02c8s\u025bt\u0259r\u0259/). Use online phonetic dictionaries and practice recording yourself saying these words, comparing your pronunciation to the correct one. Pay attention to the subtle differences in sounds to improve accuracy.",
  //       "fluency": "While your speaking pace is consistent, aim to reduce the longest pauses observed in your recordings (0.6-0.7 seconds).  Practice speaking more smoothly by using techniques like deep breathing exercises and preparation.  Practice delivering your thoughts in a planned-out structure.",
  //       "non_verbal": "Since the assessment only includes audio, this section focuses on strategies to improve non-verbal communication during future recordings. Consider working on maintaining good posture, using natural hand gestures to enhance communication, and practicing maintaining eye contact with an imaginary audience during practice sessions."
  //     },
  //     "goals": {
  //       "short_term": [
  //         "Reduce the longest pause duration to under 0.5 seconds within one week.",
  //         "Correct the identified grammatical error and achieve a score of 0 grammatical errors in the next speech sample.",
  //         "Improve pronunciation of identified words, aiming for at least 98% accuracy based on future automated phonetic analysis."
  //       ],
  //       "long_term": [
  //         "Maintain a consistently smooth speaking pace with minimal pauses, demonstrating improvement in fluency across multiple presentations.",
  //         "Develop a strong foundation of non-verbal communication skills to enhance engagement and clarity."
  //       ]
  //     },
  //     "resources": [
  //       "Grammarly (grammar checker)",
  //       "Forvo (phonetic pronunciation dictionary)",
  //       "Speechling (pronunciation practice app)",
  //       "YouTube videos on public speaking techniques and non-verbal communication",
  //       "Record and review your own speaking to monitor improvement"
  //     ],
  //     "timeline": {
  //       "week_1": [
  //         "Practice pronunciation of 'collaborative' and 'etcetera' using Forvo and Speechling.",
  //         "Record yourself speaking and analyze pause durations. Implement deep breathing exercises before speaking.",
  //         "Review and correct the identified grammatical error; focus on subject-verb agreement practice."
  //       ],
  //       "week_2": [
  //         "Continue pronunciation practice, focusing on consistent application.",
  //         "Practice delivering a short speech paying close attention to pause management.",
  //         "Begin reviewing additional grammar rules (articles, subject-verb agreement) and perform exercises."
  //       ],
  //       "week_3": [
  //         "Focus on improving non-verbal cues (posture, gestures) during speech practice sessions.",
  //         "Record practice speech, analyze for improvements in pause duration and pronunciation.",
  //         "Review writing samples, focusing on eliminating grammatical errors."
  //       ],
  //       "week_4": [
  //         "Deliver a practice presentation paying close attention to all areas of improvement; record and self-assess.",
  //         "Review and update this improvement plan based on progress and remaining challenges.",
  //         "Plan for ongoing practice and self-monitoring using chosen resources."
  //       ]
  //     }
  //   }
  // }













  const handleGenerateReport = async () => {
    setPGLoading(true)

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
  
      // Log the video URLs
      console.log("Video URLs:", videoUrls);

      // ........ main code working .............................. 
  
      // Send the video URLs to the Flask server
      const response = await fetch('http://127.0.0.1:8080/process-videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'video-urls': videoUrls }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process videos');
      }
  
      // Get the response data from the Flask server
      const result = await response.json();

      // const json_div = document.getElementById('json_content')
      // json_div.innerHTML = JSON.stringify(result, null, 2)


      setLoading(false);



      
      
// Flatten the result to store as key-value pairs in Firestore
const dataToStore = {
  email: user.email,
  transcription_1_data: result.transcription_1.transcription,
  transcription_1_preview: videoUrls[0],
  transcription_1_grammatical_count: result.transcription_1.metrics.grammatical_errors.count,
  transcription_1_grammatical_list_main: result.transcription_1.metrics.grammatical_errors.details,
  transcription_1_word_clarity_score: result.transcription_1.metrics.word_clarity.score,
  transcription_1_word_clarity_words_list: result.transcription_1.metrics.word_clarity.unclear_words,
  transcription_1_phonetic_accuracy_score: result.transcription_1.metrics.phonetic_accuracy.score,
  transcription_1_phonetic_accuracy_words_list: result.transcription_1.metrics.phonetic_accuracy.issues,
  transcription_1_pause_patterns_avg_pause_score: result.transcription_1.metrics.pause_patterns.average_pause_duration,
  transcription_1_pause_patterns_longest_pause_score: result.transcription_1.metrics.pause_patterns.short_pauses,
  transcription_1_filler_word_usage_count: result.transcription_1.metrics.filler_word_usage.count,
  transcription_1_filler_word_issues_in_words_list: result.transcription_1.metrics.filler_word_usage.details,
  transcription_1_speaking_pace_wpm: result.transcription_1.metrics.speaking_pace.words_per_minute,
  transcription_1_speaking_pace_variability_text: result.transcription_1.metrics.speaking_pace.variability,

  transcription_2_data: result.transcription_2.transcription,
  transcription_2_preview: videoUrls[1],
  transcription_2_grammatical_count: result.transcription_2.metrics.grammatical_errors.count,
  transcription_2_grammatical_list_main: result.transcription_2.metrics.grammatical_errors.details,
  transcription_2_word_clarity_score: result.transcription_2.metrics.word_clarity.score,
  transcription_2_word_clarity_words_list: result.transcription_2.metrics.word_clarity.unclear_words,
  transcription_2_phonetic_accuracy_score: result.transcription_2.metrics.phonetic_accuracy.score,
  transcription_2_phonetic_accuracy_words_list: result.transcription_2.metrics.phonetic_accuracy.issues,
  transcription_2_pause_patterns_avg_pause_score: result.transcription_2.metrics.pause_patterns.average_pause_duration,
  transcription_2_pause_patterns_longest_pause_score: result.transcription_2.metrics.pause_patterns.short_pauses,
  transcription_2_filler_word_usage_count: result.transcription_2.metrics.filler_word_usage.count,
  transcription_2_filler_word_issues_in_words_list: result.transcription_2.metrics.filler_word_usage.details,
  transcription_2_speaking_pace_wpm: result.transcription_2.metrics.speaking_pace.words_per_minute,
  transcription_2_speaking_pace_variability_text: result.transcription_2.metrics.speaking_pace.variability,

  transcription_3_data: result.transcription_3.transcription,
  transcription_3_preview: videoUrls[2],
  transcription_3_grammatical_count: result.transcription_3.metrics.grammatical_errors.count,
  transcription_3_grammatical_list_main: result.transcription_3.metrics.grammatical_errors.details,
  transcription_3_word_clarity_score: result.transcription_3.metrics.word_clarity.score,
  transcription_3_word_clarity_words_list: result.transcription_3.metrics.word_clarity.unclear_words,
  transcription_3_phonetic_accuracy_score: result.transcription_3.metrics.phonetic_accuracy.score,
  transcription_3_phonetic_accuracy_words_list: result.transcription_3.metrics.phonetic_accuracy.issues,
  transcription_3_pause_patterns_avg_pause_score: result.transcription_3.metrics.pause_patterns.average_pause_duration,
  transcription_3_pause_patterns_longest_pause_score: result.transcription_3.metrics.pause_patterns.short_pauses,
  transcription_3_filler_word_usage_count: result.transcription_3.metrics.filler_word_usage.count,
  transcription_3_filler_word_issues_in_words_list: result.transcription_3.metrics.filler_word_usage.details,
  transcription_3_speaking_pace_wpm: result.transcription_3.metrics.speaking_pace.words_per_minute,
  transcription_3_speaking_pace_variability_text: result.transcription_3.metrics.speaking_pace.variability,

  transcription_4_data: result.transcription_4.transcription,
  transcription_4_preview: videoUrls[3],
  transcription_4_grammatical_count: result.transcription_4.metrics.grammatical_errors.count,
  transcription_4_grammatical_list_main: result.transcription_4.metrics.grammatical_errors.details,
  transcription_4_word_clarity_score: result.transcription_4.metrics.word_clarity.score,
  transcription_4_word_clarity_words_list: result.transcription_4.metrics.word_clarity.unclear_words,
  transcription_4_phonetic_accuracy_score: result.transcription_4.metrics.phonetic_accuracy.score,
  transcription_4_phonetic_accuracy_words_list: result.transcription_4.metrics.phonetic_accuracy.issues,
  transcription_4_pause_patterns_avg_pause_score: result.transcription_4.metrics.pause_patterns.average_pause_duration,
  transcription_4_pause_patterns_longest_pause_score: result.transcription_4.metrics.pause_patterns.short_pauses,
  transcription_4_filler_word_usage_count: result.transcription_4.metrics.filler_word_usage.count,
  transcription_4_filler_word_issues_in_words_list: result.transcription_4.metrics.filler_word_usage.details,
  transcription_4_speaking_pace_wpm: result.transcription_4.metrics.speaking_pace.words_per_minute,
  transcription_4_speaking_pace_variability_text: result.transcription_4.metrics.speaking_pace.variability,

  transcription_overall_feedback: result.feedback,
};

// Store the data in Firestore
const docRef = doc(db, 'reports', user.email); // 'reports' is the collection, and user.email is the document ID
await setDoc(docRef, dataToStore);


// const json_div = document.getElementById('json_content')
// json_div.innerHTML = JSON.stringify(result, null, 2)


alert('Videos processed and data stored in Firestore successfully!');
  
      // Optionally, navigate to another page after successful processing
      // alert('Videos processed successfully!');
      var email = user.email
      window.location.href = '/main/Interview/report?email=' + email;
      // window.location.href = '/main/Interview/report';
  
      setSuccessMessage('Videos processed and report generated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error generating report:", error);
      setSuccessMessage('Failed to generate report. Please try again.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } finally {
      setLoading(false); // Hide progress bar
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
       // Set loading for this specific question
       setSubloading((prev) => ({ ...prev, [questionId]: true }));
    const videoUrl = recordings[questionId];
    if (!videoUrl) {
      console.log("No video found for this question.");
      return;
    }
  
    try {
      // Convert video Blob to a File for Firebase Storage
      const videoBlob = await fetch(videoUrl).then(response => response.blob());
    
      // Ensure the file has an MP4 extension and MIME type
      const videoFile = new File([videoBlob], `video_${questionId}.mp4`, { type: 'video/mp4' });
      
      // Create a reference to Firebase Storage with the video file name
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
      }, 3000);
    }
    finally {
      setSubloading((prev) => ({ ...prev, [questionId]: false }));
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
        
        const blob = new Blob(chunks, { type: 'video/mp4' });
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
                  {Subloading[question.id] && (
              <div>
                <CircularProgress />
              </div>
            )}
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
       {/* {activeQuestionIndex === 3 && (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition duration-300"
          onClick={() => handleGenerateReport()}
        >
          Generate Report
        </button>
      )} */}
 {PGloading && (
        <div>
          <CircularProgress />
          {/* <p>Processing your request...</p> */}
        </div>
      )}
        

       {activeQuestionIndex === 3 && (

<div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition duration-300"
          onClick={() => handleGenerateReport()}
        >
          Generate Report
        </button>

       
        </div>
        
      )}



          </div>
        </div>
      </div>


      <div>
        <p id="json_content"></p>
      </div>
    </div>
    </>
  );
};

export default VideoPlaybackQuestions;









































