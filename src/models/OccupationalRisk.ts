

export class OccupationalRisk {
    
    constructor(
        private id: string,
        private name: string,
        private createdAt: string,
        private updatedAt: string
    ){}


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