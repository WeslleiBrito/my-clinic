import z from "zod"

export interface InputEditPatientDTO {
    id: string,
    name?: string,
    rg?: string,
    cpf?: string
}

export interface OutputEditPatientDTO {
    message: string
}

export const InputEditPatientSchema = z.object(
    {
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string."}),
        name: z.string({required_error: "Nome não informado.",  invalid_type_error: "Espera-se que o name venha como string."})
        .min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}).optional(),
        rg: z.string({required_error: "O rg não foi informado.",  invalid_type_error: "Espera-se que o rg venha como string."})
        .regex(/^(\d{2}\.?\d{3}\.?\d{3}-?\d{1,2}|\d{9})$/, {message: "RG inválido."}).optional(),
        cpf: z.string({required_error: "CPF não informado.",  invalid_type_error: "Espera-se que o CPF venha como string."})
        .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, {message: "CPF inválido."}).optional(),
    }
).transform(data => data as InputEditPatientDTO)
