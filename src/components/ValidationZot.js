import path from "path"
import { z } from "zod"

export const Validation = z.object({
    name: z.string().nonempty("Nome é obrigatorio"),
    email: z
        .string()
        .nonempty("email é obrigatorio")
        .email("Forneça um email valido"),
    password: z
        .string()
        .nonempty("É obrigatorio")
        .min(8, "E necessario pelo menos 8 digitos")
,
    confirmPassword: z.string().nonempty("É obrigatorio"),
    telefone: z.string().nonempty("É obrigatorio"),
}).refine(({password, confirmPassword}) => password === confirmPassword,{
    message: "As senhas devem ser identicas",
    path: ["confirmPassword"],
})
