import { Router } from 'express'
import DatabaseController from '../controllers/database.controller'
import ClimaController from '../controllers/clima.controller'

const router = Router()
const databaseController = new DatabaseController()
const climaController = new ClimaController()

router.post("/", databaseController.create.bind(databaseController))
router.get("/daily", climaController.getDailyData.bind(climaController))

export default router
