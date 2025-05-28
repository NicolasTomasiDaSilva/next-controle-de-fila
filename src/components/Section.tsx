"use client";

import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTittle";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

interface SectionProps {
  title: string;
  className?: string;
  linkRetorno?: string | null;
  children?: React.ReactNode;
}

export function Section({
  title,
  children,
  className,
  linkRetorno,
}: SectionProps) {
  return (
    <section className={cn("pt-25 espaco-lateral-conteudo", className)}>
      <div className="mb-5 flex items-center gap-2 md:gap-5">
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
        <SectionTitle title={title} />
      </div>

      {children}
    </section>
  );
}
