"use client";

import { Empresa } from "@/features/shared/models/empresa";
import { createContext, useState, ReactNode } from "react";

type EmpresaContextType = {
  empresa: Empresa;
  setEmpresa: (empresa: Empresa) => void;
};

export const EmpresaContext = createContext<EmpresaContextType | undefined>(
  undefined
);

interface EmpresaProviderProps {
  empresaInicial: Empresa;
  children: ReactNode;
}
export const EmpresaProvider = ({
  empresaInicial,
  children,
}: EmpresaProviderProps) => {
  const [empresa, setEmpresa] = useState<Empresa>(empresaInicial);

  return (
    <EmpresaContext.Provider value={{ empresa, setEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  );
};
