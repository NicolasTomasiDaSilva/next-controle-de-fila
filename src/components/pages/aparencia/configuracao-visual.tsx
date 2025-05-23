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
import { uploadService } from "@/services/upload-service";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { ColorPickerField } from "./color-picker";

interface ConfiguracaoVisualProps {
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

export function ConfiguracaoVisual({ form }: ConfiguracaoVisualProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalizar visual</CardTitle>
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

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center sm:max-w-[50%]">
          <FormField
            control={form.control}
            name="corPrimaria"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-2">
                  <FormControl>
                    <ColorPickerField
                      value={field.value ?? "#000000"}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Primária</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="corSobreposicao"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-2">
                  <FormControl>
                    <ColorPickerField
                      value={field.value ?? "#000000"}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Sobreposição</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="block ml-auto sm:ml-0"
          onClick={() => {
            form.setValue("corPrimaria", "#FFFFFF");
            form.setValue("corSobreposicao", "#FFFFFF");
            form.setValue("logoUrl", null);
            setPreview(null);
          }}
        >
          Redefinir
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
