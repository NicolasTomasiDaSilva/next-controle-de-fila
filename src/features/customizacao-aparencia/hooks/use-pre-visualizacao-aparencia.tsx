import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { UseFormReturn, useWatch } from "react-hook-form";
import { ConfiguracaoFormDTO } from "@/dtos/configuracao";

interface usePreVisualizacaoAparenciaProps {
  form: UseFormReturn<ConfiguracaoFormDTO>;
}
export const usePreVisualizacaoAparencia = ({
  form,
}: usePreVisualizacaoAparenciaProps) => {
  const rawValores = useWatch({
    control: form.control,
    name: [
      "nomeDisplay",
      "corPrimaria",
      "corSobreposicao",
      "enderecoDisplay",
      "logoUrl",
    ],
  });

  const valores = {
    nomeDisplay: rawValores[0],
    corPrimaria: rawValores[1],
    corSobreposicao: rawValores[2],
    enderecoDisplay: rawValores[3],
    logoUrl: rawValores[4],
  };

  return { valores };
};
