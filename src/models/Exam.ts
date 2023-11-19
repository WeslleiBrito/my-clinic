

export class Exam {

    constructor(
        private id: string,
        private name: string,
        private price: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    
    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getPrice = (): number => {
        return this.price
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

    public setPrice = (newPrice: number): void => {
        this.price = newPrice
    }

    public setUpdatedAt = (newDate: string): void => {
        this.updatedAt = newDate
    }
    
}