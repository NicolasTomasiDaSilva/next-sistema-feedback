import z from "zod";

export function zString({
  field,
  min = 1,
  max = 50,
  nullable = false,
}: {
  field: string;
  min?: number;
  max?: number;
  nullable?: boolean;
}) {
  if (nullable) {
    return z
      .string()
      .transform((val) => (val.trim() === "" ? null : val.trim()))
      .nullable()
      .refine((val) => val === null || val.length >= min, {
        message: `${field} deve ter no mínimo ${min} caracteres`,
      })
      .refine((val) => val === null || val.length <= max, {
        message: `${field} deve ter no máximo ${max} caracteres`,
      });
  }

  return z
    .string()
    .trim()
    .refine((val) => val.length > 0, {
      message: `${field} é obrigatório`,
    })
    .refine((val) => val.length >= min, {
      message: `${field} deve ter no mínimo ${min} caracteres`,
    })
    .refine((val) => val.length <= max, {
      message: `${field} deve ter no máximo ${max} caracteres`,
    });
}
