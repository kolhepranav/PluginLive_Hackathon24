import os
from flask import Flask, request, jsonify
from moviepy.editor import VideoFileClip
import google.generativeai as genai
from dotenv import load_dotenv
import json
import logging
from werkzeug.utils import secure_filename
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor
import json
import requests
from io import BytesIO
import concurrent.futures
from tqdm import tqdm

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
logging.getLogger("moviepy").setLevel(logging.ERROR)

# Load environment variables from the .env file
load_dotenv()

# Configure the Gemini API with your API key
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)


def transcribe_mp3_file(mp3_file_path):
    try:
        # Debugging: Log the audio file path
        print(f"Transcribing audio file: {mp3_file_path}")

        # Upload the audio file
        myfile = genai.upload_file(mp3_file_path)
        # print(f"{myfile=}")

        # Initialize the model
        # model = genai.GenerativeModel("gemini-exp-1206")
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = """
        Analyze the provided audio file for transcription and key speaking metrics. Focus specifically on accurately identifying filler words. Return the analysis in JSON format with the following structure:
        {
            "transcription": "string",
            "metrics": {
                "grammatical_errors": {
                "count": "integer",
                "details": [
                    {
                    "error": "string",
                    "suggested_correction": "string",
                    "context": "string"
                    }
                ]
                },
                "word_clarity": {
                "score": "float (0-1)", 
                "unclear_words": [
                    {
                    "word": "string",
                    "timestamp": "float (in seconds)"
                    }
                ]
                },
                "phonetic_accuracy": {
                "score": "float (0-1)",
                "issues": [
                    {
                    "word": "string",
                    "expected_pronunciation": "string",
                    "actual_pronunciation": "string",
                    "timestamp": "float (in seconds)"
                    }
                ],
                "excluded_words": [
                    {
                    "word": "string",
                    "type": "string (e.g., 'place_name', 'person_name')",
                    "reason": "string"
                    }
                ]
                },
                "pause_patterns": {
                "average_pause_duration": "float (in seconds)",
                "longest_pause": {
                    "duration": "float (in seconds)",
                    "timestamp_start": "float",
                    "timestamp_end": "float"
                },
                "short_pauses": "count (integer)"
                },
                "filler_word_usage": {
                "count": "integer",
                "details": [
                    {
                    "word": "string",
                    "timestamp": "float (in seconds)"
                    }
                ]
                },
                "speaking_pace": {
                "words_per_minute": "float",
                "variability": "string (e.g., 'consistent', 'variable')"
                }
            }
        }

        Description:
        1. transcription: Provide the verbatim transcription of the audio.
        2. grammatical_errors: Identify grammatical issues with the count, type of errors, context, and suggested corrections.
        3. word_clarity: Measure clarity as a score (0-1) and list unclear words with timestamps.
        4. phonetic_accuracy: Provide an accuracy score (0-1) and highlight mispronounced words (excluding names of places and people). Add a section for excluded_words with the word, its type, and the reason for exclusion.
        5. pause_patterns: Analyze pauses, including average pause duration, the longest pause with timestamps, and the count of short pauses (<0.5s).
        6. filler_word_usage:
            Accurately identify common filler words.
            Count the total occurrences of filler words and provide a detailed list with timestamps.
            Add an examples section that includes specific phrase contexts around the filler words, with start and end timestamps.
        7. speaking_pace: Calculate words per minute and comment on pace variability.

        Ensure the JSON structure adheres strictly to the format above.
        """

        # Generate content using the uploaded file
        result = model.generate_content([myfile, prompt])

        # Check if the response contains any text
        if result and hasattr(result, 'text'):
            transcription = result.text
            transcription = transcription.replace('```', '').replace('json', '')
            # print(f"Transcription:\n{transcription}")  # Debug: Print the transcription
            return transcription

        return "No transcription detected in the audio"

    except Exception as e:
        print(f"Error: {str(e)}")
        return f"Error: {str(e)}"
    


def get_feedback(result):
    try:
        # Initialize the model
        # model = genai.GenerativeModel("gemini-exp-1206")
        model = genai.GenerativeModel("gemini-1.5-flash")

        print("Generating Feedback")

        # Prepare the prompt with the result data as a JSON string
        result_json = json.dumps(result, indent=4)
        format = """
            {
            "assessment_summary": {
                "strengths": "string",
                "improvement_areas": ["string"]
            },
            "recommendations": {
                "grammar": "string",
                "pronunciation": "string",
                "fluency": "string",
                "non_verbal": "string"
            },
            "goals": {
                "short_term": ["string"],
                "long_term": ["string"]
            },
            "resources": ["string"],
            "timeline": {
                "week_1": ["string"],
                "week_2": ["string"],
                "week_3": ["string"],
                "week_4": ["string"]
            }
        }
        """
        
        prompt = f"""
        You are an expert communication coach specializing in AI-driven assessments.
        Based on the following input metrics from a communication analysis, generate a personalized improvement plan in JSON format.
        Ensure the output includes actionable recommendations, measurable goals, and specific resources for improvement. 
        The plan should address the user's weaknesses and provide strategies for sustained improvement.

        ### Input Data:
        {result_json}

        ### Output Requirements:
        1. Assessment Summary:
        - Key strengths and areas of improvement.

        2. Actionable Recommendations:
        - Grammar: Correct specific errors and provide exercises.
        - Pronunciation: Focus on unclear words with phonetic suggestions.
        - Fluency: Address pauses, filler words, and pace variability.
        - Non-Verbal Cues: Improve posture, gestures, and eye contact.

        3. Measurable Goals:
        - Specific, time-bound objectives for improvement.

        4. Practice Resources:
        - Suggested tools, apps, and exercises.

        5. Timeline:
        - Weekly tasks to achieve goals.

        ### Output Format:
        {format}

        Ensure all recommendations are customized to the input metrics.
        """

        # Generate content using the model
        response = model.generate_content(contents=[prompt])

        # Check if the response contains any text
        if response and hasattr(response, 'text'):
            feedback = response.text
            feedback = feedback.replace('```', '').replace('json', '')
            return feedback

        return "No feedback generated."

    except Exception as e:
        return f"Error: {str(e)}"

