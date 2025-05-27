"use client";

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Button } from "@/components/ui/button";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanning = useRef(true);

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

        startDecoding();
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        alert(
          "Erro ao acessar a câmera. Verifique as permissões e tente novamente."
        );
      }
    }

    async function startDecoding() {
      if (!codeReaderRef.current || !videoRef.current) return;

      scanning.current = true;

      while (scanning.current) {
        try {
          const result = await codeReaderRef.current.decodeFromVideoElement(
            videoRef.current
          );
          if (result) {
            scanning.current = false;
            onScan(result.getText());
            handleClose();
          }
        } catch (err) {
          if (!(err instanceof NotFoundException)) {
            console.error("Erro ao decodificar QR Code:", err);
          }
          // NotFoundException pode acontecer constantemente enquanto nada é detectado
          // Ignoramos até encontrar um código válido
        }
      }
    }

    function handleClose() {
      scanning.current = false;
      codeReaderRef.current?.reset();

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
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
      <div className="relative w-full h-[calc(100vh-200px)] rounded-md overflow-hidden max-w-none">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          autoPlay
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-md pointer-events-none"
          style={{ boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)" }}
        />
      </div>

      <Button
        className="mt-4"
        variant="destructive"
        onClick={() => {
          scanning.current = false;
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
      >
        Fechar
      </Button>
    </div>
  );
}
