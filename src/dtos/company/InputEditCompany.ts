import z from 'zod'


export interface InputEditCompanyDTO {
    id: string
    name?: string
    cnpj?: string
}

export interface OutputEditCompanyDTO {
    message: string
}

export const InputEditCompanySchema = z.object(
    {
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string."}),
        name: z.string({required_error: "O nome é obrigatório.", invalid_type_error: "O nome deve ser do tipo string."}).optional(),
        cnpj: z.string().regex(/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{14})$/, {message: "CNPJ inválido."}).optional()
    }
).transform(data => data as InputEditCompanyDTO)
