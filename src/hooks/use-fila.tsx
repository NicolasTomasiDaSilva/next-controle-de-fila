"use client";
import { filaService } from "@/services/fila-service";
import { useEffect } from "react";

export function useFila(filaId: string) {
  async function carregarFila() {
    return filaService.obterFilaPorId(filaId);
  }

  useEffect(() => {
    if (filaId) {
      carregarFila();
    }
  }, [filaId]);

  return {};
}
