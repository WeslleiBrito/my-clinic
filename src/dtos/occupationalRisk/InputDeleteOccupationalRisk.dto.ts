import z from 'zod'


export interface InputDeleteOccupationalRiskDTO {
    id: string
}


export interface OutputDeleteOccupationalRiskDTO {
    message: string
}

export const InputDeleteOccupationalRiskSchema = z.object(
    {
        id: z.string({required_error: "O id do risco ocupacional não foi informado."})
    }
).transform(data => data as InputDeleteOccupationalRiskDTO)