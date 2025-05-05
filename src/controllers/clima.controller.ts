import { format } from "path";
import TemperatureService from "../services/temperature.service";
import Temperatura from "../types/Temperatura";
import Umidade from "../types/Umidade";
import UmidadeService from "../services/umidade.service";

class ClimaController {
    private temperatureService: TemperatureService
    private umidadeService: UmidadeService

    constructor() {
        this.temperatureService = new TemperatureService()
        this.umidadeService = new UmidadeService()
    }

    // GET api/daily
    async getDailyData(req: any, res: any) {
        try {
            const { day } = req.query
            if (!day) {
                throw new Error("O dia é obrigatório")
            }

            const responseTemperature: Temperatura[] = await this.temperatureService.getTemperatureDataPerDaily(new Date(day))
            if (!responseTemperature) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasTemp = this.temperatureService.formatTemperatureData(responseTemperature)

            const responseUmidade: Umidade[] = await this.umidadeService.getUmidadeDataPerDaily(new Date(day))
            if (!responseUmidade) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasUmid = this.umidadeService.formatHumityData(responseUmidade)

            res.status(200).json({
                temperatura: formatedDatasTemp,
                umidade: formatedDatasUmid
            })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default ClimaController