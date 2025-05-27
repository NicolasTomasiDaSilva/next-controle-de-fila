"use client";

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { X } from "lucide-react";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    console.log("🔄 Iniciando QrScanner...");

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    async function startScanner() {
      if (!videoRef.current) {
        console.error("❌ Video element não encontrado");
        return;
      }

      try {
        // Lista dispositivos e escolhe a câmera traseira (se houver)
        const videoInputDevices = await codeReader.listVideoInputDevices();
        console.log("📷 Dispositivos de vídeo disponíveis:", videoInputDevices);

        const rearCamera = videoInputDevices.find(
          (device) =>
            device.label.toLowerCase().includes("back") ||
            device.label.toLowerCase().includes("rear") ||
            device.label.toLowerCase().includes("environment")
        );
        const selectedDeviceId =
          rearCamera?.deviceId ?? videoInputDevices[0]?.deviceId ?? null;
        console.log("🎯 Usando deviceId:", selectedDeviceId);

        // Solicita o stream com configurações para melhor qualidade
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: selectedDeviceId
              ? { exact: selectedDeviceId }
              : undefined,
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Decodifica o stream diretamente, usando a stream configurada
        codeReader.decodeFromStream(
          stream,
          videoRef.current,
          (result, error) => {
            console.log("🌀 Frame analisado");

            if (result) {
              const text = result.getText();
              console.log("✅ QR Code detectado:", text);
              onScan(text);
            }

            if (error) {
              if (
                error.name !== "NotFoundException" &&
                error.name !== "ChecksumException" &&
                error.name !== "FormatException"
              ) {
                console.warn("⚠️ Erro de decodificação:", error);
              }
            }
          }
        );

        console.log("▶️ Decodificação iniciada");
      } catch (err) {
        console.error("❌ Erro ao acessar a câmera:", err);
        alert(
          "Erro ao acessar a câmera. Verifique permissões e tente novamente."
        );
        onClose();
      }
    }

    startScanner();

    return () => {
      console.log("🛑 Resetando e parando scanner");
      codeReader.reset();

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      onClose();
    };
  }, [onScan, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Vídeo com brilho reduzido e blur para dar destaque na área do scanner */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover brightness-75 blur-[1px]"
        muted
        playsInline
        autoPlay
      />

      {/* Máscara escura ao redor da área do scanner */}
      <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
        <div className="flex-grow bg-black/70" />
        <div className="relative flex justify-center">
          <div className="w-80 h-80 border-4 border-white rounded-lg relative overflow-hidden">
            {/* Linha animada */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scanLine" />
          </div>
        </div>
        <div className="flex-grow bg-black/70" />
      </div>

      {/* Máscaras laterais para cobrir fora da área do scanner */}
      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
        <div className="w-[calc(50%-10rem)] h-80 bg-black/70" />
        <div className="w-80 h-80 relative" />
        <div className="w-[calc(50%-10rem)] h-80 bg-black/70" />
      </div>

      {/* Botão fechar */}
      <button
        onClick={() => {
          console.log("❎ Scanner fechado pelo usuário");
          codeReaderRef.current?.reset();
          onClose();
        }}
        className="cursor-pointer absolute top-4 right-4 z-40 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition"
        aria-label="Fechar scanner"
      >
        <X className="w-6 h-6" />
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
