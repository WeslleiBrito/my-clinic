import  z  from "zod"

export interface InputEditFormDTO {
    id: string,
    idCompany?: string,
    idPatient?: string,
    idTypeExamAso?: string,
    functionPatient?: string,
    status?: boolean,
    idExams? : {
        id: string,
        date: Date
        acction: boolean
    }[],
    idOccupationalHazards?: {
        id: string,
        acction: boolean
    }[],
    comments? : string 
}

export interface OutputEditFormDTO {
    message: string
}

export const idExamsSchema = z.object(
    {
        id: z.string({required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id do exame venha como uma string."}),
        acction: z.boolean({required_error: "É obrigatório informar a ação a ser executada.", invalid_type_error: "Espera-se que a ação seja um valor boolean."}),
        date: z.string({ required_error: 'A data de realização do exame é obrigatória.', invalid_type_error: 'A data precisa ser do tipo string.' })
            .refine((value) => {
                const parsedDate = new Date(value);
                return !isNaN(parsedDate.getTime()); // Garante que a string possa ser convertida para um objeto Date válido
            })
            .transform((value) => new Date(value))
    }
)

export const idOccupationalHazards = z.object(
    {
        id: z.string({required_error: "O id do risco ocupacional deve ser informado.", invalid_type_error: "Espera-se que o id do risco ocupacional venha como uma string."}),
        acction: z.boolean({required_error: "É obrigatório informar a ação a ser executada.", invalid_type_error: "Espera-se que a ação seja um valor boolean."})
    }
)

export const InputEditFormSchema = z.object(
    {
        id: z.string({required_error: "O id é obrigatório.", invalid_type_error: "O id deve ser do tipo string."}),
        idCompany: z.string({ invalid_type_error: "Espera-se que o id da empresa venha como uma string."}).optional(),
        idPatient: z.string({ invalid_type_error: "Espera-se que o id do paciente venha como uma string."}).optional(),
        idExams: z.array(idExamsSchema).optional(),
        idOccupationalHazards: z.array(idOccupationalHazards).optional(),
        idTypeExamAso: z.string({invalid_type_error: "Espera-se que o id do tipo do exame venha como uma string."}).optional(),
        functionPatient: z.string({invalid_type_error: "Espera-se que função do paciente venha como uma string."}).optional(),
        status: z.boolean({invalid_type_error: "O status deve ser um boolen"}).optional(),
        comments: z.string({invalid_type_error: "Espera-se que as observações venham como strings."}).optional()
    }
).transform(data => data as InputEditFormDTO)