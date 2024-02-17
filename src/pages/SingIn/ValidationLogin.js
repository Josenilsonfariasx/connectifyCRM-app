import path from "path"
import { z } from "zod"

export const ValidationLogin = z.object({
    email: z
        .string()
        .nonempty("email é obrigatorio")
        .email("Forneça um email valido"),
    password: z
        .string()
        .nonempty("É obrigatorio")
        .min(8, "E necessario pelo menos 8 digitos")
})
