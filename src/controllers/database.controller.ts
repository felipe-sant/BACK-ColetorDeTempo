import { Request, Response } from 'express';
import DatabaseService from "../services/database.service"

class DatabaseController {
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    // POST api/
    async create(req: Request, res: Response) {
        try {
            const { temperatura, umidade } = req.body
            if (!temperatura || !umidade) {
                throw new Error("Dados de temperatura e umidade são obrigatórios")
            }

            const response = await this.databaseService.insertClima({ temperatura, umidade })
            if (!response) {
                throw new Error("Erro ao inserir dados no banco de dados")
            }

            res.status(201).json(response)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // GET api/
    async list(req: Request, res: Response) {
        try {
            let { dataInicio, dataFinal } = req.query

            if (!dataInicio) {
                if (dataFinal) { throw new Error("Data final não pode ser informada sem a data de início") }

                const response = await this.databaseService.getClima()

                if (!response) { throw new Error("Erro ao buscar dados no banco de dados") }

                res.status(200).json(response)
            } else {
                const inicio = new Date(dataInicio as string)
                const final = dataFinal ? new Date(dataFinal as string) : new Date()

                if (inicio > final) { throw new Error("Data de início não pode ser maior que a data final") }

                const response = await this.databaseService.getClimas(inicio, final)

                if (!response) { throw new Error("Erro ao buscar dados no banco de dados") }
                
                res.status(200).json(response)
            }

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default DatabaseController