import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sectionCores } from "@/constantes/section-cores";
import { cn } from "@/lib/utils";
import { ChevronRight, Palette } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface ConfiguracaoCardProps {
  icone: (cor: string) => JSX.Element;
  titulo: string;
  texto: string;
  cor: keyof typeof sectionCores;
  className?: string;
  link: string;
}

export function ConfiguracaoCard({
  icone,
  titulo,
  texto,
  cor,
  link,
  className,
}: ConfiguracaoCardProps) {
  const estilos = sectionCores[cor];

  return (
    <Card
      asChild
      className={cn(
        "cursor-pointer transition-transform duration-300  hover:scale-101 group",
        estilos.border,
        className
      )}
    >
      <Link href={link}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <div
              className={cn(
                "h-11 w-11 rounded-md flex flex-row items-center justify-center flex-shrink-0",
                estilos.bg
              )}
            >
              {icone(estilos.icon)}
            </div>
            <CardTitle>{titulo}</CardTitle>
          </div>
          <ChevronRight className={"w-5 h-5 text-gray-400 transition-colors"} />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{texto}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
