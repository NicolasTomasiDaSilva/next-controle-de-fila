"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type QrScannerProps = {
  onScan: (decodedText: string) => void;
  onClose: () => void;
};

export function QrScanner2({ onScan, onClose }: QrScannerProps) {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isStoppingRef = useRef(false);
  const isStartedRef = useRef(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startScanner = useCallback(async () => {
    if (!html5QrCodeRef.current) return;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((device) => device.kind === "videoinput");

      if (!hasCamera) {
        setCameraError("Nenhuma câmera foi encontrada no dispositivo.");
        return;
      }

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: window.innerWidth, height: window.innerHeight },
          aspectRatio: window.innerWidth / window.innerHeight,
        },
        (decodedText) => {
          onScan(decodedText);
        },
        (errorMessage) => {
          // Ignorado para não poluir console
        }
      );

      isStartedRef.current = true;
    } catch (err) {
      console.error("Erro ao iniciar scanner:", err);
      setCameraError(
        "Não foi possível acessar a câmera. Verifique as permissões ou se a câmera está sendo usada por outro aplicativo."
      );
    }
  }, [onScan]);

  const stopScanner = useCallback(() => {
    if (
      !html5QrCodeRef.current ||
      isStoppingRef.current ||
      !isStartedRef.current
    ) {
      return Promise.resolve();
    }
    isStoppingRef.current = true;

    return html5QrCodeRef.current
      .stop()
      .then(() => html5QrCodeRef.current?.clear())
      .catch((err) => {
        console.warn("Erro ao parar scanner:", err);
      })
      .finally(() => {
        isStoppingRef.current = false;
        isStartedRef.current = false;
      });
  }, []);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode("qr-reader");
    startScanner();

    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  const handleCloseClick = async () => {
    try {
      await stopScanner();
      onClose();
    } catch (error) {
      console.error("Erro ao fechar scanner:", error);
      onClose(); // Evita travar a UI
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        <button
          onClick={handleCloseClick}
          className="absolute top-6 right-6 text-white text-4xl font-bold z-60 hover:text-red-500"
          aria-label="Fechar scanner"
        >
          ✕
        </button>

        <div
          id="qr-reader"
          className="w-full h-full relative"
          style={{
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        />

        {/* Mensagem de erro se necessário */}
        {cameraError && (
          <div className="absolute bottom-10 text-red-500 bg-black/80 px-4 py-2 rounded z-70 text-center max-w-sm">
            {cameraError}
          </div>
        )}

        {/* Overlay com quadrado e linha */}
        {!cameraError && (
          <div className="pointer-events-none fixed inset-0 z-70 flex flex-col">
            <div className="flex-grow bg-black/90" />
            <div className="flex items-center">
              <div className="w-[calc(50%-10rem)] h-80 bg-black/90" />
              <div className="relative w-80 h-80 border border-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-green-400 animate-scanLine" />
              </div>
              <div className="w-[calc(50%-10rem)] h-80 bg-black/90" />
            </div>
            <div className="flex-grow bg-black/90" />
          </div>
        )}
      </div>

      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        #qr-reader,
        #qr-reader video {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          object-fit: cover !important;
          z-index: 1;
        }

        #qr-reader canvas {
          display: none !important;
        }

        @keyframes scanLine {
          0% {
            top: 0;
          }
          50% {
            top: calc(100% - 2px);
          }
          100% {
            top: 0;
          }
        }

        .animate-scanLine {
          animation: scanLine 3s infinite ease-in-out;
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          box-shadow: 0 0 8px 2px #22c55e;
        }
      `}</style>
    </>
  );
}
