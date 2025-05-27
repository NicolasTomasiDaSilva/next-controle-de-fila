"use client";

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    codeReader.current
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const deviceId =
          videoInputDevices.length > 1
            ? videoInputDevices[videoInputDevices.length - 1].deviceId
            : videoInputDevices[0].deviceId;

        if (videoRef.current) {
          codeReader.current?.decodeFromVideoDevice(
            deviceId,
            videoRef.current,
            (result, err) => {
              if (result) {
                onScan(result.getText());
                codeReader.current?.reset();
                onClose();
              }
            }
          );
        }
      })
      .catch(console.error);

    return () => {
      codeReader.current?.reset();
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
        {/* Overlay para ajudar a posicionar o QR code */}
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
          codeReader.current?.reset();
          onClose();
        }}
      >
        Fechar
      </Button>
    </div>
  );
}
