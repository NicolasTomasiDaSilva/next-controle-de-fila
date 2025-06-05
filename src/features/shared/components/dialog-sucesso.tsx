"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "react-lottie-player";
import successAnimation from "@/assets/animations/sucess.json";

type DialogSucessoProps = {
  texto?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DialogSucesso({
  open,
  onOpenChange,
  texto,
}: DialogSucessoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          animate-in fade-in zoom-in-90
          border border-green-600 bg-green-50 text-green-900 shadow-lg flex flex-col items-center gap-4
        "
      >
        <Lottie
          loop={false}
          animationData={successAnimation}
          play={open} // toca só quando aberto
          style={{ width: 120, height: 120 }}
        />

        <DialogHeader className="text-center">
          <DialogTitle>Sucesso!</DialogTitle>
          {texto && (
            <DialogDescription>
              <p>{texto}</p>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-2 flex justify-center w-full">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-100"
            >
              Fechar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
