"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

type QrScannerProps = {
  onScan: (decodedText: string) => void;
  onClose: () => void;
};

export function QrScanner2({ onScan, onClose }: QrScannerProps) {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isStoppingRef = useRef(false);
  const isStartedRef = useRef(false);

  const startScanner = useCallback(() => {
    if (!html5QrCodeRef.current) return;

    html5QrCodeRef.current
      .start(
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
          // console.debug("Scan error:", errorMessage);
        }
      )
      .then(() => {
        isStartedRef.current = true;
      })
      .catch((err) => {
        console.error("Erro ao iniciar scanner:", err);
      });
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
      .then(() => {
        return html5QrCodeRef.current?.clear();
      })
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
      onClose(); // Fecha mesmo se der erro para evitar travar a UI
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
          margin: 0;
          padding: 0;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          object-fit: cover !important;
          z-index: 1;
        }

        #qr-reader canvas {
          display: none !important;
        }
      `}</style>
    </>
  );
}
