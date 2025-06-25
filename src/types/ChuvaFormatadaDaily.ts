type ChuvaFormatadaDaily = {
    hour: number;
    data: {
        chuva: boolean;
        numeroDeLeituras: number;
    };
}

export default ChuvaFormatadaDaily;