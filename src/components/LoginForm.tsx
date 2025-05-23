"use client";

import React, { useEffect, useRef, useState } from "react";
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

import { empresaSchema } from "@/models/empresa";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { useCooldown } from "@/hooks/use-cooldown";
import { toast } from "sonner";
import { empresaService } from "@/services/empresa-service";

export const emailSchema = empresaSchema.pick({
  email: true,
});

const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, { message: "Código inválido" }),
});

export default function LoginForm() {
  const { cooldown, startCooldown } = useCooldown(30);
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
    try {
      setLoading(true);
      await empresaService.enviarCodigoAcesso(data.email);
      setEmail(data.email);
      startCooldown();
      setStep(2);
    } catch (error: any) {
      if (error?.message === "E-mail não encontrado") {
        emailForm.setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("Erro ao enviar código de acesso");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReenviarCodigo = async () => {
    try {
      if (cooldown > 0) return;
      setLoading(true);
      await empresaService.enviarCodigoAcesso(email);
      startCooldown();
    } catch (error: any) {
      toast.error("Erro ao enviar código de acesso");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigo = async (data: z.infer<typeof codeSchema>) => {
    try {
      setLoading(true);
      login({ email, codigo: data.code });
    } catch (error: any) {
      if (error?.message === "Código não encontrado") {
        codeForm.setError("code", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("Erro ao verificar código de acesso");
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
          Código de acesso enviado no seu e-mail
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
          <p className="text-sm text-center px-10 mt-3">
            Não tem conta?{" "}
            <Link href="/register" className="underline underline-offset-2">
              Inscreva-se
            </Link>
          </p>
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
                    <Input
                      placeholder="Digite o código"
                      type="numeric"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                          field.onChange(e);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Verificar código"}
            </Button>
          </form>
          <p className="text-sm text-left mt-3">
            Não recebeu?{" "}
            <button
              type="button"
              onClick={handleReenviarCodigo}
              disabled={loading || cooldown > 0}
              className={`underline underline-offset-2 ${
                cooldown > 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              {cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar"}
            </button>
          </p>
        </Form>
      )}
    </div>
  );
}
