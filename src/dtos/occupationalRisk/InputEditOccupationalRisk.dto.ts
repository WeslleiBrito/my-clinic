import  z  from "zod"


export interface InputEditOccupationalRiskDTO {
    id: string,
    name?: string
}


export interface OutputEditOccupationalRiskDTO {
    message: string
}

export const InputEditInputEditOccupationalRiskSchema = z.object(
    {
        id: z.string({required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id venha como uma string."}),
        name: z.string({invalid_type_error: "O nome deve ser do tipo string."}).min(3, {message: "O nome do exame precisa terno mínimo 3 caracters."}).optional(),
    }
).transform(data => data as InputEditOccupationalRiskDTO)