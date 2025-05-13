"use client";

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className={"flex items-center gap-2"}>
      <div className="w-1.5 h-9 bg-blue-600 rounded-sm" />
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