def download_video_to_memory(url):
    """Download video file from URL to memory with progress bar."""
    response = requests.get(url, stream=True)
    if response.status_code != 200:
        raise Exception(f"Failed to download video. Status code: {response.status_code}")
    
    # Get file size for progress bar
    total_size = int(response.headers.get('content-length', 0))
    
    # Initialize progress bar
    progress = tqdm(
        total=total_size,
        unit='iB',
        unit_scale=True,
        desc=f'Downloading {url.split("/")[-1]}'
    )
    
    # Download with progress
    buffer = BytesIO()
    for data in response.iter_content(1024):
        progress.update(len(data))
        buffer.write(data)
    progress.close()
    
    buffer.seek(0)
    return buffer

def download_single_video(url, index):
    """Download a single video and return its path"""
    try:
        url_folder = os.path.join(UPLOAD_FOLDER, f"url_{index}")
        os.makedirs(url_folder, exist_ok=True)
        
        video_data = download_video_to_memory(url)
        filename = secure_filename(url.split("/")[-1])
        video_path = os.path.join(url_folder, filename)
        
        with open(video_path, "wb") as video_file:
            video_file.write(video_data.getvalue())
            
        return video_path
    except Exception as e:
        return {"error": str(e)}

def process_video_file(video_path, index):
    """Process a downloaded video file and generate transcript"""
    video_clip = None
    try:
        # Extract audio
        url_folder = os.path.dirname(video_path)
        audio_path = os.path.join(url_folder, f"audio_{index}.mp3")
        video_clip = VideoFileClip(video_path)
        video_clip.audio.write_audiofile(audio_path, verbose=False, logger=None)
        
        # Generate transcript
        transcription = transcribe_mp3_file(audio_path)
        return {f"transcription_{index}": json.loads(transcription)}
    except Exception as e:
        return {f"transcription_{index}": {"error": str(e)}}
    finally:
        if video_clip:
            video_clip.close()


def process_url_list(urls):
    """Process multiple URLs in two phases: download and transcribe"""
    try:
        downloaded_files = {}
        results = {}
        timeout = 300

        # Phase 1: Download all videos in parallel
        print("Phase 1: Downloading videos...")
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            future_to_url = {
                executor.submit(download_single_video, url, i + 1): (url, i + 1) 
                for i, url in enumerate(urls)
            }
            
            for future in concurrent.futures.as_completed(future_to_url, timeout=timeout):
                url, index = future_to_url[future]
                try:
                    path = future.result()
                    if isinstance(path, dict):  # Error occurred
                        results[f"transcription_{index}"] = {"error": path["error"]}
                    else:
                        downloaded_files[index] = path
                except Exception as e:
                    results[f"transcription_{index}"] = {"error": str(e)}

        # Phase 2: Process downloaded videos in parallel
        print("\nPhase 2: Processing videos...")
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            future_to_file = {
                executor.submit(process_video_file, path, index): index 
                for index, path in downloaded_files.items()
            }
            
            for future in concurrent.futures.as_completed(future_to_file, timeout=timeout):
                index = future_to_file[future]
                try:
                    result = future.result()
                    results.update(result)
                except Exception as e:
                    results[f"transcription_{index}"] = {"error": str(e)}

        # Generate feedback
        final_result = get_feedback(results)
        results["feedback"] = final_result
        return results

    except Exception as e:
        return {"error": f"Failed to process URLs: {str(e)}"}


@app.route('/process-videos', methods=['POST'])
def process_videos():
    try:
        data = request.get_json()
        
        if not data or 'video-urls' not in data:
            return jsonify({
                'error': 'Invalid request. Expected JSON with "video-urls" key'
            }), 400
            
        video_urls = data['video-urls']
        
        if not isinstance(video_urls, list) or not video_urls:
            return jsonify({
                'error': 'Invalid video-urls. Expected non-empty list of URLs'
            }), 400

        # Process videos and get results
        results = process_url_list(video_urls)
        print(results)
        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
