"use client";

import { Fila } from "@/features/shared/models/fila";
import { createContext, useState, ReactNode } from "react";

type FilaContextType = {
  fila: Fila;
  setFila: (fila: Fila) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export const FilaContext = createContext<FilaContextType | undefined>(
  undefined
);

interface FilaProviderProps {
  filaInicial: Fila;
  children: ReactNode;
}
export const FilaProvider = ({ filaInicial, children }: FilaProviderProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fila, setFila] = useState<Fila>(filaInicial);

  return (
    <FilaContext.Provider
      value={{ fila, setFila, isSubmitting, setIsSubmitting }}
    >
      {children}
    </FilaContext.Provider>
  );
};
