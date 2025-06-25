import Clima from "../model/clima.model";
import Pressao from "../types/Pressao";
import PressaoFormatadaDaily from "../types/PressaoFormatadaDaily";

class PressaoService {
    async getPressaoDataPerDaily(date: Date): Promise<Pressao[]> {
        const startOfDay = date;
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const response: any = await Clima.find({
            timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({ timestamp: 1 });
        return response;
    }

    async getPressaoDatePerWeek(date: Date): Promise<Pressao[]> {
        const endOfDay = date;
        const startOfDay = new Date(date);
        startOfDay.setDate(startOfDay.getDate() - 6);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const response: any = await Clima.find({
            timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).sort({ timestamp: 1 });
        return response;
    }

    formatPressaoDataDaily(data: Pressao[]): PressaoFormatadaDaily[] {
        const dataDaily: PressaoFormatadaDaily[] = [];

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours();

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour);
            if (dataIndex === -1) {
                dataDaily.push({
                    hour,
                    data: {
                        maxPressao: collectedData.pressao,
                        minPressao: collectedData.pressao,
                        mediaPressao: collectedData.pressao,
                        numeroDeLeituras: 1
                    }
                });
            } else {
                dataDaily[dataIndex].data.maxPressao = Math.max(dataDaily[dataIndex].data.maxPressao, collectedData.pressao);
                dataDaily[dataIndex].data.minPressao = Math.min(dataDaily[dataIndex].data.minPressao, collectedData.pressao);
                dataDaily[dataIndex].data.mediaPressao += collectedData.pressao;
                dataDaily[dataIndex].data.numeroDeLeituras += 1;
            }
        });

        dataDaily.forEach(e => e.data.mediaPressao /= e.data.numeroDeLeituras);
        return dataDaily;
    }
}

export default PressaoService;