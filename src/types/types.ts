
export enum USER_ROLES {
    ADMIN = "ADMIN",
    MASTER = "MASTER",
    NORMAL = "NORMAL"
}

export enum ACCTIONS_EDIT_EXAM {
    ADD = "ADD",
    REMOVE = "REMOVE",
    EDIT = "EDIT",
    add = "add",
    remove = "remove",
    edit = "edit"
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
    cnpj: string | undefined
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

export interface OccupationalRisksDB {
    id: string,
    name: string,
    created_at: string,
    updated_at: string
}

export interface TypeExameAsoDB {
    id: string,
    name: string,
    created_at: string,
    updated_at: string
}

export interface FormDB {
    id: string,
    id_company: string,
    id_patient: string,
    name_company: string,
    name_patient: string,
    rg: string,
    cnpj: string | undefined,
    cpf: string | undefined,
    function_patient: string,
    number_procedures: number,
    id_type_exam: string,
    status_exam: 0 | 1,
    amount: number,
    created_at: string,
    updated_at: string,
    comments: string
}

export interface ProceduresFormsDB {
    id: string,
    id_form: string,
    id_exam: string,
    name_exam: string,
    date: string,
    price: number
    updated_at: string,
    created_at: string
}

export interface ModelForm {
    id: string,
    idCompany: string,
    idPatient: string,
    nameCompany: string,
    namePatient: string,
    rg: string,
    cnpj: string | undefined,
    cpf: string | undefined,
    functionPatient: string,
    status: boolean,
    numberProcedures: number,
    amount: number,
    createdAt: string,
    updatedAt: string,
    typeExamAso: {
        id: string,
        name: string
    },
    exams: ExamModelForm[],
    OccupationalHazards: {
        id: string,
        name: string
    }[],
    comments?: string  
}

export interface ExamModel {
    id: string,
    name: string,
    price: number,
    createdAt: string,
    updatedAt: string
}

export interface OccupationalRiscModel {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface TypeExamAsoModel {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface OccupationalRiskFormsDB {
    id: string,
    id_form: string,
    id_risk: string,
    name_risk: string
}

export interface ExamModelForm {
    id: string,
    name: string,
    price: number,
    date: string,
    updatedAt: string
}

export interface PrintTypeExamAso {
    id: string, 
    name: string, 
    selected: boolean
}

export interface PrintListExams {
    id: string, 
    name: string,
    date: string
}

export interface PrintRisk {
    id: string, 
    name: string
}