"use client";

import { BrowserMultiFormatReader } from "@zxing/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export default function QrScanner3({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const controlsRef = useRef<any>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const initializingRef = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  // Função para limpar todos os recursos
  const cleanupResources = useCallback(async () => {
    // Marca que não está mais inicializando
    initializingRef.current = false;

    // Para o scanner do ZXing primeiro
    if (controlsRef.current) {
      try {
        controlsRef.current.stop();
        controlsRef.current = null;
      } catch (error) {
        console.warn("Erro ao parar controls:", error);
      }
    }

    // Para todas as tracks do stream primeiro
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      streamRef.current = null;
    }

    // Aguarda a promise do play() antes de manipular o vídeo
    if (videoRef.current) {
      try {
        // Se há uma promise de play pendente, aguarda ela resolver
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {
            // Ignora erros da promise de play se ela foi cancelada
          });
          playPromiseRef.current = null;
        }

        // Agora pode manipular o vídeo com segurança
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }

        videoRef.current.srcObject = null;

        // Remove event listeners
        videoRef.current.oncanplay = null;
        videoRef.current.onloadedmetadata = null;

        // Só chama load() se necessário
        if (videoRef.current.src || videoRef.current.srcObject) {
          videoRef.current.load();
        }
      } catch (error) {
        console.warn("Erro ao limpar vídeo:", error);
      }
    }
  }, []);

  const initCamera = useCallback(async () => {
    // Evita múltiplas inicializações simultâneas
    if (initializingRef.current || !isMountedRef.current) {
      return;
    }

    initializingRef.current = true;
    setError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Este navegador não suporta acesso à câmera ou precisa de HTTPS."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      // Verifica se ainda está montado após aguardar o stream
      if (!isMountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      if (videoRef.current && isMountedRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.muted = true;

        // Configura eventos antes de tentar dar play
        videoRef.current.oncanplay = () => {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        };

        videoRef.current.onloadedmetadata = () => {
          if (
            isMountedRef.current &&
            videoRef.current &&
            videoRef.current.readyState >= 3
          ) {
            setIsLoading(false);
          }
        };

        try {
          // Armazena a promise do play para poder aguardá-la no cleanup
          playPromiseRef.current = videoRef.current.play();
          await playPromiseRef.current;
          playPromiseRef.current = null;

          // Verifica se ainda está montado após o play
          if (!isMountedRef.current) {
            return;
          }

          // Inicializa o code reader se ainda não existe
          if (!codeReaderRef.current) {
            codeReaderRef.current = new BrowserMultiFormatReader();
          }

          // Inicia o scanner apenas após o vídeo estar tocando
          controlsRef.current =
            await codeReaderRef.current.decodeFromVideoDevice(
              undefined,
              videoRef.current,
              (result, error) => {
                if (!isMountedRef.current) return;

                if (result && !scanned) {
                  setScanned(true);
                  onScan(result.getText());
                  // Limpa recursos após sucesso
                  setTimeout(() => cleanupResources(), 100);
                }

                if (error && error.name !== "NotFoundException") {
                  console.warn("Scanner error:", error.message);
                }
              }
            );
        } catch (error) {
          console.error("Erro ao tentar dar play no vídeo", error);
          if (isMountedRef.current) {
            setError("Erro ao inicializar o vídeo");
            await cleanupResources();
            onClose();
          }
          return;
        }
      }
    } catch (err) {
      console.error("Erro ao acessar câmera", err);
      if (isMountedRef.current) {
        setError("Erro ao acessar câmera: " + (err as Error).message);
        onClose();
      }
    } finally {
      initializingRef.current = false;
    }
  }, [onClose, onScan, scanned, cleanupResources]);

  useEffect(() => {
    isMountedRef.current = true;

    // Pequeno delay para evitar problemas com Strict Mode
    const timeoutId = setTimeout(async () => {
      if (isMountedRef.current) {
        await initCamera();
      }
    }, 100);

    // Cleanup quando o componente é desmontado
    return () => {
      clearTimeout(timeoutId);
      isMountedRef.current = false;
      cleanupResources();
    };
  }, [initCamera, cleanupResources]);

  // Adiciona listener para quando a página é fechada/recarregada
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupResources();
    };

    const handleVisibilityChange = async () => {
      if (document.hidden && isMountedRef.current) {
        await cleanupResources();
        onClose();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onClose, cleanupResources]);

  const handleCancel = async () => {
    isMountedRef.current = false;

    await cleanupResources();

    // Pequeno delay para garantir que tudo foi limpo
    setTimeout(() => {
      onClose();
    }, 50);
  };

  if (scanned) return null;

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
          <h3 className="text-lg font-semibold mb-2">Erro</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleCancel} className="w-full">
            Fechar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {isLoading && (
        <div className="absolute z-50 flex flex-col items-center gap-2 bg-black/70 p-6 rounded-lg">
          <div className="w-12 h-12 border-4 border-t-white border-gray-600 rounded-full animate-spin"></div>
          <p className="text-white mt-2">Carregando câmera...</p>
        </div>
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in ${
          isLoading ? "opacity-0 blur-lg" : "opacity-100"
        }`}
        playsInline
        muted
        preload="metadata"
      />
      <svg className="absolute inset-0 w-full h-full z-20">
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x="calc(50% - 160px)"
              y="calc(50% - 160px)"
              width="320"
              height="320"
              rx="15"
              ry="15"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.9)"
          style={{
            backdropFilter: "blur(160px) brightness(0.5) saturate(0.5)",
            WebkitBackdropFilter: "blur(160px) brightness(0.5) saturate(0.5)",
            mask: "url(#mask)",
            WebkitMask: "url(#mask)",
          }}
        />
      </svg>
      <div
        className="absolute w-[300px] h-[300px] z-30"
        style={{ top: "calc(50% - 150px)", left: "calc(50% - 150px)" }}
      >
        {/* Canto superior esquerdo */}
        <div className="absolute top-0 left-0 w-8 h-1.5 bg-white animate-pulse rounded-tr-md" />
        <div className="absolute top-0 left-0 w-1.5 h-8 bg-white animate-pulse rounded-br-md" />

        {/* Canto superior direito */}
        <div className="absolute top-0 right-0 w-8 h-1.5 bg-white animate-pulse rounded-tl-md" />
        <div className="absolute top-0 right-0 w-1.5 h-8 bg-white animate-pulse rounded-bl-md" />

        {/* Canto inferior esquerdo */}
        <div className="absolute bottom-0 left-0 w-8 h-1.5 bg-white animate-pulse rounded-br-md" />
        <div className="absolute bottom-0 left-0 w-1.5 h-8 bg-white animate-pulse rounded-tr-md" />

        {/* Canto inferior direito */}
        <div className="absolute bottom-0 right-0 w-8 h-1.5 bg-white animate-pulse rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-1.5 h-8 bg-white animate-pulse rounded-tl-md" />
      </div>
      <div className="absolute bottom-20 z-30 flex flex-col items-center gap-4">
        <p className="text-white text-center px-4 bg-black/50 rounded-lg py-2">
          Posicione o QR code dentro da área destacada
        </p>
        <Button
          onClick={handleCancel}
          className="text-primary-foreground hover:bg-neutral-300/20 transition duration-300"
          variant="destructive"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
