import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

 const initMediaPipe = async ({videoRef, faceLandmarkerRef, setEmotion}) => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
        },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true
      }
    );

    startCamera(videoRef, faceLandmarkerRef, setEmotion);
  };



   const startCamera = async (videoRef, faceLandmarkerRef, setEmotion) => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = () => {
      detect(videoRef, faceLandmarkerRef, setEmotion);
    };
  };



  const detect = (videoRef, faceLandmarkerRef, setEmotion) => {
    // Just initialize - no continuous detection
    // Detection will happen only on button click
  };



  const get = (arr, name) =>
    arr.find((b) => b.categoryName === name)?.score || 0;



  const detectEmotion = (blendshapes) => {
    const smile =
      (get(blendshapes, "mouthSmileLeft") +
        get(blendshapes, "mouthSmileRight")) /
      2;

    const frown =
      (get(blendshapes, "mouthFrownLeft") +
        get(blendshapes, "mouthFrownRight")) /
      2;

    const jawOpen = get(blendshapes, "jawOpen");

    const eyeWide =
      (get(blendshapes, "eyeWideLeft") +
        get(blendshapes, "eyeWideRight")) /
      2;

    const browUp = get(blendshapes, "browInnerUp");

    if (smile > 0.5) return "😊 Happy";

    if (jawOpen > 0.5 && eyeWide > 0.3) return "😲 Surprised";

    if (frown > 0.00009 && browUp > 0.0001) return "😢 Sad";

    return "😐 Neutral";
  };

export { initMediaPipe, detectEmotion };