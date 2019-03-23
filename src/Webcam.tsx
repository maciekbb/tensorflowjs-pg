import React, { useEffect, useRef, useState } from "react";

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

const Webcam = () => {
  const streamRef = useRef(null);
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false);
  const [dataStatus, setDataStatus] = useState("not streaming")

  useEffect(() => {
    setupWebcam().then(stream => {
      // @ts-ignore
      streamRef.current = stream
      setReady(true)

    });
  }, []);

  function setStreamingStatus() {
    setDataStatus("streaming")
  }

  useEffect(() => {
    const video = videoRef.current
    const stream = streamRef.current

    if (video && stream) {
      // @ts-ignore
      video.srcObject = stream

      // @ts-ignore
      video.addEventListener('loadeddata',  setStreamingStatus, false);
    }
  })

  if (ready) {
    return <div>
      <div>Data status: {dataStatus}</div>
      <video ref={videoRef} autoPlay playsInline muted width="224" height="224"></video>
    </div>
  }

  return <div>Waiting for camera...</div>;
};

export default Webcam;
