"use client";

import { cn } from "@/lib/utils";
import { SectionTitle } from "./SectionTittle";

interface SectionProps {
  title?: string | null;
  className?: string;
  children?: React.ReactNode;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn("pt-20 espaco-lateral-conteudo", className)}>
      {title && <SectionTitle className="py-4" title={title} />}
      {children}
    </section>
  );
}
