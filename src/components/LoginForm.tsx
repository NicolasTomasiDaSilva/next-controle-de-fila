"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LogoCervantes from "@/assets/images/logo-cervantes.jpg";
import Image from "next/image";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { empresaService } from "@/services/empresa-service-client";
import { empresaSchema } from "@/models/empresa";
import { useAuth } from "@/hooks/use-auth";

export const emailSchema = empresaSchema.pick({
  email: true,
});

const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});

export default function LoginForm() {
  const { login } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  const handleEnviarCodigo = async (data: z.infer<typeof emailSchema>) => {
    setLoading(true);
    try {
      await empresaService.enviarCodigoAcesso(data.email);
      setEmail(data.email);
      setStep(2);
    } catch (error: any) {
      if (error?.message === "E-mail não encontrado") {
        emailForm.setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        throw new Error("Erro ao gerar código de acesso");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigo = async (data: z.infer<typeof codeSchema>) => {
    setLoading(true);
    try {
      const response = await empresaService.verificarCodigoAcesso(
        email,
        data.code
      );
      login(response);
    } catch (error: any) {
      if (error?.message === "Código não encontrado") {
        codeForm.setError("code", {
          type: "manual",
          message: error.message,
        });
      } else {
        throw new Error("Erro ao verificar código de acesso");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Image
        src={LogoCervantes}
        alt="Logo"
        className="size-15 rounded-md mx-auto"
        width={60}
        height={60}
      />
      {step === 1 && (
        <p className="text-center font-bold px-10">Bem-vindo(a)!</p>
      )}
      {step === 2 && (
        <p className="text-center font-bold px-10">
          Digite o código de verificação enviado no seu e-mail
        </p>
      )}
      <div className="h-5"></div>

      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleEnviarCodigo)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar código"}
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...codeForm}>
          <form
            onSubmit={codeForm.handleSubmit(handleVerificarCodigo)}
            className="space-y-4"
          >
            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o código" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Verificar código"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
