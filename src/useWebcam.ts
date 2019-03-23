import React, { useEffect, useRef, useState } from "react";

import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as tf from "@tensorflow/tfjs";
import useNet from "./useNet";
import { MobileNet } from "@tensorflow-models/mobilenet";

async function setupWebcam(): Promise<MediaStream> {
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


const useWebcam = () => {
    const streamRef = useRef<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setupWebcam().then(stream => {
          streamRef.current = stream;
          setReady(true);
        });
      }, []);

      useEffect(() => {
        const video = videoRef.current;
        const stream = streamRef.current;

        if (video && stream) {
          video.srcObject = stream;
        }
      }, [ready]);

      return {videoRef, streamReady: ready}
}

export default useWebcam
