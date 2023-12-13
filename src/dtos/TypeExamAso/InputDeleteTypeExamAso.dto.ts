import z from 'zod'


export interface InputDeleteTypeExamAsoDTO {
    id: string
}


export interface OutputDeleteTypeExamAsoDTO {
    message: string
}

export const InputDeleteTypeExamAsoSchema = z.object(
    {
        id: z.string({required_error: "O id do exame não foi informado."})
    }
).transform(data => data as InputDeleteTypeExamAsoDTO)