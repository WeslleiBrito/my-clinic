import z from 'zod'


export interface InputDeleteExamDTO {
    id: string
}


export interface OutputDeleteExamDTO {
    message: string
}

export const InputDeleteExamSchema = z.object(
    {
        id: z.string({required_error: "O id do exame não foi informado."})
    }
).transform(data => data as InputDeleteExamDTO)