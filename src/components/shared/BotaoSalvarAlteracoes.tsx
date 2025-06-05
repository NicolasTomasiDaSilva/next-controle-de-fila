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
      className={cn("w-full sm:w-50 mt-2", className)}
      disabled={isSubmitting}
    >
      <Save className="mr-2 inline" />
      {isSubmitting ? "Salvando..." : "Salvar Alterações"}
    </Button>
  );
}
