import { FormDatabase } from "../database/FormDatabase";
import { TypeExamAsoDatabase } from "../database/TypeExamAsoDatabase";
import { InputCreateTypeExamAsoDTO, OutputCreateTypeExamAsoDTO } from "../dtos/TypeExamAso/InputCreateTypeExamAso.dto";
import { InputDeleteTypeExamAsoDTO, OutputDeleteTypeExamAsoDTO } from "../dtos/TypeExamAso/InputDeleteTypeExamAso.dto";
import { InputEditTypeExamAsoDTO, OutputEditTypeExamAsoDTO } from "../dtos/TypeExamAso/InputEditTypeExamAso.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { TypeExamAso } from "../models/TypeExamAso";
import { IdGenerator } from "../services/IdGenerator";
import { TypeExamAsoModel, TypeExameAsoDB } from "../types/types";


export class TypeExamAsoBusiness {

    constructor(
        private typeExamAsoDatabase: TypeExamAsoDatabase,
        private idGenerator: IdGenerator,
        private formsDatabase: FormDatabase
    ){}

    public createTypeExamAso = async (input: InputCreateTypeExamAsoDTO): Promise<OutputCreateTypeExamAsoDTO> => {

        const { typeExams } = input

        const nameExist = await this.typeExamAsoDatabase.findTypeExamAsoBy('name', typeExams.map((name) => name.name))

        if(nameExist.length > 0){
            throw new ConflictError('Existe algum tipo de exame aso com nome duplicado em relação ao banco de dados.')
        }

        const date = new Date().toISOString()

        const typeExamAsoDB: TypeExameAsoDB[] = typeExams.map((name) => {

            return {
                created_at: date,
                id: this.idGenerator.generate(),
                name: name.name,
                updated_at: date
            }
        })

        await this.typeExamAsoDatabase.createTypeExamAso(typeExamAsoDB)

        return{
            message: typeExams.length > 1 ? "Tipos de exames aso criados com sucesso!" : "Tipo de exame aso criado com sucesso!"
        }
    }

    public editTypeExamAso = async (input: InputEditTypeExamAsoDTO): Promise<OutputEditTypeExamAsoDTO> => {
        
        const {id, name } = input 

        const typeExamAsoAll = await this.typeExamAsoDatabase.findAllTypeExamsAso()
        const typeExamAso = typeExamAsoAll.find((typeExam) => typeExam.id === id)
        
        if(!typeExamAso){
            throw new NotFoundError('O id informado não existe.')
        }

        if(name){
            const nameExist = typeExamAsoAll.find((typeExam) => typeExam.name.toLowerCase() === name.toLowerCase())

            if(nameExist){
                if(nameExist.id !== id){
                    throw new ConflictError('O nome informado já existe.')
                }
            }
        }


        const newOccupationalRisk = new TypeExamAso(
            id,
            name || typeExamAso.name,
            typeExamAso.created_at,
            new Date().toISOString()
        )

        await this.typeExamAsoDatabase.editTypeExamAso({
            created_at: newOccupationalRisk.getCreatedAt(),
            id: newOccupationalRisk.getId(),
            name: newOccupationalRisk.getName(),
            updated_at: newOccupationalRisk.getUpdatedAt()
        })

        return {
            message: "Tipo de exame aso editado com sucesso atualizado com sucesso!"
        }
    }

    public getAllTypeExamAso = async (): Promise<TypeExamAsoModel[]> => {

        const search = await this.typeExamAsoDatabase.findAllTypeExamsAso()

        const result = search.map((typeExamAso) => {

            const newTypeExamAso = new TypeExamAso(
                typeExamAso.id,
                typeExamAso.name,
                typeExamAso.created_at,
                typeExamAso.updated_at
            )

            return newTypeExamAso.getAllTypeExam()
        })

        return result
    } 

    public deleteTypeExamAso = async (input: InputDeleteTypeExamAsoDTO): Promise<OutputDeleteTypeExamAsoDTO> => {

        const [typeExamAso] = await this.typeExamAsoDatabase.findTypeExamAsoBy('id', [input.id])

        if(!typeExamAso){
            throw new NotFoundError("Tipo de exame aso não encontrada, verifique o id")
        }

        const [isInteraction] = await this.formsDatabase.findFormBy('id_type_exam', [input.id])
        
        if(isInteraction){
            throw new BadRequestError("Não é possível excluir um tipo de exame aso que possui registros ativos.")
        }

        await this.typeExamAsoDatabase.deleteTypeExamAso(input.id)

        return {
            message: "Tipo de exame aso deletado com sucesso!"
        }
    }
}