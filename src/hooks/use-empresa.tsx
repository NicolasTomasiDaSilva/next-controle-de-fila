import { EmpresaContext } from "@/contexts/empresa-context";
import { useContext } from "react";

export function useEmpresa() {
  const context = useContext(EmpresaContext);
  if (context === undefined) {
    throw new Error("useEmpresa must be used within a EmpresaProvider");
  }
  return context;
}
