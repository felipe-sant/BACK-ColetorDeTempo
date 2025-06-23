import Clima from "../model/clima.model";
import DadosClimaticos from "../types/dadosClimaticos.type";

class DatabaseService {
    async getClima() {
        const response = await Clima.find().sort({ timestamp: -1 }).limit(100);
        return response;
    }

    async insertClima(dadosClimaticos: DadosClimaticos) {
        const novoClima = new Clima(dadosClimaticos)
        const response = await novoClima.save()
        return response
    }
}

export default DatabaseService;