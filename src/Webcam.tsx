import React, { useEffect, useRef, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import useNet from "./useNet";
import useWebcam from "./useWebcam";
import usePredictions from "./usePredictions";



const Webcam = () => {
  const net = useNet();
  const { streamReady, videoRef } = useWebcam();
  const prediction = usePredictions(net, videoRef.current)

  if (streamReady) {
    return (
      <div>
        <div>Prediction: {prediction}</div>
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
