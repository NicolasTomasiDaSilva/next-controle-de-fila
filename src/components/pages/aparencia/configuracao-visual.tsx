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
import { ChangeEvent, useRef, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Palette, RotateCcw, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { ColorPickerField } from "./color-picker";
import { configuracaoFormDTO } from "@/dtos/configuracao";
import { coresPadrao } from "@/constantes/cores-padrao";

interface ConfiguracaoVisualProps {
  form: UseFormReturn<configuracaoFormDTO>;
}

export function ConfiguracaoVisual({ form }: ConfiguracaoVisualProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  async function handleUploadImagem(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<configuracaoFormDTO, "logoUrl">
  ) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Apenas arquivos PNG ou JPG são permitidos.");
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
      const { url } = await uploadService.uploadImagem(formData);

      field.onChange(url);
      setPreview(url);
    } catch (error) {
      toast.error("Erro ao fazer upload da imagem.");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Palette className="inline mr-2" />
          Identidade Visual
        </CardTitle>
        <CardDescription>
          Faça upload da logo e defina as cores principais da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <div className="flex flex-col-reverse gap-2 items-center sm:flex-row sm:justify-between">
              <FormItem className="sm:w-[60%]">
                <FormLabel className="text-center block sm:text-left">
                  Logo da Empresa
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-2 justify-center">
                    <input
                      ref={inputFileRef}
                      type="file"
                      accept="image/*"
                      id="logo-upload"
                      className="hidden"
                      onChange={(e) => handleUploadImagem(e, field)}
                    />

                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer sm:w-[100%]"
                    >
                      <Button
                        type="button"
                        className="sm:w-full py-5.5 "
                        variant="outline"
                        asChild
                      >
                        <span>
                          <Upload className="size-5 text-gray-700 " />
                          <span className="whitespace-normal">
                            Selecionar Imagem
                          </span>
                        </span>
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG até 2MB
                </p>
                <FormMessage />
              </FormItem>
              <div className="flex flex-col items-center sm:mx-auto ">
                <Image
                  src={preview || field.value || "/images/sem-logo.png"}
                  alt="Preview logo"
                  width={128}
                  height={128}
                  className="rounded-md border object-cover"
                  priority
                />
              </div>
            </div>
          )}
        />

        <div className="flex flex-col gap-2 sm:flex-row justify-around sm:items-center py-5">
          <FormField
            control={form.control}
            name="corPrimaria"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-2">
                  <FormControl>
                    <ColorPickerField
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Cor Primária</FormLabel>
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
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Cor Sobreposição</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.setValue("corPrimaria", coresPadrao.CorPrimaria);
            form.setValue("corSobreposicao", coresPadrao.CorSobreposicao);
            form.setValue("logoUrl", "");
            setPreview(null);
            if (inputFileRef.current) {
              inputFileRef.current.value = "";
            }
          }}
        >
          <RotateCcw />
          Redefinir
        </Button>
      </CardFooter>
    </Card>
  );
}
