
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


export interface CompanyModel {
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

export interface CompanyEditDB {
    id: string,
    name: string
    cnpj: string | null,
    updated_at: string
}

export interface ExamsDB {
    id: string,
    name: string,
    price: number,
    created_at: string,
    updated_at: string
}

