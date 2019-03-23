import React, { useEffect, useRef, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import useNet from "./useNet";
import useWebcam from "./useWebcam";
import { MobileNet } from "@tensorflow-models/mobilenet";

const formatPrediction = (result: any) => {
  return `
            prediction: ${result[0].className}\n
            probability: ${result[0].probability}
          `;
};

const usePredictions = (net: MobileNet | null, video: HTMLVideoElement | null) => {
  const [prediction, setPrediction] = useState("none");
  const [frame, setFrame] = useState(0);


  useEffect(() => {
    if (net && video) {
      net.classify(video).then(result => {
        setPrediction(formatPrediction(result));

        tf.nextFrame().then(() => {
          setTimeout(() => {
            setFrame(frame + 1);
          }, 1000);
        });
      });
    }
  }, [net, frame]);

  return prediction;
};

export default usePredictions
