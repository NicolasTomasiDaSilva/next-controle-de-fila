import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cores = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-300",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-300",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-300",
  },
};

interface ConfiguracaoCardProps {
  icone: () => React.ReactNode;
  titulo: string;
  cor: keyof typeof cores;
  className?: string;
}

export function ConfiguracaoCard({
  icone,
  titulo,
  cor,
  className,
}: ConfiguracaoCardProps) {
  const estilos = cores[cor];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-transform duration-300 hover:scale-101",
        estilos.border,
        className
      )}
    >
      <CardHeader>
        <div className="flex flex-row items-center gap-2">
          <div
            className={cn(
              "h-9 w-9 rounded-md flex flex-row items-center justify-center",
              estilos.bg
            )}
          >
            {icone()}
          </div>
          <CardTitle>{titulo}</CardTitle>
        </div>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
