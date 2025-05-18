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
    <section
      className={cn(
        "mt-5 pb-5 max-w-5xl mx-auto px-3 sm:px-10 md:px-15 lg:px-15",
        className
      )}
    >
      {title && <SectionTitle title={title} />}
      <div className="h-5"></div>
      {children}
    </section>
  );
}
