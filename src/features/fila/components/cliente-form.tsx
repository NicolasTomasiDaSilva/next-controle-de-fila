"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ClienteFormDTO, clienteFormSchema } from "@/dtos/cliente";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Cliente } from "@/features/fila/models/cliente";
import { TelefoneInput } from "@/features/shared/components/inputs/TelefoneInput";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
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
                  placeholder="Adicione uma observação (opcional)"
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
                <TelefoneInput {...field} value={field.value ?? ""} />
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
