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
import { codigoAcessoDTO, codigoAcessoSchema } from "@/models/codigos";
import { useLogin } from "@/hooks/use-login";

export default function LoginForm() {
  const {
    handleEnviarCodigo,
    handleReenviarCodigo,
    handleVerificarCodigo,
    emailForm,
    codigoAcessoForm,
    step,
    isSubmitting,
    cooldown,
  } = useLogin();

  return (
    <div className="w-full">
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
                    <Input
                      className="bg-white"
                      placeholder="Digite seu e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar código"}
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
        <Form {...codigoAcessoForm}>
          <form
            onSubmit={codigoAcessoForm.handleSubmit(handleVerificarCodigo)}
            className="space-y-4"
          >
            <FormField
              control={codigoAcessoForm.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verificando..." : "Verificar código"}
            </Button>
          </form>
          <p className="text-sm text-left mt-3">
            Não recebeu?{" "}
            <button
              type="button"
              onClick={handleReenviarCodigo}
              disabled={isSubmitting || cooldown > 0}
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
