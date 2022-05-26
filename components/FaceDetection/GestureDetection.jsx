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

const GestureDetection = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoadedHandModel, setIsLoadedHandModel] = useState(false);
  const [isLoadedFaceModel, setIsLoadedFaceModel] = useState(false);

  const [captureVideo, setCaptureVideo] = useState(false);

  //maintaining state for the finger recognition net
  const [net, setNet] = useState();

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
        console.log(gesture);
      }
    } catch (error) {
      console.log("gesture detection error: ", error);
    }
  };

  //function to recognize the customer whose gestures we're recognizing
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

      console.log(detections[0].descriptor, "face detected");
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

  const closeWebcam = () => {
    webcamRef.current.pause();
    webcamRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };
  return (
    <div>
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
      <h1 style={{ color: "black" }}>Helo {name}</h1>
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
