import Clima from "../model/clima.model";
import TemperaturaFormatada from "../types/formatedTemperatura";
import Temperatura from "../types/Temperatura";

class TemperatureService {
    async getTemperatureDataPerDaily(date: Date): Promise<Temperatura[]> {
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

    formatTemperatureData(data: Temperatura[]) {
        const dataDaily: TemperaturaFormatada[] = []

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours()

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour)
            if (dataIndex === -1) {
                dataDaily.push({
                    hour,
                    data: {
                        maxTemperatura: collectedData.temperatura,
                        minTemperatura: collectedData.temperatura,
                        mediaTemperatura: 0,
                        numeroDeLeituras: 1
                    }
                })
            } else {
                dataDaily[dataIndex].data.maxTemperatura = Math.max(dataDaily[dataIndex].data.maxTemperatura, collectedData.temperatura)
                dataDaily[dataIndex].data.minTemperatura = Math.min(dataDaily[dataIndex].data.minTemperatura, collectedData.temperatura)
                dataDaily[dataIndex].data.mediaTemperatura = dataDaily[dataIndex].data.mediaTemperatura + collectedData.temperatura
                dataDaily[dataIndex].data.numeroDeLeituras = dataDaily[dataIndex].data.numeroDeLeituras + 1
            }
        })
        
        dataDaily.forEach(e => e.data.mediaTemperatura = e.data.mediaTemperatura / e.data.numeroDeLeituras)

        return dataDaily
    }
}

export default TemperatureService