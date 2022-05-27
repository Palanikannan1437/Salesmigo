import * as faceapi from "@vladmandic/face-api";
import React, { useEffect, useRef, useState } from "react";
import { euclideanDistance } from "../../utils/euclideanDistance";
import { useSession } from "next-auth/react";
import OverTitle from "../PageStructureComponents/OverTitle";
import ProgressBar from "../HelperComponents/ProgressBar";
import styled from "@emotion/styled";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function EmotionDetection(props) {
  const { data: session } = useSession();

  const [isLoaded, setIsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [firstReqSent, setfirstReqSent] = useState(false);
  const webcamRef = useRef();
  const canvasRef = useRef();

  const [detectionDescriptor, setDetectionDescripter] = useState([]);
  const [detect, setDetection] = useState([]);
  const [detectionExpression, setdetectionExpression] = useState([]);

  const [name, setName] = useState("");

  const prevDetection = useRef([-1, -1]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      await faceapi.nets.ageGenderNet.loadFromUri("/models");
      setIsLoaded(true);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = webcamRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        isLoaded &&
        canvasRef &&
        canvasRef.current &&
        webcamRef &&
        webcamRef.current
      ) {
        handleVideoOnPlay();
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isLoaded]);

  //find most suited expression
  const getMaxValueKey = (obj) => {
    return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
  };

  const handleVideoOnPlay = async () => {
    try {
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        webcamRef.current
      );

      const displaySize = {
        width: 640,
        height: 480,
      };

      const detections = await faceapi
        .detectAllFaces(webcamRef.current, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender();

      setDetectionDescripter(detections[0].descriptor);
      setdetectionExpression(getMaxValueKey(detections[0].expressions));
      setDetection(detections);
      // console.log(detections);

      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef &&
        canvasRef.current &&
        canvasRef.current.getContext("2d").clearRect(0, 0, 640, 480);
      canvasRef &&
        canvasRef.current &&
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      canvasRef &&
        canvasRef.current &&
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    } catch (err) {
      console.log("error is:", err);
    }
  };

  useEffect(() => {
    if (!firstReqSent && detect.length > 0) {
      compareFaces(detectionDescriptor, detectionExpression);
      setfirstReqSent(true);
      console.log("FIRST TIME api for face detection called!!");
    } else {
      if (
        euclideanDistance(detectionDescriptor, prevDetection.current) > 0.45
      ) {
        console.log("api for face detection called!!");
        compareFaces(detectionDescriptor, detectionExpression);
      }
    }
    prevDetection.current = detectionDescriptor;
  }, [detectionDescriptor, firstReqSent, detectionExpression]);

  const compareFaces = (detectionDescriptor, detectionExpression) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.idToken}`,
      },
      body: JSON.stringify({ descriptor: detectionDescriptor }),
    })
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        if (userData._label) {
          if (userData._distance < 0.5) {
            setName(userData._label);
            props.updateCustomerEmotion(
              detectionExpression,
              userData._label.split(" ")[1],
              props.aisleName
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeWebcam = () => {
    webcamRef.current.pause();
    webcamRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  return (
    <div>
      <Content>
        <OverTitle>Aisle - {props.aisleName}</OverTitle>
      </Content>
      {isLoaded ? (
        <div style={{ textAlign: "center", padding: "10px" }}>
          {captureVideo ? (
            <button
              onClick={closeWebcam}
              style={{
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                padding: "15px",
                fontSize: "25px",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Close Webcam
            </button>
          ) : (
            <button
              onClick={startVideo}
              style={{
                cursor: "pointer",
                backgroundColor: "rgb(22,115,255)",
                color: "white",
                padding: "15px",
                fontSize: "25px",
                border: "none",
                borderRadius: "10px",
              }}
            >
              Start Emotion Analysis{" "}
              <EmojiEmotionsIcon fontSize="large" sx={{ color: "white" }} />
            </button>
          )}
        </div>
      ) : (
        <ProgressBar open={true} />
      )}
      {captureVideo ? (
        isLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={webcamRef}
                height={480}
                width={640}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <ProgressBar open={true} />
        )
      ) : (
        <ProgressBar open={captureVideo} />
      )}
    </div>
  );
}

const Content = styled.div`
  padding: 4rem 3rem 2rem 5rem;

  & > *:not(:first-child) {
    margin-top: 2rem;
  }
  text-align: center;
`;

export default EmotionDetection;
