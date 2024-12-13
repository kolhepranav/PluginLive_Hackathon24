"use client"

import React, { useState, useEffect, useRef } from "react";
import { auth, storage, db } from "@/app/firebase/config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { FaGraduationCap, FaComments, FaMicrophone, FaPause } from "react-icons/fa";

import { FiDownload } from "react-icons/fi";
import { BsExclamationCircle, BsMicFill, BsPauseFill, BsSpeedometer } from "react-icons/bs";
import { AiOutlineAudio } from "react-icons/ai";
import { MdGrading } from "react-icons/md";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
// import demo from "../../../../../public/Feedback_Report.pdf"





ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgress = ({ value, title, icon: Icon, color }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className={`${color}`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <Icon className={`w-6 h-6 ${color} mb-1`} />
          <span className="text-1xl font-bold">{progress}%</span>
        </div>
      </div>
      <div className="mt-0 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded py-1 px-2 -top-8">
        {title}: {progress}%
      </div>
    </div>
  );
};












const page = () => {
  const [user, setUser] = useState(null);  // State to store the current user
  const [loading, setLoading] = useState(true);  // Loading state
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [documentData, setDocumentData] = useState(null);
  let [transcription_grammer_avg, settranscription_grammer_avg] = useState(null)
  let [transcription_clarity_avg, settranscription_clarity_avg] = useState(null)
  let [transcription_phonetic_accuracy_score, settranscription_phonetic_accuracy_score] = useState(null)
  let [transcription_pause_patterns_avg_pause_score, settranscription_pause_patterns_avg_pause_score] = useState(null)
  let [transcription_1_filler_word_usage_count, settranscription_1_filler_word_usage_count] = useState(null)

  let [extractedWords, setextractedWords] = useState([]);
  let [extractedWords1, setextractedWords1] = useState([]);
  let [extractedWords2, setextractedWords2] = useState([]);
  let [transcription_1_phonetic_accuracy_score, settranscription_1_phonetic_accuracy_score] = useState(null)

  let transcription_1_data = null

  let [transcription_1_word_clarity_score, settranscription_1_word_clarity_score] = useState(null);

  let [transcription_1_pause_patterns_avg_pause_score, settranscription_1_pause_patterns_avg_pause_score] = useState(null)
  let [transcription_1_pause_patterns_longest_pause_score, settranscription_1_pause_patterns_longest_pause_score] = useState(null)

  let [transcription_1_speaking_pace_wpm, settranscription_1_speaking_pace_wpm] = useState(null)
  let [transcription_1_speaking_pace_variability_text, settranscription_1_speaking_pace_variability_text] = useState(null)

  let [ExtractedErrors, setExtractedErrors] = useState([]);

  const [showCamera, setShowCamera] = useState(true); // Assuming you manage this state
  const videoRef = useRef(null); // Ref for the video element to control playback
  let [src_vid, set_src_vid] = useState("https://firebasestorage.googleapis.com/v0/b/psychic-bedrock-444405-n8.firebasestorage.app/o/sample%2Fquestion_4.mp4?alt=media&token=3979cd1d-7918-4047-b94f-9e7f02ccba9d");
  // let [src_vid,set_src_vid] = useState(null);




 let [transcription_1_data_inner,settranscription_1_data_inner] = useState(null);


  let [index_main, set_index_main] = useState(1);

  // let [feedback,getfeedback] = useState('')
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // const handleOpenModal = () => setIsModalOpen(true);
    // const handleCloseModal = () => setIsModalOpen(false);

  
  

  useEffect(() => {
    // let index_main = 1;
    const fetchData = async () => {
      try {

        const urlParams = new URLSearchParams(window.location.search);

        const email = urlParams.get('email')
        console.log("new email", email);

        const docRef = doc(db, "reports", email); // Replace with your document path
        const docSnap = await getDoc(docRef);
        const result = docSnap.data();

        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
          console.log("latest ", docSnap.data());



          // camera preview ...............

          src_vid = result[`transcription_${index_main}_preview`];
          console.log("happy scr", src_vid);
          set_src_vid(src_vid);

          // set_src_vid(result[`transcription_${index_main}_preview`]);




          //..... overall feeback .......
          // feedback = result.transcription_overall_feedback;
          // getfeedback(feedback.assessment_summary.strengths);
          // console.log("main fee :",feedback)

          // const feedbackDiv = document.getElementById('feedback-strengths');
          // feedbackDiv.innerHTML = feedback;

          

          

          
        
          
        




          // ......default for all data .........


          transcription_grammer_avg = Math.round(((result.transcription_1_grammatical_count + result.transcription_2_grammatical_count + result.transcription_3_grammatical_count + result.transcription_4_grammatical_count) / 4) )
          console.log("transcription_grammer_avg", transcription_grammer_avg)
          settranscription_grammer_avg(transcription_grammer_avg)


          transcription_clarity_avg = Math.round(((result.transcription_1_word_clarity_score + result.transcription_2_word_clarity_score + result.transcription_3_word_clarity_score + result.transcription_4_word_clarity_score) / 4) )
          settranscription_clarity_avg(transcription_clarity_avg)



          transcription_phonetic_accuracy_score = Math.round(((result.transcription_1_phonetic_accuracy_score + result.transcription_2_phonetic_accuracy_score + result.transcription_3_phonetic_accuracy_score + result.transcription_4_phonetic_accuracy_score) / 4) )
          settranscription_phonetic_accuracy_score(transcription_phonetic_accuracy_score)


          transcription_pause_patterns_avg_pause_score = Math.round(((result.transcription_1_pause_patterns_avg_pause_score + result.transcription_2_pause_patterns_avg_pause_score + result.transcription_3_pause_patterns_avg_pause_score + result.transcription_4_pause_patterns_avg_pause_score) / 4))
          settranscription_pause_patterns_avg_pause_score(transcription_pause_patterns_avg_pause_score)








          // .......... transcription 1 data .......................
          // const transcription_1_data_inner = document.getElementById('transcription_data')
          // transcription_1_data_inner.innerHTML = result[`transcription_${index_main}_data`];
          settranscription_1_data_inner(result[`transcription_${index_main}_data`]);



          //.. pheonetic .......
          let transcription_1_phonetic_accuracy_score = document.getElementById('transcription_1_phonetic_accuracy_score')
          transcription_1_phonetic_accuracy_score.innerHTML = result[`transcription_${index_main}_phonetic_accuracy_score`] * 100 + '%';
          settranscription_1_phonetic_accuracy_score(transcription_1_phonetic_accuracy_score)

          // Function to extract word values from issues
          const extractWords = (data) => {
            const wordsList =
              data[`transcription_${index_main}_phonetic_accuracy_words_list`].map((item) => item.word);
            return wordsList;
          };

        
          extractedWords = extractWords(result);
          setextractedWords(extractedWords)
          console.log("list_ph : ", extractedWords)



          // ..filler words usage ......

          let transcription_1_filler_word_usage_count = document.getElementById('transcription_1_filler_word_usage_count')
          transcription_1_filler_word_usage_count.innerHTML = 'Count : ' + result[`transcription_${index_main}_filler_word_usage_count`];
          settranscription_1_filler_word_usage_count(transcription_1_filler_word_usage_count)

          const extractWords1 = (data) => {
            const wordsList =
              data[`transcription_${index_main}_filler_word_issues_in_words_list`].map((item) => item.word);
            return wordsList;
          };

          extractedWords1 = extractWords1(result);
          setextractedWords1(extractedWords1)





          // .. word clarity .............
          let transcription_1_word_clarity_score = document.getElementById('transcription_1_word_clarity_score')
          transcription_1_word_clarity_score.innerHTML = result[`transcription_${index_main}_word_clarity_score`] * 100 + '%';
          settranscription_1_word_clarity_score(transcription_1_word_clarity_score)

          const extractWords2 = (data) => {
            const wordsList =
              data[`transcription_${index_main}_word_clarity_words_list`].map((item) => item.word);
            return wordsList;
          };

          extractedWords2 = extractWords2(result);
          setextractedWords2(extractedWords2)




          // pause patterns ...........

          transcription_1_pause_patterns_avg_pause_score = result[`transcription_${index_main}_pause_patterns_avg_pause_score`];
          settranscription_1_pause_patterns_avg_pause_score(transcription_1_pause_patterns_avg_pause_score);

          transcription_1_pause_patterns_longest_pause_score = result[`transcription_${index_main}_pause_patterns_longest_pause_score`];
          settranscription_1_pause_patterns_longest_pause_score(transcription_1_pause_patterns_longest_pause_score);





          // speaking pace ..........

          transcription_1_speaking_pace_wpm = result[`transcription_${index_main}_speaking_pace_wpm`];
          settranscription_1_speaking_pace_wpm(transcription_1_speaking_pace_wpm);
          const transcription_1_speaking_pace_wpm_inner = document.getElementById('transcription_1_speaking_pace_wpm_inner')
          transcription_1_speaking_pace_wpm_inner.innerHTML = transcription_1_speaking_pace_wpm

          transcription_1_speaking_pace_variability_text = result[`transcription_${index_main}_speaking_pace_variability_text`];
          settranscription_1_speaking_pace_variability_text(transcription_1_speaking_pace_variability_text);
          const transcription_1_speaking_pace_variability_text_inner = document.getElementById('transcription_1_speaking_pace_variability_text_inner')
          transcription_1_speaking_pace_variability_text_inner.innerHTML = 'Variability : ' + transcription_1_speaking_pace_variability_text





          // ...grammer
          const extractGrammaticalErrors = (data) => {
            const errorsList = data[`transcription_${index_main}_grammatical_list_main`].map((item) => ({
              error: item.error,
              suggestedCorrection: item.suggested_correction,
            }));
            return errorsList;
          };

          // Assuming `result` is your data source
          ExtractedErrors = extractGrammaticalErrors(result);

          // Assuming you have a state to store extracted errors
          setExtractedErrors(ExtractedErrors)

          console.log("New grammer ", ExtractedErrors)








        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setextractedWords([]);
        setextractedWords1([]);
        setextractedWords2([]);
        setExtractedErrors([]);
      }
    };

    fetchData();
  }, []);


  // Reload video when src_vid changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video element
    }
  }, [src_vid]);












  const metrics = [
    {
      title: "Avg Grammatical",
      value: transcription_grammer_avg,
      icon: FaGraduationCap,
      color: "text-blue-500",
      bgcolor: "bg-red-100",
    },
    {
      title: "Avg Clarity",
      value: transcription_clarity_avg,
      icon: FaComments,
      color: "text-green-500",
      bgcolor: "bg-blue-50",
    },
    {
      title: "Avg Phonetic",
      value: transcription_phonetic_accuracy_score,
      icon: FaMicrophone,
      color: "text-purple-500",
      bgcolor: "bg-purple-50",
    },
    {
      title: "Avg Pause",
      value: transcription_pause_patterns_avg_pause_score,
      icon: FaPause,
      color: "text-orange-500",
      bgcolor: "bg-green-50",
    }
  ];






  // const handleButtonClick = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };


  const questions = [
    { id: 1, question: '"Tell us about yourself?' },
    { id: 2, question: 'What’s your view on remote work culture?' },
    { id: 3, question: 'How do you stay updated with industry trends?' },
    { id: 4, question: 'What inspired you to choose your career path?' },
  ];

  // const handleSelectQuestion = (question, id) => {
  //   setSelectedQuestion(question);
  //   setShowDropdown(false);
  //   alert(`You selected: ${id}`);
  //   set_index_main(id)
    
  // };




  const handleSelectQuestion = async (question, index) => {
    setSelectedQuestion(question); // Update the selected question
    // set_index_main(index); // Update the main index for transcription
    set_index_main(index);
    set_index_main(index);

    setShowDropdown(false); // Close the dropdown

  
    try {
      // Fetch data dynamically based on selected index
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
  
      const docRef = doc(db, "reports", email);
      const docSnap = await getDoc(docRef);
      // await fetchDataForQuestion(index);
  
      if (docSnap.exists()) {
        const result = docSnap.data();
  
        // Update src_vid dynamically
        const newSrcVid = result[`transcription_${index}_preview`];
        set_src_vid(newSrcVid);

        


        
        transcription_grammer_avg = Math.round(((result.transcription_1_grammatical_count + result.transcription_2_grammatical_count + result.transcription_3_grammatical_count + result.transcription_4_grammatical_count) / 4))
        console.log("transcription_grammer_avg", transcription_grammer_avg)
        settranscription_grammer_avg(transcription_grammer_avg)


        transcription_clarity_avg =Math.round(((result.transcription_1_word_clarity_score + result.transcription_2_word_clarity_score + result.transcription_3_word_clarity_score + result.transcription_4_word_clarity_score) / 4) )
        settranscription_clarity_avg(transcription_clarity_avg)



        transcription_phonetic_accuracy_score = Math.round(((result.transcription_1_phonetic_accuracy_score + result.transcription_2_phonetic_accuracy_score + result.transcription_3_phonetic_accuracy_score + result.transcription_4_phonetic_accuracy_score) / 4))
        settranscription_phonetic_accuracy_score(transcription_phonetic_accuracy_score)


        transcription_pause_patterns_avg_pause_score = Math.round(((result.transcription_1_pause_patterns_avg_pause_score + result.transcription_2_pause_patterns_avg_pause_score + result.transcription_3_pause_patterns_avg_pause_score + result.transcription_4_pause_patterns_avg_pause_score) / 4))
        settranscription_pause_patterns_avg_pause_score(transcription_pause_patterns_avg_pause_score)








        // .......... transcription 1 data .......................
        // const transcription_1_data_inner = document.getElementById('transcription_data')
        // transcription_1_data_inner.innerHTML = result[`transcription_${index_main}_data`];
        settranscription_1_data_inner(result[`transcription_${index_main}_data`]);



        // .. pheonetic .......
        let transcription_1_phonetic_accuracy_score = document.getElementById('transcription_1_phonetic_accuracy_score')
        transcription_1_phonetic_accuracy_score.innerHTML = result[`transcription_${index_main}_phonetic_accuracy_score`] * 100 + '%';
        settranscription_1_phonetic_accuracy_score(transcription_1_phonetic_accuracy_score)

        // Function to extract word values from issues
        const extractWords = (data) => {
          const wordsList =
            data[`transcription_${index_main}_phonetic_accuracy_words_list`].map((item) => item.word);
          return wordsList;
        };

        extractedWords = extractWords(result);
        setextractedWords(extractedWords)
        console.log("list_ph : ", extractedWords)



        // ..filler words usage ......

        let transcription_1_filler_word_usage_count = document.getElementById('transcription_1_filler_word_usage_count')
        transcription_1_filler_word_usage_count.innerHTML = 'Count : ' + result[`transcription_${index_main}_filler_word_usage_count`];
        settranscription_1_filler_word_usage_count(transcription_1_filler_word_usage_count)

        const extractWords1 = (data) => {
          const wordsList =
            data[`transcription_${index_main}_filler_word_issues_in_words_list`].map((item) => item.word);
          return wordsList;
        };

        extractedWords1 = extractWords1(result);
        setextractedWords1(extractedWords1)





        // .. word clarity .............
        let transcription_1_word_clarity_score = document.getElementById('transcription_1_word_clarity_score')
        transcription_1_word_clarity_score.innerHTML = result[`transcription_${index_main}_word_clarity_score`] * 100 + '%';
        settranscription_1_word_clarity_score(transcription_1_word_clarity_score)

        const extractWords2 = (data) => {
          const wordsList =
            data[`transcription_${index_main}_word_clarity_words_list`].map((item) => item.word);
          return wordsList;
        };

        extractedWords2 = extractWords2(result);
        setextractedWords2(extractedWords2)




        // pause patterns ...........

        transcription_1_pause_patterns_avg_pause_score = result[`transcription_${index_main}_pause_patterns_avg_pause_score`];
        settranscription_1_pause_patterns_avg_pause_score(transcription_1_pause_patterns_avg_pause_score);

        transcription_1_pause_patterns_longest_pause_score = result[`transcription_${index_main}_pause_patterns_longest_pause_score`];
        settranscription_1_pause_patterns_longest_pause_score(transcription_1_pause_patterns_longest_pause_score);





        // speaking pace ..........

        transcription_1_speaking_pace_wpm = result[`transcription_${index_main}_speaking_pace_wpm`];
        settranscription_1_speaking_pace_wpm(transcription_1_speaking_pace_wpm);
        const transcription_1_speaking_pace_wpm_inner = document.getElementById('transcription_1_speaking_pace_wpm_inner')
        transcription_1_speaking_pace_wpm_inner.innerHTML = transcription_1_speaking_pace_wpm

        transcription_1_speaking_pace_variability_text = result[`transcription_${index_main}_speaking_pace_variability_text`];
        settranscription_1_speaking_pace_variability_text(transcription_1_speaking_pace_variability_text);
        const transcription_1_speaking_pace_variability_text_inner = document.getElementById('transcription_1_speaking_pace_variability_text_inner')
        transcription_1_speaking_pace_variability_text_inner.innerHTML = 'Variability : ' + transcription_1_speaking_pace_variability_text





        // ...grammer
        const extractGrammaticalErrors = (data) => {
          const errorsList = data[`transcription_${index_main}_grammatical_list_main`].map((item) => ({
            error: item.error,
            suggestedCorrection: item.suggested_correction,
          }));
          return errorsList;
        };

        // Assuming `result` is your data source
        ExtractedErrors = extractGrammaticalErrors(result);

        // Assuming you have a state to store extracted errors
        setExtractedErrors(ExtractedErrors)

        console.log("New grammer ", ExtractedErrors)


        // Continue for other states as needed...
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data on question selection:", error);
    }
  };
  















  const grammarData = {
    labels: ["Correct", "Errors"],
    datasets: [
      {
        data: [97, 3],
        backgroundColor: ["#93c5fd", "#fca5a5"],
        borderColor: ["#3b82f6", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };










  

  const pauseData = {
    labels: ["Average Pause", "Longest Pause"],
    datasets: [
      {
        data: [transcription_1_pause_patterns_avg_pause_score, transcription_1_pause_patterns_longest_pause_score],
        backgroundColor: ["#a5b4fc", "#c4b5fd"],
        borderColor: ["#6366f1", "#8b5cf6"],
        borderWidth: 1,
      },
    ],
  };

  const generateFeedback = () => {
    const feedback = `Transcription Analysis Feedback:
    Grammatical Errors: 3 errors found
    Word Clarity: 94% clear pronunciation
    Phonetic Accuracy: 95% accuracy
    Pause Patterns: Average pause 0.67s
    Filler Words: 3 instances
    Speaking Pace: 109.8 WPM`;

    const blob = new Blob([feedback], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcription-feedback.txt";
    link.click();
  };





  const handleVideoPlay = () => {
    // Play the video when the user interacts with it
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleDownload = () => {
    const pdfUrl = "https://drive.google.com/uc?export=download&id=1rJx8ebuBPO96JrU1DzBAMlVjt_v1tace"; // Direct download link
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "sample.pdf"; // Set the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };
  
  


  return (
    <div>


      {/* ----------- performance metrices ------------ */}
      {/* <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"> */}
      <div className="max-w-full mt-[-16px] bg-white rounded-xl  p-2">

        <h2 className="text-3xl font-bold  text-gray-800 mb-3   text-center">
          Performance Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`group relative rounded-lg ${metric.bgcolor}`} >
              <CircularProgress
                value={metric.value}
                title={metric.title}
                icon={metric.icon}
                color={metric.color}
              />
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>




      {/* -----below performance metrices ------ */}



      {/* <div className="min-h-screen bg-gray-50 p-4"> */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Side - Camera Preview */}

        <div className="lg:w-1/2 bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Camera Preview </h2>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            {showCamera ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
                onPlay={handleVideoPlay} // Ensure it plays when interacted
              >
                <source
                  src={src_vid}
                  // src="https://firebasestorage.googleapis.com/v0/b/psychic-bedrock-444405-n8.firebasestorage.app/o/sample%2Fquestion_4.mp4?alt=media&token=3979cd1d-7918-4047-b94f-9e7f02ccba9d"
                  type="video/mp4"
                />
              </video>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Camera preview unavailable</p>
              </div>
            )}
          </div>







          {/* Transcription text */}
          <div className="bg-white rounded-xl p-4 shadow-lg mt-6">
            <div className="flex items-center gap-2 mb-4">
              <MdGrading className="text-blue-500 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-800">Transcription Text</h3>
            </div>

            <div className="mt-4">
              {/* <p className="text-gray-600">I am a driven and enthusiastic web developer currently pursuing my B.Tech in Computer Science at VIT. I am passionate about creating user-friendly and efficient web applications. My coursework at VIT has provided me with a solid foundation in programming principles, data structures, and algorithms, which I apply to my web development projects. I am proficient in front-end technologies like HTML, CSS, and JavaScript, and I am also exploring back-end technologies like Node.js, Python, Django, PHP, etcetera. I am a quick learner and eager to expand my skill set. I am also actively involved in hackathons and personal projects. I am excited about the opportunity to contribute my skills and learn from experienced professionals in real-world settings.</p> */}
              {/* <p id="transcription_data" className="text-gray-600">I am a driven and enthusiastic web developer currently pursuing my B.Tech in Computer Science at VIT. I am passionate about creating user-friendly and efficient web applications. My coursework at VIT has provided me with a solid foundation in programming principles, data structures, and algorithms, which I apply to my web development projects. I am proficient in front-end technologies like HTML, CSS, and JavaScript, and I am also exploring back-end technologies like Node.js, Python, Django, PHP, etcetera. I am a quick learner and eager to expand my skill set. I am also actively involved in hackathons and personal projects. I am excited about the opportunity to contribute my skills and learn from experienced professionals in real-world settings.</p> */}
              <p id="transcription_data" className="text-gray-600">{transcription_1_data_inner}</p>

            </div>
          </div>



          {/* Phonetic Accuracy */}
          <div className="bg-white rounded-xl p-4 shadow-lg mt-3">
            <div className="flex items-center gap-2">
              <BsMicFill className="text-indigo-500 text-xl" />
              <h3 className="text-xl font-semibold text-gray-800">Phonetic Accuracy</h3>
            </div>
            <div className="mt-2">
              <div id="transcription_1_phonetic_accuracy_score" className="text-3xl font-bold text-indigo-500">94%</div>
              <p className="text-gray-600 mt-2">Issues in words:</p>
              <ul className="list-disc pl-5 text-gray-500 align-baseline">
                {/* <li className="">pronunciation</li>
                <li className="">statistical</li>
                <li className="">phenomenon</li>
                <li className="">phenomenon</li> */}
                {extractedWords.map((word, index) => (
                  <li key={index} className="">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>




          {/* Filler Words Usage */}
          <div className="bg-white rounded-xl p-4 shadow-lg mt-3">
            <div className="flex items-center gap-2">
              <BsMicFill className="text-indigo-500 text-xl" />
              <h3 className="text-xl font-semibold text-gray-800">Filler Words Usage</h3>
            </div>
            <div className="mt-2">
              <div id="transcription_1_filler_word_usage_count" className="text-3xl font-bold text-indigo-500">Count : 3</div>
              <p className="text-gray-600 mt-2">Filler Words:</p>
              <ul className="list-disc pl-5 text-gray-500 align-baseline">

                {extractedWords1.map((word, index) => (
                  <li key={index} className="">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>


        </div>





        {/* Right Side - Analysis Dashboard */}
        <div className="lg:w-1/2 space-y-4">
          {/* ------- question dropdown ----------- */}

          {/* <div className="relative w-full inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Select Question
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {showDropdown && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {questions.map((question) => (
                    <a
                      key={question.id}
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                      onClick={() => handleSelectQuestion(question.question, question.id)}
                    >
                      {question.question}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div> */}












<div className="relative w-full inline-block text-left">
  <div>
    <button
      type="button"
      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      {selectedQuestion || "Select Question"}
      <svg
        className="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>

  {showDropdown && (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <div className="py-1" role="none">
        {questions.map((question) => (
          <a
            key={question.id}
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={() => handleSelectQuestion(question.question, question.id)}
          >
            {question.question}
          </a>
        ))}
      </div>
    </div>
  )}
</div>



          {/* Grammatical Errors */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <MdGrading className="text-blue-500 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-800">Grammatical Errors</h3>
            </div>
            <div className="h-48 w-48 mx-auto">
              <Doughnut data={grammarData} />
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Wrong words:</p>
              <ul className="list-disc pl-5 text-gray-500">
                {/* <li>recieved → received</li>
                <li>their → they're</li>
                <li>alot → a lot</li> */}

                {ExtractedErrors.map((item, index) => (
                  <li key={index}>
                    <strong>{item.error}</strong> → {item.suggestedCorrection}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Word Clarity */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <BsMicFill className="text-indigo-500 text-xl" />
              <h3 className="text-xl font-semibold text-gray-800">Word Clarity</h3>
            </div>
            <div className="mt-2">
              <div id="transcription_1_word_clarity_score" className="text-3xl font-bold text-indigo-500">94%</div>
              <p className="text-gray-600 mt-2">Unclear words:</p>
              <ul className="list-disc pl-5 text-gray-500">
                {extractedWords1.map((word, index) => (
                  <li key={index} className="">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pause Patterns */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <BsPauseFill className="text-purple-500 text-2xl" />
              <h3 className="text-xl font-semibold text-gray-800">Pause Patterns</h3>
            </div>
            <div className="h-48 w-48 mx-auto">
              <Pie data={pauseData} />
            </div>
          </div>

          {/* Speaking Pace */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <BsSpeedometer className="text-green-500 text-xl" />
              <h3 className="text-xl font-semibold text-gray-800">Speaking Pace</h3>
            </div>
            <div className="mt-2">
              <div id="transcription_1_speaking_pace_wpm_inner" className="text-3xl font-bold text-green-500">109.8 WPM</div>
              <p className="text-gray-600 mt-2">Optimal range: 120-150 WPM</p>
              <p id="transcription_1_speaking_pace_variability_text_inner" className="text-gray-600 mt-2">Variability: variable</p>
            </div>
          </div>

          {/* Download Feedback Button */}
          <button
            // onClick={handleOpenModal}
            onClick={handleDownload}
            className="open-modal-button w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiDownload className="text-xl" />
            Download Feedback
          </button>
        </div>
        
      </div>
  



    </div>
  )
}

export default page