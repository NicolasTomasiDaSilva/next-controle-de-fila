"use client";

import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface SectionTitleProps {
  className?: string;
  title: string;
  linkRetorno?: string | null;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <div className={cn("flex  items-center gap-2", className)}>
      <div className="w-1.5 h-10 bg-blue-600 rounded-sm" />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
