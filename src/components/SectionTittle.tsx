"use client";

import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface SectionTitleProps {
  className?: string;
  title: string;
  linkRetorno?: string | null;
  cor: string;
}

export function SectionTitle({ title, className, cor }: SectionTitleProps) {
  console.log(cor);
  return (
    <div className={cn("flex  items-center gap-2", className)}>
      <div className={cn("w-1.5 h-10 rounded-sm", cor)} />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
