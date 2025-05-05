import Clima from "../model/clima.model";
import Umidade from "../types/Umidade";
import UmidadeFormatada from "../types/UmidadeFormatada";

class UmidadeService {
    async getUmidadeDataPerDaily(date: Date): Promise<Umidade[]> {
        const startOfDay = date
        const endOfDay = new Date(date)
        endOfDay.setDate(endOfDay.getDate() + 1)
        const response: any = await Clima.find({
            timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({ timestamp: 1 })
        return response
    }

    formatHumityData(data: Umidade[]) {
        const dataDaily: UmidadeFormatada[] = []

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours()

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour)
            if (dataIndex === -1) {
                dataDaily.push({
                    hour,
                    data: {
                        maxUmidade: collectedData.umidade,
                        minUmidade: collectedData.umidade,
                        mediaUmidade: collectedData.umidade,
                        numeroDeLeituras: 1
                    }
                })
            } else {
                dataDaily[dataIndex].data.maxUmidade = Math.max(dataDaily[dataIndex].data.maxUmidade, collectedData.umidade)
                dataDaily[dataIndex].data.minUmidade = Math.min(dataDaily[dataIndex].data.minUmidade, collectedData.umidade)
                dataDaily[dataIndex].data.mediaUmidade = dataDaily[dataIndex].data.mediaUmidade + collectedData.umidade
                dataDaily[dataIndex].data.numeroDeLeituras = dataDaily[dataIndex].data.numeroDeLeituras + 1
            }
        })
        
        dataDaily.forEach(e => e.data.mediaUmidade = e.data.mediaUmidade / e.data.numeroDeLeituras)

        return dataDaily
    }
}

export default UmidadeService