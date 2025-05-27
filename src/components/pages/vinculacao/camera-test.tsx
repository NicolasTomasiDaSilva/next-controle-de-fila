"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CameraTester() {
  const [status, setStatus] = useState<string>("");

  const testarCamera = async () => {
    try {
      setStatus("🔄 Testando...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (stream.getVideoTracks().length === 0) {
        setStatus("⚠️ Nenhuma câmera ativa encontrada.");
      } else {
        setStatus("✅ Câmera acessada com sucesso!");
      }

      // Sempre pare as tracks para liberar a câmera
      stream.getTracks().forEach((track) => track.stop());
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        setStatus("❌ Permissão negada.");
      } else if (error.name === "NotReadableError") {
        setStatus("❌ Câmera em uso por outro app ou aba.");
      } else if (error.name === "NotFoundError") {
        setStatus("❌ Nenhuma câmera encontrada.");
      } else {
        setStatus(`❌ Erro desconhecido: ${error.name}`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={testarCamera}>Testar câmera</Button>
      <p className="text-muted-foreground">{status}</p>
    </div>
  );
}
