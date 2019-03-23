import React, { useEffect, useRef, useState } from "react";

import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { getNet } from "./getNet";
import * as tf from '@tensorflow/tfjs'

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        stream => {
          //   webcamElement.srcObject = stream;
          //   webcamElement.addEventListener("loadeddata", () => resolve(), false);
          resolve(stream);
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject();
    }
  });
}

const formatPrediction = (
  result: { className: string; probability: number }[]
) => {
  return `
          prediction: ${result[0].className}\n
          probability: ${result[0].probability}
        `;
};
const Webcam = () => {
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [prediction, setPrediction] = useState("none");
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    setupWebcam().then(stream => {
      // @ts-ignore
      streamRef.current = stream;
      setReady(true);
    });
  }, []);


  useEffect(() => {
    let isCancelled = false;
    const video = videoRef.current;
    const stream = streamRef.current;

    if (video && stream) {
      // @ts-ignore
      video.srcObject = stream;


    }

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    // await tf.nextFrame();
  }, [ready]);

  useEffect(() => {
    getNet().then(net => {
      const video = videoRef.current;

      // @ts-ignore
      net.classify(video).then(result => {
        setPrediction(formatPrediction(result));

        tf.nextFrame().then(() => {
          setTimeout(() => {
            setFrame(frame + 1)
          }, 1000)
        });
      });
    });


  }, [frame])

  if (ready) {
    return (
      <div>
        <div>Prediction: {prediction}</div>
        <div>Frame: {frame}</div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="224"
          height="224"
        />
      </div>
    );
  }

  return <div>Waiting for camera...</div>;
};

export default Webcam;
