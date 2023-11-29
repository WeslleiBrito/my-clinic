import { OccupationalRiskDatabase } from "../database/OccupationalRiskDatabase";
import { InputCreateOccupationalRiskDTO, OutputCreateOccupationalRiskDTO } from "../dtos/occupationalRisk/InputCreateOccupationalRisk.dto";
import { InputEditOccupationalRiskDTO, OutputEditOccupationalRiskDTO } from "../dtos/occupationalRisk/InputEditOccupationalRisk.dto";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { OccupationalRisk } from "../models/OccupationalRisk";
import { IdGenerator } from "../services/IdGenerator";
import { OccupationalRiscModel, OccupationalRisksDB } from "../types/types";


export class OccupationalRiskBusiness {

    constructor(
        private occupationalRiskDatabase: OccupationalRiskDatabase,
        private idGenerator: IdGenerator
    ){}


    public createOccupationalRisk = async (input: InputCreateOccupationalRiskDTO): Promise<OutputCreateOccupationalRiskDTO> => {

        const { occupationalRisk } = input

        const nameExist = await this.occupationalRiskDatabase.findOccupationalRiskBy('name', occupationalRisk.map((exam) => exam.name))

        if(nameExist.length > 0){
            throw new ConflictError('Existe algum risco ocupacional com nome duplicado em relação ao banco de dados.')
        }

        const date = new Date().toISOString()

        const occupationalRiskDB: OccupationalRisksDB[] = occupationalRisk.map((exam) => {

            return {
                created_at: date,
                id: this.idGenerator.generate(),
                name: exam.name,
                updated_at: date
            }
        })

        await this.occupationalRiskDatabase.createOccupationalRisk(occupationalRiskDB)

        return{
            message: occupationalRisk.length > 1 ? "Riscos ocupacionais criados com sucesso!" : "Risco ocupacional criado com sucesso!"
        }
    }

    public editOccupationalRisk = async (input: InputEditOccupationalRiskDTO): Promise<OutputEditOccupationalRiskDTO> => {
        
        const {id, name } = input 

        const occupationalAll = await this.occupationalRiskDatabase.findOccupationalRiskAll()
        const occupationalRisk = occupationalAll.find((occupational) => occupational.id === id)
        
        if(!occupationalRisk){
            throw new NotFoundError('O id informado não existe.')
        }

        if(name){
            const nameExist = occupationalAll.find((occupational) => occupational.name.toLowerCase() === name.toLowerCase())

            if(nameExist){
                if(nameExist.id !== id){
                    throw new ConflictError('O nome informado já existe.')
                }
            }
        }


        const newOccupationalRisk = new OccupationalRisk(
            id,
            name || occupationalRisk.name,
            occupationalRisk.created_at,
            new Date().toISOString()
        )

        await this.occupationalRiskDatabase.editOccupationalRisk({
            created_at: newOccupationalRisk.getCreatedAt(),
            id: newOccupationalRisk.getId(),
            name: newOccupationalRisk.getName(),
            updated_at: newOccupationalRisk.getUpdatedAt()
        })

        return {
            message: "Risco ocupacional editado com sucesso atualizado com sucesso!"
        }
    }


    public getAllOccupationalRisk = async (): Promise<OccupationalRiscModel[]> => {

        const search = await this.occupationalRiskDatabase.findOccupationalRiskAll()

        const result = search.map((occupationalRisk) => {

            return {
                id: occupationalRisk.id,
                name: occupationalRisk.name,
                createdAt: occupationalRisk.created_at,
                updatedAt: occupationalRisk.updated_at
            }
        })

        return result
    } 
}