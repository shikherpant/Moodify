import { useEffect, useRef, useState } from "react";
import { initMediaPipe, detectEmotion } from "../utils/utils";
import "../Styles/style.scss"

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const [capture, setCapture] = useState(false);

  useEffect(() => {
    initMediaPipe({videoRef, faceLandmarkerRef, setEmotion});
  }, []);

  const handleCaptureMood = () => {
    if (faceLandmarkerRef.current && videoRef.current) {
      const video = videoRef.current;
      const results = faceLandmarkerRef.current.detectForVideo(
        video,
        performance.now()
      );

      if (results.faceBlendshapes.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;
        const emotion = detectEmotion(blendshapes);
        setEmotion(emotion);
      }
    }
  };

  

  return (
    <div className="Emotion-Wrapper" style={{ textAlign: "center" }}>
      <h2>Emotion: {emotion}</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        style={{ borderRadius: "10px" }}
      />

      <button onClick={handleCaptureMood}>Capture Mood</button>
    </div>
  );
}