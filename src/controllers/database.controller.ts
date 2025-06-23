import { Request, Response } from 'express';
import DatabaseService from "../services/database.service"

class DatabaseController {
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    // GET api/
    async getAll(_: Request, res: Response) {
        try {
            const response = await this.databaseService.getClima()
            if (!response) {
                throw new Error("Erro ao pegar dados do banco de dados")
            }

            res.status(200).json(response)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // POST api/
    async create(req: Request, res: Response) {
        try {
            const { temperatura, umidade, pressao, chuva, co } = req.body
            
            if (!temperatura) throw new Error("Dados de temperatura são obrigatórios")
            if (!umidade) throw new Error("Dados de umidade são obrigatórios")
            if (!pressao) throw new Error("Dados de pressão são obrigatórios")
            if (!chuva) throw new Error("Dados de chuva são obrigatórios")
            if (!co) throw new Error("Dados de CO são obrigatórios")
            if (typeof temperatura !== 'number' || typeof umidade !== 'number' || typeof pressao !== 'number' || typeof co !== 'number') {
                throw new Error("Temperatura, umidade, pressão e co devem ser números")
            }
            if (typeof chuva !== 'boolean') {
                throw new Error("Chuva deve ser um valor booleano")
            }

            const date = new Date()
            date.setHours(date.getHours() - 3)

            const response = await this.databaseService.insertClima({ temperatura, umidade, pressao, chuva, co, timestamp: date })
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