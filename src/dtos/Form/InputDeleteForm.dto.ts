import z from 'zod'


export interface InputDeleteFormDTO {
    idForms: string[]
}


export interface OutputDeleteFormDTO {
    message: string
}

export const InputDeleteFormSchema = z.object(
    {
        idForms: z.array(z.string({required_error: "O id do formulário não foi informado."}))
    }
).transform(data => data as InputDeleteFormDTO)