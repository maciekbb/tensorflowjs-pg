import { useEffect, useState } from "react";

import * as tf from "@tensorflow/tfjs";
import useNet from "./useNet";

const formatPrediction = (result: any) => {
  return `
            prediction: ${result[0].className}\n
            probability: ${result[0].probability}
          `;
};

const usePredictions = (video: HTMLVideoElement | null) => {
  const [prediction, setPrediction] = useState("none");
  const [frame, setFrame] = useState(0);
  const net = useNet();


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
