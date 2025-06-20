"use client";

import { cn } from "@/lib/utils";
import { SectionTitle } from "./section-tittle";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { sectionCores } from "@/lib/constants/section-cores";

interface SectionProps {
  title?: string;

  linkRetorno?: string | null;
  cor?: keyof typeof sectionCores | null;
  children?: React.ReactNode;
}

export function Section({ title, children, cor, linkRetorno }: SectionProps) {
  const corSection = sectionCores[cor || "blue"];

  return (
    <section>
      <div className=" mb-10 flex items-center gap-2 md:gap-5">
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
        {title && <SectionTitle title={title} cor={corSection.bg500} />}
      </div>
      {children}
    </section>
  );
}
