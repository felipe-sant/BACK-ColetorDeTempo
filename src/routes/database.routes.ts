import { Router } from 'express'
import DatabaseController from '../controllers/database.controller'
import TemperatureController from '../controllers/temperature.controller'

const router = Router()
const databaseController = new DatabaseController()
const temperatureController = new TemperatureController()

router.post("/", databaseController.create.bind(databaseController))
router.get("/temperature/daily", temperatureController.getDailyTemperature.bind(temperatureController))

export default router
