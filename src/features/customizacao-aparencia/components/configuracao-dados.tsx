"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UseFormReturn } from "react-hook-form";
import { AparenciaFormDTO } from "@/dtos/configuracao";
import { Building2 } from "lucide-react";

interface ConfiguracaoDadosProps {
  form: UseFormReturn<AparenciaFormDTO>;
}
export function ConfiguracaoDados({ form }: ConfiguracaoDadosProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Building2 className="inline mr-2" />
          Dados da Empresa
        </CardTitle>
        <CardDescription>
          Edite as principais informações da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="nomeDisplay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Fantasia *</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome fantasia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enderecoDisplay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o endereço"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
