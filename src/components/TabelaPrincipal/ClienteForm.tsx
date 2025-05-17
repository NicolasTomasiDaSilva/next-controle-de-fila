import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { ClienteFormDTO, clienteFormSchema } from "@/dtos/cliente";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TelefoneInput } from "../shared/inputs/TelefoneInput";
import { Input } from "../ui/input";
import { Cliente } from "@/models/cliente";

interface ClienteFormProps {
  textoBotao: string;
  cliente?: Cliente | null;
  onSubmit: (data: ClienteFormDTO) => void;
}

export function ClienteForm({
  cliente,
  textoBotao,
  onSubmit,
}: ClienteFormProps) {
  const form = useForm<ClienteFormDTO>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nome: cliente?.nome ?? "",
      telefone: cliente?.telefone ?? "",
      observacao: cliente?.observacao ?? "",
    },
  });

  function handleSubmit(values: ClienteFormDTO) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite"
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
                  placeholder="Digite"
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
        <div className="flex justify-end">
          <Button className="cursor-pointer w-full sm:w-40" type="submit">
            {textoBotao}
          </Button>
        </div>
      </form>
    </Form>
  );
}
