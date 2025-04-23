import Clima from "../model/clima.model";
import DadosClimaticos from "../types/dadosClimaticos.type";

class DatabaseService {
    async insertClima(dadosClimaticos: DadosClimaticos) {
        const novoClima = new Clima(dadosClimaticos)
        const response = await novoClima.save()
        return response
    }

    async getClima() {
        const response = await Clima.find().sort({ timestamp: -1 }).limit(1)
        return response[0]
    }

    async getClimas(dataInicio: Date, dataFinal: Date) {
        const response = await Clima.find({
            timestamp: {
                $gte: dataInicio,
                $lte: dataFinal
            }
        }).sort({ timestamp: 1 })
        return response
    }
}

export default DatabaseService;