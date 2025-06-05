"use client";

import React from "react";

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

import Link from "next/link";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useLogin } from "../hooks/use-login";

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

            <Button
              type="submit"
              variant="azul"
              className="w-full"
              disabled={isSubmitting}
            >
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
            <div className="flex items-center justify-center">
              <FormField
                control={codigoAcessoForm.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mx-auto">Código de Acesso</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="rounded-md border border-input bg-white"
                          />
                          <InputOTPSlot
                            index={1}
                            className="rounded-md border border-input bg-white"
                          />
                          <InputOTPSlot
                            index={2}
                            className="rounded-md border border-input bg-white"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={3}
                            className="rounded-md border border-input bg-white"
                          />
                          <InputOTPSlot
                            index={4}
                            className="rounded-md border border-input bg-white"
                          />
                          <InputOTPSlot
                            index={5}
                            className="rounded-md border border-input bg-white"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage className="mx-auto" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              variant="azul"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
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
