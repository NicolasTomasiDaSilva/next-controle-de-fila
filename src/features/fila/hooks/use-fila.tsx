import { FilaContext } from "@/contexts/fila-context";

import { useContext } from "react";

export function useFila() {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useFila must be used within a UserProvider");
  }

  const { fila, setFila } = context;

  return {
    fila,
    setFila,
  };
}
