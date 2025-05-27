"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { X, Camera } from "lucide-react";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);

  // Função para iniciar o scanner com a câmera selecionada
  const startScanner = async (deviceId?: string) => {
    if (!videoRef.current) {
      console.error("❌ Video element não encontrado");
      return;
    }

    try {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      } else {
        codeReaderRef.current = new BrowserMultiFormatReader();
      }

      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      codeReaderRef.current.decodeFromStream(
        stream,
        videoRef.current,
        (result, error) => {
          if (result) {
            const text = result.getText();
            onScan(text);
          }

          if (
            error &&
            error.name !== "NotFoundException" &&
            error.name !== "ChecksumException" &&
            error.name !== "FormatException"
          ) {
            console.warn("⚠️ Erro de decodificação:", error);
          }
        }
      );
    } catch (err) {
      console.error("❌ Erro ao acessar a câmera:", err);
      alert(
        "Erro ao acessar a câmera. Verifique permissões e tente novamente."
      );
      onClose();
    }
  };

  // Inicializa dispositivos e scanner
  useEffect(() => {
    console.log("🔄 Iniciando QrScanner...");

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    async function startScanner() {
      if (!videoRef.current) {
        console.error("❌ Video element não encontrado");
        return;
      }

      async function tryGetStream(constraints: MediaStreamConstraints) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          return stream;
        } catch (e) {
          return null;
        }
      }

      // 1. Tenta câmera traseira (environment)
      let stream = await tryGetStream({
        video: {
          facingMode: { exact: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      // 2. Se falhar, tenta câmera frontal (user)
      if (!stream) {
        console.log("⚠️ Não conseguiu câmera traseira, tentando frontal...");
        stream = await tryGetStream({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
      }

      // 3. Se ainda falhar, tenta qualquer câmera disponível
      if (!stream) {
        console.log("⚠️ Não conseguiu frontal, tentando qualquer câmera...");
        stream = await tryGetStream({ video: true });
      }

      if (!stream) {
        alert(
          "Erro ao acessar qualquer câmera. Verifique permissões e tente novamente."
        );
        onClose();
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      codeReader.decodeFromStream(stream, videoRef.current, (result, error) => {
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
      });

      console.log("▶️ Decodificação iniciada");
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

  // Alterna para a próxima câmera disponível
  const switchCamera = async () => {
    if (videoInputDevices.length <= 1) return;

    const nextIndex = (selectedDeviceIndex + 1) % videoInputDevices.length;
    setSelectedDeviceIndex(nextIndex);

    await startScanner(videoInputDevices[nextIndex].deviceId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        muted
        playsInline
        autoPlay
      />

      <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
        <div className="flex-grow bg-black/70" />
        <div className="relative flex justify-center">
          <div className="w-80 h-80 border-4 border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scanLine" />
          </div>
        </div>
        <div className="flex-grow bg-black/70" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
        <div className="w-[calc(50%-10rem)] h-80 bg-black/70" />
        <div className="w-80 h-80 relative" />
        <div className="w-[calc(50%-10rem)] h-80 bg-black/70" />
      </div>

      {/* Botão fechar */}
      <button
        type="button"
        onClick={() => {
          codeReaderRef.current?.reset();
          onClose();
        }}
        className="cursor-pointer absolute top-4 right-4 z-40 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition"
        aria-label="Fechar scanner"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Botão para alternar câmera */}
      {videoInputDevices.length > 1 && (
        <button
          type="button"
          onClick={switchCamera}
          className="cursor-pointer absolute top-4 left-4 z-40 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition flex items-center gap-1"
          aria-label="Alternar câmera"
          title={`Câmera: ${
            videoInputDevices[selectedDeviceIndex]?.label || "Desconhecida"
          }`}
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm select-none">Trocar</span>
        </button>
      )}

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
