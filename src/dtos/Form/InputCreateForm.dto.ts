import z from "zod"


export interface InputCreateFormDTO {
    idCompany: string,
    idPatient: string,
    idTypeExamAso: string,
    functionPatient: string,
    status: boolean,
    idExams: {
        id: string,
        date: Date
    }[],
    idOccupationalHazards: {
        id: string
    }[],
    comments? : string 
}


export interface OutputCreateFormDTO {
    message: string
}


export const idExamSchema = z.object(
    {
        id: z.string({ required_error: "O id do exame deve ser informado.", invalid_type_error: "Espera-se que o id do exame venha como uma string." }),
        date: z.string({ required_error: 'A data de realização do exame é obrigatória.', invalid_type_error: 'A data precisa ser do tipo string.' })
            .refine((value) => {
                const parsedDate = new Date(value);
                return !isNaN(parsedDate.getTime()); // Garante que a string possa ser convertida para um objeto Date válido
            })
            .transform((value) => new Date(value))
    }
)

export const idOccupationalHazardsSchema = z.object(
    {
        id: z.string({ required_error: "O id do risco ocupacional deve ser informado.", invalid_type_error: "Espera-se que o id do risco ocupacional venha como uma string." })
    }
)

export const InputCreateFormSchema = z.object(
    {
        idCompany: z.string({ required_error: "O id da empresa deve ser informado.", invalid_type_error: "Espera-se que o id da empresa venha como uma string." }),
        idPatient: z.string({ required_error: "O id do paciente deve ser informado.", invalid_type_error: "Espera-se que o id do paciente venha como uma string." }),
        idTypeExamAso: z.string({ required_error: "O id do tipo do exame deve ser informado.", invalid_type_error: "Espera-se que o id do tipo do exame venha como uma string." }),
        functionPatient: z.string({ required_error: "A função do paciente deve ser informado.", invalid_type_error: "Espera-se que função do paciente venha como uma string." }),
        status: z.boolean({ required_error: "O status do aso deve ser informado.", invalid_type_error: "O status deve ser um boolen" }),
        idExams: z.array(idExamSchema),
        idOccupationalHazards: z.array(idOccupationalHazardsSchema),
        comments: z.string({invalid_type_error: "Espera-se que as observações venham como strings."}).optional()
    }
).transform(data => data as InputCreateFormDTO)