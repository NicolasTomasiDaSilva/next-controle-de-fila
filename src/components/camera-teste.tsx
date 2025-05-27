"use client";

import { useEffect, useRef } from "react";

export function CameraTest() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Erro ao acessar câmera:", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      style={{ width: "320px", height: "240px", border: "1px solid black" }}
      muted
      playsInline
      autoPlay
    />
  );
}
