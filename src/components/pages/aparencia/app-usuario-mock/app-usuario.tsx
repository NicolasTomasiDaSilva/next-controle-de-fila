import { configuracaoFormDTO } from "@/dtos/configuracao";
import Cabecalho from "./cabecalho";
import { CardPosicao } from "./card-posicao";
import { CardDescricao } from "./card-descricao";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AppUsuarioPropos {
  valores: configuracaoFormDTO;
}

export const AppUsuario = ({ valores }: AppUsuarioPropos) => {
  return (
    <div
      className="flex flex-col w-full items-center pt-8 "
      style={{
        height: "100dvh",
        backgroundImage: `linear-gradient(to bottom, ${valores.corPrimaria}80, white)`,
      }}
    >
      <Cabecalho valores={valores} />

      <div className="w-full max-w-md px-4">
        <CardPosicao valores={valores} />
      </div>

      <div className="flex flex-col items-center w-full max-w-md mt-4 px-4">
        <CardDescricao valores={valores} />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="my-10 gap-2 text-lg font-semibold text-gray-500 "
            >
              <LogOut size={15} /> Desistir da fila
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[220px]">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
