"use client";

import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTittle";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { sectionCores } from "@/constantes/section-cores";

interface SectionProps {
  title?: string;
  className?: string;
  linkRetorno?: string | null;
  cor?: keyof typeof sectionCores | null;
  children?: React.ReactNode;
}

export function Section({
  title,
  children,
  className,
  cor,
  linkRetorno,
}: SectionProps) {
  const corSection = sectionCores[cor || "blue"];

  return (
    <section className={cn("pt-25 espaco-lateral-conteudo pb-25", className)}>
      <div className="mb-10 flex items-center gap-2 md:gap-5">
        {linkRetorno && (
          <Link href={linkRetorno} passHref>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Voltar"
              className="p-0"
            >
              <ChevronLeft />
            </Button>
          </Link>
        )}
        {title && <SectionTitle title={title} cor={corSection.traco} />}
      </div>

      {children}
    </section>
  );
}
