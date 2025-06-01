"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Building2 } from "lucide-react";

interface ConfiguracaoDadosProps {
  form: UseFormReturn<configuracaoFormDTO>;
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
          Configure as informações principais da sua empresa
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
