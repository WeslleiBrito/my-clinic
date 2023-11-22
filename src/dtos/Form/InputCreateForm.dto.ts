import  z  from "zod"


export interface InputCreateFormDTO {
    idCompany: string,
    idPatient: string,
    idExams : {
        id: string,
    }[]
    
}


export interface OutputCreateFormDTO {
    message: string
}


export const FormSchema = z.object(
    {
        id: z.string({required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id do exame venha como uma string."})
    }
)

export const InputCreateFormSchema = z.object(
    {
        idCompany: z.string({required_error: "O id da empresa deve ser informado.", invalid_type_error: "Espera-se que o id da empresa venha como uma string."}),
        idPatient: z.string({required_error: "O id do paciente deve ser informado.", invalid_type_error: "Espera-se que o id do paciente venha como uma string."}),
        idExams: z.array(FormSchema)
    }
).transform(data => data as InputCreateFormDTO)