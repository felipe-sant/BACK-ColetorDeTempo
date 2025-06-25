import Clima from "../model/clima.model"
import Carbono from "../types/Carbono"
import CarbonoFormatadoDaily from "../types/CarbonoFormatadaDaily"

class CarvonoService {
    async getCarbonoDataPerDaily(date: Date): Promise<Carbono[]> {
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

    async getCarbonoDatePerWeek(date: Date): Promise<Carbono[]> {
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

    formatCarbonoDataDaily(data: Carbono[]): CarbonoFormatadoDaily[] {
        const dataDaily: CarbonoFormatadoDaily[] = []

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours()

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour)
            if (dataIndex === -1) {
                dataDaily.push({
                    hour,
                    data: {
                        maxCarbono: collectedData.co,
                        minCarbono: collectedData.co,
                        mediaCarbono: collectedData.co,
                        numeroDeLeituras: 1
                    }
                })
            } else {
                dataDaily[dataIndex].data.maxCarbono = Math.max(dataDaily[dataIndex].data.maxCarbono, collectedData.co)
                dataDaily[dataIndex].data.minCarbono = Math.min(dataDaily[dataIndex].data.minCarbono, collectedData.co)
                dataDaily[dataIndex].data.mediaCarbono += collectedData.co
                dataDaily[dataIndex].data.numeroDeLeituras += 1
            }
        })

        dataDaily.forEach(e => e.data.mediaCarbono /= e.data.numeroDeLeituras)
        return dataDaily
    }
}

export default CarvonoService;