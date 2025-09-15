import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObjectId = (id: string) => ObjectId.isValid(id);

// valores aceitos para o enum (ajuda na checagem/transform)
const TYPE_VALUES = [TransactionType.expense, TransactionType.income] as const;

export const createTransaction = z.object({
  description: z.string().min(1, "Descrição obrigatória"),

  amount: z.number().positive("Valor deve ser positivo"),

  // >>> Bem próximo do do professor (bloco com mensagem)
  // No Zod 4 usamos superRefine para customizar a msg da data inválida
  date: z.coerce.date().superRefine((d, ctx) => {
    if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Data inválida" });
    }
  }),

  categoryId: z.string().refine(isValidObjectId, {
    message: "Categoria inválida",
  }),

  // >>> Visual parecido com o do professor:
  // Em vez de z.enum(..., { errorMap }), usamos string().refine() e transform()
  type: z
    .string()
    .refine(
      (v): v is (typeof TYPE_VALUES)[number] =>
        (TYPE_VALUES as readonly string[]).includes(v as any),
      { message: "Tipo inválido" },
    )
    .transform((v) => v as TransactionType),
});
