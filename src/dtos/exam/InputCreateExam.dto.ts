import  z  from "zod"


export interface InputCreateExamDTO {
    exams : {
        name: string,
        price?: number
    }[]
    
}


export interface OutputCreateExamDTO {
    message: string
}


export const ExamSchema = z.object(
    {
        name: z.string({required_error: "O nome do exame deve ser informado.", invalid_type_error: "Espera-se que o exame venha como uma string."}),
        price: z.number({invalid_type_error: "O preço deve ser do tipo number."}).nonnegative({message: "O preço não pode ser menor que zero."}).optional()
    }
)

export const InputCreateExamSchema = z.object(
    {
        exams: z.array(ExamSchema)
    }
).transform(data => data as InputCreateExamDTO)