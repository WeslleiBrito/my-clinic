
export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}


export interface PatientDB {
    id: string,
    name: string,
    rg: string,
    cpf?: string,
    created_at: string,
    updated_at: string
}
