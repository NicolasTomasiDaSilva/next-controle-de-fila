"use client";

import { SectionTitle } from "./SectionTittle";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-10 pb-20 max-w-5xl mx-auto flex flex-col justify-center px-5 sm:px-10 md:px-15 lg:px-20">
      <SectionTitle title={title} />
      {children}
    </section>
  );
}
