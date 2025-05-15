import { FilaContext } from "@/contexts/fila-context";
import { useContext } from "react";

export const useFila = () => {
  const context = useContext(FilaContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
