"use client";

import { SectionTitle } from "./SectionTittle";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-5 pb-5 max-w-5xl mx-auto px-3 sm:px-10 md:px-15 lg:px-15">
      <SectionTitle title={title} />
      <div className="h-5"></div>
      {children}
    </section>
  );
}
