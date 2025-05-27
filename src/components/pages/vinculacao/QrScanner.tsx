"use client";

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import { X } from "lucide-react";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
        }

        codeReader.decodeFromVideoElementContinuously(
          videoRef.current!,
          (result: Result | undefined) => {
            if (result && !scannedRef.current) {
              scannedRef.current = true;
              onScan(result.getText());
              handleClose();
            }
          }
        );
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        alert(
          "Erro ao acessar a câmera. Verifique as permissões e tente novamente."
        );
      }
    }

    function handleClose() {
      codeReader.reset();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      onClose();
    }

    setupCamera();

    return () => {
      handleClose();
    };
  }, [onScan, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        autoPlay
      />

      {/* Overlays ao redor da área do scanner */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "calc(50% - 9rem)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "calc(50% - 9rem)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          className="absolute top-[calc(50%-9rem)] bottom-[calc(50%-9rem)] left-0"
          style={{
            width: "calc(50% - 9rem)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          className="absolute top-[calc(50%-9rem)] bottom-[calc(50%-9rem)] right-0"
          style={{
            width: "calc(50% - 9rem)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 border-4 border-white relative overflow-hidden z-30">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scanLine" />
      </div>

      <button
        onClick={() => {
          scannedRef.current = true;
          codeReaderRef.current?.reset();

          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }

          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }

          onClose();
        }}
        className="cursor-pointer absolute top-4 right-4 z-40 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition"
        aria-label="Fechar scanner"
      >
        <X className="w-6 h-6 " />
      </button>

      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: 0;
          }
          100% {
            top: calc(100% - 4px);
          }
        }
        .animate-scanLine {
          animation: scanLine 2s infinite linear;
          position: absolute;
          left: 0;
          width: 100%;
          height: 4px;
        }
      `}</style>
    </div>
  );
}
