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

            const date = new Date()
            date.setHours(date.getHours() - 3)

            const response = await this.databaseService.insertClima({ temperatura, umidade, timestamp: date })
            if (!response) {
                throw new Error("Erro ao inserir dados no banco de dados")
            }

            res.status(201).json(response)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default DatabaseController