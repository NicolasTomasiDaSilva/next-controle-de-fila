"use client";

import { Fila } from "@/models/fila";
import { createContext, useContext, useState, ReactNode } from "react";

type FilaContextType = {
  fila: Fila;
  setFila: (fila: Fila) => void;
};

export const FilaContext = createContext<FilaContextType | undefined>(
  undefined
);

interface FilaProviderProps {
  filaInicial: Fila;
  children: ReactNode;
}
export const FilaProvider = ({ filaInicial, children }: FilaProviderProps) => {
  const [fila, setFila] = useState<Fila>(filaInicial);

  return (
    <FilaContext.Provider value={{ fila, setFila }}>
      {children}
    </FilaContext.Provider>
  );
};
