import { FilaContext } from "@/features/fila/contexts/fila-context";

import { useContext } from "react";

export function useFila() {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useFila must be used within a FilaProvider");
  }

  const { fila, setFila, isSubmitting, setIsSubmitting } = context;

  return {
    fila,
    setFila,
    isSubmitting,
    setIsSubmitting,
  };
}
