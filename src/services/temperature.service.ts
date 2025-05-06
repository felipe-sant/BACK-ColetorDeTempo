import Clima from "../model/clima.model";
import TemperaturaFormatadaDaily from "../types/TemperaturaFormatadaDaily";
import Temperatura from "../types/Temperatura";
import Semana from "../enum/Semana";
import TemperaturaFormatadaWeek from "../types/TemperaturaFormatadaWeek";

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

    async getTemperatureDatePerWeek(date: Date): Promise<Temperatura[]> {
        const endOfDay = date
        const startOfDay = new Date(date)
        startOfDay.setDate(startOfDay.getDate() - 6)
        endOfDay.setDate(endOfDay.getDate() + 1)
        console.log(startOfDay, Semana[startOfDay.getDay()])
        console.log(endOfDay, Semana[endOfDay.getDay()])
        const response: any = await Clima.find({
            timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({ timestamp: 1 })
        return response
    }

    formatTemperatureDataDaily(data: Temperatura[]) {
        const dataDaily: TemperaturaFormatadaDaily[] = []

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours()

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour)
            if (dataIndex === -1) {
                dataDaily.push({
                    hour,
                    data: {
                        maxTemperatura: collectedData.temperatura,
                        minTemperatura: collectedData.temperatura,
                        mediaTemperatura: collectedData.temperatura,
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

    formatTemperatureDataWeek(data: Temperatura[]) {
        const dataWeek: TemperaturaFormatadaWeek[] = []

        data.forEach((collectedData) => {
            const day = Semana[collectedData.timestamp.getDay()]

            const dataIndex = dataWeek.findIndex((data) => data.day === day)
            if (dataIndex === -1) {
                dataWeek.push({
                    day,
                    data: {
                        maxTemperatura: collectedData.temperatura,
                        minTemperatura: collectedData.temperatura,
                        mediaTemperatura: collectedData.temperatura,
                        numeroDeLeituras: 1
                    }
                })
            } else {
                dataWeek[dataIndex].data.maxTemperatura = Math.max(dataWeek[dataIndex].data.maxTemperatura, collectedData.temperatura)
                dataWeek[dataIndex].data.minTemperatura = Math.min(dataWeek[dataIndex].data.minTemperatura, collectedData.temperatura)
                dataWeek[dataIndex].data.mediaTemperatura = dataWeek[dataIndex].data.mediaTemperatura + collectedData.temperatura
                dataWeek[dataIndex].data.numeroDeLeituras = dataWeek[dataIndex].data.numeroDeLeituras + 1
            }
        })

        dataWeek.forEach(e => e.data.mediaTemperatura = e.data.mediaTemperatura / e.data.numeroDeLeituras)

        return dataWeek
    }
}

export default TemperatureService