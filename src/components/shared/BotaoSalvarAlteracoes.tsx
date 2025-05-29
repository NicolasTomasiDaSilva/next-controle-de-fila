import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function BotaoSalvarAlteracoes({
  className,
}: {
  className?: string;
}) {
  return (
    <Button type="submit" className={cn(className)}>
      <div className="flex flex-row items-center gap-2">
        <Save />
        <span> Salvar Alterações</span>
      </div>
    </Button>
  );
}
