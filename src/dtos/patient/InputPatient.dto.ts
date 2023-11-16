import z from "zod"

export interface InputPatientDTO {
    name: string,
    rg: string,
    cpf?: string
}

export interface OutputPatientDTO {
    message: string
}

export const InputPatientSchema = z.object(
    {
        name: z.string({required_error: "Nome não informado.",  invalid_type_error: "Espera-se que o name venha como string."})
        .min(3, {message: "O nome precisa ter pelo menos 3 caracteres."}),
        rg: z.string({required_error: "O rg não foi informado.",  invalid_type_error: "Espera-se que o rg venha como string."})
        .regex(/^(\d{2}\.?\d{3}\.?\d{3}-?\d{1,2}|\d{9})$/, {message: "RG inválido."}),
        cpf: z.string({required_error: "CPF não informado.",  invalid_type_error: "Espera-se que o CPF venha como string."})
        .regex(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, {message: "CPF inválido."}).optional(),
    }
).transform(data => data as InputPatientDTO)

