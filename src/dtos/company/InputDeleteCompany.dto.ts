import z from 'zod'


export interface InputDeleteCompanyDTO {
    id: string
}


export interface OutputDeleteCompanyDTO {
    message: string
}

export const InputDeleteCompanySchema = z.object(
    {
        id: z.string({required_error: "O id do formulário não foi informado."})
    }
).transform(data => data as InputDeleteCompanyDTO)