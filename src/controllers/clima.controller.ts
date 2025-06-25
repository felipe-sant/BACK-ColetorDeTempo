import { format } from "path";
import TemperatureService from "../services/temperature.service";
import Temperatura from "../types/Temperatura";
import Umidade from "../types/Umidade";
import UmidadeService from "../services/umidade.service";
import CarbonoService from "../services/carbono.service";
import Carbono from "../types/Carbono";
import PressaoService from "../services/pressao.service";
import Pressao from "../types/Pressao";
import ChuvaService from "../services/chuva.service";

class ClimaController {
    private temperatureService: TemperatureService
    private umidadeService: UmidadeService
    private carbonoService: CarbonoService
    private pressaoService: PressaoService
    private chuvaService: ChuvaService

    constructor() {
        this.temperatureService = new TemperatureService()
        this.umidadeService = new UmidadeService()
        this.carbonoService = new CarbonoService()
        this.pressaoService = new PressaoService()
        this.chuvaService = new ChuvaService()
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
            const formatedDatasTemp = this.temperatureService.formatTemperatureDataDaily(responseTemperature)

            const responseUmidade: Umidade[] = await this.umidadeService.getUmidadeDataPerDaily(new Date(day))
            if (!responseUmidade) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasUmid = this.umidadeService.formatHumityDataDaily(responseUmidade)

            const responseCarbono: Carbono[] = await this.carbonoService.getCarbonoDataPerDaily(new Date(day))
            if (!responseCarbono) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasCarbono = this.carbonoService.formatCarbonoDataDaily(responseCarbono)

            const responsePressao: Pressao[] = await this.pressaoService.getPressaoDataPerDaily(new Date(day))
            if (!responsePressao) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasPressao = this.pressaoService.formatPressaoDataDaily(responsePressao)

            const responseChuva = await this.chuvaService.getChuvaDataPerDaily(new Date(day))
            if (!responseChuva) { throw new Error("Erro ao buscar dados de chuva no banco de dados") }
            const formatedDatasChuva = this.chuvaService.formatChuvaDataDaily(responseChuva)

            res.status(200).json({
                temperatura: formatedDatasTemp,
                umidade: formatedDatasUmid,
                carbono: formatedDatasCarbono,
                pressao: formatedDatasPressao,
                chuva: formatedDatasChuva
            })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    // GET api/week
    async getWeekData(req: any, res: any) {
        try {
            const { day } = req.query
            if (!day) {
                throw new Error("O dia é obrigatório")
            }

            const responseTemperature: Temperatura[] = await this.temperatureService.getTemperatureDatePerWeek(new Date(day))
            if (!responseTemperature) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasTemp = this.temperatureService.formatTemperatureDataWeek(responseTemperature)

            const responseUmidade: Umidade[] = await this.umidadeService.getUmidadeDataPerWeek(new Date(day))
            if (!responseUmidade) { throw new Error("Erro ao buscar dados no banco de dados") }
            const formatedDatasUmid = this.umidadeService.formatHumityDataWeek(responseUmidade)

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