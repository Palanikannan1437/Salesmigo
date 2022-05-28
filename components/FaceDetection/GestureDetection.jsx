import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import thumbsDownGesture from "../../utils/ThumbsDownGesture";
import ProgressBar from "../HelperComponents/ProgressBar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import OverTitle from "../PageStructureComponents/OverTitle";
import styled from "@emotion/styled";
import { euclideanDistance } from "../../utils/euclideanDistance";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GestureDetection = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoadedHandModel, setIsLoadedHandModel] = useState(false);
  const [isLoadedFaceModel, setIsLoadedFaceModel] = useState(false);

  const [captureVideo, setCaptureVideo] = useState(false);

  //maintaining state for the finger recognition net
  const [net, setNet] = useState();

  const [firstReqSent, setFirstReqSent] = useState(false);
  const [detectionDescriptor, setDetectionDescripter] = useState([]);
  const [detection, setDetection] = useState("");
  const [detectionGesture, setDetectionGesture] = useState(null);

  const prevDetection = useRef([-1, -1]);
  const prevGesture = useRef("");

  //load finger recognition models
  useEffect(() => {
    const loadModels = async () => {
      const net = await handpose.load();
      setNet(net);
      setIsLoadedHandModel(true);
      console.log("Handpose model loaded");
    };
    loadModels();
  }, []);

  //load face recognition models(to make it less heavy, we'll use tinyFaceDetector)
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      setIsLoadedFaceModel(true);
    };
    loadModels();
  }, []);

  //starting the cameras
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

  //recognizing face and detecting gestures
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        isLoadedFaceModel &&
        isLoadedHandModel &&
        canvasRef &&
        canvasRef.current &&
        webcamRef &&
        webcamRef.current &&
        net
      ) {
        detectFace();
        detectGestures(net);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    isLoadedFaceModel,
    isLoadedHandModel,
    canvasRef,
    webcamRef,
    webcamRef.current,
    canvasRef.current,
  ]);

  //function to detect hand gestures
  const detectGestures = async (net) => {
    try {
      const hand = await net.estimateHands(webcamRef.current);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          thumbsDownGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 9);
        if (gesture.gestures.length > 0) {
          setDetectionGesture(gesture.gestures[0].name);
        }
      }
    } catch (error) {
      console.log("gesture detection error: ", error);
    }
  };
  console.log("current gesture", detectionGesture);

  //function to recognize the customer whose gestures we're detecting
  const detectFace = async () => {
    try {
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        webcamRef.current
      );

      const displaySize = {
        width: 640,
        height: 480,
      };

      const detections = await faceapi
        .detectAllFaces(
          webcamRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        setDetectionDescripter(detections[0].descriptor);
        setDetection(detections);
        faceapi.matchDimensions(canvasRef.current, displaySize);

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current.getContext("2d").clearRect(0, 0, 640, 480);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    } catch (err) {
      console.log("error is:", err);
    }
  };

  useEffect(() => {
    if (!firstReqSent && detectionGesture !== null && detection.length > 0) {
      compareFaces(detectionDescriptor, detectionGesture);
      setFirstReqSent(true);
      console.log("FIRST TIME api for face detection called!");
    } else {
      if (
        euclideanDistance(detectionDescriptor, prevDetection.current) > 0.45 ||
        prevGesture.current !== detectionGesture
      ) {
        console.log("api for face detection called!!");
        compareFaces(detectionDescriptor, detectionGesture);
      }
    }
    prevDetection.current = detectionDescriptor;
    prevGesture.current = detectionGesture;
  }, [detectionDescriptor, firstReqSent, detectionGesture]);

  //recognizing customer and updating their emotion if found
  const compareFaces = (detectionDescriptor, detectionGesture) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/customers/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descriptor: detectionDescriptor }),
    })
      .then((response) => {
        return response.json();
      })
      .then((userData) => {
        if (userData._label) {
          if (userData._distance < 0.45) {
            toast(
              `${
                userData._label.split(" ")[0]
              } is currently showing - ${detectionGesture} sign`
            );
            props.updateCustomerGesture(
              detectionGesture,
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
      <ToastContainer />
      <Content>
        <OverTitle>Outside Changing Room Aisle - {props.aisleName}</OverTitle>
      </Content>
      {isLoadedFaceModel && isLoadedHandModel ? (
        <div style={{ textAlign: "center", padding: "10px" }}>
          {captureVideo ? (
            <button
              onClick={closeWebcam}
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
              Start Gesture Detection{" "}
              <ThumbUpIcon fontSize="large" sx={{ color: "white" }} />
            </button>
          )}
        </div>
      ) : (
        <ProgressBar open={true} />
      )}
      {captureVideo ? (
        isLoadedFaceModel ? (
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
                onPlay={detectFace}
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
};

const Content = styled.div`
  padding: 4rem 3rem 2rem 5rem;

  & > *:not(:first-child) {
    margin-top: 2rem;
  }
  text-align: center;
`;

export default GestureDetection;
