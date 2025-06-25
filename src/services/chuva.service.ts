import Clima from "../model/clima.model";
import ChuvaFormatadaDaily from "../types/ChuvaFormatadaDaily";
import Chuva from "../types/Chuva";

class ChuvaService {
    async getChuvaDataPerDaily(date: Date): Promise<Chuva[]> {
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

    formatChuvaDataDaily(data: Chuva[]): ChuvaFormatadaDaily[] {
        const dataDaily: ChuvaFormatadaDaily[] = [];

        data.forEach((collectedData) => {
            const hour = collectedData.timestamp.getUTCHours();

            const dataIndex = dataDaily.findIndex((data) => data.hour === hour);
            if (dataIndex === -1) {
                if (collectedData.chuva) {
                    dataDaily.push({
                        hour: hour,
                        data: {
                            numeroDeLeituras: 1,
                            chuva: 1
                        }
                    });
                } else {
                    dataDaily.push({
                        hour: hour,
                        data: {
                            numeroDeLeituras: 1,
                            chuva: 0
                        }
                    });
                }
            } else {
                dataDaily[dataIndex].data.numeroDeLeituras += 1;
                if (collectedData.chuva) {
                    dataDaily[dataIndex].data.chuva = 1;
                }
            }
        });

        return dataDaily;
    }
}

export default ChuvaService;