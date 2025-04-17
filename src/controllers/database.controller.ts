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
            const response = this.databaseService.create(req.body, req.query)
            res.status(201).json(response)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // GET api/
    async list(_: Request, res: Response) {
        try {
            const response = this.databaseService.list()
            res.status(200).json(response)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default DatabaseController