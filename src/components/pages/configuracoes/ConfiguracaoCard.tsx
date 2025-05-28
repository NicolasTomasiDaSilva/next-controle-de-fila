import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, Palette } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const cores = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-200",
    icon: "text-blue-500",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-200",
    icon: "text-red-500",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-200",
    icon: "text-green-500",
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-200",
    icon: "text-purple-500",
  },
  cyan: {
    border: "border-cyan-500",
    bg: "bg-cyan-200",
    icon: "text-cyan-500",
  },
};

interface ConfiguracaoCardProps {
  icone: (cor: string) => JSX.Element;
  titulo: string;
  texto: string;
  cor: keyof typeof cores;
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
  const estilos = cores[cor];

  return (
    <Card
      asChild
      className={cn(
        "cursor-pointer transition-transform duration-300 bg-gradient-to-l from-blue-100/10 to-transparent hover:scale-101 group",
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
