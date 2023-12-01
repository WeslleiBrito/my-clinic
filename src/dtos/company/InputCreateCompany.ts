import z from 'zod'


export interface InputCreateCompanyDTO {
    name: string
    cnpj?: string
}

export interface OutputCreateCompanyDTO {
    message: string
}

export const InputCreateCompanySchema = z.object(
    {
        name: z.string({required_error: "O nome é obrigatório.", invalid_type_error: "O nome deve ser do tipo string."}),
        cnpj: z.string().regex(/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{14})$/, {message: "CNPJ inválido."}).optional()
    }
).transform(data => data as InputCreateCompanyDTO)