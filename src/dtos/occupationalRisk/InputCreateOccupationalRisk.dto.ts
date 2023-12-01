import  z  from "zod"


export interface InputCreateOccupationalRiskDTO {
    occupationalRisk : {
        name: string
    }[]
    
}


export interface OutputCreateOccupationalRiskDTO {
    message: string
}


export const OccupationalRiskSchema = z.object(
    {
        name: z.string({required_error: "O nome do exame deve ser informado.", invalid_type_error: "Espera-se que o exame venha como uma string."})
    }
)

export const InputCreateOccupationalRiskSchema = z.object(
    {
        occupationalRisk: z.array(OccupationalRiskSchema)
    }
).transform(data => data as InputCreateOccupationalRiskDTO)