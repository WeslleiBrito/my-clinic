import  z  from "zod"


export interface InputEditTypeExamAsoDTO {
    id: string,
    name?: string
}

export interface OutputEditTypeExamAsoDTO {
    message: string
}

export const InputEditTypeExamAsoSchema = z.object(
    {
        id: z.string({required_error: "O id do tipo do exame deve ser informado.", invalid_type_error: "Espera-se que o id venha como uma string."}),
        name: z.string({invalid_type_error: "O nome deve ser do tipo string."}).optional()
    }
).transform(data => data as InputEditTypeExamAsoDTO)