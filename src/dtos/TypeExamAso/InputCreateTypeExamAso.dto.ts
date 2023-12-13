import  z  from "zod"

export interface InputCreateTypeExamAsoDTO {
    typeExams : {
        name: string
    }[]   
}

export interface OutputCreateTypeExamAsoDTO {
    message: string
}

export const TypeExamAsoSchema = z.object(
    {
        name: z.string({required_error: "O nome do tipo do exame aso deve ser informado.", invalid_type_error: "Espera-se que o tipo do exame aso venha como uma string."}),
    }
)

export const InputCreateTypeExamAsoSchema = z.object(
    {
        typeExams: z.array(TypeExamAsoSchema)
    }
).transform(data => data as InputCreateTypeExamAsoDTO)