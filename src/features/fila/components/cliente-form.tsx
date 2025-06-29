"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Cliente } from "@/features/shared/models/cliente";
import { useState } from "react";
import { formatarTelefone } from "@/lib/utils/dados-utils";
import { ClienteFormDTO, clienteFormSchema } from "../models/cliente-form-dto";

interface ClienteFormProps {
  botao?: () => React.ReactNode;
  cliente?: Cliente | null;
  onSubmit: (data: ClienteFormDTO) => Promise<void>;
}

export function ClienteForm({ cliente, botao, onSubmit }: ClienteFormProps) {
  const form = useForm<ClienteFormDTO>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nome: cliente?.nome ?? "",
      telefone: cliente?.telefone ?? "",
      observacao: cliente?.observacao ?? "",
    },
  });

  async function handleSubmit(values: ClienteFormDTO) {
    await onSubmit(values);
  }
  const [inputMask, setInputMask] = useState<string>("");
  const handleMaskedChange = (value: string) => {
    const raw = value.replace(/\D/g, "");
    const masked = formatarTelefone(raw);
    setInputMask(masked);
    form.setValue("telefone", raw);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite o nome do cliente"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Adicione uma observação"
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  maxLength={15}
                  {...field}
                  value={inputMask}
                  onChange={(e) => handleMaskedChange(e.target.value)}
                  placeholder="(xx) xxxxx-xxxx"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {botao && botao()}
      </form>
    </Form>
  );
}
