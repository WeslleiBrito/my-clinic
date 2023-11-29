import z from 'zod'


export interface InputDeletePatientDTO {
    id: string
}

export interface OutputDeletePatientDTO {
    message: string
}

export const InputDeletePatientSchema = z.object(
    {
        id: z.string({required_error: "O id do paciente não foi informado."})
    }
).transform(data => data as InputDeletePatientDTO)