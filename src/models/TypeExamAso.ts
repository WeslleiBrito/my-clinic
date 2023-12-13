import { TypeExamAsoModel } from "../types/types"


export class TypeExamAso {

    constructor(
        private id: string,
        private name: string,
        private createdAt: string,
        private updatedAt: string
    ){}

    
    public getAllTypeExam = (): TypeExamAsoModel => {

        return {
            name: this.name,
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }


    public getCreatedAt = (): string => {
        return this.createdAt
    }

    public getUpdatedAt = (): string => {
        return this.updatedAt
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setUpdatedAt = (newDate: string): void => {
        this.updatedAt = newDate
    }
    
}