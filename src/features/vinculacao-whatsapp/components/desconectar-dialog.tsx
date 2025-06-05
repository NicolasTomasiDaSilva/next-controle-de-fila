"use client";
import { IMaskInput } from "react-imask";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { LogOut } from "lucide-react";

interface DesconectarWhatsappDialogProps {
  handleDesconectar: () => Promise<void>;
  isSubmitting: boolean;
}
export function DesconectarWhatsappDialog({
  handleDesconectar,
  isSubmitting,
}: DesconectarWhatsappDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleConfirmar() {
    await handleDesconectar();
    setOpen(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-red-100 text-red-600 hover:bg-red-200"
          disabled={isSubmitting}
        >
          <LogOut />
          {isSubmitting ? "Desconectando..." : "Desconectar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Desconectar WhatsApp</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tem certeza que deseja desconectar do WhatsApp?
        </DialogDescription>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmar}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Desconectando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
