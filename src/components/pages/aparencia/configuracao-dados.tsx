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
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dados empresa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <div className="flex flex-col-reverse gap-2 items-center sm:flex-row sm:justify-between">
              <FormItem className="sm:w-[60%]">
                <FormLabel className="text-center block sm:text-left">
                  Logo da empresa
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="logo-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (!["image/png", "image/jpeg"].includes(file.type)) {
                          toast.error(
                            "Apenas arquivos PNG ou JPG são permitidos."
                          );
                          e.target.value = "";
                          return;
                        }

                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("O tamanho máximo permitido é 2MB.");
                          e.target.value = "";
                          return;
                        }

                        const formData = new FormData();
                        formData.append("file", file);

                        try {
                          const { url } = await uploadService.uploadImagem(
                            formData
                          );
                          field.onChange(url);
                          setPreview(url);
                        } catch (error) {
                          console.error("Erro ao enviar imagem:", error);
                          alert("Erro ao enviar imagem.");
                        }
                      }}
                    />

                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer sm:w-[100%]"
                    >
                      <Button
                        type="button"
                        className="sm:w-full py-5.5"
                        variant="outline"
                        asChild
                      >
                        <span>
                          <Upload className="size-5 text-gray-700" />
                          <span className="whitespace-normal">
                            Selecionar imagem
                          </span>
                        </span>
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
              <div className="flex flex-col items-center sm:mx-auto ">
                <Image
                  src={preview || field.value || "/images/sem-logo.png"}
                  alt="Preview logo"
                  width={128}
                  height={128}
                  className="rounded-md border object-cover "
                />
              </div>
            </div>
          )}
        />

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
    </Card>
  );
}
