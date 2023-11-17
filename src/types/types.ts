
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


export interface Company {
    id: string
    name: string
    cnpj: string
    createdAt: string
    updatedAt: string
}

export interface CompanyDB {
    id: string
    name: string
    cnpj: string | null
    created_at: string
    updated_at: string
}