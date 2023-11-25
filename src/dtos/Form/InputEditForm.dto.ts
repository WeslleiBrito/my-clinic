import  z  from "zod"


export interface InputEditFormDTO {
    id: string,
    idCompany?: string,
    idPatient?: string,
    idExams? : {
        id: string,
        acction: boolean
    }[]
    
}

export interface OutputEditFormDTO {
    message: string
}

export const FormSchema = z.object(
    {
        id: z.string({required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id do exame venha como uma string."}),
        acction: z.boolean({required_error: "É obrigatório informar a ação a ser executada.", invalid_type_error: "Espera-se que a ação seja um valor boolean."})
    }
)

export const InputEditFormSchema = z.object(
    {
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string."}),
        idCompany: z.string({ invalid_type_error: "Espera-se que o id da empresa venha como uma string."}).optional(),
        idPatient: z.string({ invalid_type_error: "Espera-se que o id do paciente venha como uma string."}).optional(),
        idExams: z.array(FormSchema).optional()
    }
).transform(data => data as InputEditFormDTO)