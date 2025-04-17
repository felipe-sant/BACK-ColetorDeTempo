import { Router } from 'express'
import DatabaseController from '../controllers/database.controller'

const router = Router()
const databaseController = new DatabaseController()

router.post("/", databaseController.create.bind(databaseController))
router.get("/", databaseController.list.bind(databaseController))

export default router
