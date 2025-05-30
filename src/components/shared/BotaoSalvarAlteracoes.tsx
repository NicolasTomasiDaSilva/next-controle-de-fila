import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface BotaoSalvarAlteracoesProps {
  className?: string;
  isSubmitting?: boolean;
  onClick?: () => void;
}

export default function BotaoSalvarAlteracoes({
  isSubmitting = false,
  className,
  onClick,
}: BotaoSalvarAlteracoesProps) {
  return (
    <Button
      type="submit"
      variant="azul"
      onClick={onClick}
      className={cn("w-50", className)}
      disabled={isSubmitting}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <Save />
        <span> {isSubmitting ? "Salvando..." : "Salvar Alterações"}</span>
      </div>
    </Button>
  );
}
