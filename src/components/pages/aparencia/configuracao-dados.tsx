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
import { Label } from "@/components/ui/label";
import { configuracaoFormDTO } from "@/dtos/configuracao";
import { Empresa } from "@/models/empresa";
import { uploadService } from "@/services/upload-service";
import axios from "axios";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ConfiguracaoDadosProps {
  form: UseFormReturn<
    {
      nomeDisplay: string;
      enderecoDisplay: string | null;
      logoUrl: string | null;
      corPrimaria: string | null;
      corSobreposicao: string | null;
    },
    any,
    {
      nomeDisplay: string;
      enderecoDisplay: string | null;
      logoUrl: string | null;
      corPrimaria: string | null;
      corSobreposicao: string | null;
    }
  >;
}

export function ConfiguracaoDados({ form }: ConfiguracaoDadosProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Dados empresa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="nomeDisplay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome fantasia</FormLabel>
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
                <Input placeholder="Digite o endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </>
  );
}
