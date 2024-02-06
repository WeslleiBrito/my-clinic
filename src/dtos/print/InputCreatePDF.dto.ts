import z from 'zod'


export interface InputCreatePDFDTO {
    id: string
}

export interface OutputCreatePDFDTO {
    filePath: string
}

export const InputCreatePDFSchema = z.object(
    {
        id: z.string({required_error: "O id do formulário aso não foi informado."})
    }
).transform(data => data as InputCreatePDFDTO)