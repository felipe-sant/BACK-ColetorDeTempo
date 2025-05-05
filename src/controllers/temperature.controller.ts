import { format } from "path";
import TemperatureService from "../services/temperature.service";
import Temperatura from "../types/Temperatura";

class TemperatureController {
    private temperatureService: TemperatureService

    constructor() {
        this.temperatureService = new TemperatureService()
    }

    // GET api/temperature/daily
    async getDailyTemperature(req: any, res: any) {
        try {
            const { day } = req.query
            if (!day) {
                throw new Error("O dia é obrigatório")
            }

            const response: Temperatura[] = await this.temperatureService.getTemperatureDataPerDaily(new Date(day))
            if (!response) {
                throw new Error("Erro ao buscar dados no banco de dados")
            }

            const formatedDatas = this.temperatureService.formatTemperatureData(response)

            res.status(200).json(formatedDatas)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default TemperatureController