import  z  from "zod"


export interface InputEditExamDTO {
    id: string,
    name?: string,
    price?: number
}


export interface OutputEditExamDTO {
    message: string
}

export const InputEditExamSchema = z.object(
    {
        id: z.string({required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id venha como uma string."}),
        name: z.string({invalid_type_error: "O nome deve ser do tipo string."}).min(3, {message: "O nome do exame precisa terno mínimo 3 caracters."}),
        price: z.number({invalid_type_error: "O preço deve ser do tipo number."}).nonnegative({message: "O preço não pode ser menor que zero."}).optional()
    }
).transform(data => data as InputEditExamDTO)