import Semana from "../enum/Semana";
import Clima from "../model/clima.model";
import Umidade from "../types/Umidade";
import UmidadeFormatadaDaily from "../types/UmidadeFormatadaDaily";
import UmidadeFormatadaWeek from "../types/UmidadeFormatadaWeek";

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

    async getUmidadeDataPerWeek(date: Date): Promise<Umidade[]> {
        const endOfDay = date
        const startOfDay = new Date(date)
        startOfDay.setDate(startOfDay.getDate() - 6)
        endOfDay.setDate(endOfDay.getDate() + 1)
        const response: any = await Clima.find({
            timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({ timestamp: 1 })
        return response
    }

    formatHumityDataDaily(data: Umidade[]) {
        const dataDaily: UmidadeFormatadaDaily[] = []

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

    formatHumityDataWeek(data: Umidade[]) {
        const dataWeek: UmidadeFormatadaWeek[] = []

        data.forEach((collectedData) => {
            const day = Semana[collectedData.timestamp.getDay()]

            const dataIndex = dataWeek.findIndex((data) => data.day === day)
            if (dataIndex === -1) {
                dataWeek.push({
                    day,
                    data: {
                        maxUmidade: collectedData.umidade,
                        minUmidade: collectedData.umidade,
                        mediaUmidade: collectedData.umidade,
                        numeroDeLeituras: 1
                    }
                })
            } else {
                dataWeek[dataIndex].data.maxUmidade = Math.max(dataWeek[dataIndex].data.maxUmidade, collectedData.umidade)
                dataWeek[dataIndex].data.minUmidade = Math.min(dataWeek[dataIndex].data.minUmidade, collectedData.umidade)
                dataWeek[dataIndex].data.mediaUmidade = dataWeek[dataIndex].data.mediaUmidade + collectedData.umidade
                dataWeek[dataIndex].data.numeroDeLeituras = dataWeek[dataIndex].data.numeroDeLeituras + 1
            }
        })

        dataWeek.forEach(e => e.data.mediaUmidade = e.data.mediaUmidade / e.data.numeroDeLeituras)

        return dataWeek
    }
}

export default UmidadeService