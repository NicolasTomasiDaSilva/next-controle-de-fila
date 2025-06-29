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

import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Palette, RotateCcw, Upload } from "lucide-react";
import semLogo from "@/assets/images/sem-logo.png";

import { HexColorPicker } from "react-colorful";
import { ColorPickerField } from "./color-picker";

import { coresPadrao } from "@/lib/constants/cores-padrao";
import { AparenciaFormDTO } from "../models/aparencia-form-dto";
import { Spinner } from "@/components/ui/spinner";

interface ConfiguracaoVisualProps {
  form: UseFormReturn<AparenciaFormDTO>;
  preview: string | null;
  setPreview: Dispatch<SetStateAction<string | null>>;
  inputFileRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  handleUploadImagem: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<AparenciaFormDTO, "logoUrl">
  ) => void;
}
export function ConfiguracaoVisual({
  form,
  preview,
  setPreview,
  inputFileRef,
  handleUploadImagem,
  isUploading,
}: ConfiguracaoVisualProps) {
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
                {isUploading ? (
                  <Spinner className=" h-15 w-15"></Spinner>
                ) : (
                  <Image
                    src={preview || field.value || semLogo}
                    alt="Preview logo"
                    width={100}
                    height={100}
                    className="rounded-md border object-cover h-30 w-30 object-cover"
                    priority
                  />
                )}
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
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
