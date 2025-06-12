import { isCNPJ, isCPF } from "brazilian-values";
import z from "zod";

export const cpfCnpjSchema = z
  .string()
  .nonempty("CPF ou CNPJ é obrigatório")
  .refine((value) => value.length === 11 || value.length === 14, {
    message: "Deve ter exatamente 11 dígitos para CPF ou 14 dígitos para CNPJ",
  })
  .refine(
    (value) => {
      if (value.length === 11) return isCPF(value);
      if (value.length === 14) return isCNPJ(value);
      return false;
    },
    {
      message: "CPF ou CNPJ inválido",
    }
  );

export const texto = ({
  campo,
  min = 1,
  max = 50,
  transformarEmNull = false,
}: {
  campo: string;
  min?: number;
  max?: number;
  transformarEmNull?: boolean;
}) => {
  const baseSchema = z
    .string()
    .trim()
    .refine((val) => val.length > 0, {
      message: `${campo} é obrigatório`,
    })
    .refine((val) => val.length >= min, {
      message: `${campo} deve ter no mínimo ${min} caracteres`,
    })
    .refine((val) => val.length <= max, {
      message: `${campo} deve ter no máximo ${max} caracteres`,
    });

  if (transformarEmNull) {
    return baseSchema.transform((val) => (val === "" ? null : val)).nullable();
  }

  return baseSchema;
};
